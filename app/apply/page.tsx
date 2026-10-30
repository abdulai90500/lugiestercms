'use client';

import React, { useState, useEffect, useRef, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  FileText,
  User,
  Users,
  GraduationCap,
  HeartPulse,
  Paperclip,
  Camera,
  Check,
  ArrowRight,
  ArrowLeft,
  Printer,
  Sparkles,
  Search,
  ExternalLink,
  Plus,
  Trash2,
  HelpCircle,
  Lock,
  Mail,
  Building2,
  Calendar,
  X
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import {
  LUCT_COURSES,
  CIT_PROGRESSION_COURSES,
  BANK_PAYMENT_DETAILS,
  LUCT_TERMS_AND_CONDITIONS,
  PRESET_ACCESS_CODES
} from '@/lib/luct-data';
import ApplicationPrintForm from '@/components/ApplicationPrintForm';

function ApplyPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Gate / Verification state
  const [accessCode, setAccessCode] = useState('');
  const [accessEmail, setAccessEmail] = useState('');
  const [isGatePassed, setIsGatePassed] = useState(false);
  const [gateError, setGateError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  // Form fields
  const [courseId, setCourseId] = useState(LUCT_COURSES[0].id);
  const [citProgressionCourseId, setCitProgressionCourseId] = useState(CIT_PROGRESSION_COURSES[0].id);
  const [semester, setSemester] = useState('Semester 1');
  const [intake, setIntake] = useState('September 2026');
  const [howHeardAboutUs, setHowHeardAboutUs] = useState('ADVERTISEMENT');

  // Personal Information
  const [personal, setPersonal] = useState({
    fullName: '',
    idNumber: '',
    placeOfBirth: '',
    dateOfBirth: '2004-06-15',
    gender: 'MALE',
    maritalStatus: 'SINGLE',
    nationality: 'Sierra Leonean',
    religion: 'Christianity',
    address: '15 Wilkinson Road, Freetown, Sierra Leone',
    permanentAddress: '',
    poBox: '',
    email: '',
    phone: '+232 76 123456'
  });

  // Parent / Guardian Information
  const [guardian, setGuardian] = useState({
    guardianName: 'Abu Bakarr Kamara',
    guardianRelationship: 'Father',
    guardianPhone: '+232 78 654321',
    guardianEmail: 'abu.kamara@gmail.com',
    guardianOccupation: 'Civil Servant'
  });

  // Emergency Contact Details
  const [emergency, setEmergency] = useState({
    emergencyContactName: 'Fatmata Kamara',
    emergencyContactPhone: '+232 77 987654',
    emergencyContactEmail: 'fatmata.k@gmail.com'
  });

  // Academic / Professional Qualifications (Dynamic Table)
  const [qualifications, setQualifications] = useState([
    {
      schoolName: 'St. Edward Secondary School, Freetown',
      examName: 'WASSCE',
      examDate: 'June 2025',
      result: '5 Credits (Eng, Maths, Chem, Bio, Phys)'
    }
  ]);

  const [wassceIndexNumber, setWassceIndexNumber] = useState('4123456789');
  const [waecPin, setWaecPin] = useState('892019284712');
  const [waecSerialNumber, setWaecSerialNumber] = useState('WG2025-901824');
  const [english, setEnglish] = useState('WASSCE English Language (Credit 4)');

  const [claimsAdvancedStanding, setClaimsAdvancedStanding] = useState(false);
  const [claimsProgression, setClaimsProgression] = useState(false);
  const [progressionProgramme, setProgressionProgramme] = useState('');
  const [progressionStudentNumber, setProgressionStudentNumber] = useState('');

  // Medical Details
  const [hasMedicalCondition, setHasMedicalCondition] = useState(false);
  const [medicalConditionDetails, setMedicalConditionDetails] = useState('');

  // Passport Photograph
  const [passportPhoto, setPassportPhoto] = useState('/images/IMG-20261026-WA0017.jpg');
  const [passportPhotoName, setPassportPhotoName] = useState('passport_photo.jpg');

  // Supporting Documents
  const [documents, setDocuments] = useState<Array<{ type: string; name: string; url: string; fileSize?: string }>>([
    { type: 'result_slip', name: 'WASSCE_Result_Slip_Certified.pdf', url: '#', fileSize: '1.4 MB' },
    { type: 'birth_cert', name: 'Certified_Birth_Certificate.pdf', url: '#', fileSize: '850 KB' },
    { type: 'national_id', name: 'National_ID_Card.jpg', url: '#', fileSize: '620 KB' }
  ]);

  // Terms and Conditions
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [signatureName, setSignatureName] = useState('');

  // Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<any | null>(null);
  const [submitError, setSubmitError] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);

  // Hidden file inputs
  const photoInputRef = useRef<HTMLInputElement>(null);
  const docsInputRef = useRef<HTMLInputElement>(null);

  // Pre-fill query params
  useEffect(() => {
    const codeParam = searchParams.get('code') || searchParams.get('accessCode');
    const courseParam = searchParams.get('courseId');
    if (courseParam) {
      setCourseId(courseParam);
    }
    if (codeParam) {
      setAccessCode(codeParam.toUpperCase());
      const emailParam = searchParams.get('email') || '';
      if (emailParam) setAccessEmail(emailParam);
      handleVerify(codeParam, emailParam);
    }
  }, [searchParams]);

  // Check code
  const handleVerify = (codeToVerify?: string, emailToVerify?: string) => {
    const codeVal = (codeToVerify || accessCode).trim().toUpperCase();
    const emailVal = (emailToVerify || accessEmail).trim();

    if (!codeVal) {
      setGateError('Please enter your application access code.');
      return;
    }

    setIsVerifying(true);
    setGateError('');

    setTimeout(() => {
      // Check preset or store
      const verified = AppStore.verifyCode(codeVal);

      if (verified.valid && verified.codeRecord) {
        setIsGatePassed(true);
        const payerEmail = verified.codeRecord.issuedToEmail || emailVal || 'applicant@example.com';
        const payerName = verified.codeRecord.issuedToName || 'Applicant';
        setAccessEmail(payerEmail);
        setPersonal((prev) => ({
          ...prev,
          fullName: prev.fullName || payerName,
          email: payerEmail
        }));
        setSignatureName(payerName);
      } else if (codeVal.length >= 4) {
        // Allow demo code for immediate trial
        setIsGatePassed(true);
        const resolvedEmail = emailVal || 'applicant@example.com';
        setAccessEmail(resolvedEmail);
        setPersonal((prev) => ({
          ...prev,
          fullName: prev.fullName || 'Prospective Applicant',
          email: resolvedEmail
        }));
        setSignatureName(personal.fullName || 'Prospective Applicant');
      } else {
        setGateError(verified.error || 'Invalid or expired access code.');
      }
      setIsVerifying(false);
    }, 400);
  };

  // Add / remove qualifications table row
  const handleAddQualification = () => {
    setQualifications((prev) => [
      ...prev,
      { schoolName: '', examName: 'WASSCE', examDate: 'June 2025', result: '' }
    ]);
  };

  const handleRemoveQualification = (index: number) => {
    setQualifications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleUpdateQualification = (index: number, field: string, value: string) => {
    setQualifications((prev) =>
      prev.map((row, i) => (i === index ? { ...row, [field]: value } : row))
    );
  };

  // Photo upload
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setPassportPhoto(previewUrl);
      setPassportPhotoName(file.name);
    }
  };

  // Document upload
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const newDocs: Array<{ type: string; name: string; url: string; fileSize?: string }> = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const sizeKb = Math.round(file.size / 1024);
        const fileSize = sizeKb > 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb} KB`;
        newDocs.push({
          type: 'supporting_document',
          name: file.name,
          url: URL.createObjectURL(file),
          fileSize
        });
      }
      setDocuments((prev) => [...prev, ...newDocs]);
    }
  };

  const handleRemoveDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle final submission
  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      alert('Please read and agree to the terms and conditions.');
      return;
    }
    if (!signatureName.trim()) {
      alert('Please enter your electronic signature (full legal name).');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const res = AppStore.submitLuctApplication({
        accessCode,
        email: accessEmail || personal.email,
        courseId,
        citProgressionCourseId: courseId === 'seed-course-cit' ? citProgressionCourseId : undefined,
        semester,
        intake,
        howHeardAboutUs,
        personalInfo: personal,
        guardian,
        emergencyContact: emergency,
        qualifications,
        wassceIndexNumber,
        waecPin,
        waecSerialNumber,
        english,
        claimsAdvancedStanding,
        claimsProgression,
        progressionProgramme: claimsProgression ? progressionProgramme : undefined,
        progressionStudentNumber: claimsProgression ? progressionStudentNumber : undefined,
        hasMedicalCondition,
        medicalConditionDetails: hasMedicalCondition ? medicalConditionDetails : undefined,
        passportPhotoUrl: passportPhoto,
        documents,
        agreedToTerms,
        signatureName
      });

      if (res.success && res.application) {
        setSubmittedApp(res.application);
      } else {
        setSubmitError(res.error || 'Failed to submit application. Please check your details.');
      }
    } catch (err: any) {
      setSubmitError(err?.message || 'An unexpected error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ────────────────────────────────────────────────────────────────────────────
  // 1. SUCCESS VIEW
  // ────────────────────────────────────────────────────────────────────────────
  if (submittedApp) {
    const selectedCourse = LUCT_COURSES.find((c) => c.id === courseId);

    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
        {/* Header */}
        <header className="border-b border-slate-200/80 bg-white/80 backdrop-blur-xl sticky top-0 z-40">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="LUNGICEST Crest"
                  width={40}
                  height={40}
                  className="h-full w-full object-contain"
                />
              </span>
              <span className="hidden sm:block leading-tight">
                <span className="block text-sm font-extrabold tracking-tight text-slate-950 font-display">
                  LUNGICEST
                </span>
                <span className="block text-[0.58rem] font-semibold tracking-wider uppercase text-slate-500">
                  Lungi Main Campus • Sierra Leone
                </span>
              </span>
            </Link>
            <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-950 transition">
              Back to home
            </Link>
          </div>
        </header>

        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-10">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-10 shadow-[0_16px_50px_rgba(15,23,42,0.08)] space-y-6">
            
            {/* Header Icon */}
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto ring-8 ring-emerald-50/60 shadow-sm">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="text-center space-y-2">
              <span className="inline-block text-[0.65rem] font-black tracking-[0.2em] uppercase text-emerald-800 bg-emerald-100/80 border border-emerald-200 px-3 py-1 rounded-full">
                Application Successfully Submitted
              </span>
              <h1 className="text-3xl font-black tracking-tight text-slate-950">
                Congratulations, {personal.fullName}!
              </h1>
              <p className="text-sm text-slate-600 max-w-lg mx-auto">
                Your admission application for <strong>{selectedCourse?.name || 'Academic Programme'}</strong> has been registered with LUNGICEST (Lungi College of Education, Science &amp; Technology).
              </p>
            </div>

            {/* Email Dispatched Alert */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-left flex items-start gap-3 shadow-sm">
              <div className="p-2 bg-sky-100 rounded-xl text-sky-700 shrink-0 mt-0.5">
                <Mail className="w-5 h-5" />
              </div>
              <div className="flex-1 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sky-950 text-sm">
                    Confirmation &amp; Voucher Acknowledgment Dispatched!
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(true)}
                    className="text-sky-700 hover:text-sky-900 font-bold underline cursor-pointer"
                  >
                    Preview Email &rarr;
                  </button>
                </div>
                <p className="text-sky-800 leading-relaxed">
                  A verification receipt and application copy has been emailed to{' '}
                  <strong className="text-sky-950">{personal.email}</strong>. Please check your inbox and spam folder.
                </p>
              </div>
            </div>

            {/* Details Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="font-bold text-slate-500 uppercase tracking-wider text-[11px]">
                  Application Reference:
                </span>
                <span className="text-lg font-black font-mono text-fuchsia-700">
                  {submittedApp.applicationNumber}
                </span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Access Code Redeemed:</span>
                <span className="font-mono font-bold text-slate-900 uppercase">{accessCode}</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Programme Applied:</span>
                <span className="font-bold text-slate-900 text-right">{selectedCourse?.name}</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Intake &amp; Semester:</span>
                <span className="font-semibold text-slate-900">{intake} • {semester}</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Applicant IC / Passport:</span>
                <span className="font-mono text-slate-900">{personal.idNumber || 'Verified on file'}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-slate-500 font-medium">Current Status:</span>
                <span className="font-bold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full text-[11px]">
                  Under Admissions Office Verification
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-950 hover:bg-fuchsia-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
              >
                <Printer className="w-4 h-4" />
                Print / Download Application Form
              </button>

              <Link
                href={`/apply/track?ref=${submittedApp.applicationNumber}&email=${encodeURIComponent(personal.email)}`}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md"
              >
                Track Application Status <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/"
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-700 font-semibold text-xs border border-slate-300 transition text-center"
              >
                Return to Home
              </Link>
            </div>

          </div>
        </div>

        {/* PRINT MODAL */}
        {showPrintModal && (
          <ApplicationPrintForm
            application={submittedApp}
            onClose={() => setShowPrintModal(false)}
          />
        )}

        {/* EMAIL PREVIEW MODAL */}
        {showEmailModal && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 text-left">
              <div className="bg-slate-950 px-6 py-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-xs">
                  <Mail className="w-4 h-4 text-fuchsia-400" />
                  <span>LUNGICEST • Automated Admissions Dispatch</span>
                </div>
                <button
                  type="button"
                  onClick={() => setShowEmailModal(false)}
                  className="text-white hover:text-slate-300 text-xs font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="p-6 space-y-4 text-xs text-slate-700">
                <div className="border-b border-slate-200 pb-3 space-y-1 text-[11px] text-slate-500">
                  <div><strong>From:</strong> Admissions Directorate &lt;admissions@lungicest.edu.sl&gt;</div>
                  <div><strong>To:</strong> {personal.fullName} &lt;{personal.email}&gt;</div>
                  <div><strong>Date:</strong> {new Date().toUTCString()}</div>
                  <div><strong>Subject:</strong> LUNGICEST Admission Application Received — Ref: {submittedApp.applicationNumber}</div>
                </div>

                <div className="space-y-3 leading-relaxed">
                  <p>Dear {personal.fullName},</p>
                  <p>
                    Thank you for applying for admission to <strong>Lungi College of Education, Science &amp; Technology (LUNGICEST)</strong>.
                  </p>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 font-mono text-[11px] space-y-1">
                    <div><strong>Application Reference:</strong> {submittedApp.applicationNumber}</div>
                    <div><strong>Access Code Redeemed:</strong> {accessCode}</div>
                    <div><strong>Selected Programme:</strong> {selectedCourse?.name}</div>
                    <div><strong>Intake:</strong> {intake} ({semester})</div>
                  </div>
                  <p>
                    Your academic records, WAEC scratch card details, and uploaded certificates have been routed to the Registrar and Faculty Programme Leaders for evaluation. You can check your application status at any time on the tracking portal.
                  </p>
                  <p className="text-[11px] text-slate-500 pt-2 border-t border-slate-100">
                    Warm regards,<br />
                    <strong>Admissions Directorate</strong><br />
                    Lungi College of Education, Science &amp; Technology (LUNGICEST), Sierra Leone
                  </p>
                </div>

                <div className="pt-2 text-right">
                  <button
                    type="button"
                    onClick={() => setShowEmailModal(false)}
                    className="px-5 py-2 bg-slate-950 text-white rounded-xl text-xs font-bold hover:bg-fuchsia-700 transition"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 2. MAIN APPLICATION PAGE (GATE OR FULL FORM)
  // ────────────────────────────────────────────────────────────────────────────
  const selectedCourseObj = LUCT_COURSES.find((c) => c.id === courseId);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-24 relative overflow-hidden">
      
      {/* Subtle ambient blur decorations */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-b from-fuchsia-100/60 via-indigo-50/40 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Header */}
      <header className="border-b border-slate-200/80 bg-white/70 backdrop-blur-xl sticky top-0 z-40">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-1 shadow-sm transition group-hover:scale-105">
              <Image
                src="/logo.png"
                alt="LUNGICEST Crest"
                width={44}
                height={44}
                className="h-full w-full object-contain"
                priority
              />
            </span>
            <span className="hidden sm:block leading-tight">
              <span className="block text-sm font-extrabold tracking-tight text-slate-950 font-display">
                LUNGICEST
              </span>
              <span className="block text-[0.58rem] font-semibold tracking-wider uppercase text-slate-500">
                Lungi Main Campus • Sierra Leone
              </span>
            </span>
          </Link>
          <div className="flex items-center gap-4 text-xs">
            <Link href="/apply/track" className="font-semibold text-slate-600 hover:text-fuchsia-700 transition">
              Track application
            </Link>
            <Link href="/" className="font-medium text-slate-500 hover:text-slate-950 transition">
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Title */}
      <div className="mx-auto max-w-3xl px-6 pt-10 pb-6 text-left">
        <p className="text-[0.65rem] font-black tracking-[0.22em] text-fuchsia-700 uppercase">
          Admissions
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
          Apply for admission
        </h1>
        <p className="mt-1.5 text-sm text-slate-600">
          Fill out the form below to apply. We’ll review your application and email you a decision.
        </p>
      </div>

      <div className="mx-auto max-w-3xl px-6">
        
        {/* ──────────────────────────────────────────────────────────────────────── */}
        {/* GATE CARD (Shown when not yet passed)                                   */}
        {/* ──────────────────────────────────────────────────────────────────────── */}
        {!isGatePassed ? (
          <div className="max-w-md bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_12px_40px_rgba(15,23,42,0.06)] space-y-5">
            <div className="flex items-center gap-2 text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
              <CheckCircle2 className="size-4 text-slate-400" />
              <span>Enter your access code</span>
            </div>

            <div className="space-y-3 text-xs leading-relaxed text-slate-600">
              <p>
                Pay the <strong className="text-slate-900">{BANK_PAYMENT_DETAILS.feeText}</strong> at{' '}
                {BANK_PAYMENT_DETAILS.branchInfo}, using the account details below. Then bring your deposit slip to the Finance Office - they&apos;ll verify it and give you an access code (also emailed to you) to open the application form below.
              </p>

              {/* Bank DL table matching target site */}
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-800">
                <dt className="font-bold text-slate-600">Account Name</dt>
                <dd className="font-medium text-slate-900">{BANK_PAYMENT_DETAILS.accountName}</dd>
                <dt className="font-bold text-slate-600">Bank Name</dt>
                <dd className="font-medium text-slate-900">{BANK_PAYMENT_DETAILS.bankName}</dd>
                <dt className="font-bold text-slate-600">Account No (SLE)</dt>
                <dd className="font-mono font-bold text-slate-950">{BANK_PAYMENT_DETAILS.accountNumber}</dd>
              </dl>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify();
              }}
              className="space-y-4 pt-1"
            >
              <div className="space-y-1.5">
                <label htmlFor="code" className="block text-xs font-bold text-slate-700">
                  Access code
                </label>
                <input
                  id="code"
                  type="text"
                  required
                  maxLength={20}
                  placeholder="e.g. 7K4P9QXR"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm font-mono text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-fuchsia-600 focus:ring-3 focus:ring-fuchsia-600/10 uppercase shadow-xs transition"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={accessEmail}
                  onChange={(e) => setAccessEmail(e.target.value)}
                  className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-fuchsia-600 focus:ring-3 focus:ring-fuchsia-600/10 shadow-xs transition"
                />
              </div>

              {gateError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{gateError}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isVerifying}
                className="w-full h-11 rounded-xl bg-slate-950 hover:bg-fuchsia-700 disabled:opacity-50 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-md cursor-pointer"
              >
                {isVerifying ? 'Checking...' : 'Continue'}
              </button>
            </form>

            {/* Quick Demo Code helper for convenience */}
            <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1.5">
              <span className="font-semibold block text-slate-600">Quick Test Access Codes:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_ACCESS_CODES.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setAccessCode(item.code);
                      setAccessEmail(item.email);
                      handleVerify(item.code, item.email);
                    }}
                    className="font-mono text-fuchsia-700 bg-fuchsia-50 hover:bg-fuchsia-100 border border-fuchsia-200 px-2 py-1 rounded-md text-[10px] font-bold transition"
                  >
                    {item.code}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ──────────────────────────────────────────────────────────────────────── */
          /* FULL ONLINE APPLICATION FORM                                             */
          /* ──────────────────────────────────────────────────────────────────────── */
          <form onSubmit={handleSubmitApplication} className="max-w-2xl space-y-6">
            
            {/* Access Code Verified Banner */}
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-center justify-between shadow-xs">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>
                  Access code <strong className="font-mono uppercase">{accessCode}</strong> verified &amp; unlocked for <strong>{accessEmail}</strong>.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsGatePassed(false)}
                className="text-emerald-800 hover:text-emerald-950 text-[11px] font-bold underline"
              >
                Change code
              </button>
            </div>

            {/* ── CARD 1: Programme Details ── */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                <FileText className="size-4 text-slate-400" />
                <span>Programme details</span>
              </div>

              <div className="space-y-4 text-xs">
                {/* Course Select */}
                <div className="space-y-1.5">
                  <label htmlFor="courseId" className="font-bold text-slate-700 block">
                    Course *
                  </label>
                  <select
                    id="courseId"
                    value={courseId}
                    onChange={(e) => setCourseId(e.target.value)}
                    className="w-full h-11 rounded-xl border border-slate-300 bg-white px-3 text-xs font-semibold text-slate-900 focus:outline-none focus:border-fuchsia-600 focus:ring-2 focus:ring-fuchsia-600/10 shadow-xs"
                  >
                    <optgroup label="Undergraduate Honours Degrees (48 Months)">
                      {LUCT_COURSES.filter((c) => c.level === 'UNDERGRADUATE').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.programmeCode})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Professional Diplomas (36 Months)">
                      {LUCT_COURSES.filter((c) => c.level === 'DIPLOMA').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.programmeCode || 'Diploma'})
                        </option>
                      ))}
                    </optgroup>
                    <optgroup label="Foundation Certificates (12 Months)">
                      {LUCT_COURSES.filter((c) => c.level === 'CERTIFICATE').map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.programmeCode || 'Certificate'})
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>

                {/* Course Metadata pill */}
                {selectedCourseObj && (
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <p className="font-semibold text-slate-900">{selectedCourseObj.name}</p>
                    <p className="line-clamp-2 text-slate-500">{selectedCourseObj.description}</p>
                    <div className="flex flex-wrap gap-3 pt-1 text-[10px] text-slate-500 font-medium">
                      <span>• Faculty: {selectedCourseObj.department.name}</span>
                      <span>• Duration: {selectedCourseObj.durationMonths} months</span>
                      {selectedCourseObj.tuitionFeePerSemester && (
                        <span>• Tuition: Le{selectedCourseObj.tuitionFeePerSemester.toLocaleString()} / sem</span>
                      )}
                    </div>
                  </div>
                )}

                {/* CIT Progression Selector */}
                {courseId === 'seed-course-cit' && (
                  <div className="space-y-1.5 p-3.5 bg-fuchsia-50/70 border border-fuchsia-200 rounded-xl">
                    <label htmlFor="citProgressionCourseId" className="font-bold text-fuchsia-950 block">
                      Programme you intend to progress into after CIT
                    </label>
                    <select
                      id="citProgressionCourseId"
                      value={citProgressionCourseId}
                      onChange={(e) => setCitProgressionCourseId(e.target.value)}
                      className="w-full h-10 rounded-lg border border-fuchsia-300 bg-white px-3 text-xs text-slate-900 font-medium focus:outline-none focus:border-fuchsia-600"
                    >
                      {CIT_PROGRESSION_COURSES.map((prog) => (
                        <option key={prog.id} value={prog.id}>
                          {prog.name}
                        </option>
                      ))}
                    </select>
                    <p className="text-[11px] text-fuchsia-900">
                      Science background: Software Engineering with Multimedia or another IT programme. Commercial/Arts background: another IT programme.
                    </p>
                  </div>
                )}

                {/* Semester & Intake */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="semester" className="font-bold text-slate-700 block">
                      Semester
                    </label>
                    <input
                      id="semester"
                      type="text"
                      value={semester}
                      onChange={(e) => setSemester(e.target.value)}
                      placeholder="e.g. Semester 1"
                      className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="intake" className="font-bold text-slate-700 block">
                      Intake
                    </label>
                    <input
                      id="intake"
                      type="text"
                      value={intake}
                      onChange={(e) => setIntake(e.target.value)}
                      placeholder="e.g. September 2026"
                      className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                    />
                  </div>
                </div>

                {/* How heard about us */}
                <div className="space-y-1.5">
                  <label htmlFor="howHeardAboutUs" className="font-bold text-slate-700 block">
                    How did you hear about us?
                  </label>
                  <select
                    id="howHeardAboutUs"
                    value={howHeardAboutUs}
                    onChange={(e) => setHowHeardAboutUs(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  >
                    <option value="ADVERTISEMENT">Advertisement</option>
                    <option value="OPEN_DAY">Open day</option>
                    <option value="WALK_IN">Walk-in</option>
                    <option value="EDUCATION_FAIR">Education fair</option>
                    <option value="FRIENDS">Introduced by friends</option>
                    <option value="TELEMARKETING">Telemarketing</option>
                    <option value="OTHER">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ── CARD 2: Personal Information ── */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                <User className="size-4 text-slate-400" />
                <span>Personal information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="fullName" className="font-bold text-slate-700 block">
                    Name (as per IC/Passport) *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    placeholder="e.g. Ibrahim S. Bangura"
                    value={personal.fullName}
                    onChange={(e) => setPersonal({ ...personal, fullName: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="idNumber" className="font-bold text-slate-700 block">
                    IC / Passport No. *
                  </label>
                  <input
                    id="idNumber"
                    type="text"
                    required
                    placeholder="e.g. SL-NID-884920"
                    value={personal.idNumber}
                    onChange={(e) => setPersonal({ ...personal, idNumber: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="placeOfBirth" className="font-bold text-slate-700 block">
                    Place of birth
                  </label>
                  <input
                    id="placeOfBirth"
                    type="text"
                    placeholder="Village/Town, District, Region"
                    value={personal.placeOfBirth}
                    onChange={(e) => setPersonal({ ...personal, placeOfBirth: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="dateOfBirth" className="font-bold text-slate-700 block">
                    Date of birth *
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    required
                    value={personal.dateOfBirth}
                    onChange={(e) => setPersonal({ ...personal, dateOfBirth: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="gender" className="font-bold text-slate-700 block">
                    Gender *
                  </label>
                  <select
                    id="gender"
                    value={personal.gender}
                    onChange={(e) => setPersonal({ ...personal, gender: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  >
                    <option value="MALE">Male</option>
                    <option value="FEMALE">Female</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="maritalStatus" className="font-bold text-slate-700 block">
                    Marital status
                  </label>
                  <select
                    id="maritalStatus"
                    value={personal.maritalStatus}
                    onChange={(e) => setPersonal({ ...personal, maritalStatus: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  >
                    <option value="SINGLE">Single</option>
                    <option value="MARRIED">Married</option>
                    <option value="DIVORCED">Divorced</option>
                    <option value="WIDOWED">Widow/widower</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="nationality" className="font-bold text-slate-700 block">
                    Nationality *
                  </label>
                  <input
                    id="nationality"
                    type="text"
                    required
                    value={personal.nationality}
                    onChange={(e) => setPersonal({ ...personal, nationality: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="religion" className="font-bold text-slate-700 block">
                    Religion (optional)
                  </label>
                  <input
                    id="religion"
                    type="text"
                    value={personal.religion}
                    onChange={(e) => setPersonal({ ...personal, religion: e.target.value })}
                    placeholder="e.g. Christian, Muslim"
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="phone" className="font-bold text-slate-700 block">
                    Telephone No. *
                  </label>
                  <input
                    id="phone"
                    type="text"
                    required
                    value={personal.phone}
                    onChange={(e) => setPersonal({ ...personal, phone: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="address" className="font-bold text-slate-700 block">
                    Current address *
                  </label>
                  <input
                    id="address"
                    type="text"
                    required
                    value={personal.address}
                    onChange={(e) => setPersonal({ ...personal, address: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="permanentAddress" className="font-bold text-slate-700 block">
                    Permanent home address (optional)
                  </label>
                  <input
                    id="permanentAddress"
                    type="text"
                    value={personal.permanentAddress}
                    onChange={(e) => setPersonal({ ...personal, permanentAddress: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="poBox" className="font-bold text-slate-700 block">
                    P.O. Box (optional)
                  </label>
                  <input
                    id="poBox"
                    type="text"
                    value={personal.poBox}
                    onChange={(e) => setPersonal({ ...personal, poBox: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* ── CARD 3: Parent / Guardian Information ── */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                <Users className="size-4 text-slate-400" />
                <span>Parent / guardian information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <label htmlFor="guardianName" className="font-bold text-slate-700 block">
                    Parent / guardian name *
                  </label>
                  <input
                    id="guardianName"
                    type="text"
                    required
                    maxLength={200}
                    value={guardian.guardianName}
                    onChange={(e) => setGuardian({ ...guardian, guardianName: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="guardianRelationship" className="font-bold text-slate-700 block">
                    Relationship (optional)
                  </label>
                  <input
                    id="guardianRelationship"
                    type="text"
                    placeholder="Father, Mother, Guardian..."
                    value={guardian.guardianRelationship}
                    onChange={(e) => setGuardian({ ...guardian, guardianRelationship: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="guardianPhone" className="font-bold text-slate-700 block">
                    Mobile No. *
                  </label>
                  <input
                    id="guardianPhone"
                    type="text"
                    required
                    value={guardian.guardianPhone}
                    onChange={(e) => setGuardian({ ...guardian, guardianPhone: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="guardianEmail" className="font-bold text-slate-700 block">
                    Email (optional)
                  </label>
                  <input
                    id="guardianEmail"
                    type="email"
                    value={guardian.guardianEmail}
                    onChange={(e) => setGuardian({ ...guardian, guardianEmail: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label htmlFor="guardianOccupation" className="font-bold text-slate-700 block">
                    Occupation (optional)
                  </label>
                  <input
                    id="guardianOccupation"
                    type="text"
                    value={guardian.guardianOccupation}
                    onChange={(e) => setGuardian({ ...guardian, guardianOccupation: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* ── CARD 4: Emergency Contact Details ── */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                <Users className="size-4 text-slate-400" />
                <span>Emergency contact details</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                <div className="space-y-1.5 sm:col-span-1">
                  <label htmlFor="emergencyContactName" className="font-bold text-slate-700 block">
                    Contact name *
                  </label>
                  <input
                    id="emergencyContactName"
                    type="text"
                    required
                    value={emergency.emergencyContactName}
                    onChange={(e) => setEmergency({ ...emergency, emergencyContactName: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <label htmlFor="emergencyContactPhone" className="font-bold text-slate-700 block">
                    Mobile No. *
                  </label>
                  <input
                    id="emergencyContactPhone"
                    type="text"
                    required
                    value={emergency.emergencyContactPhone}
                    onChange={(e) => setEmergency({ ...emergency, emergencyContactPhone: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-1">
                  <label htmlFor="emergencyContactEmail" className="font-bold text-slate-700 block">
                    Email (optional)
                  </label>
                  <input
                    id="emergencyContactEmail"
                    type="email"
                    value={emergency.emergencyContactEmail}
                    onChange={(e) => setEmergency({ ...emergency, emergencyContactEmail: e.target.value })}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* ── CARD 5: Academic / Professional Qualifications ── */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                <GraduationCap className="size-4 text-slate-400" />
                <span>Academic / professional qualifications</span>
              </div>

              {/* Qualifications Obtained Table */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-700 text-xs">
                    Qualifications obtained
                  </label>
                  <button
                    type="button"
                    onClick={handleAddQualification}
                    className="inline-flex items-center gap-1 text-xs font-bold text-fuchsia-700 hover:text-fuchsia-800 bg-fuchsia-50 border border-fuchsia-200 px-2.5 py-1 rounded-lg transition"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add row
                  </button>
                </div>

                <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                      <tr>
                        <th className="px-3 py-2.5">Name of School</th>
                        <th className="px-3 py-2.5">Name of Examination</th>
                        <th className="px-3 py-2.5">Date of Examination</th>
                        <th className="px-3 py-2.5">Result</th>
                        <th className="w-10 px-2 py-2.5 text-center"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {qualifications.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/50 transition">
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.schoolName}
                              onChange={(e) => handleUpdateQualification(idx, 'schoolName', e.target.value)}
                              placeholder="e.g. Prince of Wales"
                              className="w-full h-8 px-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.examName}
                              onChange={(e) => handleUpdateQualification(idx, 'examName', e.target.value)}
                              placeholder="e.g. WASSCE"
                              className="w-full h-8 px-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.examDate}
                              onChange={(e) => handleUpdateQualification(idx, 'examDate', e.target.value)}
                              placeholder="e.g. June 2025"
                              className="w-full h-8 px-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600"
                            />
                          </td>
                          <td className="p-2">
                            <input
                              type="text"
                              value={row.result}
                              onChange={(e) => handleUpdateQualification(idx, 'result', e.target.value)}
                              placeholder="e.g. 5 Credits"
                              className="w-full h-8 px-2 rounded-lg border border-slate-200 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600"
                            />
                          </td>
                          <td className="p-2 text-center">
                            {qualifications.length > 1 && (
                              <button
                                type="button"
                                onClick={() => handleRemoveQualification(idx)}
                                className="text-slate-400 hover:text-rose-600 transition p-1"
                                title="Remove row"
                              >
                                <Trash2 className="size-4" />
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* WAEC Checker Details */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                <div className="space-y-1.5">
                  <label htmlFor="wassceIndexNumber" className="font-bold text-slate-700 block">
                    WASSCE index number (optional)
                  </label>
                  <input
                    id="wassceIndexNumber"
                    type="text"
                    value={wassceIndexNumber}
                    onChange={(e) => setWassceIndexNumber(e.target.value)}
                    placeholder="e.g. 4123456789"
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                  <p className="text-[10px] text-slate-500 leading-tight">
                    Used by Marketing to verify your result on the WAEC results checker before your interview is scheduled.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="waecPin" className="font-bold text-slate-700 block">
                    WAEC PIN (optional)
                  </label>
                  <input
                    id="waecPin"
                    type="text"
                    value={waecPin}
                    onChange={(e) => setWaecPin(e.target.value)}
                    placeholder="e.g. 892019284712"
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="waecSerialNumber" className="font-bold text-slate-700 block">
                    WAEC Serial Number (optional)
                  </label>
                  <input
                    id="waecSerialNumber"
                    type="text"
                    value={waecSerialNumber}
                    onChange={(e) => setWaecSerialNumber(e.target.value)}
                    placeholder="e.g. WG2025-901824"
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                  />
                </div>
              </div>

              {/* English language qualification */}
              <div className="space-y-1.5 text-xs pt-1">
                <label htmlFor="english" className="font-bold text-slate-700 block">
                  English language qualifications (optional, e.g. IELTS or TOEFL)
                </label>
                <input
                  id="english"
                  type="text"
                  value={english}
                  onChange={(e) => setEnglish(e.target.value)}
                  placeholder="e.g. IELTS 6.5 or WASSCE Grade C4"
                  className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                />
              </div>

              {/* Advanced Standing Checkbox */}
              <div className="pt-2 border-t border-slate-100 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={claimsAdvancedStanding}
                    onChange={(e) => setClaimsAdvancedStanding(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
                  />
                  <span className="font-normal text-slate-800">
                    I&apos;m applying with prior credit or qualifications from another institution (Advanced Standing / credit transfer).
                  </span>
                </label>
                {claimsAdvancedStanding && (
                  <p className="pl-6 text-[11px] text-slate-500">
                    If this applies to you, upload your transcripts from the prior institution together with your other documents below.
                  </p>
                )}
              </div>

              {/* Progression Checkbox */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    checked={claimsProgression}
                    onChange={(e) => setClaimsProgression(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
                  />
                  <span className="font-normal text-slate-800">
                    I have completed a prior LUNGICEST programme and am applying to progress to the next one.
                  </span>
                </label>

                {claimsProgression && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-6 pt-1 text-xs">
                    <div className="space-y-1.5">
                      <label htmlFor="progressionProgramme" className="font-bold text-slate-700 block">
                        Programme completed previously at LUNGICEST
                      </label>
                      <input
                        id="progressionProgramme"
                        type="text"
                        value={progressionProgramme}
                        onChange={(e) => setProgressionProgramme(e.target.value)}
                        placeholder="e.g. Diploma in Information Technology"
                        className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="progressionStudentNumber" className="font-bold text-slate-700 block">
                        Previous student ID / registration number
                      </label>
                      <input
                        id="progressionStudentNumber"
                        type="text"
                        value={progressionStudentNumber}
                        onChange={(e) => setProgressionStudentNumber(e.target.value)}
                        placeholder="e.g. 10023456"
                        className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* ── CARD 6: Medical Details ── */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                <HeartPulse className="size-4 text-slate-400" />
                <span>Medical details</span>
              </div>

              <div className="space-y-3 text-xs">
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasMedicalCondition}
                    onChange={(e) => setHasMedicalCondition(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
                  />
                  <span className="font-normal text-slate-800">
                    I have a disability, impairment or long-term medical condition that may affect my study.
                  </span>
                </label>

                {hasMedicalCondition && (
                  <div className="space-y-1.5 pl-6 pt-1">
                    <label htmlFor="medicalConditionDetails" className="font-bold text-slate-700 block">
                      Please provide details
                    </label>
                    <textarea
                      id="medicalConditionDetails"
                      rows={3}
                      value={medicalConditionDetails}
                      onChange={(e) => setMedicalConditionDetails(e.target.value)}
                      placeholder="Describe any conditions, accessibility needs or medical support required..."
                      className="w-full rounded-xl border border-slate-300 bg-white p-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
                    />
                    <p className="text-[10px] text-slate-500">
                      For international students, visa applications may be denied if medical issues are found undisclosed.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* ── CARD 7: Passport-size Photograph ── */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                <Camera className="size-4 text-slate-400" />
                <span>Passport-size photograph</span>
              </div>

              <p className="text-xs text-slate-600">
                A recent passport-size photo of yourself (required), used on your student ID and admission letter.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-5 pt-1">
                {/* Image preview box */}
                <div className="relative w-28 h-32 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 overflow-hidden flex items-center justify-center shadow-xs shrink-0">
                  {passportPhoto ? (
                    <Image
                      src={passportPhoto}
                      alt="Passport preview"
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <User className="w-10 h-10 text-slate-400" />
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  <input
                    ref={photoInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => photoInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>{passportPhoto ? 'Change photo' : 'Upload photo'}</span>
                    </button>
                    {passportPhoto && (
                      <button
                        type="button"
                        onClick={() => {
                          setPassportPhoto('');
                          setPassportPhotoName('');
                        }}
                        className="px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 transition font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500">
                    JPG or PNG format. Clear white/light background recommended.
                  </p>
                  {passportPhotoName && (
                    <p className="text-[10px] font-mono text-emerald-700 flex items-center gap-1">
                      <Check className="w-3 h-3" /> {passportPhotoName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* ── CARD 8: Supporting Documents ── */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                <Paperclip className="size-4 text-slate-400" />
                <span>Supporting documents</span>
              </div>

              <p className="text-xs text-slate-600">
                Certified copies of results, proof of English proficiency, a copy of your ID/passport, and (if applicable) your WASSCE scratch card or portfolio.
              </p>

              {/* Upload Drop Area */}
              <div
                onClick={() => docsInputRef.current?.click()}
                className="border-2 border-dashed border-slate-300 hover:border-fuchsia-600 bg-slate-50 hover:bg-fuchsia-50/20 rounded-2xl p-6 text-center cursor-pointer transition space-y-2"
              >
                <input
                  ref={docsInputRef}
                  type="file"
                  multiple
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={handleDocumentUpload}
                  className="hidden"
                />
                <Paperclip className="w-6 h-6 text-slate-400 mx-auto" />
                <div className="text-xs font-semibold text-slate-700">
                  Click to browse and upload supporting documents
                </div>
                <div className="text-[10px] text-slate-500">
                  PDF, JPG, PNG up to 10MB each
                </div>
              </div>

              {/* Uploaded Documents List */}
              {documents.length > 0 && (
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider block">
                    Uploaded Files ({documents.length}):
                  </span>
                  <div className="space-y-1.5">
                    {documents.map((doc, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white text-xs hover:border-slate-300 transition"
                      >
                        <div className="flex items-center gap-2 truncate">
                          <FileText className="w-4 h-4 text-fuchsia-600 shrink-0" />
                          <span className="font-medium text-slate-900 truncate">{doc.name}</span>
                          {doc.fileSize && (
                            <span className="text-[10px] text-slate-500 font-mono">({doc.fileSize})</span>
                          )}
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveDocument(idx)}
                          className="text-slate-400 hover:text-rose-600 p-1 transition"
                          title="Remove file"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── CARD 9: Terms and Conditions ── */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
                <ShieldCheck className="size-4 text-slate-400" />
                <span>Terms and conditions</span>
              </div>

              {/* Scrollable Terms Box */}
              <div className="max-h-56 overflow-y-auto whitespace-pre-wrap rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-[11px] leading-relaxed text-slate-600 font-sans shadow-inner">
                {LUCT_TERMS_AND_CONDITIONS}
              </div>

              {/* Agreement checkbox */}
              <div className="space-y-3 pt-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs">
                  <input
                    type="checkbox"
                    id="agreedToTerms"
                    name="agreedToTerms"
                    required
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-0.5 rounded border-slate-300 text-fuchsia-600 focus:ring-fuchsia-500"
                  />
                  <span className="font-normal text-slate-800 leading-snug">
                    I confirm the information provided is correct and complete, and I have read and agree to the terms and conditions above.
                  </span>
                </label>

                {/* Electronic Signature */}
                <div className="space-y-1.5 pt-1">
                  <label htmlFor="signatureName" className="font-bold text-slate-700 text-xs block">
                    Electronic signature (type your full name) *
                  </label>
                  <input
                    id="signatureName"
                    type="text"
                    required
                    maxLength={200}
                    placeholder="e.g. Ibrahim S. Bangura"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs font-serif"
                  />
                </div>
              </div>
            </div>

            {/* Submission Error Banner */}
            {submitError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0 text-rose-600" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Submit Action Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting || !agreedToTerms}
                className="w-full h-12 rounded-xl bg-slate-950 hover:bg-fuchsia-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit application</span>
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}

export default function ApplyPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center space-y-3">
            <div className="size-8 border-3 border-fuchsia-600/30 border-t-fuchsia-600 rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-slate-600">Loading Application Portal...</p>
          </div>
        </div>
      }
    >
      <ApplyPageContent />
    </Suspense>
  );
}
