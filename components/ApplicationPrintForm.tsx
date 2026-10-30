'use client';

import React from 'react';
import Image from 'next/image';
import { Printer, Download, X, CheckCircle2, ShieldCheck, FileText, QrCode } from 'lucide-react';
import { ApplicationRecord } from '@/lib/types';
import { INSTITUTION } from '@/lib/data';

interface ApplicationPrintFormProps {
  application: ApplicationRecord;
  onClose?: () => void;
}

export default function ApplicationPrintForm({ application, onClose }: ApplicationPrintFormProps) {
  const handlePrint = () => {
    window.print();
  };

  const passportPhoto = application.passportPhotoUrl ||
    application.documents?.find(d => d.type === 'passport_photo')?.url ||
    '/images/IMG-20261026-WA0017.jpg';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-2 sm:p-6 flex items-center justify-center">
      {/* Container */}
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden my-auto border border-slate-200">
        
        {/* Modal Action Bar (Hidden during print) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-[#142b46] text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <span className="font-bold text-sm tracking-wide">
              Official Application Form Slip • {application.applicationNumber}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition shadow"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Download PDF</span>
            </button>
            {onClose && (
              <button
                onClick={onClose}
                type="button"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Printable Form Content (A4 Letterhead Standard) */}
        <div className="print-area p-8 sm:p-12 space-y-6 bg-white text-slate-900 text-xs">
          
          {/* Header & Crest */}
          <div className="border-b-2 border-[#142b46] pb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 shrink-0">
                <Image
                  src="/images/LOGO.png"
                  alt="LUNGICEST Crest"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide text-[#142b46] font-serif leading-tight">
                  {INSTITUTION.name}
                </h1>
                <p className="text-[11px] font-semibold text-slate-600 tracking-wider uppercase mt-0.5">
                  Affiliated with {INSTITUTION.affiliation} • {INSTITUTION.accreditation}
                </p>
                <p className="text-[10px] text-slate-500 mt-0.5">
                  Lungi Campus, Port Loko District, Sierra Leone • Email: {INSTITUTION.email} • Tel: {INSTITUTION.phone}
                </p>
                <div className="inline-block mt-1.5 px-2.5 py-0.5 bg-[#142b46] text-white font-mono font-bold text-[10px] rounded uppercase tracking-wider">
                  Official Student Admission Application Form — Academic Session 2026/2027
                </div>
              </div>
            </div>

            {/* Passport Photograph Box */}
            <div className="shrink-0 text-center">
              <div className="w-28 h-32 border-2 border-slate-300 rounded-lg overflow-hidden bg-slate-50 shadow-inner relative flex items-center justify-center">
                {passportPhoto ? (
                  <Image
                    src={passportPhoto}
                    alt="Applicant Passport"
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-[10px] text-slate-400 font-semibold p-2">
                    AFFIX RECENT PASSPORT PHOTOGRAPH HERE
                  </span>
                )}
              </div>
              <span className="text-[9px] font-mono text-slate-500 uppercase mt-1 block">
                Official Photo
              </span>
            </div>
          </div>

          {/* Reference Meta Box */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl font-mono text-[11px]">
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Application No:</span>
              <strong className="text-base text-[#142b46] font-extrabold">{application.applicationNumber}</strong>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Voucher Code (Redeemed):</span>
              <strong className="text-emerald-700">{application.codeUsed}</strong>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Submission Date:</span>
              <span className="text-slate-800">
                {application.submittedAt ? new Date(application.submittedAt).toLocaleDateString() : '2026-10-28'}
              </span>
            </div>
            <div>
              <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Verification Status:</span>
              <span className="inline-flex items-center gap-1 font-bold text-[#142b46]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{application.status.toUpperCase()}</span>
              </span>
            </div>
          </div>

          {/* Section 1: Candidate Personal Particulars */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-[#142b46] px-3 py-1 rounded">
              Section 1: Applicant Personal Particulars
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-2 gap-x-4 p-3 border border-slate-200 rounded-lg bg-white">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Full Legal Name:</span>
                <strong className="text-slate-900 text-sm font-serif">{application.personalInfo.fullName}</strong>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Date of Birth:</span>
                <span className="text-slate-800 font-medium">{application.personalInfo.dob}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Gender:</span>
                <span className="text-slate-800 font-medium">{application.personalInfo.gender}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Nationality:</span>
                <span className="text-slate-800 font-medium">{application.personalInfo.nationality}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Telephone Contact:</span>
                <span className="text-slate-800 font-mono font-medium">{application.personalInfo.phone}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Email Address:</span>
                <span className="text-slate-800 font-medium">{application.userEmail || application.personalInfo.email}</span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-[10px] text-slate-500 block uppercase">Residential Address:</span>
                <span className="text-slate-800 font-medium">{application.personalInfo.address}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 block uppercase">Next of Kin:</span>
                <span className="text-slate-800 font-medium">
                  {application.personalInfo.nextOfKinName} ({application.personalInfo.nextOfKinPhone})
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Programme Choices */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-[#142b46] px-3 py-1 rounded">
              Section 2: Programme of Study Selection
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 border border-slate-200 rounded-lg bg-white">
              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-[#142b46] uppercase">First Choice Programme (Primary):</div>
                <div className="font-extrabold text-sm text-slate-900 mt-0.5">
                  {application.firstChoiceProgramme.name}
                </div>
                <div className="text-[10px] text-slate-600 mt-1">
                  Faculty: <strong>{application.firstChoiceProgramme.facultyName}</strong> • Degree: {application.firstChoiceProgramme.degreeType}
                </div>
              </div>

              <div className="p-2.5 rounded bg-slate-50 border border-slate-200">
                <div className="text-[10px] font-bold text-slate-600 uppercase">Second Choice Programme (Alternate):</div>
                <div className="font-bold text-sm text-slate-800 mt-0.5">
                  {application.secondChoiceProgramme?.name || 'Not Specified'}
                </div>
                {application.secondChoiceProgramme && (
                  <div className="text-[10px] text-slate-600 mt-1">
                    Faculty: <strong>{application.secondChoiceProgramme.facultyName}</strong>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Academic Qualifications & Scratch Card Info */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-[#142b46] px-3 py-1 rounded">
              Section 3: Educational Qualifications & Examination Credentials
            </h2>
            <div className="p-3 border border-slate-200 rounded-lg bg-white space-y-3">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px]">
                <div className="sm:col-span-2">
                  <span className="text-[10px] text-slate-500 block uppercase">School / Institute Attended:</span>
                  <strong className="text-slate-900">{application.academicHistory.highSchool}</strong>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Graduation Year:</span>
                  <span className="font-medium text-slate-800">{application.academicHistory.graduationYear}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block uppercase">Exam Type:</span>
                  <span className="font-bold text-[#142b46]">{application.academicHistory.examType}</span>
                </div>
              </div>

              {/* WAEC / SWO Scratch Card Verification Box */}
              <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-amber-900 block">
                    Candidate Index Number:
                  </span>
                  <span className="font-mono font-extrabold text-sm text-slate-900">
                    {application.academicHistory.wassceIndexNumber}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-amber-900 block">
                    WAEC / SWAEC Scratch Card Serial:
                  </span>
                  <span className="font-mono font-extrabold text-sm text-[#142b46]">
                    {application.academicHistory.waecSerialNumber || 'NOT RECORDED'}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-amber-900 block">
                    WAEC / SWAEC Scratch Card PIN:
                  </span>
                  <span className="font-mono font-extrabold text-sm text-slate-900 tracking-wider">
                    {application.academicHistory.waecPin || 'NOT RECORDED'}
                  </span>
                </div>
              </div>

              <div className="text-[11px] text-slate-600 flex items-center justify-between pt-1">
                <span>
                  Result Slip Document Uploaded:{' '}
                  <strong className="text-slate-900 font-mono">
                    {application.academicHistory.resultSlipName ||
                     application.documents.find(d => d.type === 'result_slip' || d.type === 'wassce_slip')?.name ||
                     'WASSCE_SWO_Result_Certified.pdf'}
                  </strong>
                </span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Result Document Stored in Student Registry
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Mandatory Uploaded Documents Checklist */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white bg-[#142b46] px-3 py-1 rounded">
              Section 4: Mandatory Uploaded Documents Audit Checklist
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[10px]">
              {[
                { label: 'Passport Photograph', doc: application.documents.find(d => d.type === 'passport_photo') },
                { label: 'Certified Birth Certificate', doc: application.documents.find(d => d.type === 'birth_cert') },
                { label: 'School Testimonial', doc: application.documents.find(d => d.type === 'testimonial' || d.type === 'recommendation') },
                { label: 'Result Slip / SWO Certificate', doc: application.documents.find(d => d.type === 'result_slip' || d.type === 'wassce_slip') }
              ].map((item, idx) => (
                <div key={idx} className="p-2 border border-slate-200 rounded bg-slate-50 flex items-start gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-800 block">{item.label}</span>
                    <span className="text-slate-500 truncate block max-w-[150px]">
                      {item.doc?.name || 'Verified on file'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Solemn Applicant Declaration */}
          <div className="p-3 border border-slate-300 rounded-lg bg-white space-y-2 text-[10px] leading-relaxed text-slate-700">
            <div className="font-bold text-slate-900 uppercase">Applicant Solemn Declaration:</div>
            <p>
              I hereby declare that all information furnished in this admission application is true, accurate, and complete. 
              I understand that any misrepresentation, forgery of examination results (including WASSCE or SWO result certificates), or submission of falsified documents will result in immediate disqualification, cancellation of admission, forfeiture of all fees paid, and potential prosecution under the laws of Sierra Leone.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-6 border-t border-slate-200 text-center font-mono">
              <div className="border-t border-dashed border-slate-400 pt-1">
                <strong>{application.personalInfo.fullName}</strong>
                <span className="text-[9px] text-slate-500 block uppercase">Candidate Signature & Date</span>
              </div>
              <div className="border-t border-dashed border-slate-400 pt-1">
                <strong>Date: {new Date().toLocaleDateString()}</strong>
                <span className="text-[9px] text-slate-500 block uppercase">Filing Date</span>
              </div>
            </div>
          </div>

          {/* Section 6: Official Registry & Admissions Endorsement */}
          <div className="border-t-2 border-slate-300 pt-3 grid grid-cols-3 gap-4 text-center text-[10px] text-slate-600">
            <div className="border-t border-dashed border-slate-400 pt-1">
              <span className="font-bold text-slate-800 block">Admissions Officer</span>
              <span>Verification Stamp & Signature</span>
            </div>
            <div className="border-t border-dashed border-slate-400 pt-1">
              <span className="font-bold text-slate-800 block">Head of Department (HOD)</span>
              <span>Academic Recommendation</span>
            </div>
            <div className="border-t border-dashed border-slate-400 pt-1">
              <span className="font-bold text-slate-800 block">College Registrar</span>
              <span>Official Institutional Seal</span>
            </div>
          </div>

          {/* Footer note */}
          <div className="text-[9px] text-slate-400 text-center pt-2">
            This document is the official admission application copy generated by LungiCEST Admissions & Student Management System. Please retain a printed copy for presentation during verification and registration.
          </div>

        </div>
      </div>
    </div>
  );
}
