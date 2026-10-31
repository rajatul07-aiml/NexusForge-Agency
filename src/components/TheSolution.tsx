/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CheckCircle2, Zap, Clock, ShieldCheck, HeartHandshake } from 'lucide-react';
import { COPY_DATA } from '../copyData';

interface TheSolutionProps {
  onBookCall: () => void;
}

export const TheSolution: React.FC<TheSolutionProps> = ({ onBookCall }) => {
  const { theSolution } = COPY_DATA;

  return (
    <section id="the-solution" className="py-16 md:py-24 bg-slate-50 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 tracking-wider uppercase mb-3">
            <span>{theSolution.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>Simple & Reliable</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3"
            style={{ textWrap: 'balance' }}
          >
            {theSolution.title}
          </h2>
          <p className="text-lg sm:text-xl text-emerald-700 font-semibold">
            {theSolution.subtitle}
          </p>
        </div>

        {/* Story Block - spoken directly to 45yo clinic owner */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-slate-200 shadow-sm mb-12">
          <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed max-w-3xl">
            {theSolution.story.map((paragraph, index) => (
              <p key={index} className={index === 0 ? "font-bold text-slate-900 text-lg sm:text-xl" : ""}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Uses Your Clinic's Official WhatsApp Number</span>
            </div>
            <button
              onClick={onBookCall}
              className="text-xs sm:text-sm font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
            >
              See It Working Live On Your Phone →
            </button>
          </div>
        </div>

        {/* 4 Core Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {theSolution.highlights.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm mb-4 border border-emerald-100">
                0{idx + 1}
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
