'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Award,
  UserPlus,
  CheckCircle2,
  XCircle,
  Search,
  BookOpen,
  Download,
  BadgeCheck,
  ClipboardList,
  ShieldCheck,
  Star,
  X,
  Eye,
  Printer
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { StudentProfile } from '@/lib/types';
import { INITIAL_PROGRAMMES } from '@/lib/data';
import DocumentViewerModal from '@/components/DocumentViewerModal';
import ApplicationPrintForm from '@/components/ApplicationPrintForm';

export default function RegistryDashboardPage() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'students' | 'admitted' | 'grades'>('students');
  const [publishSuccess, setPublishSuccess] = useState(false);

  // New student record modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAdmittedApp, setSelectedAdmittedApp] = useState<any | null>(null);
  const [creating, setCreating] = useState(false);
  const [createdStudent, setCreatedStudent] = useState<StudentProfile | null>(null);

  // Document & Print modals for Registry
  const [viewDocApp, setViewDocApp] = useState<{ app: any; docType: string } | null>(null);
  const [printApp, setPrintApp] = useState<any | null>(null);

  const refreshData = () => {
    setStudents(AppStore.getStudents());
    setApplications(AppStore.getApplications());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const admittedWithoutId = applications.filter(
    (a) =>
      a.status === 'admitted' &&
      !students.find((s) => s.email === a.userEmail)
  );

  const handleCreateRecord = (app: any) => {
    setSelectedAdmittedApp(app);
    setCreatedStudent(null);
    setShowCreateModal(true);
  };

  const confirmCreate = () => {
    if (!selectedAdmittedApp) return;
    setCreating(true);
    const programme = selectedAdmittedApp.firstChoiceProgramme;

    const newStudent = AppStore.createStudentRecord({
      fullName: selectedAdmittedApp.personalInfo.fullName,
      email: selectedAdmittedApp.userEmail,
      phone: selectedAdmittedApp.personalInfo.phone,
      programme,
      academicYear: '2026/2027'
    });

    setCreatedStudent(newStudent);
    setCreating(false);
    refreshData();
  };

  const handlePublishGrades = () => {
    AppStore.publishAllGrades();
    setPublishSuccess(true);
    setTimeout(() => setPublishSuccess(false), 3000);
  };

  const filteredStudents = students.filter(
    (s) =>
      s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.studentIdNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.programmeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Academic Registry & Examinations
            </span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-serif mt-1">
            Registry & Student Records Office
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Create student IDs for admitted applicants, approve registrations, publish semester grades, and issue official letters.
          </p>
        </div>

        <button
          onClick={handlePublishGrades}
          className={`px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-2 transition self-start md:self-auto shadow-lg ${
            publishSuccess
              ? 'bg-emerald-400 text-slate-950 shadow-emerald-500/20'
              : 'bg-rose-500 hover:bg-rose-400 text-white shadow-rose-500/20'
          }`}
        >
          <Star className="w-4 h-4" />
          {publishSuccess ? 'Grades Published Successfully!' : 'Publish Semester 1 Grades'}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-0">
        {[
          { key: 'students', label: `Enrolled Students (${students.length})` },
          { key: 'admitted', label: `Awaiting Student ID (${admittedWithoutId.length})` },
          { key: 'grades', label: 'Grade Records Registry' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 text-xs font-semibold rounded-t-lg -mb-px border-b-2 transition ${
              activeTab === tab.key
                ? 'border-amber-400 text-amber-400 bg-slate-900'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Enrolled Students */}
      {activeTab === 'students' && (
        <div className="space-y-6">
          {/* Search */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by name, student ID or programme..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase font-mono text-[11px]">
                    <th className="py-3.5 px-4">Student ID</th>
                    <th className="py-3.5 px-4">Full Name</th>
                    <th className="py-3.5 px-4">Programme</th>
                    <th className="py-3.5 px-4">Semester</th>
                    <th className="py-3.5 px-4">Tuition Cleared</th>
                    <th className="py-3.5 px-4">Registration</th>
                    <th className="py-3.5 px-4">CGPA</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {filteredStudents.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-850/40 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-amber-400">
                        {s.studentIdNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-white">{s.fullName}</div>
                        <div className="text-[11px] text-slate-400">{s.email}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-200 max-w-[200px] truncate">
                          {s.programmeName}
                        </div>
                        <div className="text-[11px] text-slate-400">{s.degreeType} • {s.admissionYear}</div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300 text-[11px]">{s.currentSemester}</td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            AppStore.toggleTuitionClearance(s.id, !s.tuitionCleared);
                            refreshData();
                          }}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition ${
                            s.tuitionCleared
                              ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                              : 'bg-rose-950 border-rose-700 text-rose-300'
                          }`}
                        >
                          {s.tuitionCleared ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                          {s.tuitionCleared ? 'Cleared' : 'Pending'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => {
                            AppStore.toggleRegistrationApproval(s.id, !s.registrationApproved);
                            refreshData();
                          }}
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border transition ${
                            s.registrationApproved
                              ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                              : 'bg-amber-950 border-amber-700 text-amber-300'
                          }`}
                        >
                          {s.registrationApproved ? <BadgeCheck className="w-3 h-3" /> : <ClipboardList className="w-3 h-3" />}
                          {s.registrationApproved ? 'Approved' : 'Pending'}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-white">
                        {s.cgpa?.toFixed(2) ?? '—'}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/student/admission-letter`}
                          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-[11px] transition"
                        >
                          View Letter
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Awaiting Student ID */}
      {activeTab === 'admitted' && (
        <div className="space-y-4">
          {admittedWithoutId.length === 0 ? (
            <div className="p-10 text-center bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="text-sm text-slate-400">All admitted applicants have been assigned Student IDs.</p>
            </div>
          ) : (
            admittedWithoutId.map((app) => (
              <div
                key={app.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-amber-400">{app.applicationNumber}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 font-bold">
                      ADMITTED
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Exam: <strong className="text-white">{app.academicHistory?.examType || 'WASSCE'}</strong>
                    </span>
                  </div>
                  <div className="text-sm font-bold text-white">{app.personalInfo.fullName}</div>
                  <div className="text-xs text-slate-400">{app.firstChoiceProgramme.name}</div>
                  
                  <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 pt-1">
                    <span>
                      Index: <strong className="font-mono text-white">{app.academicHistory?.wassceIndexNumber}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      Scratch Card: <strong className="font-mono text-amber-300">{app.academicHistory?.waecSerialNumber || 'WG2024-8849201'}</strong>
                    </span>
                    <span>•</span>
                    <span>
                      PIN: <strong className="font-mono text-slate-200">{app.academicHistory?.waecPin || '••••••••'}</strong>
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
                  <button
                    onClick={() => setViewDocApp({ app, docType: 'result_slip' })}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700"
                  >
                    <Eye className="w-3.5 h-3.5" /> View Result Slip
                  </button>

                  <button
                    onClick={() => setPrintApp(app)}
                    className="px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-1.5 transition border border-slate-700"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Form
                  </button>

                  <button
                    onClick={() => handleCreateRecord(app)}
                    className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 transition shadow-lg shadow-amber-500/20"
                  >
                    <UserPlus className="w-4 h-4" /> Issue Student ID
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Grade Records */}
      {activeTab === 'grades' && (
        <div className="space-y-4">
          {students.map((s) => {
            const grades = AppStore.getGradesForStudent(s.studentIdNumber);
            if (grades.length === 0) return null;
            const totalPoints = grades.reduce((acc, g) => acc + g.gradePoint * g.credits, 0);
            const totalCredits = grades.reduce((acc, g) => acc + g.credits, 0);
            const cgpa = totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : '—';

            return (
              <div key={s.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-xs font-mono font-bold text-amber-400">{s.studentIdNumber}</span>
                    <h3 className="text-sm font-bold text-white">{s.fullName}</h3>
                    <p className="text-xs text-slate-400">{s.programmeName} • {s.currentSemester}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400">Semester CGPA</div>
                    <div className="text-2xl font-black font-mono text-amber-400">{cgpa}</div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px] font-mono">
                        <th className="py-2 px-3 text-left">Module</th>
                        <th className="py-2 px-3 text-center">Cr</th>
                        <th className="py-2 px-3 text-center">CA (40)</th>
                        <th className="py-2 px-3 text-center">Exam (60)</th>
                        <th className="py-2 px-3 text-center">Total</th>
                        <th className="py-2 px-3 text-center">Grade</th>
                        <th className="py-2 px-3 text-center">GP</th>
                        <th className="py-2 px-3 text-center">Published</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60">
                      {grades.map((g) => (
                        <tr key={g.id} className="hover:bg-slate-950/40">
                          <td className="py-2.5 px-3">
                            <div className="font-semibold text-white">{g.moduleCode}</div>
                            <div className="text-[11px] text-slate-400 max-w-[200px] truncate">{g.moduleTitle}</div>
                          </td>
                          <td className="py-2.5 px-3 text-center text-slate-300">{g.credits}</td>
                          <td className="py-2.5 px-3 text-center font-mono text-slate-300">{g.caScore}</td>
                          <td className="py-2.5 px-3 text-center font-mono text-slate-300">{g.examScore}</td>
                          <td className="py-2.5 px-3 text-center font-mono font-bold text-white">{g.totalScore}</td>
                          <td className="py-2.5 px-3 text-center">
                            <span className={`font-bold font-mono px-2 py-0.5 rounded text-sm ${
                              g.letterGrade === 'A' ? 'text-emerald-400' :
                              g.letterGrade.startsWith('B') ? 'text-blue-400' :
                              g.letterGrade.startsWith('C') ? 'text-amber-400' : 'text-rose-400'
                            }`}>
                              {g.letterGrade}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-center font-mono text-slate-300">{g.gradePoint.toFixed(1)}</td>
                          <td className="py-2.5 px-3 text-center">
                            {g.isPublished
                              ? <CheckCircle2 className="w-4 h-4 text-emerald-400 mx-auto" />
                              : <span className="text-amber-400 text-[10px] font-semibold">Pending</span>
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Create Student Record Modal */}
      {showCreateModal && selectedAdmittedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-white text-base font-serif">Create Permanent Student Record</h3>
              </div>
              <button onClick={() => setShowCreateModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {createdStudent ? (
              <div className="text-center space-y-4 py-2">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <BadgeCheck className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Student Record Created!</h4>
                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/30 space-y-2 text-xs">
                  <div className="text-slate-400">Assigned Student ID Number:</div>
                  <div className="text-2xl font-black font-mono text-amber-400">
                    {createdStudent.studentIdNumber}
                  </div>
                  <div className="text-slate-300 font-semibold">{createdStudent.fullName}</div>
                  <div className="text-slate-400">{createdStudent.programmeName}</div>
                </div>
                <p className="text-xs text-slate-400">
                  The student can now log in to access their modules, timetable, and published grades.
                </p>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs"
                >
                  Done
                </button>
              </div>
            ) : (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="font-bold text-white text-sm">{selectedAdmittedApp.personalInfo.fullName}</div>
                  <div className="text-slate-400">Programme: <strong className="text-white">{selectedAdmittedApp.firstChoiceProgramme.name}</strong></div>
                  <div className="text-slate-400">Admission No: <span className="font-mono text-amber-400">{selectedAdmittedApp.admissionDecision?.admissionNumber}</span></div>
                </div>
                <div className="p-3.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-200">
                  <strong>This action will permanently create a student record</strong>, generate a unique Student ID number, and grant access to the academic portal (modules, timetable, grades).
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmCreate}
                    disabled={creating}
                    className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold transition"
                  >
                    {creating ? 'Creating...' : 'Confirm & Issue Student ID'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* DOCUMENT VIEWER MODAL */}
      {viewDocApp && (
        <DocumentViewerModal
          isOpen={!!viewDocApp}
          onClose={() => setViewDocApp(null)}
          documentType={viewDocApp.docType}
          application={viewDocApp.app}
        />
      )}

      {/* PRINT SLIP MODAL */}
      {printApp && (
        <ApplicationPrintForm
          application={printApp}
          onClose={() => setPrintApp(null)}
        />
      )}
    </div>
  );
}
