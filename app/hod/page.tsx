'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Search,
  School,
  ArrowRight,
  UserCheck,
  Eye,
  Printer,
  Download,
  Camera,
  Check
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { ApplicationRecord } from '@/lib/types';
import DocumentViewerModal from '@/components/DocumentViewerModal';
import ApplicationPrintForm from '@/components/ApplicationPrintForm';

export default function HODDashboardPage() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [activeApp, setActiveApp] = useState<ApplicationRecord | null>(null);
  const [hodDecision, setHodDecision] = useState<'approved' | 'correction_required' | 'rejected'>('approved');
  const [comments, setComments] = useState('');
  
  // Document and Print Modals
  const [viewDocType, setViewDocType] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  const refreshData = () => {
    setApplications(AppStore.getApplications());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleSelectApp = (app: ApplicationRecord) => {
    setActiveApp(app);
    setHodDecision(app.hodStatus === 'pending' ? 'approved' : (app.hodStatus as any));
    setComments(app.hodComments || '');
  };

  const handleSaveHODReview = () => {
    if (!activeApp) return;

    let newOverallStatus = activeApp.status;
    if (hodDecision === 'approved') {
      newOverallStatus = 'recommended_admit';
    } else if (hodDecision === 'correction_required') {
      newOverallStatus = 'returned_for_correction';
    } else if (hodDecision === 'rejected') {
      newOverallStatus = 'recommended_reject';
    }

    const updated = AppStore.updateApplicationReview(
      activeApp.id,
      {
        hodStatus: hodDecision,
        hodComments: comments,
        status: newOverallStatus
      },
      'Dr. Samuel Cole (HOD, ICT)'
    );

    if (updated) {
      setActiveApp(updated);
      refreshData();
      alert(`HOD review for ${updated.applicationNumber} recorded.`);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
              Departmental Review
            </span>
            <span className="text-xs text-slate-400">Head of Department (HOD) Portal</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-serif mt-1">
            Departmental Academic Evaluation
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Review applicant qualifications, recommend candidates for admission or interview, and provide remarks.
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-3">
          <School className="w-4 h-4 text-amber-400" />
          <div>
            <div className="text-[11px] text-slate-400">Active Department:</div>
            <div className="font-bold text-white">Faculty of Information & Communication Tech</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Candidates List */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold text-slate-300 uppercase tracking-wider font-mono">
            Department Applicants ({applications.length})
          </h2>

          <div className="space-y-3">
            {applications.map((app) => (
              <div
                key={app.id}
                onClick={() => handleSelectApp(app)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  activeApp?.id === app.id
                    ? 'bg-amber-400/10 border-amber-400 shadow-xl'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-amber-400">{app.applicationNumber}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      app.hodStatus === 'approved'
                        ? 'bg-emerald-950 border-emerald-800 text-emerald-300'
                        : app.hodStatus === 'correction_required'
                        ? 'bg-amber-950 border-amber-800 text-amber-300'
                        : 'bg-slate-950 border-slate-800 text-slate-400'
                    }`}
                  >
                    HOD: {app.hodStatus.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs font-bold text-white truncate">
                  {app.personalInfo.fullName}
                </div>
                <div className="text-[11px] text-slate-400 truncate mt-0.5">
                  {app.firstChoiceProgramme.name}
                </div>
                <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-800/80">
                  <span>WASSCE: {app.academicHistory.wassceIndexNumber}</span>
                  <span className="text-amber-400">Inspect &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Evaluation Board */}
        <div className="lg:col-span-2">
          {activeApp ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {activeApp.applicationNumber}
                  </span>
                  <h3 className="text-xl font-bold text-white font-serif mt-0.5">
                    {activeApp.personalInfo.fullName}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Applying for: <strong>{activeApp.firstChoiceProgramme.name}</strong>
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setShowPrintModal(true)}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-bold flex items-center gap-1.5 transition"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Print Slip</span>
                  </button>
                  <div className="text-right pl-2 border-l border-slate-800">
                    <span className="text-[10px] text-slate-400 block">Admissions Status:</span>
                    <span
                      className={`text-xs font-bold ${
                        activeApp.admissionsVerified ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {activeApp.admissionsVerified ? 'Admissions Verified' : 'Pending Verification'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Candidate Profile with Passport Photo */}
              <div className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs">
                <div className="relative w-20 h-24 rounded-lg overflow-hidden border border-slate-700 bg-slate-900 shrink-0 mx-auto sm:mx-0">
                  <Image
                    src={
                      activeApp.passportPhotoUrl ||
                      activeApp.documents.find(d => d.type === 'passport_photo')?.url ||
                      '/images/IMG-20261026-WA0017.jpg'
                    }
                    alt={activeApp.personalInfo.fullName}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[11px]">Secondary School:</span>
                    <div className="font-semibold text-white">{activeApp.academicHistory.highSchool}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Exam / SWO Type:</span>
                    <div className="font-semibold text-amber-400">
                      {activeApp.academicHistory.examType}
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Candidate Index:</span>
                    <div className="font-mono text-white font-bold">{activeApp.academicHistory.wassceIndexNumber}</div>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[11px]">Graduation Year:</span>
                    <div className="font-semibold text-white">{activeApp.academicHistory.graduationYear}</div>
                  </div>
                </div>
              </div>

              {/* WAEC / SWAEC Scratch Card & Result Slip Card */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-amber-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Candidate Examination Result &amp; Scratch Card Details</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setViewDocType('result_slip')}
                    className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition shadow"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Inspect Uploaded Result Slip</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Scratch Card Serial No:</span>
                    <span className="font-mono font-bold text-white text-sm">
                      {activeApp.academicHistory.waecSerialNumber || 'WG2024-8849201'}
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                    <span className="text-[10px] text-slate-400 block uppercase font-mono">Scratch Card PIN:</span>
                    <span className="font-mono font-bold text-amber-400 text-sm tracking-wider">
                      {activeApp.academicHistory.waecPin || '8492 0184 7291'}
                    </span>
                  </div>
                </div>

                {/* Uploaded Documents Quick Access */}
                <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-800/80 text-[11px]">
                  <span className="text-slate-400">View attachments:</span>
                  {[
                    { key: 'result_slip', label: 'Result Slip (SWO/WASSCE)' },
                    { key: 'passport_photo', label: 'Passport Photo' },
                    { key: 'birth_cert', label: 'Birth Certificate' },
                    { key: 'testimonial', label: 'School Testimonial' }
                  ].map((doc) => (
                    <button
                      key={doc.key}
                      type="button"
                      onClick={() => setViewDocType(doc.key)}
                      className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 hover:text-white hover:border-amber-400/50"
                    >
                      {doc.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* HOD Decision Controls */}
              <div className="space-y-4 pt-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Department Academic Decision
                </label>

                <div className="grid grid-cols-3 gap-3 text-xs">
                  <button
                    type="button"
                    onClick={() => setHodDecision('approved')}
                    className={`p-3.5 rounded-xl border text-center font-bold transition flex flex-col items-center gap-1.5 ${
                      hodDecision === 'approved'
                        ? 'bg-emerald-950/70 border-emerald-400 text-emerald-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Approve Candidate</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHodDecision('correction_required')}
                    className={`p-3.5 rounded-xl border text-center font-bold transition flex flex-col items-center gap-1.5 ${
                      hodDecision === 'correction_required'
                        ? 'bg-amber-950/70 border-amber-400 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span>Request Correction</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setHodDecision('rejected')}
                    className={`p-3.5 rounded-xl border text-center font-bold transition flex flex-col items-center gap-1.5 ${
                      hodDecision === 'rejected'
                        ? 'bg-rose-950/70 border-rose-400 text-rose-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Reject Candidate</span>
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-300 font-semibold text-xs">
                    HOD Remarks & Recommendations
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Enter academic recommendations or specific prerequisites..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleSaveHODReview}
                    className="px-6 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition"
                  >
                    Submit Department Decision
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-12 text-center text-slate-400">
              Select an applicant from the left to begin departmental review.
            </div>
          )}
        </div>
      </div>

      {/* DOCUMENT VIEWER MODAL */}
      {activeApp && viewDocType && (
        <DocumentViewerModal
          isOpen={!!viewDocType}
          onClose={() => setViewDocType(null)}
          documentType={viewDocType}
          application={activeApp}
        />
      )}

      {/* PRINT SLIP MODAL */}
      {activeApp && showPrintModal && (
        <ApplicationPrintForm
          application={activeApp}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
}

