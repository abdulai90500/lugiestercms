'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import {
  GraduationCap,
  ShieldCheck,
  CreditCard,
  UserCheck,
  Layers,
  Lock,
  Mail,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { UserRole } from '@/lib/types';
import { DEMO_USERS } from '@/lib/data';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRoleQuickLogin = (role: UserRole) => {
    AppStore.setCurrentUser(role);
    if (role === 'student') router.push('/student/dashboard');
    else if (role === 'finance') router.push('/finance');
    else if (role === 'admissions') router.push('/admissions');
    else if (role === 'hod') router.push('/hod');
    else if (role === 'admin') router.push('/admin');
    else router.push('/student/dashboard');
  };

  const handleStandardLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      // Direct student login
      AppStore.setCurrentUser('student');
      router.push('/student/dashboard');
    }, 500);
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-10 shadow-2xl relative">
        {/* Logo and Titles */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-white/10 p-1 flex items-center justify-center mx-auto border border-white/20">
            <Image
              src="/logo.png"
              alt="LungiCEST"
              width={52}
              height={52}
              className="object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-black text-white font-serif tracking-tight">
              Sign In to Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Lungi College of Education Science &amp; Technology (LUNGICEST)
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleStandardLogin} className="space-y-4 text-xs">
          <div className="space-y-1.5">
            <label className="text-slate-300 font-semibold">Institutional Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                required
                placeholder="you@lungicest.edu.sl or personal email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between">
              <label className="text-slate-300 font-semibold">Password</label>
              <a href="#" className="text-amber-400 text-[11px] hover:underline">
                Forgot password?
              </a>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition shadow-lg shadow-amber-500/20"
          >
            {isLoading ? 'Signing In...' : 'Sign In with Credentials'}
          </button>
        </form>

        {/* Quick Testing Role Switcher */}
        <div className="pt-4 border-t border-slate-800 space-y-3">
          <div className="text-center text-[11px] text-slate-400 font-semibold">
            Or test instantly with department profiles:
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              onClick={() => handleRoleQuickLogin('student')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 text-left transition flex items-center gap-2"
            >
              <GraduationCap className="w-4 h-4 text-blue-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-[11px]">Student</div>
                <div className="text-[9px] text-slate-500">Applicant Portal</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleQuickLogin('finance')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-400/50 text-left transition flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-emerald-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-[11px]">Finance</div>
                <div className="text-[9px] text-slate-500">Issue Vouchers</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleQuickLogin('admissions')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-purple-400/50 text-left transition flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-[11px]">Admissions</div>
                <div className="text-[9px] text-slate-500">Verify WASSCE</div>
              </div>
            </button>

            <button
              onClick={() => handleRoleQuickLogin('hod')}
              className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-400/50 text-left transition flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <div>
                <div className="font-bold text-white text-[11px]">HOD ICT</div>
                <div className="text-[9px] text-slate-500">Academic Review</div>
              </div>
            </button>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400">
          New applicant?{' '}
          <Link href="/register" className="text-amber-400 font-bold hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
