/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, ArrowRight, ClipboardCheck } from 'lucide-react';

interface ClinicAuditChecklistProps {
  onBookCall: () => void;
}

interface AuditItem {
  id: string;
  question: string;
  detail: string;
  costIfNo: string;
}

const AUDIT_QUESTIONS: AuditItem[] = [
  {
    id: 'q1',
    question: 'Does your clinic answer messages after 8 PM in under 5 minutes?',
    detail: 'Patients with nighttime tooth pain message multiple clinics and choose the first one that answers.',
    costIfNo: '₹8,000+ lost per missed emergency case'
  },
  {
    id: 'q2',
    question: 'Are patient inquiries logged automatically without writing on paper?',
    detail: 'Paper notes and loose register slips get misplaced, forgotten, or never called back.',
    costIfNo: 'Wasted online ad and Google listing spend'
  },
  {
    id: 'q3',
    question: 'Can patients book when your front desk is busy with patients or billing?',
    detail: 'Peak rush hours (11 AM and 6 PM) cause receptionists to miss high-value consultation calls.',
    costIfNo: '₹25,000+ lost per orthodontic/implant lead'
  },
  {
    id: 'q4',
    question: 'Do you send automated WhatsApp reminders to stop patient no-shows?',
    detail: 'Unconfirmed appointments lead to empty chairs and wasted doctor time.',
    costIfNo: '2 to 3 empty chair hours every week'
  }
];

export const ClinicAuditChecklist: React.FC<ClinicAuditChecklistProps> = ({ onBookCall }) => {
  const [answers, setAnswers] = useState<Record<string, boolean>>({
    q1: false,
    q2: false,
    q3: false,
    q4: true
  });

  const toggleAnswer = (id: string, value: boolean) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const noCount = Object.values(answers).filter(val => val === false).length;

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-700 tracking-wider uppercase mb-3">
            <ClipboardCheck className="w-4 h-4" />
            <span>Clinic Self-Assessment</span>
            <span aria-hidden="true">·</span>
            <span>2-Minute Check</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Is Your Clinic Silently Leaking Dental Patients?
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Answer these 4 questions honestly to check your clinic's patient capture health.
          </p>
        </div>

        {/* Audit Questions Box */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          {AUDIT_QUESTIONS.map((item, idx) => {
            const isYes = answers[item.id] === true;
            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-2xl bg-slate-50/70 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
              >
                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      0{idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-bold text-slate-900">
                      {item.question}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 leading-normal">
                    {item.detail}
                  </p>
                  {!isYes && (
                    <p className="text-[11px] font-semibold text-rose-700">
                      Risk: {item.costIfNo}
                    </p>
                  )}
                </div>

                {/* Yes / No Toggle buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => toggleAnswer(item.id, true)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      isYes
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleAnswer(item.id, false)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg border transition-all cursor-pointer ${
                      !isYes
                        ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-400'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            );
          })}

          {/* Assessment Result Summary */}
          <div className="pt-6 border-t border-slate-200 mt-6">
            <div className={`p-5 rounded-2xl border ${
              noCount >= 2 
                ? 'bg-rose-50/80 border-rose-200 text-rose-950' 
                : 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
            }`}>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {noCount >= 2 ? (
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    <h4 className="text-base font-extrabold text-slate-900">
                      {noCount >= 2
                        ? `Audit Result: High Patient Leakage Detected (${noCount} of 4 points failing)`
                        : `Audit Result: Moderate Patient Capture (${4 - noCount} of 4 points passing)`}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed max-w-xl">
                    {noCount >= 2
                      ? 'Your clinic is likely losing 3 to 6 patients every week to nearby clinics that answer first on WhatsApp. NexusForge fixes all 4 points in under 48 hours.'
                      : 'You have good basics in place, but fixing the remaining gaps will ensure you capture after-hours dental inquiries 24/7.'}
                  </p>
                </div>

                <button
                  onClick={onBookCall}
                  className="shrink-0 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  <span>Plug These Gaps Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
