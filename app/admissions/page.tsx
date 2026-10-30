'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  UserCheck,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Award,
  FileText,
  Clock,
  Eye,
  ShieldCheck,
  X,
  Printer,
  Download,
  Camera,
  Check,
  ArrowRight,
  ArrowUpRight,
  KeyRound,
  FileCheck2,
  HelpCircle,
  ChevronDown,
  Building2,
  Lock,
  Layers
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { ApplicationRecord } from '@/lib/types';
import DocumentViewerModal from '@/components/DocumentViewerModal';
import ApplicationPrintForm from '@/components/ApplicationPrintForm';

export default function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState<'guide' | 'review'>('guide');

  // Staff Review State
  const [applications, setApplications] = useState<ApplicationRecord[]>([]);
  const [selectedApp, setSelectedApp] = useState<ApplicationRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Document & Print Modals
  const [viewDocType, setViewDocType] = useState<string | null>(null);
  const [showPrintModal, setShowPrintModal] = useState(false);

  // Review Action Form State
  const [verifiedWassce, setVerifiedWassce] = useState(false);
  const [admissionsNote, setAdmissionsNote] = useState('');
  const [interviewDate, setInterviewDate] = useState('');
  const [interviewVenue, setInterviewVenue] = useState('LUNGICEST Main Campus & Virtual Link');
  const [decisionAction, setDecisionAction] = useState<'admit' | 'reject' | 'schedule_interview' | null>(null);

  // FAQ state
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const refreshData = () => {
    setApplications(AppStore.getApplications());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const openAppDetails = (app: ApplicationRecord) => {
    setSelectedApp(app);
    setVerifiedWassce(app.admissionsVerified);
    setAdmissionsNote(app.admissionsNotes || '');
    setInterviewDate(app.interviewDetails?.scheduledAt || '');
    setInterviewVenue(app.interviewDetails?.venue || 'LUNGICEST Main Campus & Virtual Link');
    setDecisionAction(null);
  };

  const handleSaveVerification = () => {
    if (!selectedApp) return;

    let updatedStatus = selectedApp.status;
    let interviewData = selectedApp.interviewDetails;
    let decisionData = selectedApp.admissionDecision;

    if (decisionAction === 'schedule_interview' && interviewDate) {
      updatedStatus = 'interview_scheduled';
      interviewData = {
        scheduledAt: interviewDate,
        venue: interviewVenue,
        completed: false
      };
    } else if (decisionAction === 'admit') {
      updatedStatus = 'admitted';
      decisionData = {
        status: 'ADMITTED',
        admissionNumber: `LCEST/ADM/2026/${String(Math.floor(Math.random() * 900) + 100)}`,
        programmeName: selectedApp.firstChoiceProgramme.name,
        date: new Date().toISOString(),
        conditions: 'Submission of original certificate and medical fitness clearance.'
      };
    } else if (decisionAction === 'reject') {
      updatedStatus = 'rejected';
    } else if (verifiedWassce && updatedStatus === 'submitted') {
      updatedStatus = 'under_review_hod';
    }

    const updated = AppStore.updateApplicationReview(
      selectedApp.id,
      {
        admissionsVerified: verifiedWassce,
        admissionsNotes: admissionsNote,
        status: updatedStatus,
        interviewDetails: interviewData,
        admissionDecision: decisionData
      },
      'Admissions Officer (Alpha Mansaray)'
    );

    if (updated) {
      refreshData();
      setSelectedApp(null);
    }
  };

  const filteredApps = applications.filter((app) => {
    const matchesFilter = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch =
      app.personalInfo.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.applicationNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.codeUsed.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const faqs = [
    {
      q: 'Do I need a student account to apply?',
      a: 'No. New applicants use an application access code and matching email address. The student login is a separate portal used once admission has been confirmed.'
    },
    {
      q: 'Where do I get an access code?',
      a: 'Finance issues an access code after verifying your Le250 application fee payment at Commerce and Mortgage Bank (11 Charlotte Street) or the in-house branch.'
    },
    {
      q: 'What if my access code does not work?',
      a: 'Check the code and email address carefully. You can also use preset test codes such as 7K4P9QXR or contact Finance to confirm your access details.'
    },
    {
      q: 'Can I transfer from another university?',
      a: 'Yes. In the application form, check the "Advanced Standing / credit transfer" box and upload your academic transcripts from your prior institution.'
    },
    {
      q: 'When will I receive a decision?',
      a: 'Review times depend on verification of your examination results and faculty scheduling. Use the tracking portal (/apply/track) with your reference number to check progress in real time.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pb-20">
      
      {/* Top Bar Switcher between Public Guide and Staff Portal */}
      <div className="bg-slate-950 text-white px-6 py-2.5 border-b border-slate-800">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-fuchsia-400 animate-pulse" />
            <span className="font-semibold text-slate-300">
              LUNGICEST • Admissions &amp; Registry Portal
            </span>
          </div>

          <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              type="button"
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-fuchsia-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Applicant Guide
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('review')}
              className={`px-3 py-1.5 rounded-lg font-bold text-xs transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === 'review'
                  ? 'bg-fuchsia-700 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Staff Review Queue ({applications.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* TAB 1: APPLICANT ADMISSIONS GUIDE (Replicating luct-sl.vercel.app/admissions) */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'guide' && (
        <div>
          {/* Hero Section */}
          <section className="bg-gradient-to-b from-slate-100 via-white to-[#f8fafc] border-b border-slate-200/80 py-12 sm:py-16 px-6 relative overflow-hidden">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-100/80 border border-fuchsia-200 text-fuchsia-900 text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-fuchsia-700" />
                  <span>Sierra Leone Campus • Freetown</span>
                </div>

                <p className="text-xs font-black tracking-[0.2em] text-slate-500 uppercase">
                  Your next chapter starts here
                </p>

                <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-950 leading-tight font-serif">
                  Your ambition.<br />
                  <span className="text-fuchsia-700">A clear next step.</span>
                </h1>

                <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                  From your first enquiry to your submitted application, we’ll help you understand what to prepare, where to go and what happens next.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <Link
                    href="/apply"
                    className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-fuchsia-700 text-white font-bold text-xs flex items-center gap-2 transition shadow-md group"
                  >
                    <span>Start your application</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>

                  <Link
                    href="/apply/track"
                    className="px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-xs border border-slate-300 flex items-center gap-2 transition shadow-xs"
                  >
                    <span>Track application</span>
                    <ArrowUpRight className="w-4 h-4 text-slate-500" />
                  </Link>
                </div>

                <p className="text-xs text-slate-500 pt-1">
                  First-time applicant? You’ll need an access code and the matching email address.
                </p>
              </div>

              {/* Glass Journey Panel */}
              <div className="lg:col-span-5 bg-white/90 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-[0_16px_50px_rgba(15,23,42,0.06)] space-y-5">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    From interest to application
                  </span>
                  <span className="text-[10px] font-bold text-fuchsia-700 bg-fuchsia-50 px-2 py-0.5 rounded border border-fuchsia-200">
                    Simplified
                  </span>
                </div>

                <h2 className="text-lg font-bold text-slate-900">Your journey, simplified.</h2>

                <div className="space-y-4">
                  {[
                    {
                      num: 'Step 01',
                      title: 'Find your direction',
                      desc: 'Choose a programme and confirm your eligibility.'
                    },
                    {
                      num: 'Step 02',
                      title: 'Get ready to apply',
                      desc: 'Verify payment with Finance to receive your access code.'
                    },
                    {
                      num: 'Step 03',
                      title: 'Submit & stay informed',
                      desc: 'Complete your application and keep your reference number.'
                    }
                  ].map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs">
                      <div className="size-8 rounded-xl bg-fuchsia-50 text-fuchsia-700 font-bold flex items-center justify-center shrink-0 border border-fuchsia-200 text-[11px]">
                        0{idx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-400 uppercase block">
                          {step.num}
                        </span>
                        <h3 className="font-bold text-slate-900 text-xs">{step.title}</h3>
                        <p className="text-slate-500 mt-0.5 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="#how-to-apply"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-fuchsia-700 hover:text-fuchsia-900 pt-2 border-t border-slate-100 w-full"
                >
                  <span>See the full application guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          </section>

          {/* How to Apply 6-Step Grid */}
          <section id="how-to-apply" className="max-w-6xl mx-auto px-6 py-14 space-y-8">
            <div>
              <p className="text-xs font-bold text-fuchsia-700 uppercase tracking-widest">
                Step-by-step admissions
              </p>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-950 mt-1">
                How to apply
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  step: 1,
                  title: 'Choose your programme',
                  desc: 'Explore the programme directory, then confirm entry requirements, intake availability and the deadline with the Registrar.'
                },
                {
                  step: 2,
                  title: 'Arrange your access code',
                  desc: 'Follow the payment instructions on the application page. Take your deposit slip to Finance for verification and an application access code.'
                },
                {
                  step: 3,
                  title: 'Open the application form',
                  desc: 'On the application page, enter your access code and the matching email address, then select Continue.'
                },
                {
                  step: 4,
                  title: 'Complete your details',
                  desc: 'Fill in your personal and qualification details, choose your programme, and upload the requested documents and passport photograph.'
                },
                {
                  step: 5,
                  title: 'Review and submit',
                  desc: 'Check your information carefully before submitting. Keep the application reference number for future enquiries.'
                },
                {
                  step: 6,
                  title: 'Track your progress',
                  desc: 'Use Track application with your reference number and email address. Check your email for updates and requests for further information.'
                }
              ].map((card) => (
                <div
                  key={card.step}
                  className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs hover:shadow-md transition space-y-4"
                >
                  <span className="inline-flex size-10 items-center justify-center rounded-2xl bg-amber-300 font-black text-slate-950 text-sm">
                    {card.step}
                  </span>
                  <h3 className="text-base font-bold text-slate-950">{card.title}</h3>
                  <p className="text-xs leading-relaxed text-slate-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Two-Column Info Cards: Before You Begin & Confirm Your Intake */}
          <section className="max-w-6xl mx-auto px-6 py-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs space-y-4">
              <h2 className="text-xl font-bold text-slate-950">Before you begin</h2>
              <div className="text-xs leading-relaxed text-slate-600 space-y-2.5">
                <p>Ensure you have the following items ready before starting your online application:</p>
                <ul className="list-disc space-y-1.5 pl-5 text-slate-700">
                  <li>An active email address you can access anytime</li>
                  <li>Your verified application access code from Finance</li>
                  <li>Personal, contact and guardian / next of kin details</li>
                  <li>Qualification details, WAEC scratch card credentials, and supporting documents</li>
                  <li>A recent passport-size photograph (clear background)</li>
                  <li>Your preferred degree, diploma, or certificate programme</li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 p-7 shadow-xs space-y-4 flex flex-col justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-950">Confirm your intake</h2>
                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  Check eligibility, the application deadline and intake availability with the Registrar. A programme appearing in the directory does not confirm that an intake is currently open.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap gap-3">
                <Link
                  href="/apply"
                  className="px-5 py-3 rounded-xl bg-slate-950 hover:bg-fuchsia-700 text-white font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <span>Start application</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/apply/track"
                  className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center gap-1.5 transition"
                >
                  <span>Track application</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* Common Questions FAQ Accordion */}
          <section className="max-w-6xl mx-auto px-6 py-12 space-y-6">
            <div>
              <p className="text-xs font-bold text-fuchsia-700 uppercase tracking-widest">
                Need clarification?
              </p>
              <h2 className="text-2xl font-black text-slate-950 mt-1">
                Common questions
              </h2>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200/90 divide-y divide-slate-100 overflow-hidden shadow-xs">
              {faqs.map((faq, idx) => (
                <div key={idx} className="p-5 sm:p-6 transition hover:bg-slate-50/50">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-sm font-bold text-slate-900 cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform ${
                        openFaq === idx ? 'rotate-180 text-fuchsia-700' : ''
                      }`}
                    />
                  </button>
                  {openFaq === idx && (
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 pr-6">
                      {faq.a}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* ────────────────────────────────────────────────────────────────────── */}
      {/* TAB 2: ADMISSIONS STAFF REVIEW QUEUE                                    */}
      {/* ────────────────────────────────────────────────────────────────────── */}
      {activeTab === 'review' && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-slate-950 tracking-tight">
                Admissions Committee Verification Queue
              </h1>
              <p className="text-xs text-slate-600 mt-1">
                Authenticate submitted vouchers, verify WAEC scratch cards, schedule oral interviews, and issue admissions.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-fuchsia-50 border border-fuchsia-200 text-fuchsia-800">
                Total Files: {applications.length}
              </span>
            </div>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search applicant name, reference number, or voucher code..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-fuchsia-600 shadow-xs"
            >
              <option value="all">All Statuses</option>
              <option value="submitted">Submitted (Pending Review)</option>
              <option value="under_review_hod">Under Faculty Review</option>
              <option value="interview_scheduled">Interview Scheduled</option>
              <option value="admitted">Admitted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Applications Table */}
          <div className="bg-white border border-slate-200/90 rounded-2xl overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="px-4 py-3">Applicant &amp; Reference</th>
                    <th className="px-4 py-3">Selected Programme</th>
                    <th className="px-4 py-3">Voucher Used</th>
                    <th className="px-4 py-3">WAEC Serial &amp; PIN</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/60 transition">
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{app.personalInfo.fullName}</div>
                        <div className="font-mono text-[11px] text-fuchsia-700 font-semibold">
                          {app.applicationNumber}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <div className="font-semibold text-slate-900">{app.firstChoiceProgramme.name}</div>
                        <div className="text-[10px] text-slate-500">{app.firstChoiceProgramme.facultyName}</div>
                      </td>

                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-slate-800 uppercase bg-slate-100 px-2 py-0.5 rounded">
                          {app.codeUsed}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="font-mono text-slate-900 text-[11px]">
                          {app.academicHistory?.waecSerialNumber || 'N/A'}
                        </div>
                        <div className="font-mono text-[10px] text-slate-400">
                          PIN: {app.academicHistory?.waecPin ? '••••••••' : 'N/A'}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                            app.status === 'admitted'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : app.status === 'interview_scheduled'
                              ? 'bg-purple-50 text-purple-800 border-purple-200'
                              : 'bg-amber-50 text-amber-800 border-amber-200'
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          onClick={() => openAppDetails(app)}
                          className="px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-fuchsia-700 text-white font-bold text-xs transition cursor-pointer"
                        >
                          Evaluate File
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredApps.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-slate-400">
                        No applications found matching the selected filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* EVALUATION MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm p-4 flex items-center justify-center">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 space-y-5 border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-950">
                  Admissions Assessment • {selectedApp.applicationNumber}
                </h2>
                <p className="text-slate-500">{selectedApp.personalInfo.fullName}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* WAEC credentials check */}
            <div className="p-4 bg-amber-50/80 rounded-2xl border border-amber-200 space-y-2">
              <span className="font-bold text-amber-900 block text-xs">WAEC Scratch Card Verification</span>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                <div>Index: <strong className="text-slate-900">{selectedApp.academicHistory?.wassceIndexNumber}</strong></div>
                <div>Exam: <strong className="text-slate-900">{selectedApp.academicHistory?.examType}</strong></div>
                <div>Serial: <strong className="text-slate-900">{selectedApp.academicHistory?.waecSerialNumber || 'N/A'}</strong></div>
                <div>PIN: <strong className="text-slate-900">{selectedApp.academicHistory?.waecPin || 'N/A'}</strong></div>
              </div>
              <label className="flex items-center gap-2 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedWassce}
                  onChange={(e) => setVerifiedWassce(e.target.checked)}
                  className="rounded border-amber-400 text-fuchsia-600"
                />
                <span className="font-bold text-amber-950">
                  Mark WAEC / Academic credentials as verified
                </span>
              </label>
            </div>

            {/* Decision options */}
            <div className="space-y-3">
              <label className="font-bold text-slate-700 block">Committee Decision</label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDecisionAction('schedule_interview')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                    decisionAction === 'schedule_interview'
                      ? 'bg-purple-100 border-purple-400 text-purple-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Schedule Interview
                </button>
                <button
                  type="button"
                  onClick={() => setDecisionAction('admit')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                    decisionAction === 'admit'
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Grant Admission
                </button>
                <button
                  type="button"
                  onClick={() => setDecisionAction('reject')}
                  className={`p-2.5 rounded-xl border text-center font-bold text-xs transition cursor-pointer ${
                    decisionAction === 'reject'
                      ? 'bg-rose-100 border-rose-400 text-rose-900'
                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  Reject File
                </button>
              </div>

              {decisionAction === 'schedule_interview' && (
                <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 space-y-2">
                  <div>
                    <label className="text-[10px] font-bold text-purple-900 block">Date &amp; Time</label>
                    <input
                      type="datetime-local"
                      value={interviewDate}
                      onChange={(e) => setInterviewDate(e.target.value)}
                      className="w-full bg-white border border-purple-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-purple-900 block">Venue / Link</label>
                    <input
                      type="text"
                      value={interviewVenue}
                      onChange={(e) => setInterviewVenue(e.target.value)}
                      className="w-full bg-white border border-purple-300 rounded-lg p-2 text-xs"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveVerification}
                className="px-5 py-2 rounded-xl bg-slate-950 hover:bg-fuchsia-700 text-white font-bold transition cursor-pointer"
              >
                Save Decision &amp; Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DOCUMENT VIEWER MODAL */}
      {selectedApp && viewDocType && (
        <DocumentViewerModal
          isOpen={!!viewDocType}
          onClose={() => setViewDocType(null)}
          documentType={viewDocType}
          application={selectedApp}
        />
      )}

      {/* PRINT FULL APPLICATION SLIP MODAL */}
      {selectedApp && showPrintModal && (
        <ApplicationPrintForm
          application={selectedApp}
          onClose={() => setShowPrintModal(false)}
        />
      )}
    </div>
  );
}
