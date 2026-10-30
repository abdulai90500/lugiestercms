'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Layers,
  Settings,
  ShieldAlert,
  Database,
  RefreshCw,
  Clock,
  BookOpen,
  DollarSign,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { INITIAL_PROGRAMMES } from '@/lib/data';

export default function AdminDashboardPage() {
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [cycleConfig, setCycleConfig] = useState({
    academicYear: '2026/2027',
    semester: 'Semester 1 (September Intake)',
    applicationFee: '250.00',
    currency: 'SLE',
    deadline: '2026-11-30'
  });
  const [savedNotice, setSavedNotice] = useState(false);

  useEffect(() => {
    setAuditLogs(AppStore.getAuditLogs());
  }, []);

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all local MVP data to original demo seeds?')) {
      AppStore.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
              System Administration
            </span>
            <span className="text-xs text-slate-400">Institutional Configurations & Audit</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-serif mt-1">
            Registry System Administrator
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Configure admission cycles, academic catalog, user roles, and monitor system audit logs.
          </p>
        </div>

        <button
          onClick={handleResetData}
          className="px-4 py-2.5 rounded-xl bg-slate-900 border border-rose-800/80 text-rose-300 hover:bg-rose-950/60 font-semibold text-xs flex items-center gap-2 transition self-start sm:self-auto"
        >
          <RefreshCw className="w-4 h-4" /> Reset Demo Database
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Admission Cycle Settings */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
            <Settings className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white font-serif">
              Active Admission Cycle
            </h2>
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Academic Session</label>
              <input
                type="text"
                value={cycleConfig.academicYear}
                onChange={(e) => setCycleConfig({ ...cycleConfig, academicYear: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Intake Description</label>
              <input
                type="text"
                value={cycleConfig.semester}
                onChange={(e) => setCycleConfig({ ...cycleConfig, semester: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Processing Mode</label>
                <input
                  type="text"
                  value="Voucher Verified"
                  disabled
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-slate-300 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-slate-300 font-semibold">Currency</label>
                <input
                  type="text"
                  disabled
                  value={cycleConfig.currency}
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 font-mono"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-slate-300 font-semibold">Application Deadline</label>
              <input
                type="date"
                value={cycleConfig.deadline}
                onChange={(e) => setCycleConfig({ ...cycleConfig, deadline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            {savedNotice && (
              <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Configuration changes saved successfully.</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs transition"
            >
              Update Admission Parameters
            </button>
          </form>
        </div>

        {/* Audit Trail & Activity Log */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold text-white font-serif">
                System Audit Trail & Security Logs
              </h2>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Live Event Stream
            </span>
          </div>

          <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-2">
            {auditLogs.map((log) => (
              <div
                key={log.id}
                className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-xs space-y-1 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-400 font-mono text-[11px]">
                    {log.action}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">
                    {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>
                <div className="text-slate-300 text-xs">{log.details}</div>
                <div className="text-[10px] text-slate-500">
                  Actor: <span className="text-slate-400">{log.actor}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
