'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Save,
  Eye,
  Upload,
  GraduationCap,
  BarChart3,
  Users
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { GradeRecord, AcademicModule } from '@/lib/types';
import { INITIAL_STUDENTS } from '@/lib/data';

function gradeFromScore(total: number): { letter: string; gp: number } {
  if (total >= 85) return { letter: 'A', gp: 4.0 };
  if (total >= 75) return { letter: 'B+', gp: 3.5 };
  if (total >= 65) return { letter: 'B', gp: 3.0 };
  if (total >= 55) return { letter: 'C+', gp: 2.5 };
  if (total >= 45) return { letter: 'C', gp: 2.0 };
  if (total >= 40) return { letter: 'D', gp: 1.0 };
  return { letter: 'F', gp: 0.0 };
}

export default function LecturerDashboardPage() {
  const [modules, setModules] = useState<AcademicModule[]>([]);
  const [students, setStudents] = useState<any[]>([]);
  const [selectedModule, setSelectedModule] = useState<AcademicModule | null>(null);
  const [grades, setGrades] = useState<Record<string, { ca: number; exam: number }>>({});
  const [savedNotice, setSavedNotice] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<'enter' | 'overview'>('overview');

  useEffect(() => {
    const mods = AppStore.getModules();
    // Filter to modules this lecturer teaches (in demo: Joe Williams)
    setModules(mods.filter((m) => m.lecturerName.includes('Joe') || m.lecturerName.includes('Williams')));
    setStudents(AppStore.getStudents());

    // Pre-load existing grades
    const allGrades = AppStore.getGrades();
    const gradeMap: Record<string, { ca: number; exam: number }> = {};
    allGrades.forEach((g) => {
      gradeMap[`${g.studentIdNumber}__${g.moduleCode}`] = { ca: g.caScore, exam: g.examScore };
    });
    setGrades(gradeMap);
  }, []);

  const handleSelectModule = (mod: AcademicModule) => {
    setSelectedModule(mod);
    setActiveView('enter');
  };

  const handleScoreChange = (
    studentIdNum: string,
    field: 'ca' | 'exam',
    value: number
  ) => {
    const key = `${studentIdNum}__${selectedModule!.code}`;
    setGrades((prev) => ({
      ...prev,
      [key]: {
        ca: field === 'ca' ? value : (prev[key]?.ca ?? 0),
        exam: field === 'exam' ? value : (prev[key]?.exam ?? 0)
      }
    }));
  };

  const handleSaveGrades = () => {
    if (!selectedModule) return;
    students.forEach((s) => {
      const key = `${s.studentIdNumber}__${selectedModule.code}`;
      const entry = grades[key];
      if (!entry) return;
      const total = entry.ca + entry.exam;
      const { letter, gp } = gradeFromScore(total);

      const gradeRecord: GradeRecord = {
        id: `grd-${s.studentIdNumber}-${selectedModule.code}`,
        studentIdNumber: s.studentIdNumber,
        studentName: s.fullName,
        moduleCode: selectedModule.code,
        moduleTitle: selectedModule.title,
        credits: selectedModule.credits,
        caScore: entry.ca,
        examScore: entry.exam,
        totalScore: total,
        letterGrade: letter,
        gradePoint: gp,
        isPublished: false,
        semester: selectedModule.semester,
        academicYear: '2026/2027',
        approvedByRegistry: false
      };
      AppStore.saveGrade(gradeRecord);
    });

    setSavedNotice(`Grades saved for ${selectedModule.code} — ${selectedModule.title}`);
    setTimeout(() => setSavedNotice(null), 4000);
  };

  // Build module summary stats
  const getModuleStats = (moduleCode: string) => {
    const moduleGrades = AppStore.getGrades().filter((g) => g.moduleCode === moduleCode);
    if (moduleGrades.length === 0) return null;
    const avg = moduleGrades.reduce((acc, g) => acc + g.totalScore, 0) / moduleGrades.length;
    const highest = Math.max(...moduleGrades.map((g) => g.totalScore));
    return { avg: avg.toFixed(1), highest, count: moduleGrades.length };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              Lecturer Portal
            </span>
            <span className="text-xs text-slate-400">Faculty of Information & Communication Technology</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-serif mt-1">
            Mr. Joe Williams — Grade Entry Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Enter CA (coursework) and exam scores for registered students. Saved grades will be reviewed by the Registry before publication.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveView('overview')}
            className={`px-4 py-2 rounded-xl font-semibold text-xs transition border ${
              activeView === 'overview'
                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-1.5" /> Overview
          </button>
          <button
            onClick={() => setActiveView('enter')}
            className={`px-4 py-2 rounded-xl font-semibold text-xs transition border ${
              activeView === 'enter'
                ? 'bg-amber-400/20 border-amber-400 text-amber-300'
                : 'bg-slate-900 border-slate-700 text-slate-400'
            }`}
          >
            <Upload className="w-4 h-4 inline mr-1.5" /> Enter Grades
          </button>
        </div>
      </div>

      {/* Overview: Module Cards */}
      {activeView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => {
            const stats = getModuleStats(mod.code);
            return (
              <div
                key={mod.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl hover:border-slate-700 transition space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">{mod.code}</span>
                    <h3 className="text-sm font-bold text-white mt-0.5">{mod.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{mod.level} • {mod.credits} Credits</p>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center shrink-0">
                    <BookOpen className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{mod.description}</p>

                {stats && (
                  <div className="grid grid-cols-3 gap-2 text-center p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs">
                    <div>
                      <div className="text-slate-400 text-[10px]">Students</div>
                      <div className="font-bold text-white">{stats.count}</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Class Avg</div>
                      <div className="font-bold text-amber-400">{stats.avg}%</div>
                    </div>
                    <div>
                      <div className="text-slate-400 text-[10px]">Highest</div>
                      <div className="font-bold text-emerald-400">{stats.highest}%</div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => handleSelectModule(mod)}
                  className="w-full py-2.5 rounded-xl bg-amber-400/10 hover:bg-amber-400 text-amber-400 hover:text-slate-950 font-bold text-xs transition border border-amber-400/30"
                >
                  Enter / Edit Grades
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Grade Entry View */}
      {activeView === 'enter' && (
        <div className="space-y-6">
          {/* Module Picker */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
            <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
              Select Module to Enter Grades
            </label>
            <div className="flex flex-wrap gap-2">
              {modules.map((mod) => (
                <button
                  key={mod.id}
                  onClick={() => setSelectedModule(mod)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                    selectedModule?.id === mod.id
                      ? 'bg-amber-400 text-slate-950 border-amber-400'
                      : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-amber-400/50'
                  }`}
                >
                  {mod.code} — {mod.title}
                </button>
              ))}
            </div>
          </div>

          {selectedModule ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400">{selectedModule.code}</span>
                  <h2 className="text-sm font-bold text-white">{selectedModule.title}</h2>
                  <p className="text-xs text-slate-400">
                    {selectedModule.credits} Credits • Max CA: 40 pts • Max Exam: 60 pts
                  </p>
                </div>
                <button
                  onClick={handleSaveGrades}
                  className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition"
                >
                  <Save className="w-4 h-4" /> Save All Grades
                </button>
              </div>

              {savedNotice && (
                <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" /> {savedNotice}
                </div>
              )}

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono bg-slate-950">
                      <th className="py-3 px-5">Student ID</th>
                      <th className="py-3 px-5">Full Name</th>
                      <th className="py-3 px-5 text-center">CA Score (/ 40)</th>
                      <th className="py-3 px-5 text-center">Exam Score (/ 60)</th>
                      <th className="py-3 px-5 text-center">Total</th>
                      <th className="py-3 px-5 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {students.map((s) => {
                      const key = `${s.studentIdNumber}__${selectedModule.code}`;
                      const ca = grades[key]?.ca ?? 0;
                      const exam = grades[key]?.exam ?? 0;
                      const total = ca + exam;
                      const { letter, gp } = gradeFromScore(total);

                      return (
                        <tr key={s.id} className="hover:bg-slate-850/40">
                          <td className="py-3.5 px-5 font-mono font-bold text-amber-400 text-[11px]">
                            {s.studentIdNumber}
                          </td>
                          <td className="py-3.5 px-5 font-semibold text-white">{s.fullName}</td>
                          <td className="py-3.5 px-5">
                            <input
                              type="number"
                              min={0}
                              max={40}
                              value={ca}
                              onChange={(e) =>
                                handleScoreChange(
                                  s.studentIdNumber,
                                  'ca',
                                  Math.min(40, Math.max(0, Number(e.target.value)))
                                )
                              }
                              className="w-20 mx-auto block bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-center text-white focus:outline-none focus:border-amber-400 font-mono"
                            />
                          </td>
                          <td className="py-3.5 px-5">
                            <input
                              type="number"
                              min={0}
                              max={60}
                              value={exam}
                              onChange={(e) =>
                                handleScoreChange(
                                  s.studentIdNumber,
                                  'exam',
                                  Math.min(60, Math.max(0, Number(e.target.value)))
                                )
                              }
                              className="w-20 mx-auto block bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-center text-white focus:outline-none focus:border-amber-400 font-mono"
                            />
                          </td>
                          <td className="py-3.5 px-5 text-center font-mono font-bold text-white">
                            {total}
                          </td>
                          <td className="py-3.5 px-5 text-center">
                            <span className={`font-extrabold text-base font-mono ${
                              letter === 'A' ? 'text-emerald-400' :
                              letter.startsWith('B') ? 'text-blue-400' :
                              letter.startsWith('C') ? 'text-amber-400' : 'text-rose-400'
                            }`}>
                              {letter}
                            </span>
                            <div className="text-[10px] text-slate-500">GP: {gp.toFixed(1)}</div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center bg-slate-900 border border-slate-800 rounded-2xl text-slate-400 text-sm">
              Select a module above to begin entering grades.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
