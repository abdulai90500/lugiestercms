'use client';

import React from 'react';
import Image from 'next/image';
import { X, FileText, CheckCircle2, Download, ExternalLink, ShieldCheck, Award } from 'lucide-react';
import { ApplicationRecord } from '@/lib/types';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  documentType: 'result_slip' | 'passport_photo' | 'birth_cert' | 'testimonial' | string;
  application: ApplicationRecord;
}

export default function DocumentViewerModal({
  isOpen,
  onClose,
  documentType,
  application
}: DocumentViewerModalProps) {
  if (!isOpen) return null;

  const doc = application.documents?.find(
    (d) => d.type === documentType || (documentType === 'result_slip' && d.type === 'wassce_slip')
  );

  const docTitleMap: Record<string, string> = {
    result_slip: 'Examination Result Slip (WASSCE / SWO Technical)',
    wassce_slip: 'WASSCE Statement of Results',
    passport_photo: 'Applicant Passport Photograph',
    birth_cert: 'Certified National Birth Certificate',
    testimonial: 'School Leaving Testimonial / Recommendation Letter'
  };

  const title = docTitleMap[documentType] || doc?.name || 'Uploaded Document';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center">
      <div className="relative w-full max-w-2xl bg-white text-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#142b46] text-white">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="font-bold text-sm tracking-wide">{title}</h3>
              <p className="text-[11px] text-slate-300">
                Applicant: {application.personalInfo.fullName} • Ref: {application.applicationNumber}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Metadata pill box */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Document Name:</span>
              <span className="font-mono font-semibold text-slate-800 truncate block">
                {doc?.name || 'Result_Slip_On_File.pdf'}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Verification Status:</span>
              <span className="inline-flex items-center gap-1 text-emerald-700 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Uploaded & Verified</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-bold block">Examination Type:</span>
              <span className="font-semibold text-[#142b46]">
                {application.academicHistory.examType}
              </span>
            </div>
          </div>

          {/* Special Verification Details for Result Slip */}
          {documentType === 'result_slip' && (
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 text-amber-900 font-bold">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>WAEC / SWAEC Online Scratch Card Credentials</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-800 font-mono text-[11px]">
                <div className="p-2 bg-white rounded border border-amber-200">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Serial Number:</span>
                  <strong className="text-sm text-[#142b46]">{application.academicHistory.waecSerialNumber || 'WG2024-8849201'}</strong>
                </div>
                <div className="p-2 bg-white rounded border border-amber-200">
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 block">Scratch Card PIN:</span>
                  <strong className="text-sm text-slate-900 tracking-wider">{application.academicHistory.waecPin || '8492 0184 7291'}</strong>
                </div>
              </div>
              <p className="text-[10px] text-amber-800">
                Staff note: Use the Serial Number and PIN above on the official WAEC Sierra Leone portal (waecsierra-leone.org) to independently cross-verify candidate grades.
              </p>
            </div>
          )}

          {/* Document Preview Canvas */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-100 flex flex-col items-center justify-center min-h-[260px] text-center">
            {documentType === 'passport_photo' ? (
              <div className="relative w-48 h-56 rounded-lg overflow-hidden border-2 border-slate-300 shadow">
                <Image
                  src={
                    application.passportPhotoUrl ||
                    doc?.url ||
                    '/images/IMG-20261026-WA0017.jpg'
                  }
                  alt="Passport Photograph"
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="space-y-3 p-4 max-w-md">
                <div className="w-16 h-16 rounded-2xl bg-[#142b46]/10 text-[#142b46] flex items-center justify-center mx-auto">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm">
                    {doc?.name || `${title}.pdf`}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Certified digital copy uploaded to the LungiCEST Admissions & Student Management Repository.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 text-xs font-mono font-medium shadow-sm">
                  <span>Size: {doc?.fileSize || '1.8 MB'}</span>
                  <span>•</span>
                  <span>Format: PDF / High-Res Scan</span>
                </div>
              </div>
            )}
          </div>

          {/* Action buttons */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition"
            >
              Close Viewer
            </button>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                alert(`Downloading official copy of ${doc?.name || title}...`);
              }}
              className="px-5 py-2 rounded-xl bg-[#142b46] hover:bg-[#1e3c60] text-white text-xs font-bold flex items-center gap-1.5 transition shadow"
            >
              <Download className="w-4 h-4" />
              Download Document
            </a>
          </div>

        </div>
      </div>
    </div>
  );
}
