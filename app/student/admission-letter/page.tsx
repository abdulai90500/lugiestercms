'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  Printer,
  ArrowLeft,
  Award,
  CheckCircle2,
  Calendar,
  Building,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { ApplicationRecord } from '@/lib/types';

function LetterContent() {
  const searchParams = useSearchParams();
  const [application, setApplication] = useState<ApplicationRecord | null>(null);

  useEffect(() => {
    const appId = searchParams.get('app');
    const apps = AppStore.getApplications();

    if (appId) {
      const found = apps.find((a) => a.id === appId);
      setApplication(found || apps.find((a) => a.status === 'admitted') || apps[0]);
    } else {
      // Find an admitted application or default to sample
      const admitted = apps.find((a) => a.status === 'admitted');
      setApplication(admitted || apps[0]);
    }
  }, [searchParams]);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  if (!application) {
    return <div className="p-12 text-center text-slate-400">Loading admission letter...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
        <div>
          <Link
            href="/student/tracking"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Application Tracker
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-serif">
            Provisional Admission Letter
          </h1>
          <p className="text-xs text-slate-400">
            Official letter of offer issued by the Academic Registry & Admissions Office.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" /> Print / Save as PDF
        </button>
      </div>

      {/* Official Printable Document */}
      <div
        id="printable-letter"
        className="bg-white text-slate-900 rounded-3xl p-8 sm:p-14 shadow-2xl border border-slate-200 relative overflow-hidden font-serif print:p-0 print:border-none print:shadow-none"
      >
        {/* Crest Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
          <Image
            src="/logo.png"
            alt="University Seal"
            width={450}
            height={450}
            className="object-contain"
          />
        </div>

        {/* Header Letterhead */}
        <div className="text-center border-b-2 border-slate-900 pb-6 relative z-10">
          <div className="w-20 h-20 mx-auto mb-3">
            <Image
              src="/logo.png"
              alt="LungiCEST Crest"
              width={80}
              height={80}
              className="object-contain mx-auto"
            />
          </div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950 uppercase font-display">
            Lungi College of Education Science &amp; Technology
          </h2>
          <p className="text-xs font-bold text-slate-700 tracking-wider">
            LUNGICEST • EDUCATION THAT TRANSFORMS COMMUNITIES • OFFICE OF THE REGISTRAR
          </p>
          <p className="text-[11px] text-slate-600 font-sans mt-0.5">
            Affiliated with Milton Margai Technical University (MMTU) • Accredited by TEC &amp; NCTVA
          </p>
          <p className="text-[11px] text-slate-500 font-sans">
            Lungi, Port Loko District, Sierra Leone • Email: registrar@lungicest.edu.sl • Web: www.lungicest.edu.sl
          </p>
        </div>

        {/* Reference and Date */}
        <div className="py-6 flex justify-between items-start text-xs font-sans relative z-10 border-b border-slate-200">
          <div>
            <div className="font-bold text-slate-900">
              Ref No:{' '}
              <span className="font-mono text-amber-900 font-extrabold">
                {application.admissionDecision?.admissionNumber || 'LCEST/ADM/2026/0142'}
              </span>
            </div>
            <div className="text-slate-600 mt-1">
              App Ref: <span className="font-mono">{application.applicationNumber}</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-slate-500">Date:</div>
            <div className="font-bold text-slate-900">
              {application.admissionDecision?.date
                ? new Date(application.admissionDecision.date).toLocaleDateString()
                : new Date().toLocaleDateString()}
            </div>
          </div>
        </div>

        {/* Addressee */}
        <div className="py-6 space-y-1 text-xs font-sans relative z-10">
          <div className="font-bold text-slate-900 text-sm">
            {application.personalInfo.fullName}
          </div>
          <div className="text-slate-600">{application.personalInfo.address}</div>
          <div className="text-slate-600">{application.personalInfo.phone}</div>
        </div>

        {/* Letter Body */}
        <div className="space-y-4 text-xs font-sans leading-relaxed text-slate-800 relative z-10">
          <div className="font-bold text-slate-950 text-sm border-b border-slate-300 pb-2">
            SUBJECT: PROVISIONAL OFFER OF ADMISSION — ACADEMIC YEAR 2026/2027
          </div>

          <p>
            Dear <strong>{application.personalInfo.fullName}</strong>,
          </p>

          <p>
            On behalf of the Academic Board and the Governing Council of Lungi College of Education Science &amp; Technology (LUNGICEST), I am pleased to offer you provisional admission into the following programme of study:
          </p>

          {/* Programme Box */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-1.5 my-4">
            <div className="text-xs text-slate-500">Admitted Programme of Study:</div>
            <div className="text-base font-extrabold text-slate-950 font-serif">
              {application.firstChoiceProgramme.name}
            </div>
            <div className="text-xs text-slate-600">
              <strong>Faculty:</strong> {application.firstChoiceProgramme.facultyName}
            </div>
            <div className="text-xs text-slate-600">
              <strong>Duration:</strong> {application.firstChoiceProgramme.durationYears} Academic Years
            </div>
            <div className="text-xs text-slate-600">
              <strong>Study Mode:</strong> Full-Time / Modular Academic Schedule
            </div>
          </div>

          <p>
            This offer is contingent upon your formal compliance with the college academic and statutory regulations, including:
          </p>

          <ol className="list-decimal pl-5 space-y-1.5 text-slate-700">
            <li>
              Presentation of the original copy of your <strong>WASSCE Result Slip / Certificate</strong> for final physical verification at the Academic Registry.
            </li>
            <li>
              Submission of a certified Medical Certificate of Fitness and two recent passport photographs.
            </li>
            <li>
              Formal financial clearance and registration with the college accounts office.
            </li>
          </ol>

          <p>
            Please note that this provisional offer will lapse if not accepted within thirty (30) days from the date of this letter.
          </p>

          <p className="pt-2">
            We congratulate you on your academic achievements and look forward to welcoming you into our vibrant campus community in Freetown.
          </p>
        </div>

        {/* Signatures */}
        <div className="pt-10 flex items-end justify-between font-sans relative z-10">
          <div className="space-y-1 text-xs">
            <div className="w-32 h-10 border-b border-slate-900 flex items-center justify-center font-serif italic text-slate-700 font-bold">
              Finda Sesay
            </div>
            <div className="font-bold text-slate-900">Finda Sesay, MSc.</div>
            <div className="text-slate-600 text-[11px]">Academic Registrar & Secretary to Senate</div>
          </div>

          {/* Official Registry Stamp */}
          <div className="w-32 h-32 rounded-full border-4 border-dashed border-amber-800/60 p-2 flex flex-col items-center justify-center text-center text-amber-900 select-none transform rotate-3">
            <span className="text-[9px] font-bold uppercase tracking-wider">OFFICIAL REGISTRY</span>
            <Image src="/logo.png" alt="Stamp" width={28} height={28} className="my-1 opacity-70" />
            <span className="text-[8px] font-mono">SEALED & APPROVED</span>
            <span className="text-[7px]">LUNGI MAIN CAMPUS</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdmissionLetterPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading admission letter...</div>}>
      <LetterContent />
    </Suspense>
  );
}
