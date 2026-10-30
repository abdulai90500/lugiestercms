'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
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
  Printer,
  ChevronRight,
  ArrowLeft,
  Mail,
  Building2,
  Check,
  Download
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { ApplicationRecord } from '@/lib/types';
import ApplicationPrintForm from '@/components/ApplicationPrintForm';

function TrackPageContent() {
  const searchParams = useSearchParams();
  const [refInput, setRefInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [application, setApplication] = useState<any | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState('');
  const [showPrintModal, setShowPrintModal] = useState(false);

  useEffect(() => {
    const refParam = searchParams.get('ref');
    const emailParam = searchParams.get('email');
    if (refParam) {
      setRefInput(refParam);
      if (emailParam) setEmailInput(emailParam);
      performSearch(refParam, emailParam || undefined);
    } else {
      // Load most recent application if available for quick preview
      const apps = AppStore.getApplications();
      if (apps.length > 0) {
        setApplication(apps[0]);
        setRefInput(apps[0].applicationNumber);
        setEmailInput(apps[0].userEmail || apps[0].personalInfo?.email || '');
        setHasSearched(true);
      }
    }
  }, [searchParams]);

  const performSearch = (refTerm: string, emailTerm?: string) => {
    setHasSearched(true);
    setSearchError('');
    const cleanRef = refTerm.trim().toUpperCase();
    const cleanEmail = emailTerm ? emailTerm.trim().toLowerCase() : '';

    const apps = AppStore.getApplications();
    const found = apps.find((a) => {
      const matchNum =
        a.applicationNumber.toUpperCase() === cleanRef ||
        a.codeUsed.toUpperCase() === cleanRef;

      if (!matchNum) return false;
      if (cleanEmail) {
        const appEmail = (a.userEmail || a.personalInfo?.email || '').toLowerCase();
        return appEmail === cleanEmail;
      }
      return true;
    });

    if (found) {
      setApplication(found);
    } else {
      setApplication(null);
      setSearchError(
        `No application found matching reference "${cleanRef}". Please verify your reference number and email address.`
      );
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (refInput.trim()) {
      performSearch(refInput, emailInput);
    }
  };

  const getStatusStage = (status: string) => {
    switch (status) {
      case 'submitted':
        return 1;
      case 'under_review_admissions':
        return 2;
      case 'under_review_hod':
        return 3;
      case 'interview_scheduled':
        return 4;
      case 'admitted':
        return 5;
      default:
        return 1;
    }
  };

  const currentStage = application ? getStatusStage(application.status) : 1;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-24 relative overflow-hidden">
      
      {/* Subtle background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-b from-fuchsia-100/50 via-slate-100/40 to-transparent blur-3xl pointer-events-none -z-10" />

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
            <Link href="/apply" className="font-semibold text-fuchsia-700 hover:text-fuchsia-800 transition">
              Apply for admission
            </Link>
            <Link href="/" className="font-medium text-slate-500 hover:text-slate-950 transition">
              Back to home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Title */}
      <div className="mx-auto max-w-2xl px-6 pt-10 pb-6 text-left">
        <p className="text-[0.65rem] font-black tracking-[0.22em] text-fuchsia-700 uppercase">
          Admissions
        </p>
        <h1 className="mt-2 text-3xl sm:text-4xl font-black tracking-tight text-slate-950">
          Track your application
        </h1>
        <p className="mt-1.5 text-sm text-slate-600">
          Enter your application reference number and the email you applied with to see its current status.
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-6 space-y-6">
        
        {/* Search Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-[0_12px_40px_rgba(15,23,42,0.055)]">
          <form onSubmit={handleSearchSubmit} className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <div className="flex-1 space-y-1.5">
              <label htmlFor="ref" className="block text-xs font-bold text-slate-700">
                Reference number
              </label>
              <input
                id="ref"
                type="text"
                required
                placeholder="APP-2026-00001"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value.toUpperCase())}
                className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs font-mono text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
              />
            </div>

            <div className="flex-1 space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-slate-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="name@example.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="w-full h-10 rounded-xl border border-slate-300 bg-white px-3 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
              />
            </div>

            <button
              type="submit"
              className="h-10 px-5 rounded-xl bg-slate-950 hover:bg-fuchsia-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-sm shrink-0 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Check status</span>
            </button>
          </form>

          {searchError && (
            <div className="mt-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{searchError}</span>
            </div>
          )}
        </div>

        {/* ──────────────────────────────────────────────────────────────────── */}
        {/* RESULT & TIMELINE CARD                                              */}
        {/* ──────────────────────────────────────────────────────────────────── */}
        {application && (
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-md space-y-6">
            
            {/* Top Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 block">
                  Application Reference
                </span>
                <span className="text-xl font-black font-mono text-fuchsia-700">
                  {application.applicationNumber}
                </span>
              </div>
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
                  <Clock className="w-3.5 h-3.5" />
                  <span>
                    {application.status === 'admitted'
                      ? 'Admission Offer Issued'
                      : application.status === 'interview_scheduled'
                      ? 'Interview Scheduled'
                      : 'Under Admissions Verification'}
                  </span>
                </span>
              </div>
            </div>

            {/* Application Overview Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Applicant Name</span>
                <p className="font-bold text-slate-900 text-sm">{application.personalInfo?.fullName}</p>
                <p className="text-[11px] text-slate-500">{application.userEmail || application.personalInfo?.email}</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Selected Programme</span>
                <p className="font-bold text-slate-900 text-sm">
                  {application.firstChoiceProgramme?.name || application.luctFormData?.course?.name}
                </p>
                <p className="text-[11px] text-slate-500">
                  {application.firstChoiceProgramme?.facultyName || 'Academic Faculty'}
                </p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Voucher Code Used</span>
                <p className="font-mono font-bold text-slate-900 uppercase">{application.codeUsed}</p>
                <p className="text-[11px] text-slate-500">Single-use voucher redeemed</p>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Submission Timestamp</span>
                <p className="font-semibold text-slate-900">
                  {new Date(application.submittedAt).toLocaleDateString('en-GB', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </p>
                <p className="text-[11px] text-slate-500">
                  {new Date(application.submittedAt).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>

            {/* Status Timeline */}
            <div className="space-y-4 pt-2">
              <h3 className="font-bold text-slate-900 text-sm">Application Milestones</h3>
              
              <div className="space-y-4">
                {[
                  {
                    step: 1,
                    title: 'Application Received & Registered',
                    desc: 'Your application form has been received and logged in the institutional admissions registry.',
                    date: new Date(application.submittedAt).toLocaleDateString(),
                    active: currentStage >= 1
                  },
                  {
                    step: 2,
                    title: 'Voucher & Payment Verification',
                    desc: 'Finance Office confirmed payment slip and validated single-use application code.',
                    date: 'Completed',
                    active: currentStage >= 2
                  },
                  {
                    step: 3,
                    title: 'Academic & WAEC Checker Authentication',
                    desc: 'Admissions and Marketing verifying uploaded result slip against WAEC scratch card credentials.',
                    date: currentStage >= 3 ? 'In Progress' : 'Pending',
                    active: currentStage >= 3
                  },
                  {
                    step: 4,
                    title: 'Departmental Faculty Review',
                    desc: 'Programme Leader and Faculty Committee reviewing applicant eligibility and quota availability.',
                    date: currentStage >= 4 ? 'Scheduled' : 'Queued',
                    active: currentStage >= 4
                  },
                  {
                    step: 5,
                    title: 'Interview & Official Admission Offer',
                    desc: 'Admission letter generation and enrollment credentials released.',
                    date: currentStage >= 5 ? 'Admitted' : 'Upcoming',
                    active: currentStage >= 5
                  }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-3.5 text-xs">
                    <div
                      className={`size-7 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5 text-[11px] ${
                        item.active
                          ? 'bg-fuchsia-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-400 border border-slate-200'
                      }`}
                    >
                      {item.active ? <Check className="w-3.5 h-3.5" /> : item.step}
                    </div>
                    <div className="flex-1 pb-3 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <span className={`font-bold ${item.active ? 'text-slate-900' : 'text-slate-500'}`}>
                          {item.title}
                        </span>
                        <span className="text-[10px] font-semibold text-slate-400">{item.date}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="px-4 py-2.5 rounded-xl bg-slate-950 hover:bg-fuchsia-700 text-white font-bold text-xs flex items-center gap-2 transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Application Form</span>
              </button>

              <Link
                href="/apply"
                className="text-xs font-semibold text-fuchsia-700 hover:text-fuchsia-900 transition flex items-center gap-1"
              >
                <span>Submit another application</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

          </div>
        )}

      </div>

      {/* PRINT MODAL */}
      {showPrintModal && application && (
        <ApplicationPrintForm
          application={application}
          onClose={() => setShowPrintModal(false)}
        />
      )}

    </div>
  );
}

export default function TrackApplicationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="size-8 border-3 border-fuchsia-600/30 border-t-fuchsia-600 rounded-full animate-spin" />
        </div>
      }
    >
      <TrackPageContent />
    </Suspense>
  );
}
