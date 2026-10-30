'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  CreditCard,
  Printer,
  Download,
  CheckCircle2,
  Receipt,
  ArrowLeft,
  ShieldCheck,
  Building2,
  Calendar,
  DollarSign
} from 'lucide-react';
import { AppStore } from '@/lib/store';
import { PaymentRecord, ApplicationCode } from '@/lib/types';

export default function StudentPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [selectedReceipt, setSelectedReceipt] = useState<PaymentRecord | null>(null);

  useEffect(() => {
    const list = AppStore.getPayments();
    setPayments(list);
    if (list.length > 0) {
      setSelectedReceipt(list[0]);
    }
  }, []);

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link
            href="/student/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Student Dashboard
          </Link>
          <h1 className="text-3xl font-extrabold text-white font-serif">
            Application Payment & Official Receipts
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Verified university fees recorded by the Finance & Accounts Directorate.
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 transition self-start sm:self-auto"
        >
          <Printer className="w-4 h-4" /> Print Official Receipt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment History List */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono">
            Transaction History
          </h2>

          <div className="space-y-3">
            {payments.map((p) => (
              <div
                key={p.id}
                onClick={() => setSelectedReceipt(p)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedReceipt?.id === p.id
                    ? 'bg-amber-400/10 border-amber-400 shadow-lg'
                    : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-mono font-bold text-amber-400">{p.receiptNumber}</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                  </span>
                </div>
                <div className="text-xs font-semibold text-white truncate">{p.payerName}</div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-800/80">
                  <span>{new Date(p.createdAt).toLocaleDateString()}</span>
                  <span className="font-mono font-bold text-white text-xs">
                    {p.amount} {p.currency}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Printable Official Receipt Preview */}
        <div className="lg:col-span-2">
          {selectedReceipt ? (
            <div
              id="printable-receipt"
              className="bg-white text-slate-900 rounded-3xl p-8 sm:p-12 shadow-2xl border border-slate-200 relative overflow-hidden print:p-0 print:border-none print:shadow-none"
            >
              {/* University Seal Background watermark */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <Image
                  src="/logo.png"
                  alt="Watermark"
                  width={380}
                  height={380}
                  className="object-contain"
                />
              </div>

              {/* Receipt Header */}
              <div className="flex items-start justify-between border-b-2 border-slate-900 pb-6 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-slate-900/5 p-1 flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="LungiCEST"
                      width={56}
                      height={56}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold font-serif tracking-tight text-slate-950">
                      LUNGICEST
                    </h2>
                    <p className="text-xs font-semibold text-slate-600">
                      LUNGI COLLEGE OF EDUCATION, SCIENCE & TECHNOLOGY
                    </p>
                    <p className="text-[10px] text-slate-500">
                      Finance & Accounts Directorate • Lungi, Port Loko District
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded bg-slate-100 text-slate-800 font-mono text-xs font-bold border border-slate-200">
                    OFFICIAL RECEIPT
                  </span>
                  <div className="text-base font-extrabold font-mono text-slate-950 mt-1">
                    {selectedReceipt.receiptNumber}
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Date: {new Date(selectedReceipt.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Receipt Body */}
              <div className="py-6 space-y-6 relative z-10 text-xs">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
                  <div>
                    <div className="text-slate-500 text-[11px]">Received From:</div>
                    <div className="font-bold text-sm text-slate-900">{selectedReceipt.payerName}</div>
                    <div className="text-slate-600 text-[11px]">{selectedReceipt.payerEmail}</div>
                  </div>
                  <div>
                    <div className="text-slate-500 text-[11px]">Payment Method & Reference:</div>
                    <div className="font-semibold text-slate-900 uppercase">
                      {selectedReceipt.paymentMethod.replace(/_/g, ' ')}
                    </div>
                    <div className="font-mono text-slate-700 text-[11px]">
                      Ref: {selectedReceipt.bankReference}
                    </div>
                  </div>
                </div>

                {/* Purpose Table */}
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-500 text-[11px]">
                      <th className="py-2.5 font-bold uppercase">Description / Purpose</th>
                      <th className="py-2.5 font-bold uppercase text-right">Amount Paid</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="py-3 font-semibold text-slate-800">
                        Undergraduate Application & Admission Processing Fee (Cycle 2026/2027)
                        <div className="text-[10px] text-slate-500 font-normal">
                          Includes generation of unpredictable, single-use application voucher code.
                        </div>
                      </td>
                      <td className="py-3 text-right font-mono font-bold text-sm text-slate-950">
                        {selectedReceipt.amount.toFixed(2)} {selectedReceipt.currency}
                      </td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr className="border-t-2 border-slate-900 font-bold text-sm">
                      <td className="py-3 uppercase text-slate-700">Total Settled (SLE)</td>
                      <td className="py-3 text-right font-mono text-slate-950 text-base">
                        {selectedReceipt.amount.toFixed(2)} {selectedReceipt.currency}
                      </td>
                    </tr>
                  </tfoot>
                </table>

                {/* Verification Stamp & Signature */}
                <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-500">Verified & Recorded By:</div>
                    <div className="font-bold text-slate-900">{selectedReceipt.recordedBy}</div>
                    <div className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" /> Finance Audit Seal Verified
                    </div>
                  </div>

                  <div className="text-center p-3 rounded-xl border-2 border-dashed border-emerald-600/40 bg-emerald-50 text-emerald-800 text-[10px]">
                    <div className="font-extrabold uppercase tracking-widest text-emerald-700">
                      PAID & CLEARED
                    </div>
                    <div className="font-mono text-[9px] mt-0.5">LUNGICEST ACCOUNTS</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">No payment selected.</div>
          )}
        </div>
      </div>
    </div>
  );
}
