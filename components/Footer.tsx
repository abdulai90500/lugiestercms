'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink, ShieldCheck, MessageSquare, Award } from 'lucide-react';
import { INSTITUTION } from '@/lib/data';

export default function Footer() {
  const pathname = usePathname();
  if (pathname === '/') {
    return null;
  }

  return (
    <footer className="bg-[#081626] border-t border-[#1e3a5f] text-slate-400 text-xs">
      {/* Top recognition banner */}
      <div className="bg-[#0c2037] border-b border-[#1e3a5f] py-4 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <Award className="w-5 h-5 text-[#d6b76e] shrink-0" />
            <div>
              <span className="text-white font-bold">Academic Affiliation: </span>
              <span className="text-slate-300">Milton Margai Technical University (MMTU)</span>
            </div>
          </div>
          <div className="hidden md:block w-px h-6 bg-[#1e3a5f]" />
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#d6b76e] shrink-0" />
            <div>
              <span className="text-white font-bold">Official Accreditation: </span>
              <span className="text-slate-300">Accredited by TEC &amp; NCTVA</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/20 shrink-0">
                <Image
                  src="/logo.png"
                  alt="LUNGICEST Crest"
                  width={44}
                  height={44}
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="font-extrabold text-white text-base font-display">
                  LUNGICEST
                </h3>
                <p className="text-slate-300 text-xs font-medium">
                  Lungi College of Education Science &amp; Technology
                </p>
                <p className="text-[#d6b76e] text-[11px] italic">
                  Education that transforms communities.
                </p>
              </div>
            </div>
            <p className="text-slate-400 max-w-md leading-relaxed text-xs">
              Building skills, developing talent and creating opportunities for the people of Kaffu Bullom and Sierra Leone. Providing relevant mainstream, technical, vocational education and training.
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={INSTITUTION.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-600/30 font-semibold transition text-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Admissions
              </a>
              <span className="text-[11px] text-slate-400">
                Official Registry &amp; Student Management Portal
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-display">
              Admissions &amp; Catalog
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/#academics" className="hover:text-[#d6b76e] transition">
                  Academic Programmes (01–05)
                </Link>
              </li>
              <li>
                <Link href="/student/apply" className="hover:text-[#d6b76e] transition">
                  Online Application Form
                </Link>
              </li>
              <li>
                <Link href="/student/tracking" className="hover:text-[#d6b76e] transition">
                  Track Application Status
                </Link>
              </li>
              <li>
                <Link href="/student/dashboard" className="hover:text-[#d6b76e] transition">
                  Student Portal &amp; Timetable
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#d6b76e] transition">
                  Staff Administrative Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white text-xs uppercase tracking-wider font-display">
              College Contact
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#d6b76e] shrink-0 mt-0.5" />
                <span>Lungi, Sierra Leone (Kaffu Bullom, Port Loko District)</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href="tel:+23277528393" className="hover:text-white transition">
                  +232 77 528393
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:info@lungicest.edu.sl" className="hover:text-white transition">
                  info@lungicest.edu.sl
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[#1e3a5f] flex flex-col sm:flex-row items-center justify-between text-slate-400 text-[11px] gap-4">
          <p>© 2026 Lungi College of Education Science &amp; Technology (LUNGICEST). All rights reserved.</p>
          <div className="flex items-center gap-3">
            <span className="text-[#d6b76e]">Learning with purpose. Growing together.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
