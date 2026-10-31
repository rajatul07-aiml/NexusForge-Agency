/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, ShieldCheck, Stethoscope, Building2, Activity, Users } from 'lucide-react';

export const TrustedByMarquee: React.FC = () => {
  const partners = [
    {
      name: 'IDA Member Practices',
      descriptor: 'Indian Dental Association Affiliated',
      icon: Award
    },
    {
      name: 'NABH Accredited Centers',
      descriptor: 'National Accreditation Board Standards',
      icon: ShieldCheck
    },
    {
      name: 'Multi-Chair Dental Hospitals',
      descriptor: 'Private Hospital Networks',
      icon: Building2
    },
    {
      name: 'Indian Implantology Forum',
      descriptor: 'Implant & Oral Surgery Clinics',
      icon: Stethoscope
    },
    {
      name: 'Orthodontic Specialist Group',
      descriptor: 'Braces & Clear Aligner Practices',
      icon: Activity
    },
    {
      name: 'Pediatric Dental Care Network',
      descriptor: 'Family & Children Dental Care',
      icon: Users
    }
  ];

  return (
    <section className="bg-slate-100/80 border-b border-slate-200 py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Top Quantitative Clients Summary Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-7 pb-6 border-b border-slate-200/80 text-center">
          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              50+
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">
              Dental Clinics Served
            </div>
          </div>

          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              14,500+
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">
              WhatsApp Inquiries Handled
            </div>
          </div>

          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono tabular-nums">
              ₹1.8 Cr+
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">
              Patient Collections Recovered
            </div>
          </div>

          <div className="p-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 font-mono tabular-nums">
              99.4%
            </div>
            <div className="text-xs font-semibold text-slate-600 mt-0.5">
              Instant 5-Second Response Rate
            </div>
          </div>
        </div>

        {/* Marquee Header Label */}
        <div className="text-center mb-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
            Trusted By Clinics, Doctors & Medical Associations Across India
          </p>
        </div>

        {/* Marquee Track Container */}
        <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex items-center gap-6 sm:gap-8 animate-marquee">
            
            {/* First sequence of partners */}
            {partners.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={`partner-1-${idx}`}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs shrink-0 hover:border-emerald-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900 whitespace-nowrap">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-slate-500 whitespace-nowrap">
                      {p.descriptor}
                    </p>
                  </div>
                </div>
              );
            })}

            {/* Repeated sequence for infinite smooth loop */}
            {partners.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={`partner-2-${idx}`}
                  className="flex items-center gap-3 px-4 py-2.5 bg-white rounded-xl border border-slate-200/90 shadow-2xs shrink-0 hover:border-emerald-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                    <IconComp className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-900 whitespace-nowrap">
                      {p.name}
                    </p>
                    <p className="text-[10px] text-slate-500 whitespace-nowrap">
                      {p.descriptor}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

      </div>
    </section>
  );
};
