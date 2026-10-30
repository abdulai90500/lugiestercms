'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Clock, MapPin, User, ArrowLeft, BookOpen } from 'lucide-react';
import { AppStore } from '@/lib/store';
import { TimetableSlot, StudentProfile } from '@/lib/types';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

const DAY_COLORS: Record<string, string> = {
  Monday:    'bg-blue-500/10    border-blue-500/30    text-blue-300',
  Tuesday:   'bg-purple-500/10  border-purple-500/30  text-purple-300',
  Wednesday: 'bg-amber-500/10   border-amber-500/30   text-amber-300',
  Thursday:  'bg-emerald-500/10 border-emerald-500/30 text-emerald-300',
  Friday:    'bg-rose-500/10    border-rose-500/30    text-rose-300',
  Saturday:  'bg-cyan-500/10    border-cyan-500/30    text-cyan-300',
};

export default function StudentTimetablePage() {
  const [slots, setSlots] = useState<TimetableSlot[]>([]);
  const [student, setStudent] = useState<StudentProfile | null>(null);

  useEffect(() => {
    const allSlots = AppStore.getTimetable();
    const students = AppStore.getStudents();
    const s = students[0] || null;
    setStudent(s);

    if (s) {
      // Only show slots for the student's registered modules
      setSlots(allSlots.filter((sl) => s.registeredCourses.includes(sl.moduleCode)));
    } else {
      setSlots(allSlots);
    }
  }, []);

  if (!student || !student.registrationApproved) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <Calendar className="w-12 h-12 text-slate-500 mx-auto" />
        <h2 className="text-xl font-bold text-white font-serif">Timetable Not Yet Available</h2>
        <p className="text-sm text-slate-400">
          Your semester timetable will be accessible once your registration is approved and tuition is cleared.
        </p>
        <Link href="/student/dashboard" className="inline-block px-5 py-2 rounded-xl bg-amber-400 text-slate-950 font-bold text-xs mt-2">
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const slotsByDay = DAYS.reduce((acc, day) => {
    acc[day] = slots.filter((sl) => sl.dayOfWeek === day);
    return acc;
  }, {} as Record<string, TimetableSlot[]>);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div>
        <Link href="/student/dashboard" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-3">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-extrabold text-white font-serif">Weekly Timetable</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          {student.currentSemester} • {student.programmeName} • {student.admissionYear}
        </p>
      </div>

      {/* Student Badge */}
      <div className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-2xl shadow-xl">
        <div className="w-12 h-12 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0">
          <BookOpen className="w-5 h-5 text-amber-400" />
        </div>
        <div>
          <div className="text-sm font-bold text-white">{student.fullName}</div>
          <div className="text-xs text-slate-400 font-mono">{student.studentIdNumber}</div>
          <div className="text-xs text-emerald-400 font-semibold mt-0.5">
            Registration Active • {slots.length} Scheduled Classes This Week
          </div>
        </div>
      </div>

      {/* Weekly Grid */}
      <div className="space-y-4">
        {DAYS.map((day) => {
          const daySlots = slotsByDay[day];
          if (daySlots.length === 0) return null;

          return (
            <div key={day} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
              {/* Day Header */}
              <div className="flex items-center justify-between px-6 py-3.5 border-b border-slate-800 bg-slate-950">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <h2 className="font-bold text-white text-sm">{day}</h2>
                </div>
                <span className="text-[11px] text-slate-400">{daySlots.length} class{daySlots.length > 1 ? 'es' : ''}</span>
              </div>

              {/* Day's Classes */}
              <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {daySlots.map((slot) => (
                  <div
                    key={slot.id}
                    className={`p-4 rounded-xl border ${DAY_COLORS[day] || 'bg-slate-800 border-slate-700'} space-y-2.5`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-slate-950/60 text-amber-400">
                        {slot.moduleCode}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] text-slate-400">
                        <Clock className="w-3 h-3" />
                        <span>{slot.startTime} – {slot.endTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xs font-bold text-white leading-snug">{slot.moduleTitle}</h3>

                    <div className="space-y-1 text-[11px] text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{slot.lecturerName}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-slate-500 shrink-0" />
                        <span>{slot.room}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Campus Info Footer */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 text-xs text-slate-400 flex items-start gap-3">
        <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-white">Campus Location:</strong>{' '}
          Hill Station, Freetown, Sierra Leone — All classes are held at the main campus unless
          otherwise notified by your lecturer.
        </div>
      </div>
    </div>
  );
}
