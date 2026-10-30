'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  PlusCircle,
  Copy,
  CheckCircle2,
  AlertCircle,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Printer,
  Sparkles
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { ApplicationCode, PaymentRecord } from '@/lib/types';

export default function FinanceDashboardPage() {
  const [codes, setCodes] = useState<ApplicationCode[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unused' | 'redeemed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Modal State for new payment entry
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPayer, setNewPayer] = useState({
    name: '',
    email: '',
    phone: '',
    amount: 250,
    currency: 'SLE',
    method: 'bank_deposit_slip' as PaymentRecord['paymentMethod'],
    reference: '',
    notes: ''
  });
  const [newCodeGenerated, setNewCodeGenerated] = useState<{
    code: string;
    receipt: string;
  } | null>(null);

  const refreshData = () => {
    setCodes(AppStore.getCodes());
    setPayments(AppStore.getPayments());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCreatePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPayer.name.trim() || !newPayer.reference.trim()) {
      alert('Please enter payer name and payment reference.');
      return;
    }

    const res = AppStore.recordPaymentAndIssueCode({
      payerName: newPayer.name,
      payerEmail: newPayer.email,
      payerPhone: newPayer.phone,
      amount: newPayer.amount,
      currency: newPayer.currency,
      paymentMethod: newPayer.method,
      bankReference: newPayer.reference,
      recordedBy: 'Finance Officer (Alpha Mansaray)',
      notes: newPayer.notes
    });

    setNewCodeGenerated({
      code: res.code.code,
      receipt: res.payment.receiptNumber
    });
    refreshData();
  };

  // Filtered List
  const filteredCodes = codes.filter((c) => {
    const matchesFilter =
      filterStatus === 'all'
        ? true
        : filterStatus === 'unused'
        ? !c.isRedeemed
        : c.isRedeemed;

    const matchesSearch =
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.issuedToName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const totalRevenue = payments.reduce((acc, curr) => acc + curr.amount, 0);
  const totalUnused = codes.filter((c) => !c.isRedeemed).length;
  const totalRedeemed = codes.filter((c) => c.isRedeemed).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Finance & Accounts Directorate
            </span>
            <span className="text-xs text-slate-400">Application Voucher Management</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white font-serif mt-1">
            Finance Cashier & Voucher Terminal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Record verified bank, cash, or mobile money payments and issue unpredictable, single-use application codes.
          </p>
        </div>

        <button
          onClick={() => {
            setNewCodeGenerated(null);
            setNewPayer({
              name: '',
              email: '',
              phone: '',
              amount: 250,
              currency: 'SLE',
              method: 'bank_deposit_slip',
              reference: '',
              notes: ''
            });
            setIsModalOpen(true);
          }}
          className="px-5 py-3 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition self-start md:self-auto"
        >
          <PlusCircle className="w-4 h-4" /> Record Payment & Issue Voucher Code
        </button>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Total Application Collections</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white mt-2">
            {totalRevenue.toLocaleString()} <span className="text-sm text-emerald-400">SLE</span>
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            {payments.length} verified fee transactions
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Unused Vouchers (Active)</span>
            <CreditCard className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-amber-400 mt-2">
            {totalUnused}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Awaiting student redemption on portal
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Redeemed Codes (Single-Use Locked)</span>
            <ShieldCheck className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-purple-400 mt-2">
            {totalRedeemed}
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Permanently bound to submitted applications
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterStatus === 'all'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            All Codes ({codes.length})
          </button>
          <button
            onClick={() => setFilterStatus('unused')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterStatus === 'unused'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Unused ({totalUnused})
          </button>
          <button
            onClick={() => setFilterStatus('redeemed')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              filterStatus === 'redeemed'
                ? 'bg-amber-400 text-slate-950'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Redeemed ({totalRedeemed})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search code, name, receipt..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      {/* Codes Registry Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950 text-slate-400 uppercase font-mono text-[11px]">
                <th className="py-3.5 px-4">Voucher Code</th>
                <th className="py-3.5 px-4">Issued To</th>
                <th className="py-3.5 px-4">Receipt Ref</th>
                <th className="py-3.5 px-4">Amount</th>
                <th className="py-3.5 px-4">Single-Use Status</th>
                <th className="py-3.5 px-4">Expiry Date</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredCodes.map((c) => (
                <tr key={c.id} className="hover:bg-slate-850/50 transition">
                  <td className="py-3.5 px-4 font-mono font-bold text-white flex items-center gap-2">
                    <span className="text-amber-400">{c.code}</span>
                    <button
                      onClick={() => handleCopy(c.code)}
                      title="Copy code"
                      className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                    >
                      {copiedCode === c.code ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                      )}
                    </button>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{c.issuedToName}</div>
                    <div className="text-[11px] text-slate-400">{c.issuedToEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{c.receiptNumber}</td>
                  <td className="py-3.5 px-4 font-mono font-semibold text-white">
                    {c.amount} {c.currency}
                  </td>
                  <td className="py-3.5 px-4">
                    {c.isRedeemed ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-950/80 border border-purple-800 text-purple-300">
                        <CheckCircle2 className="w-3 h-3" /> Redeemed & Locked
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-950/80 border border-emerald-800 text-emerald-300">
                        <Sparkles className="w-3 h-3" /> Active / Unused
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                    {new Date(c.expiresAt).toLocaleDateString()}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => handleCopy(c.code)}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-amber-400 font-semibold text-[11px] transition"
                    >
                      {copiedCode === c.code ? 'Copied!' : 'Copy Code'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL: Record Payment & Generate Single-Use Code */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-white text-base font-serif">
                  Record Fee & Generate Voucher
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            {newCodeGenerated ? (
              <div className="space-y-4 text-center py-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-lg font-bold text-white">Voucher Code Created Successfully!</h4>
                <p className="text-xs text-slate-400">
                  Payment has been logged into the general ledger. Provide this single-use code to the applicant:
                </p>

                <div className="p-4 rounded-2xl bg-slate-950 border border-amber-400/30 text-center space-y-2">
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider">
                    Single-Use Voucher Code
                  </div>
                  <div className="text-2xl font-black font-mono text-amber-400 tracking-wider">
                    {newCodeGenerated.code}
                  </div>
                  <div className="text-xs text-slate-400 font-mono">
                    Receipt Ref: {newCodeGenerated.receipt}
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={() => handleCopy(newCodeGenerated.code)}
                    className="flex-1 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                  >
                    <Copy className="w-4 h-4" /> Copy Code
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreatePayment} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="text-slate-300 font-semibold">Payer Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sahr Thomas"
                    value={newPayer.name}
                    onChange={(e) => setNewPayer({ ...newPayer, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Payer Email</label>
                    <input
                      type="email"
                      placeholder="student@gmail.com"
                      value={newPayer.email}
                      onChange={(e) => setNewPayer({ ...newPayer, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Phone Number</label>
                    <input
                      type="text"
                      placeholder="+232 7X XXXXXX"
                      value={newPayer.phone}
                      onChange={(e) => setNewPayer({ ...newPayer, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Payment Channel</label>
                    <select
                      value={newPayer.method}
                      onChange={(e) =>
                        setNewPayer({
                          ...newPayer,
                          method: e.target.value as PaymentRecord['paymentMethod']
                        })
                      }
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-emerald-400"
                    >
                      <option value="bank_deposit_slip">Bank Deposit Slip (Rokel / SLCB)</option>
                      <option value="orange_money">Orange Money</option>
                      <option value="afrimoney">Afrimoney</option>
                      <option value="cash_office">Cashier Office Counter</option>
                      <option value="direct_transfer">Direct Bank Transfer</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-slate-300 font-semibold">Bank / SMS Reference No. *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SL-CB-99120"
                      value={newPayer.reference}
                      onChange={(e) => setNewPayer({ ...newPayer, reference: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-emerald-400 font-mono"
                    />
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <span className="text-slate-400">Application Voucher Status:</span>
                  <span className="font-bold text-emerald-400 text-xs">
                    Official Clearance &amp; Code Generation
                  </span>
                </div>

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 font-semibold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition"
                  >
                    Confirm & Issue Code
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
