'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Calendar,
  Award,
  ArrowRight,
  ShieldCheck,
  User,
  ExternalLink,
  ChevronRight,
  Printer,
  Eye,
  Download
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { ApplicationRecord } from '@/lib/types';
import ApplicationPrintForm from '@/components/ApplicationPrintForm';
import DocumentViewerModal from '@/components/DocumentViewerModal';

function TrackingContent() {
  const searchParams = useSearchParams();
  const [searchInput, setSearchInput] = useState('');
  const [application, setApplication] = useState<ApplicationRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [viewDocType, setViewDocType] = useState<string | null>(null);

  useEffect(() => {
    const refParam = searchParams.get('ref');
    if (refParam) {
      setSearchInput(refParam);
      handleLookup(refParam);
    } else {
      // Default to first application for quick preview
      const apps = AppStore.getApplications();
      if (apps.length > 0) {
        setApplication(apps[0]);
        setSearchInput(apps[0].applicationNumber);
        setHasSearched(true);
      }
    }
  }, [searchParams]);

  const handleLookup = (term: string) => {
    setHasSearched(true);
    const clean = term.trim().toUpperCase();
    const apps = AppStore.getApplications();

    // Search by applicationNumber or codeUsed
    const found = apps.find(
      (a) =>
        a.applicationNumber.toUpperCase() === clean ||
        a.codeUsed.toUpperCase() === clean
    );

    setApplication(found || null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      handleLookup(searchInput);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/20">
          Admissions Audit & Tracking Portal
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-serif">
          Track Your Application Progress
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          Monitor your WASSCE verification, HOD review, scheduled interview, and admission letter in real-time.
        </p>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="pt-4 flex gap-2 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="e.g. LCEST-2026-0001 or APP-7K9M-X4PQ-2D6R"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value.toUpperCase())}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm font-mono text-white placeholder-slate-500 focus:outline-none focus:border-amber-400 shadow-inner"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition"
          >
            Track Status
          </button>
        </form>

        {/* Demo suggestions */}
        <div className="text-[11px] text-slate-500 flex flex-wrap items-center justify-center gap-1.5 pt-1">
          <span>Try sample records:</span>
          {['LCEST-2026-0001', 'LCEST-2026-0002', 'LCEST-2026-0003'].map((ref) => (
            <button
              key={ref}
              type="button"
              onClick={() => {
                setSearchInput(ref);
                handleLookup(ref);
              }}
              className="font-mono text-amber-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 hover:border-amber-400/50"
            >
              {ref}
            </button>
          ))}
        </div>
      </div>

      {/* Results View */}
      {application ? (
        <div className="space-y-8">
          {/* Top Banner Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold font-mono text-amber-400">
                  {application.applicationNumber}
                </span>
                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                    application.status === 'admitted'
                      ? 'bg-emerald-950 border-emerald-800 text-emerald-300'
                      : application.status === 'rejected'
                      ? 'bg-rose-950 border-rose-800 text-rose-300'
                      : 'bg-amber-950/80 border-amber-800 text-amber-300'
                  }`}
                >
                  {application.status.replace(/_/g, ' ').toUpperCase()}
                </span>
              </div>
              <p className="text-sm font-semibold text-white">
                {application.personalInfo.fullName} • {application.firstChoiceProgramme.name}
              </p>
              <p className="text-xs text-slate-400">
                Submitted on {new Date(application.submittedAt).toLocaleDateString()} • Single-Use Voucher:{' '}
                <span className="font-mono text-slate-300">{application.codeUsed}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700 shadow"
              >
                <Printer className="w-4 h-4" /> Download Full Form PDF
              </button>

              {application.status === 'admitted' && (
                <Link
                  href={`/student/admission-letter?app=${application.id}`}
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition self-start md:self-auto"
                >
                  <Award className="w-4 h-4" /> Download Official Admission Letter
                </Link>
              )}
            </div>
          </div>

          {/* Stepper Workflow Progress */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl space-y-6">
            <h2 className="text-base font-bold text-white font-serif">
              Admissions Milestone Timeline
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
              {[
                {
                  label: 'Payment Verified',
                  sub: 'Finance Code Issued',
                  status: 'completed',
                  date: 'Step Completed'
                },
                {
                  label: 'Application Lodged',
                  sub: 'Single-Use Locked',
                  status: 'completed',
                  date: new Date(application.submittedAt).toLocaleDateString()
                },
                {
                  label: 'WASSCE Verification',
                  sub: application.admissionsVerified ? 'Verified by Admissions' : 'In Review',
                  status: application.admissionsVerified ? 'completed' : 'current',
                  date: application.admissionsVerified ? 'Verified' : 'Pending'
                },
                {
                  label: 'HOD Department Review',
                  sub:
                    application.hodStatus === 'approved'
                      ? 'Approved by HOD'
                      : application.hodStatus === 'correction_required'
                      ? 'Correction Requested'
                      : 'Under Department Review',
                  status:
                    application.hodStatus === 'approved'
                      ? 'completed'
                      : application.admissionsVerified
                      ? 'current'
                      : 'upcoming',
                  date: application.hodStatus.toUpperCase()
                },
                {
                  label: 'Admission Decision',
                  sub:
                    application.status === 'admitted'
                      ? 'Admitted & Letter Released'
                      : application.status === 'rejected'
                      ? 'Application Unsuccessful'
                      : 'Awaiting Final Board',
                  status:
                    application.status === 'admitted'
                      ? 'completed'
                      : application.status === 'rejected'
                      ? 'failed'
                      : 'upcoming',
                  date: application.status === 'admitted' ? 'Official' : 'Pending'
                }
              ].map((step, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border flex flex-col justify-between ${
                    step.status === 'completed'
                      ? 'bg-emerald-950/20 border-emerald-800/80 text-emerald-300'
                      : step.status === 'current'
                      ? 'bg-amber-950/20 border-amber-600 text-amber-200 ring-1 ring-amber-500/30'
                      : step.status === 'failed'
                      ? 'bg-rose-950/20 border-rose-800 text-rose-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono uppercase tracking-wider font-bold">
                      Stage 0{idx + 1}
                    </span>
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : step.status === 'current' ? (
                      <Clock className="w-4 h-4 text-amber-400 animate-spin" />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-slate-700" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-white mb-1">{step.label}</h3>
                    <p className="text-[11px] text-slate-400">{step.sub}</p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono">
                    {step.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Details Tabs / Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Admissions & HOD Notes Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400" /> Departmental Evaluation Notes
              </h3>

              <div className="space-y-3 text-xs">
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Admissions Office Verification:</span>
                    <span
                      className={`font-semibold ${
                        application.admissionsVerified ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {application.admissionsVerified ? 'Verified & Validated' : 'Pending Verification'}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    {application.admissionsNotes || 'Awaiting examination scratch-card review by admissions officer.'}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-slate-400 text-[11px]">
                    <span>Head of Department (HOD) Status:</span>
                    <span
                      className={`font-semibold ${
                        application.hodStatus === 'approved'
                          ? 'text-emerald-400'
                          : application.hodStatus === 'rejected'
                          ? 'text-rose-400'
                          : 'text-amber-400'
                      }`}
                    >
                      {application.hodStatus.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    {application.hodComments || 'Departmental academic committee evaluation in progress.'}
                  </p>
                </div>

                {application.interviewDetails && (
                  <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-800/60 text-purple-200 space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-purple-300">
                      <Calendar className="w-4 h-4" />
                      <span>Interview Scheduled</span>
                    </div>
                    <div className="text-[11px]">
                      <strong>Date & Time:</strong>{' '}
                      {new Date(application.interviewDetails.scheduledAt).toLocaleString()}
                    </div>
                    <div className="text-[11px]">
                      <strong>Venue:</strong> {application.interviewDetails.venue}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Applicant Summary */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-white text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-blue-400" /> Applicant Record
              </h3>

              <div className="bg-slate-950 rounded-xl border border-slate-800 p-4 divide-y divide-slate-800/80 text-xs">
                <div className="pb-2.5 flex justify-between">
                  <span className="text-slate-400">High School:</span>
                  <span className="text-white font-medium">{application.academicHistory.highSchool}</span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">WASSCE Index:</span>
                  <span className="font-mono text-amber-400 font-semibold">
                    {application.academicHistory.wassceIndexNumber}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">First Choice:</span>
                  <span className="text-white font-medium">
                    {application.firstChoiceProgramme.name}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Exam Type:</span>
                  <span className="text-amber-400 font-semibold">
                    {application.academicHistory.examType}
                  </span>
                </div>
                <div className="py-2.5 flex justify-between">
                  <span className="text-slate-400">Scratch Card:</span>
                  <span className="font-mono text-slate-300">
                    {application.academicHistory.waecSerialNumber || 'WG2024-8849201'}
                  </span>
                </div>
                <div className="pt-2.5 flex justify-between items-center">
                  <span className="text-slate-400">Result Slip:</span>
                  <button
                    type="button"
                    onClick={() => setViewDocType('result_slip')}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 text-[11px] font-semibold flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" /> View Slip
                  </button>
                </div>
              </div>

              {/* Action shortcuts */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowPrintModal(true)}
                  className="flex-1 px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs text-center transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Printer className="w-4 h-4" /> Full Application Form PDF
                </button>
                <Link
                  href="/student/payments"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs text-center border border-slate-700 transition"
                >
                  Payment & Receipt
                </Link>
                {application.status === 'admitted' && (
                  <Link
                    href={`/student/admission-letter?app=${application.id}`}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs text-center transition"
                  >
                    View Letter
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : hasSearched ? (
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="font-bold text-white text-base">No Application Found</h3>
          <p className="text-xs text-slate-400">
            We could not find an application linked to <strong>{searchInput}</strong>. Please confirm your Application Reference Number or Voucher Code.
          </p>
        </div>
      ) : null}

      {/* Modals */}
      {application && showPrintModal && (
        <ApplicationPrintForm
          application={application}
          onClose={() => setShowPrintModal(false)}
        />
      )}

      {application && viewDocType && (
        <DocumentViewerModal
          isOpen={!!viewDocType}
          onClose={() => setViewDocType(null)}
          documentType={viewDocType}
          application={application}
        />
      )}
    </div>
  );
}

export default function TrackingPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-slate-400">Loading tracker...</div>}>
      <TrackingContent />
    </Suspense>
  );
}
