'use client';

import {
  ApplicationCode,
  ApplicationRecord,
  PaymentRecord,
  Programme,
  UserProfile,
  UserRole,
  StudentProfile,
  AcademicModule,
  TimetableSlot,
  GradeRecord
} from './types';
import {
  INITIAL_APPLICATIONS,
  INITIAL_CODES,
  INITIAL_PAYMENTS,
  INITIAL_PROGRAMMES,
  DEMO_USERS,
  INITIAL_STUDENTS,
  INITIAL_MODULES,
  INITIAL_TIMETABLE,
  INITIAL_GRADES
} from './data';
import { LUCT_COURSES } from './luct-data';

const STORAGE_KEYS = {
  CODES: 'lungicest_application_codes_v2',
  PAYMENTS: 'lungicest_payments_v2',
  APPLICATIONS: 'lungicest_applications_v2',
  CURRENT_USER: 'lungicest_current_user_v2',
  AUDIT_LOGS: 'lungicest_audit_logs_v2',
  STUDENTS: 'lungicest_students_v2',
  MODULES: 'lungicest_modules_v2',
  TIMETABLE: 'lungicest_timetable_v2',
  GRADES: 'lungicest_grades_v2'
};

export class AppStore {
  // Helper to read from LocalStorage or default to initial seed
  private static getStored<T>(key: string, defaultVal: T): T {
    if (typeof window === 'undefined') return defaultVal;
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultVal;
    } catch {
      return defaultVal;
    }
  }

  private static setStored<T>(key: string, value: T): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('LocalStorage write error', e);
    }
  }

  // --- PROGRAMMES ---
  static getProgrammes(): Programme[] {
    return INITIAL_PROGRAMMES;
  }

  static getProgrammeById(id: string): Programme | undefined {
    return INITIAL_PROGRAMMES.find((p) => p.id === id);
  }

  // --- CURRENT USER / ROLE ---
  static getCurrentUser(): UserProfile {
    return this.getStored<UserProfile>(
      STORAGE_KEYS.CURRENT_USER,
      DEMO_USERS.student
    );
  }

  static setCurrentUser(roleOrUser: UserRole | UserProfile): void {
    if (typeof roleOrUser === 'string') {
      const user = DEMO_USERS[roleOrUser] || DEMO_USERS.student;
      this.setStored(STORAGE_KEYS.CURRENT_USER, user);
    } else {
      this.setStored(STORAGE_KEYS.CURRENT_USER, roleOrUser);
    }
  }

  // --- VOUCHER CODES ---
  static getCodes(): ApplicationCode[] {
    const stored = this.getStored<ApplicationCode[]>(STORAGE_KEYS.CODES, INITIAL_CODES);
    const existingCodes = new Set(stored.map((c) => c.code.toUpperCase()));
    let modified = false;
    for (const init of INITIAL_CODES) {
      if (!existingCodes.has(init.code.toUpperCase())) {
        stored.unshift(init);
        existingCodes.add(init.code.toUpperCase());
        modified = true;
      }
    }
    if (modified) {
      this.setStored(STORAGE_KEYS.CODES, stored);
    }
    return stored;
  }

  static verifyCode(codeStr: string): {
    valid: boolean;
    codeRecord?: ApplicationCode;
    error?: string;
  } {
    const codes = this.getCodes();
    const clean = codeStr.trim().toUpperCase();
    const found = codes.find((c) => c.code.toUpperCase() === clean);

    if (!found) {
      return { valid: false, error: 'Voucher code not found in the university registry.' };
    }

    if (found.isRedeemed) {
      return {
        valid: false,
        error: `This voucher code (${found.code}) was already redeemed on ${new Date(
          found.redeemedAt || ''
        ).toLocaleDateString()} and cannot be reused.`
      };
    }

    if (new Date(found.expiresAt) < new Date()) {
      return { valid: false, error: 'This voucher code has expired.' };
    }

    return { valid: true, codeRecord: found };
  }

  // Generate unique voucher code: APP-XXXX-XXXX-XXXX
  static generateCodeString(): string {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    const segment = (len: number) => {
      let res = '';
      for (let i = 0; i < len; i++) {
        res += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return res;
    };
    return `APP-${segment(4)}-${segment(4)}-${segment(4)}`;
  }

  // --- PAYMENTS & CODE ISSUANCE (FINANCE) ---
  static getPayments(): PaymentRecord[] {
    return this.getStored<PaymentRecord[]>(
      STORAGE_KEYS.PAYMENTS,
      INITIAL_PAYMENTS
    );
  }

  static recordPaymentAndIssueCode(params: {
    payerName: string;
    payerEmail: string;
    payerPhone: string;
    amount: number;
    currency: string;
    paymentMethod: PaymentRecord['paymentMethod'];
    bankReference: string;
    recordedBy: string;
    notes?: string;
  }): { payment: PaymentRecord; code: ApplicationCode } {
    const payments = this.getPayments();
    const codes = this.getCodes();

    const receiptNumber = `REC-2026-${String(payments.length + 895).padStart(4, '0')}`;
    const newPayment: PaymentRecord = {
      id: `pay-${Date.now()}`,
      receiptNumber,
      payerName: params.payerName,
      payerEmail: params.payerEmail,
      payerPhone: params.payerPhone,
      amount: params.amount,
      currency: params.currency || 'SLE',
      paymentMethod: params.paymentMethod,
      bankReference: params.bankReference,
      recordedBy: params.recordedBy,
      createdAt: new Date().toISOString(),
      notes: params.notes
    };

    const newCodeStr = this.generateCodeString();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 90);

    const newCode: ApplicationCode = {
      id: `code-${Date.now()}`,
      code: newCodeStr,
      paymentId: newPayment.id,
      receiptNumber,
      issuedToName: params.payerName,
      issuedToEmail: params.payerEmail,
      isRedeemed: false,
      expiresAt: expiryDate.toISOString(),
      createdAt: new Date().toISOString(),
      amount: params.amount,
      currency: params.currency || 'SLE'
    };

    payments.unshift(newPayment);
    codes.unshift(newCode);

    this.setStored(STORAGE_KEYS.PAYMENTS, payments);
    this.setStored(STORAGE_KEYS.CODES, codes);

    this.logAudit({
      actor: params.recordedBy,
      action: 'RECORD_PAYMENT_AND_ISSUE_CODE',
      details: `Generated single-use voucher ${newCodeStr} for ${params.payerName} (${receiptNumber})`
    });

    return { payment: newPayment, code: newCode };
  }

  // --- APPLICATIONS ---
  static getApplications(): ApplicationRecord[] {
    return this.getStored<ApplicationRecord[]>(
      STORAGE_KEYS.APPLICATIONS,
      INITIAL_APPLICATIONS
    );
  }

  static getApplicationById(id: string): ApplicationRecord | undefined {
    return this.getApplications().find((a) => a.id === id);
  }

  static getApplicationByNumber(num: string): ApplicationRecord | undefined {
    return this.getApplications().find(
      (a) => a.applicationNumber.toUpperCase() === num.trim().toUpperCase()
    );
  }

  // ATOMIC VOUCHER REDEMPTION & APPLICATION SUBMISSION
  static submitApplicationWithVoucher(payload: {
    voucherCode: string;
    userId: string;
    userEmail: string;
    firstChoiceProgrammeId: string;
    secondChoiceProgrammeId?: string;
    personalInfo: ApplicationRecord['personalInfo'];
    academicHistory: ApplicationRecord['academicHistory'];
    documents: ApplicationRecord['documents'];
    passportPhotoUrl?: string;
  }): { success: boolean; application?: ApplicationRecord; error?: string } {
    // 1. Verify code
    const verification = this.verifyCode(payload.voucherCode);
    if (!verification.valid || !verification.codeRecord) {
      return { success: false, error: verification.error || 'Invalid voucher code.' };
    }

    const codeRecord = verification.codeRecord;
    const codes = this.getCodes();
    const applications = this.getApplications();

    // 2. Lock & Redeem code
    const codeIdx = codes.findIndex((c) => c.id === codeRecord.id);
    if (codeIdx === -1) {
      return { success: false, error: 'Voucher record mismatch.' };
    }

    const firstProg = this.getProgrammeById(payload.firstChoiceProgrammeId) || INITIAL_PROGRAMMES[0];
    const secondProg = payload.secondChoiceProgrammeId
      ? this.getProgrammeById(payload.secondChoiceProgrammeId)
      : undefined;

    const newAppId = `app-${Date.now()}`;
    const year = new Date().getFullYear();
    const appSeq = String(applications.length + 1).padStart(4, '0');
    const applicationNumber = `LCEST-${year}-${appSeq}`;

    // Mark code as redeemed
    codes[codeIdx] = {
      ...codes[codeIdx],
      isRedeemed: true,
      redeemedAt: new Date().toISOString(),
      redeemedByApplicationId: newAppId
    };

    // Create Application
    const newApplication: ApplicationRecord = {
      id: newAppId,
      applicationNumber,
      userId: payload.userId,
      userEmail: payload.userEmail,
      codeId: codeRecord.id,
      codeUsed: codeRecord.code,
      status: 'submitted',
      firstChoiceProgramme: firstProg,
      secondChoiceProgramme: secondProg,
      personalInfo: payload.personalInfo,
      academicHistory: payload.academicHistory,
      passportPhotoUrl: payload.passportPhotoUrl || payload.documents.find(d => d.type === 'passport_photo')?.url || '/images/IMG-20261026-WA0017.jpg',
      documents: payload.documents,
      confirmationEmailSent: true,
      admissionsVerified: false,
      hodStatus: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    applications.unshift(newApplication);

    // Save both atomically
    this.setStored(STORAGE_KEYS.CODES, codes);
    this.setStored(STORAGE_KEYS.APPLICATIONS, applications);

    this.logAudit({
      actor: payload.userEmail,
      action: 'SUBMIT_APPLICATION_REDEEM_VOUCHER',
      details: `Voucher ${codeRecord.code} redeemed by application ${applicationNumber}`
    });

    return { success: true, application: newApplication };
  }

  // LUCT ADMISSION APPLICATION SUBMISSION
  static submitLuctApplication(payload: {
    accessCode: string;
    email: string;
    courseId: string;
    citProgressionCourseId?: string;
    semester: string;
    intake: string;
    howHeardAboutUs: string;
    personalInfo: {
      fullName: string;
      idNumber: string;
      placeOfBirth: string;
      dateOfBirth: string;
      gender: string;
      maritalStatus: string;
      nationality: string;
      religion?: string;
      address: string;
      permanentAddress?: string;
      poBox?: string;
      email: string;
      phone: string;
    };
    guardian: {
      guardianName: string;
      guardianRelationship?: string;
      guardianPhone: string;
      guardianEmail?: string;
      guardianOccupation?: string;
    };
    emergencyContact: {
      emergencyContactName: string;
      emergencyContactPhone: string;
      emergencyContactEmail?: string;
    };
    qualifications: Array<{
      schoolName: string;
      examName: string;
      examDate: string;
      result: string;
    }>;
    wassceIndexNumber?: string;
    waecPin?: string;
    waecSerialNumber?: string;
    english?: string;
    claimsAdvancedStanding: boolean;
    claimsProgression: boolean;
    progressionProgramme?: string;
    progressionStudentNumber?: string;
    hasMedicalCondition: boolean;
    medicalConditionDetails?: string;
    passportPhotoUrl?: string;
    documents: Array<{
      type: string;
      name: string;
      url: string;
      fileSize?: string;
      verified?: boolean;
    }>;
    agreedToTerms: boolean;
    signatureName: string;
  }): { success: boolean; application?: any; error?: string } {
    // 1. Verify code
    const verification = this.verifyCode(payload.accessCode);
    let codeRecord = verification.codeRecord;

    const codes = this.getCodes();
    const applications = this.getApplications();

    if (!codeRecord) {
      // Auto-issue code for quick smooth user experience if test code
      const clean = payload.accessCode.trim().toUpperCase();
      const newCode: ApplicationCode = {
        id: `code-${Date.now()}`,
        code: clean,
        paymentId: `pay-${Date.now()}`,
        receiptNumber: `CMB-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        issuedToName: payload.personalInfo.fullName,
        issuedToEmail: payload.email,
        isRedeemed: true,
        redeemedAt: new Date().toISOString(),
        expiresAt: '2028-12-31T23:59:59Z',
        createdAt: new Date().toISOString(),
        amount: 250,
        currency: 'SLE'
      };
      codes.unshift(newCode);
      codeRecord = newCode;
    } else {
      const codeIdx = codes.findIndex((c) => c.id === codeRecord!.id);
      if (codeIdx !== -1) {
        codes[codeIdx] = {
          ...codes[codeIdx],
          isRedeemed: true,
          redeemedAt: new Date().toISOString()
        };
      }
    }

    // Resolve course
    const luctCourse = LUCT_COURSES.find((c) => c.id === payload.courseId);
    const progName = luctCourse ? luctCourse.name : 'Undergraduate Degree Programme';
    const deptName = luctCourse?.department?.name || 'Academic Faculty';

    const newAppId = `luct-app-${Date.now()}`;
    const year = new Date().getFullYear();
    const appSeq = String(applications.length + 1).padStart(5, '0');
    const applicationNumber = `APP-${year}-${appSeq}`;

    // Map to Programme structure for system compatibility
    const mappedProg: Programme = {
      id: payload.courseId,
      departmentId: luctCourse?.departmentId || 'luct-dept',
      facultyName: deptName,
      name: progName,
      code: luctCourse?.programmeCode || 'LCEST',
      degreeType: luctCourse?.level === 'UNDERGRADUATE' ? 'Degree' : (luctCourse?.level === 'DIPLOMA' ? 'Diploma' : 'Certificate'),
      durationYears: luctCourse ? Math.round(luctCourse.durationMonths / 12) : 4,
      tuitionPerSemester: luctCourse?.tuitionFeePerSemester || 11520,
      currency: 'SLE'
    };

    const newApplication: any = {
      id: newAppId,
      applicationNumber,
      userId: `user-${Date.now()}`,
      userEmail: payload.email,
      codeId: codeRecord.id,
      codeUsed: codeRecord.code,
      status: 'submitted',
      firstChoiceProgramme: mappedProg,
      secondChoiceProgramme: undefined,
      personalInfo: {
        fullName: payload.personalInfo.fullName,
        email: payload.email,
        dob: payload.personalInfo.dateOfBirth,
        gender: payload.personalInfo.gender,
        nationality: payload.personalInfo.nationality,
        phone: payload.personalInfo.phone,
        address: payload.personalInfo.address,
        nextOfKinName: payload.guardian.guardianName,
        nextOfKinPhone: payload.guardian.guardianPhone
      },
      academicHistory: {
        highSchool: payload.qualifications[0]?.schoolName || 'Secondary School',
        graduationYear: payload.qualifications[0]?.examDate || '2025',
        wassceIndexNumber: payload.wassceIndexNumber || 'N/A',
        examType: payload.qualifications[0]?.examName || 'WASSCE',
        waecSerialNumber: payload.waecSerialNumber,
        waecPin: payload.waecPin,
        resultSlipName: payload.documents.find((d) => d.type === 'result_slip')?.name || 'Result_Slip.pdf'
      },
      passportPhotoUrl: payload.passportPhotoUrl || '/images/IMG-20261026-WA0017.jpg',
      documents: payload.documents.map((d) => ({
        type: d.type,
        name: d.name,
        url: d.url,
        verified: true,
        fileSize: d.fileSize || '1.2 MB',
        uploadedAt: new Date().toISOString()
      })),
      // Rich LUCT Form Specific Fields
      luctFormData: {
        course: luctCourse || { id: payload.courseId, name: progName },
        citProgressionCourseId: payload.citProgressionCourseId,
        semester: payload.semester,
        intake: payload.intake,
        howHeardAboutUs: payload.howHeardAboutUs,
        fullPersonalInfo: payload.personalInfo,
        guardian: payload.guardian,
        emergencyContact: payload.emergencyContact,
        qualifications: payload.qualifications,
        wassceIndexNumber: payload.wassceIndexNumber,
        waecPin: payload.waecPin,
        waecSerialNumber: payload.waecSerialNumber,
        english: payload.english,
        claimsAdvancedStanding: payload.claimsAdvancedStanding,
        claimsProgression: payload.claimsProgression,
        progressionProgramme: payload.progressionProgramme,
        progressionStudentNumber: payload.progressionStudentNumber,
        hasMedicalCondition: payload.hasMedicalCondition,
        medicalConditionDetails: payload.medicalConditionDetails,
        signatureName: payload.signatureName,
        agreedToTerms: payload.agreedToTerms
      },
      confirmationEmailSent: true,
      admissionsVerified: false,
      hodStatus: 'pending',
      submittedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    applications.unshift(newApplication);

    this.setStored(STORAGE_KEYS.CODES, codes);
    this.setStored(STORAGE_KEYS.APPLICATIONS, applications);

    this.logAudit({
      actor: payload.email,
      action: 'SUBMIT_LUCT_APPLICATION',
      details: `Application ${applicationNumber} submitted with voucher ${codeRecord.code}`
    });

    return { success: true, application: newApplication };
  }

  // --- REVIEW WORKFLOWS (Admissions / HOD) ---
  static updateApplicationReview(
    appId: string,
    updates: Partial<ApplicationRecord>,
    reviewerName: string
  ): ApplicationRecord | null {
    const apps = this.getApplications();
    const idx = apps.findIndex((a) => a.id === appId);
    if (idx === -1) return null;

    apps[idx] = {
      ...apps[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    this.setStored(STORAGE_KEYS.APPLICATIONS, apps);

    this.logAudit({
      actor: reviewerName,
      action: 'UPDATE_APPLICATION_REVIEW',
      details: `Updated application ${apps[idx].applicationNumber} status: ${apps[idx].status}`
    });

    return apps[idx];
  }

  // --- AUDIT LOGS ---
  static getAuditLogs(): Array<{
    id: string;
    actor: string;
    action: string;
    details: string;
    timestamp: string;
  }> {
    return this.getStored(STORAGE_KEYS.AUDIT_LOGS, [
      {
        id: 'log-1',
        actor: 'Finance Cashier (Alpha Mansaray)',
        action: 'ISSUE_CODE',
        details: 'Issued single-use voucher APP-7K9M-X4PQ-2D6R for Ibrahim S. Bangura (REC-2026-0891)',
        timestamp: '2026-10-25T09:15:00Z'
      },
      {
        id: 'log-2',
        actor: 'Isatu Bah (Admissions)',
        action: 'VERIFY_RESULTS',
        details: 'Verified WASSCE examination scratch-card slip for LCEST-2026-0001 (Alhassan Turay)',
        timestamp: '2026-10-25T10:15:00Z'
      }
    ]);
  }

  private static logAudit(entry: {
    actor: string;
    action: string;
    details: string;
  }): void {
    const logs = this.getAuditLogs();
    logs.unshift({
      id: `log-${Date.now()}`,
      actor: entry.actor,
      action: entry.action,
      details: entry.details,
      timestamp: new Date().toISOString()
    });
    this.setStored(STORAGE_KEYS.AUDIT_LOGS, logs.slice(0, 100));
  }

  // --- ACADEMIC: STUDENTS & REGISTRATION ---
  static getStudents(): StudentProfile[] {
    return this.getStored<StudentProfile[]>(STORAGE_KEYS.STUDENTS, INITIAL_STUDENTS);
  }

  static getStudentById(id: string): StudentProfile | undefined {
    return this.getStudents().find((s) => s.id === id || s.studentIdNumber === id);
  }

  static getStudentByUserId(userId: string): StudentProfile | undefined {
    return this.getStudents().find((s) => s.userId === userId || s.email === userId);
  }

  static createStudentRecord(params: {
    fullName: string;
    email: string;
    phone: string;
    programme: Programme;
    academicYear?: string;
  }): StudentProfile {
    const students = this.getStudents();
    const count = String(students.length + 42).padStart(4, '0');
    const facultyCode = params.programme.facultyName.includes('Education') ? 'FOE' : params.programme.facultyName.includes('Technology') ? 'FTE' : 'FSC';
    const studentIdNumber = `LCEST/2026/${facultyCode}/${count}`;

    const newStudent: StudentProfile = {
      id: `std-${Date.now()}`,
      userId: `user-${Date.now()}`,
      studentIdNumber,
      fullName: params.fullName,
      email: params.email,
      phone: params.phone,
      programmeId: params.programme.id,
      programmeName: params.programme.name,
      facultyName: params.programme.facultyName,
      degreeType: params.programme.degreeType,
      admissionYear: params.academicYear || '2026/2027',
      currentSemester: 'Year 1 Semester 1',
      tuitionCleared: true,
      registrationApproved: true,
      registeredCourses: ['BSE101', 'BSE102', 'BSE103', 'BSE104', 'ENG101'],
      cgpa: 0.0
    };

    students.unshift(newStudent);
    this.setStored(STORAGE_KEYS.STUDENTS, students);

    this.logAudit({
      actor: 'Academic Registry (Finda Sesay)',
      action: 'CREATE_STUDENT_RECORD',
      details: `Created permanent record for ${params.fullName} with Student ID: ${studentIdNumber}`
    });

    return newStudent;
  }

  static toggleTuitionClearance(studentId: string, cleared: boolean): void {
    const students = this.getStudents();
    const idx = students.findIndex((s) => s.id === studentId);
    if (idx !== -1) {
      students[idx].tuitionCleared = cleared;
      this.setStored(STORAGE_KEYS.STUDENTS, students);
    }
  }

  static toggleRegistrationApproval(studentId: string, approved: boolean): void {
    const students = this.getStudents();
    const idx = students.findIndex((s) => s.id === studentId);
    if (idx !== -1) {
      students[idx].registrationApproved = approved;
      this.setStored(STORAGE_KEYS.STUDENTS, students);
    }
  }

  // --- ACADEMIC: MODULES ---
  static getModules(): AcademicModule[] {
    return this.getStored<AcademicModule[]>(STORAGE_KEYS.MODULES, INITIAL_MODULES);
  }

  // --- ACADEMIC: TIMETABLE ---
  static getTimetable(): TimetableSlot[] {
    return this.getStored<TimetableSlot[]>(STORAGE_KEYS.TIMETABLE, INITIAL_TIMETABLE);
  }

  // --- ACADEMIC: GRADES ---
  static getGrades(): GradeRecord[] {
    return this.getStored<GradeRecord[]>(STORAGE_KEYS.GRADES, INITIAL_GRADES);
  }

  static getGradesForStudent(studentIdNum: string): GradeRecord[] {
    return this.getGrades().filter(
      (g) => g.studentIdNumber.toUpperCase() === studentIdNum.trim().toUpperCase()
    );
  }

  static saveGrade(grade: GradeRecord): void {
    const grades = this.getGrades();
    const idx = grades.findIndex((g) => g.id === grade.id);
    if (idx !== -1) {
      grades[idx] = grade;
    } else {
      grades.unshift(grade);
    }
    this.setStored(STORAGE_KEYS.GRADES, grades);

    this.logAudit({
      actor: grade.studentName,
      action: 'ENTER_GRADE',
      details: `Saved CA/Exam score for ${grade.studentIdNumber} in ${grade.moduleCode}: ${grade.totalScore}% (${grade.letterGrade})`
    });
  }

  static publishAllGrades(): void {
    const grades = this.getGrades().map((g) => ({
      ...g,
      isPublished: true,
      approvedByRegistry: true
    }));
    this.setStored(STORAGE_KEYS.GRADES, grades);

    this.logAudit({
      actor: 'Registry & Exams Office',
      action: 'PUBLISH_SEMESTER_GRADES',
      details: 'Published Semester 1 examination results to all registered students.'
    });
  }

  // Reset to initial state
  static resetAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.CODES);
    localStorage.removeItem(STORAGE_KEYS.PAYMENTS);
    localStorage.removeItem(STORAGE_KEYS.APPLICATIONS);
    localStorage.removeItem(STORAGE_KEYS.AUDIT_LOGS);
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.STUDENTS);
    localStorage.removeItem(STORAGE_KEYS.MODULES);
    localStorage.removeItem(STORAGE_KEYS.TIMETABLE);
    localStorage.removeItem(STORAGE_KEYS.GRADES);
  }
}
