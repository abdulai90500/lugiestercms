'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Users,
  FileText,
  Clock,
  Award,
  ArrowLeft,
  ExternalLink
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { AcademicModule, StudentProfile } from '@/lib/types';

export default function StudentModulesPage() {
  const [modules, setModules] = useState<AcademicModule[]>([]);
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    setModules(AppStore.getModules());
    // In MVP, show the demo student
    const students = AppStore.getStudents();
    setStudent(students[0] || null);
  }, []);

  if (!student || !student.registrationApproved || !student.tuitionCleared) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <BookOpen className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-xl font-bold text-white font-serif">Module Access Restricted</h2>
        <p className="text-sm text-slate-400">
          Access to academic modules requires approved semester registration and Finance clearance.
          Please visit the Finance or Registry offices.
        </p>
        <Link href="/student/dashboard" className="inline-block px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs mt-2">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const registeredModules = modules.filter((m) =>
    student.registeredCourses.includes(m.code)
  );

  const totalCredits = registeredModules.reduce((acc, m) => acc + m.credits, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div>
        <Link href="/student/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold text-white font-serif">Registered Modules</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {student.currentSemester} • {student.programmeName} • Academic Year {student.admissionYear}
        </p>
      </div>

      {/* Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Student ID', value: student.studentIdNumber, mono: true },
          { label: 'Registered Modules', value: String(registeredModules.length) },
          { label: 'Total Credits', value: `${totalCredits} Credits` },
          { label: 'Registration Status', value: 'Approved & Active', green: true }
        ].map((item, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <div className="text-[11px] text-slate-400 mb-1">{item.label}</div>
            <div className={`font-extrabold text-sm ${item.mono ? 'font-mono text-amber-400' : item.green ? 'text-emerald-400' : 'text-white'}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      {/* Module Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {registeredModules.map((mod) => (
          <div
            key={mod.id}
            className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20">
                  {mod.code}
                </span>
                <span className="text-xs text-slate-400">{mod.credits} Credits</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition">
                {mod.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed">{mod.description}</p>

              <div className="pt-2 space-y-1.5 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                  <span>{mod.lecturerName}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  <span>{mod.level} • {mod.semester}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <Link
                href="/student/timetable"
                className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
              >
                View Timetable <ExternalLink className="w-3 h-3" />
              </Link>
              <Link
                href="/student/results"
                className="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold transition"
              >
                View Results
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
