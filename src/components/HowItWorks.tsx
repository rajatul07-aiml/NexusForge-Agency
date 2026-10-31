/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { MousePointerClick, MessageSquare, CalendarCheck2, ArrowRight } from 'lucide-react';
import { COPY_DATA } from '../copyData';

interface HowItWorksProps {
  onBookCall: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onBookCall }) => {
  const { howItWorks } = COPY_DATA;

  const stepIcons = [MousePointerClick, MessageSquare, CalendarCheck2];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 tracking-wider uppercase mb-3">
            <span>{howItWorks.kicker}</span>
            <span aria-hidden="true">·</span>
            <span>Zero Tech Jargon</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            {howItWorks.title}
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            {howItWorks.subtitle}
          </p>
        </div>

        {/* 3 Step Flow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {howItWorks.steps.map((st, idx) => {
            const IconComp = stepIcons[idx];
            return (
              <div
                key={st.step}
                className="relative bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-colors"
              >
                <div>
                  {/* Step number badge & icon */}
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100/70 px-2.5 py-1 rounded-md">
                      {st.step}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 text-emerald-600 flex items-center justify-center shadow-2xs">
                      <IconComp className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {st.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed font-normal">
                    {st.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-semibold text-slate-500">
                  {idx === 0 && 'Instant trigger upon click'}
                  {idx === 1 && 'Average response time: 3.4 seconds'}
                  {idx === 2 && 'Logged into your Google Sheet'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Callout for Clinic Staff */}
        <div className="mt-12 p-6 bg-slate-100 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div className="space-y-1">
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              Does your staff need to learn any complicated new tools?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              No. If your receptionist can look at a Google Sheet on a laptop or tablet, that is all they ever need to do.
            </p>
          </div>
          <button
            onClick={onBookCall}
            className="shrink-0 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
          >
            See Live In Action →
          </button>
        </div>

      </div>
    </section>
  );
};
