/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AlertCircle, Moon, PhoneOff, FileSpreadsheet, XCircle, ArrowRight } from 'lucide-react';
import { COPY_DATA } from '../copyData';

export const TheProblem: React.FC = () => {
  const { theProblem } = COPY_DATA;

  const icons = [Moon, PhoneOff, FileSpreadsheet];
  const losses = ["₹8,000 Lost", "₹45,000 Lost", "Ad Budget Wasted"];

  return (
    <section id="the-problem" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Section kicker & title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-700 tracking-wider uppercase mb-3">
            <span>{theProblem.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>Why Empty Chairs Happen</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {theProblem.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {theProblem.intro}
          </p>
        </div>

        {/* 3 Core Problem Bullet Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {theProblem.points.map((pt, idx) => {
            const IconComponent = icons[idx];
            return (
              <div
                key={pt.number}
                className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {pt.number}
                    </span>
                    <span className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2.5 py-0.5 rounded-md">
                      {losses[idx]}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-rose-600 flex items-center justify-center mb-4 shadow-2xs">
                    <IconComponent className="w-5 h-5" />
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {pt.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {pt.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-rose-800 font-semibold flex items-center gap-1.5">
                  <XCircle className="w-3.5 h-3.5 shrink-0" />
                  <span>Lead Leaked to Competitor</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Concrete Clinic Contrast Table */}
        <div className="mt-14 bg-gradient-to-r from-rose-50/50 via-slate-50 to-emerald-50/50 rounded-2xl p-6 sm:p-8 border border-slate-200">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-4 text-center">
            What Happens to a Dental Lead Right Now vs With NexusForge
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
            {/* Without NexusForge */}
            <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-2xs">
              <div className="flex items-center gap-2 text-rose-700 font-bold mb-3 uppercase tracking-wide text-xs">
                <XCircle className="w-4 h-4 shrink-0" />
                <span>Without NexusForge (Your Clinic Today)</span>
              </div>
              <ul className="space-y-2.5 text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Inquiries after 8 PM sit unread until the next morning.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Busy receptionist misses phone calls during doctor consultations.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Patient phones are written on paper slips that get misplaced.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold shrink-0">✕</span>
                  <span>Patients in pain go to the first clinic that answers on WhatsApp.</span>
                </li>
              </ul>
            </div>

            {/* With NexusForge */}
            <div className="bg-white p-5 rounded-xl border border-emerald-300 shadow-2xs">
              <div className="flex items-center gap-2 text-emerald-700 font-bold mb-3 uppercase tracking-wide text-xs">
                <AlertCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>With NexusForge Auto-Receptionist</span>
              </div>
              <ul className="space-y-2.5 text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>WhatsApp message goes out automatically in 5 seconds flat.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>Patient picks an available time slot right on WhatsApp.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>Patient details appear neatly in your Google Sheet.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold shrink-0">✓</span>
                  <span>Your receptionist just calls to confirm the booking in the morning.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
