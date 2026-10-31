/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, CheckCircle2, MessageCircle, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { COPY_DATA } from '../copyData';

interface HeroProps {
  onSeeHowItWorks: () => void;
  onTryDemo: () => void;
  showServingBadge?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ 
  onSeeHowItWorks, 
  onTryDemo,
  showServingBadge = true 
}) => {
  const { hero } = COPY_DATA;

  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-b border-neutral-200 overflow-hidden">
      {/* Subtle background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-100 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 bg-teal-100 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Social Proof Feature Flag: Currently Serving 50+ Clinics Badge */}
        {showServingBadge && (
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-800 bg-white border border-slate-200/90 shadow-2xs px-3.5 py-1.5 rounded-lg mb-4">
            <span className="font-bold text-emerald-700">Currently Serving 50+ Clinics</span>
            <span className="text-slate-300" aria-hidden="true">·</span>
            <span className="text-slate-600">Across Bengaluru, Mumbai, Delhi & Pune</span>
          </div>
        )}

        {/* Unboxed clean metadata kicker */}
        <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 tracking-wide uppercase mb-4">
          <span>{hero.badge}</span>
          <span aria-hidden="true">·</span>
          <span>WhatsApp Auto-Receptionist</span>
        </div>

        {/* Hero headline - punchy pain point focus */}
        <h1 
          className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-6 max-w-4xl mx-auto"
          style={{ textWrap: 'balance' }}
        >
          {hero.headline}
        </h1>

        {/* Clear sub-headline */}
        <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto mb-8 font-normal">
          {hero.subheadline}
        </p>

        {/* Primary CTA and Secondary Demo Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <button
            onClick={onSeeHowItWorks}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <span>{hero.ctaPrimary}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onTryDemo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-slate-800 bg-white hover:bg-slate-100 active:bg-slate-200 border border-slate-300 rounded-xl shadow-xs transition-all"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600" />
            <span>{hero.ctaSecondary}</span>
          </button>
        </div>

        {/* Micro-guarantee */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs sm:text-sm text-slate-500 font-medium">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>5-Second WhatsApp Reply</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Direct to Google Sheets</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Zero Staff Training Needed</span>
          </div>
        </div>

        {/* Fast reality check banner */}
        <div className="mt-12 p-4 sm:p-5 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 border border-amber-200">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-amber-800">The 5-Minute Window</p>
              <p className="text-sm font-medium text-slate-700">
                Patients in pain contact the first clinic that answers. After 15 minutes of silence, 78% book with another doctor.
              </p>
            </div>
          </div>
          <button
            onClick={onTryDemo}
            className="shrink-0 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-4"
          >
            See Live Speed Test →
          </button>
        </div>
      </div>
    </section>
  );
};
