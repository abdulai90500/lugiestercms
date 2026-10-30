'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Printer, ArrowLeft, Award, TrendingUp, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { AppStore } from '@/lib/store';
import { GradeRecord, StudentProfile } from '@/lib/types';
import Image from 'next/image';

export default function StudentResultsPage() {
  const [grades, setGrades] = useState<GradeRecord[]>([]);
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const students = AppStore.getStudents();
    const s = students[0] || null;
    setStudent(s);
    if (s) {
      setGrades(AppStore.getGradesForStudent(s.studentIdNumber));
    }
  }, []);

  const publishedGrades = grades.filter((g) => g.isPublished);

  const totalCreditPoints = publishedGrades.reduce((acc, g) => acc + g.gradePoint * g.credits, 0);
  const totalCredits = publishedGrades.reduce((acc, g) => acc + g.credits, 0);
  const cgpa = totalCredits > 0 ? (totalCreditPoints / totalCredits) : 0;

  const classification =
    cgpa >= 3.5 ? 'First Class Honours'
    : cgpa >= 3.0 ? 'Second Class Upper (2:1)'
    : cgpa >= 2.5 ? 'Second Class Lower (2:2)'
    : cgpa >= 2.0 ? 'Third Class'
    : 'Pass / Below Threshold';

  if (!student) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center">
        <p className="text-slate-400">No student record found. Please contact the Registry.</p>
      </div>
    );
  }

  if (publishedGrades.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-400 mx-auto" />
        <h2 className="text-xl font-bold text-white font-serif">Results Not Yet Published</h2>
        <p className="text-sm text-slate-400">
          Semester results will appear here once the Registry & Examinations Office publishes them.
        </p>
        <Link href="/student/dashboard" className="inline-block px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs mt-2">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link href="/student/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-3">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-white font-serif">Academic Results</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Official Semester Examination Results — {student.currentSemester} • {student.admissionYear}
          </p>
        </div>
        <button
          onClick={() => window.print()}
          className="px-5 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition self-start sm:self-auto print:hidden"
        >
          <Printer className="w-4 h-4" /> Print / Save PDF
        </button>
      </div>

      {/* CGPA Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 print:hidden">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-center">
          <div className="text-[11px] text-slate-400 mb-1">Semester CGPA</div>
          <div className="text-3xl font-black font-mono text-amber-400">{cgpa.toFixed(2)}</div>
          <div className="text-[11px] text-slate-500 mt-0.5">/ 4.00</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-center">
          <div className="text-[11px] text-slate-400 mb-1">Classification</div>
          <div className="text-xs font-extrabold text-emerald-400 leading-tight mt-1">{classification}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-center">
          <div className="text-[11px] text-slate-400 mb-1">Total Credits</div>
          <div className="text-3xl font-black font-mono text-white">{totalCredits}</div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl text-center">
          <div className="text-[11px] text-slate-400 mb-1">Modules Passed</div>
          <div className="text-3xl font-black font-mono text-emerald-400">
            {publishedGrades.filter((g) => g.letterGrade !== 'F').length}/{publishedGrades.length}
          </div>
        </div>
      </div>

      {/* Official Printable Transcript */}
      <div id="printable-transcript" className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 relative overflow-hidden print:p-0 print:border-none print:shadow-none font-sans">
        {/* Watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <Image src="/logo.png" alt="" width={400} height={400} className="object-contain" />
        </div>

        {/* Letterhead */}
        <div className="text-center border-b-2 border-slate-900 pb-6 relative z-10 space-y-1">
          <div className="w-16 h-16 mx-auto mb-2">
            <Image src="/logo.png" alt="LungiCEST" width={64} height={64} className="object-contain mx-auto" />
          </div>
          <h2 className="text-xl font-black tracking-tight text-slate-950 uppercase font-serif">
            Lungi College of Education, Science & Technology
          </h2>
          <p className="text-xs font-bold text-slate-600 tracking-wider">LUNGICEST • ACADEMIC REGISTRY & EXAMINATIONS OFFICE</p>
          <p className="text-[11px] text-slate-500">Lungi, Port Loko District • registrar@lungicest.edu.sl</p>
          <div className="mt-2 inline-block px-4 py-1 rounded border border-slate-300 text-xs font-bold text-slate-700 tracking-widest uppercase">
            Official Semester Academic Transcript
          </div>
        </div>

        {/* Student Info */}
        <div className="py-6 grid grid-cols-2 gap-4 text-xs border-b border-slate-200 relative z-10">
          <div className="space-y-1.5">
            <div><span className="text-slate-500">Student Name:</span> <strong>{student.fullName}</strong></div>
            <div><span className="text-slate-500">Student ID:</span> <strong className="font-mono">{student.studentIdNumber}</strong></div>
            <div><span className="text-slate-500">Programme:</span> <strong>{student.programmeName}</strong></div>
          </div>
          <div className="space-y-1.5 text-right">
            <div><span className="text-slate-500">Semester:</span> <strong>{student.currentSemester}</strong></div>
            <div><span className="text-slate-500">Academic Year:</span> <strong>{student.admissionYear}</strong></div>
            <div><span className="text-slate-500">Faculty:</span> <strong>{student.facultyName}</strong></div>
          </div>
        </div>

        {/* Grades Table */}
        <div className="py-6 relative z-10">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-slate-900 text-slate-500 uppercase text-[11px]">
                <th className="py-2.5 font-bold">Code</th>
                <th className="py-2.5 font-bold">Module Title</th>
                <th className="py-2.5 text-center font-bold">Cr</th>
                <th className="py-2.5 text-center font-bold">CA (40)</th>
                <th className="py-2.5 text-center font-bold">Exam (60)</th>
                <th className="py-2.5 text-center font-bold">Total</th>
                <th className="py-2.5 text-center font-bold">Grade</th>
                <th className="py-2.5 text-center font-bold">GP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {publishedGrades.map((g) => (
                <tr key={g.id} className="text-slate-800">
                  <td className="py-2.5 font-mono font-bold text-slate-900">{g.moduleCode}</td>
                  <td className="py-2.5 font-medium">{g.moduleTitle}</td>
                  <td className="py-2.5 text-center">{g.credits}</td>
                  <td className="py-2.5 text-center font-mono">{g.caScore}</td>
                  <td className="py-2.5 text-center font-mono">{g.examScore}</td>
                  <td className="py-2.5 text-center font-mono font-bold">{g.totalScore}</td>
                  <td className="py-2.5 text-center">
                    <span className={`font-extrabold font-mono text-sm ${
                      g.letterGrade === 'A' ? 'text-emerald-700' :
                      g.letterGrade.startsWith('B') ? 'text-blue-700' :
                      g.letterGrade.startsWith('C') ? 'text-amber-700' : 'text-rose-700'
                    }`}>
                      {g.letterGrade}
                    </span>
                  </td>
                  <td className="py-2.5 text-center font-mono">{g.gradePoint.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-900 font-bold">
                <td className="py-3 uppercase text-slate-600 text-[11px]" colSpan={2}>Semester Totals</td>
                <td className="py-3 text-center">{totalCredits}</td>
                <td colSpan={4}></td>
                <td className="py-3 text-center font-mono text-slate-900">{cgpa.toFixed(2)}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Classification & Signature Footer */}
        <div className="pt-6 border-t border-slate-200 relative z-10 flex items-end justify-between text-xs">
          <div className="space-y-1">
            <div className="text-slate-500">Semester Classification:</div>
            <div className="text-base font-extrabold text-slate-950 font-serif">{classification}</div>
            <div className="text-slate-500 text-[11px]">CGPA: {cgpa.toFixed(2)} / 4.00</div>
          </div>
          <div className="text-center space-y-1">
            <div className="w-28 border-b border-slate-800 mb-1 h-8 flex items-end justify-center italic text-slate-600 font-serif text-sm font-bold">
              Finda Sesay
            </div>
            <div className="font-bold text-slate-900">Academic Registrar</div>
            <div className="text-[10px] text-slate-500">LungiCEST — Sierra Leone</div>
          </div>
        </div>
      </div>
    </div>
  );
}
