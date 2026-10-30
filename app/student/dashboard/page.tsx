'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  FileText,
  Search,
  CreditCard,
  Award,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Calendar,
  AlertCircle,
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { ApplicationRecord } from '@/lib/types';

export default function StudentDashboardPage() {
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);

  useEffect(() => {
    // Show applications associated with the demo student
    setApplications(AppStore.getApplications());
  }, []);

  const latestApp = applications[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-850 to-slate-900 border border-slate-800 p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30">
                Student Portal
              </span>
              <span className="text-xs text-slate-400 font-mono">Academic Year 2026/2027</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-serif">
              Welcome back, Ibrahim S. Bangura
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Track your admission status, download official letters, review payment receipts, and manage course registrations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/student/apply"
              className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition"
            >
              <FileText className="w-4 h-4" /> Start New Application
            </Link>
            <Link
              href="/student/tracking"
              className="px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
            >
              Track Application
            </Link>
          </div>
        </div>
      </div>

      {/* Main Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Latest Application Overview */}
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white font-serif">
                Active Application Status
              </h2>
            </div>
            {latestApp && (
              <span
                className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${
                  latestApp.status === 'admitted'
                    ? 'bg-emerald-950 border-emerald-800 text-emerald-300'
                    : 'bg-amber-950 border-amber-800 text-amber-300'
                }`}
              >
                {latestApp.status.replace(/_/g, ' ').toUpperCase()}
              </span>
            )}
          </div>

          {latestApp ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px]">Application No.</div>
                  <div className="font-mono font-bold text-amber-400 text-sm mt-0.5">
                    {latestApp.applicationNumber}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Enrolled Programme</div>
                  <div className="font-semibold text-white mt-0.5 truncate">
                    {latestApp.firstChoiceProgramme.name}
                  </div>
                </div>
                <div>
                  <div className="text-slate-400 text-[11px]">Submission Date</div>
                  <div className="text-slate-300 mt-0.5">
                    {new Date(latestApp.submittedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Progress Stepper Mini */}
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-300 font-semibold">
                  <span>Application Progression</span>
                  <span className="text-amber-400 text-[11px]">
                    {latestApp.status === 'admitted'
                      ? '100% Completed'
                      : latestApp.hodStatus === 'approved'
                      ? '75% In Final Board'
                      : '50% Under Department Review'}
                  </span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-amber-400 h-full rounded-full transition-all duration-500"
                    style={{
                      width:
                        latestApp.status === 'admitted'
                          ? '100%'
                          : latestApp.hodStatus === 'approved'
                          ? '75%'
                          : '50%'
                    }}
                  />
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Voucher Validated</span>
                  <span>Form Submitted</span>
                  <span>HOD Review</span>
                  <span>Final Decision</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <Link
                  href={`/student/tracking?ref=${latestApp.applicationNumber}`}
                  className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5"
                >
                  View full history & interviewer notes <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                {latestApp.status === 'admitted' && (
                  <Link
                    href={`/student/admission-letter?app=${latestApp.id}`}
                    className="px-4 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20"
                  >
                    <Award className="w-4 h-4" /> Download Admission Letter
                  </Link>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-xs text-slate-400">No applications found on this account.</p>
              <Link
                href="/student/apply"
                className="inline-block px-4 py-2 rounded-lg bg-amber-400 text-slate-950 font-bold text-xs"
              >
                Start an Application
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions & Finance Summary */}
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-emerald-400" /> Application & Fee Receipts
            </h3>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Application Clearance:</span>
                <span className="text-emerald-400 font-semibold">Verified &amp; Cleared</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Receipt Status:</span>
                <span className="text-emerald-400 font-semibold">Official Receipt Issued</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Voucher Code:</span>
                <span className="font-mono text-slate-300">
                  {latestApp?.codeUsed || 'APP-7K9M-X4PQ-2D6R'}
                </span>
              </div>
            </div>
            <Link
              href="/student/payments"
              className="w-full block text-center py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs border border-slate-700 transition"
            >
              View Official Receipt
            </Link>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-400" /> Academic Portal
            </h3>
            <div className="space-y-2">
              <Link
                href="/student/modules"
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/40 text-xs font-semibold text-white transition group"
              >
                <span className="flex items-center gap-2"><BookOpen className="w-3.5 h-3.5 text-blue-400" /> My Modules</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-blue-400 transition" />
              </Link>
              <Link
                href="/student/timetable"
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-500/40 text-xs font-semibold text-white transition group"
              >
                <span className="flex items-center gap-2"><Calendar className="w-3.5 h-3.5 text-purple-400" /> Weekly Timetable</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition" />
              </Link>
              <Link
                href="/student/results"
                className="w-full flex items-center justify-between py-2.5 px-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/40 text-xs font-semibold text-white transition group"
              >
                <span className="flex items-center gap-2"><Award className="w-3.5 h-3.5 text-emerald-400" /> Exam Results & Transcript</span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
