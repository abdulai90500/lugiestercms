'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  GraduationCap,
  ShieldCheck,
  CreditCard,
  FileText,
  UserCheck,
  ChevronDown,
  Layers,
  BookOpen,
  PhoneCall,
  ExternalLink,
  MessageSquare
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { UserProfile, UserRole } from '@/lib/types';
import { DEMO_USERS, INSTITUTION } from '@/lib/data';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<UserProfile>(DEMO_USERS.student);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setCurrentUser(AppStore.getCurrentUser());
  }, []);

  const handleSwitchRole = (role: UserRole) => {
    AppStore.setCurrentUser(role);
    const updated = DEMO_USERS[role];
    setCurrentUser(updated);
    setRoleMenuOpen(false);

    // Route to appropriate section
    if (role === 'student') router.push('/student/dashboard');
    else if (role === 'finance') router.push('/finance');
    else if (role === 'admissions') router.push('/admissions');
    else if (role === 'hod') router.push('/hod');
    else if (role === 'registry') router.push('/registry');
    else if (role === 'lecturer') router.push('/lecturer');
    else if (role === 'admin') router.push('/admin');
    else router.push('/student/dashboard');
  };

  if (pathname === '/') {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 bg-[#142b46]/95 backdrop-blur-md border-b border-[#203b59] text-white shadow-xl">
      {/* Top micro announcement bar */}
      <div className="bg-[#0c2037] border-b border-[#203b59]/60 px-4 py-1 text-[11px] text-slate-300">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-slate-300 font-medium">
              Official Admissions & Registry Gateway • Affiliated with MMTU • TEC & NCTVA Accredited
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-slate-400">
            <span>Lungi, Sierra Leone</span>
            <span>•</span>
            <a
              href={INSTITUTION.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#d6b76e] hover:underline flex items-center gap-1 font-semibold"
            >
              <MessageSquare className="w-3 h-3" /> WhatsApp: 077528393
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo & Institution Name */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-12 h-12 rounded-xl bg-white/10 p-1 ring-1 ring-white/20 flex items-center justify-center overflow-hidden transition-transform group-hover:scale-105 shrink-0">
              <Image
                src="/logo.png"
                alt="LUNGICEST Crest"
                width={48}
                height={48}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-tight text-xl text-white font-display">
                  LUNGICEST
                </span>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#b9954b]/20 text-[#d6b76e] border border-[#b9954b]/30">
                  Est. 2021
                </span>
              </div>
              <p className="text-xs text-slate-300 hidden sm:block font-sans font-medium">
                Lungi College of Education Science &amp; Technology
              </p>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname === '/' ? 'bg-[#203b59] text-[#d6b76e] font-semibold' : 'text-slate-200 hover:text-white hover:bg-[#203b59]/60'
              }`}
            >
              Home
            </Link>
            <Link
              href="/#academics"
              className="px-3.5 py-2 rounded-lg text-slate-200 hover:text-white hover:bg-[#203b59]/60 transition-colors"
            >
              Academics &amp; Courses
            </Link>
            <Link
              href="/admissions"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/admissions')
                  ? 'bg-[#203b59] text-[#d6b76e] font-semibold'
                  : 'text-slate-200 hover:text-white hover:bg-[#203b59]/60'
              }`}
            >
              Admissions
            </Link>
            <Link
              href="/apply"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname === '/apply'
                  ? 'bg-[#b9954b] text-[#0c2037] font-bold'
                  : 'text-[#d6b76e] hover:bg-[#b9954b]/15 font-semibold'
              }`}
            >
              Apply Online
            </Link>
            <Link
              href="/apply/track"
              className={`px-3 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/apply/track') || pathname.startsWith('/student/tracking')
                  ? 'bg-[#203b59] text-[#d6b76e] font-semibold'
                  : 'text-slate-200 hover:text-white hover:bg-[#203b59]/60'
              }`}
            >
              Track Application
            </Link>
            <Link
              href="/student/dashboard"
              className={`px-3.5 py-2 rounded-lg transition-colors ${
                pathname.startsWith('/student/dashboard')
                  ? 'bg-[#203b59] text-[#d6b76e] font-semibold'
                  : 'text-slate-200 hover:text-white hover:bg-[#203b59]/60'
              }`}
            >
              Student Portal
            </Link>
          </nav>

          {/* Right Action: Role Switcher & Direct Portals */}
          <div className="flex items-center gap-3">
            {/* WhatsApp Direct Enquiry Button */}
            <a
              href={INSTITUTION.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact LUNGICEST on WhatsApp"
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 text-xs font-semibold transition"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp</span>
            </a>

            {/* Quick Staff Switcher */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0c2037] hover:bg-[#203b59] text-xs font-medium text-slate-200 border border-[#203b59] transition shadow-sm"
              >
                <span className="w-2 h-2 rounded-full bg-[#b9954b]" />
                <span className="capitalize">{currentUser.role} Portal</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0c2037] border border-[#203b59] rounded-xl shadow-2xl p-2 z-50 text-xs animate-in fade-in slide-in-from-top-2">
                  <div className="px-2.5 py-2 border-b border-[#203b59] text-slate-400 flex items-center justify-between">
                    <span>Active Gateway:</span>
                    <span className="font-semibold text-[#d6b76e] uppercase tracking-wider text-[10px]">
                      {currentUser.role}
                    </span>
                  </div>
                  <div className="py-1 space-y-0.5">
                    <button
                      onClick={() => handleSwitchRole('student')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
                        currentUser.role === 'student' ? 'bg-[#b9954b]/20 text-[#d6b76e] font-semibold' : 'text-slate-300 hover:bg-[#142b46]'
                      }`}
                    >
                      <GraduationCap className="w-4 h-4 text-blue-400" />
                      <div>
                        <div>Student / Applicant</div>
                        <div className="text-[10px] text-slate-400">Apply, track & letters</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSwitchRole('finance')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
                        currentUser.role === 'finance' ? 'bg-[#b9954b]/20 text-[#d6b76e] font-semibold' : 'text-slate-300 hover:bg-[#142b46]'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div>Finance Office</div>
                        <div className="text-[10px] text-slate-400">Issue single-use codes & receipts</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSwitchRole('admissions')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
                        currentUser.role === 'admissions' ? 'bg-[#b9954b]/20 text-[#d6b76e] font-semibold' : 'text-slate-300 hover:bg-[#142b46]'
                      }`}
                    >
                      <UserCheck className="w-4 h-4 text-purple-400" />
                      <div>
                        <div>Admissions Office</div>
                        <div className="text-[10px] text-slate-400">Verify WASSCE & schedule interviews</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSwitchRole('hod')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
                        currentUser.role === 'hod' ? 'bg-[#b9954b]/20 text-[#d6b76e] font-semibold' : 'text-slate-300 hover:bg-[#142b46]'
                      }`}
                    >
                      <ShieldCheck className="w-4 h-4 text-amber-400" />
                      <div>
                        <div>HOD Review</div>
                        <div className="text-[10px] text-slate-400">Department approvals & remarks</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSwitchRole('registry')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
                        currentUser.role === 'registry' ? 'bg-[#b9954b]/20 text-[#d6b76e] font-semibold' : 'text-slate-300 hover:bg-[#142b46]'
                      }`}
                    >
                      <FileText className="w-4 h-4 text-rose-400" />
                      <div>
                        <div>Registry Office</div>
                        <div className="text-[10px] text-slate-400">Student IDs, registration & grades</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSwitchRole('lecturer')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
                        currentUser.role === 'lecturer' ? 'bg-[#b9954b]/20 text-[#d6b76e] font-semibold' : 'text-slate-300 hover:bg-[#142b46]'
                      }`}
                    >
                      <BookOpen className="w-4 h-4 text-indigo-400" />
                      <div>
                        <div>Lecturer Portal</div>
                        <div className="text-[10px] text-slate-400">Enter & submit module grades</div>
                      </div>
                    </button>
                    <button
                      onClick={() => handleSwitchRole('admin')}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left transition ${
                        currentUser.role === 'admin' ? 'bg-[#b9954b]/20 text-[#d6b76e] font-semibold' : 'text-slate-300 hover:bg-[#142b46]'
                      }`}
                    >
                      <Layers className="w-4 h-4 text-cyan-400" />
                      <div>
                        <div>Administrator</div>
                        <div className="text-[10px] text-slate-400">Programmes, cycles & audit trail</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/login"
              className="px-4 py-2 text-xs font-bold rounded-lg bg-[#b9954b] hover:bg-[#d6b76e] text-[#0c2037] transition shadow-md shadow-[#b9954b]/20"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
