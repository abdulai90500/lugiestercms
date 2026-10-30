export type UserRole = 
  | 'student' 
  | 'finance' 
  | 'admissions' 
  | 'hod' 
  | 'registry' 
  | 'lecturer' 
  | 'admin';

export type ApplicationStatus = 
  | 'draft'
  | 'submitted'
  | 'under_review_admissions'
  | 'under_review_hod'
  | 'interview_scheduled'
  | 'interview_completed'
  | 'recommended_admit'
  | 'recommended_reject'
  | 'returned_for_correction'
  | 'admitted'
  | 'rejected';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  department?: string;
}

export interface Programme {
  id: string;
  departmentId: string;
  facultyName: string;
  name: string;
  code: string;
  degreeType: 'Degree' | 'Diploma' | 'Certificate' | 'Master' | 'Vocational';
  durationYears: number;
  studyMode?: string;
  categoryGroup?: '01' | '02' | '03' | '04' | '05';
  tuitionPerSemester?: number;
  currency?: string;
}

export interface PaymentRecord {
  id: string;
  receiptNumber: string;
  payerName: string;
  payerEmail: string;
  payerPhone: string;
  amount: number;
  currency: string;
  paymentMethod: 'cash_office' | 'bank_deposit_slip' | 'orange_money' | 'afrimoney' | 'direct_transfer';
  bankReference: string;
  recordedBy: string;
  createdAt: string;
  notes?: string;
}

export interface ApplicationCode {
  id: string;
  code: string;
  paymentId: string;
  receiptNumber: string;
  issuedToName: string;
  issuedToEmail: string;
  isRedeemed: boolean;
  redeemedAt?: string;
  redeemedByApplicationId?: string;
  expiresAt: string;
  createdAt: string;
  amount?: number;
  currency?: string;
}

export interface ApplicationRecord {
  id: string;
  applicationNumber: string;
  userId: string;
  userEmail: string;
  codeId: string;
  codeUsed: string;
  status: ApplicationStatus;
  
  // Programmes
  firstChoiceProgramme: Programme;
  secondChoiceProgramme?: Programme;
  
  // Personal Info
  personalInfo: {
    fullName: string;
    email?: string;
    dob: string;
    gender: string;
    nationality: string;
    phone: string;
    address: string;
    nextOfKinName: string;
    nextOfKinPhone: string;
  };
  
  // Academic history (e.g. WASSCE / SWO results)
  academicHistory: {
    highSchool: string;
    graduationYear: string;
    wassceIndexNumber: string;
    examType: string; // WASSCE, SWO technical, NCTVA, etc.
    waecSerialNumber?: string; // WAEC / SWAEC Scratch Card Serial Number
    waecPin?: string;          // WAEC / SWAEC Scratch Card PIN
    resultSlipName?: string;
    resultSlipUrl?: string;
    grades?: Array<{ subject: string; grade: string }>;
  };
  
  // Documents
  passportPhotoUrl?: string;
  documents: Array<{
    type: 'passport_photo' | 'birth_cert' | 'testimonial' | 'result_slip' | string;
    name: string;
    url: string;
    verified: boolean;
    uploadedAt?: string;
    fileSize?: string;
  }>;
  
  confirmationEmailSent?: boolean;
  
  // Review stages
  admissionsVerified: boolean;
  admissionsNotes?: string;
  hodStatus: 'pending' | 'approved' | 'rejected' | 'correction_required';
  hodComments?: string;
  interviewDetails?: {
    scheduledAt: string;
    venue: string;
    completed: boolean;
    score?: number;
    notes?: string;
  };
  admissionDecision?: {
    status: 'ADMITTED' | 'REJECTED';
    admissionNumber: string;
    programmeName: string;
    date: string;
    conditions?: string;
  };

  submittedAt: string;
  updatedAt: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  studentIdNumber: string; // e.g. LCEST/2026/FOE/0042
  fullName: string;
  email: string;
  phone: string;
  programmeId: string;
  programmeName: string;
  facultyName: string;
  degreeType: string;
  admissionYear: string;
  currentSemester: string;
  tuitionCleared: boolean;
  registrationApproved: boolean;
  registeredCourses: string[]; // array of module codes
  cgpa?: number;
}

export interface AcademicModule {
  id: string;
  code: string;
  title: string;
  credits: number;
  departmentId: string;
  semester: string;
  level: string; // 'Year 1 Semester 1'
  lecturerName: string;
  lecturerEmail: string;
  description: string;
}

export interface TimetableSlot {
  id: string;
  moduleCode: string;
  moduleTitle: string;
  lecturerName: string;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string; // '09:00'
  endTime: string;   // '11:00'
  room: string;      // 'ICT Lab 1' or 'Lecture Hall B'
  campus: string;    // 'Hill Station Freetown'
}

export interface GradeRecord {
  id: string;
  studentIdNumber: string;
  studentName: string;
  moduleCode: string;
  moduleTitle: string;
  credits: number;
  caScore: number;     // 0 - 40
  examScore: number;   // 0 - 60
  totalScore: number;  // 0 - 100
  letterGrade: string; // 'A' | 'B+' | 'B' | 'C+' | 'C' | 'D' | 'F'
  gradePoint: number;  // 4.0, 3.5, 3.0, 2.5, 2.0, 1.0, 0.0
  isPublished: boolean;
  semester: string;
  academicYear: string;
  approvedByRegistry: boolean;
}
