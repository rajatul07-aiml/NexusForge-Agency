/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, MessageSquare } from 'lucide-react';
import { COPY_DATA } from '../copyData';
import { DemoBookingForm } from '../types';

interface CallToActionProps {
  onOpenBookingModal?: () => void;
}

export const CallToAction: React.FC<CallToActionProps> = ({ onOpenBookingModal }) => {
  const { cta } = COPY_DATA;

  const [form, setForm] = useState<DemoBookingForm>({
    doctorName: '',
    clinicName: '',
    phone: '',
    city: '',
    chairs: '3-5 chairs',
    preferredTime: 'Tomorrow afternoon'
  });

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.doctorName.trim() || !form.phone.trim() || !form.clinicName.trim()) {
      setErrorMsg('Please enter your name, clinic name, and WhatsApp number.');
      return;
    }
    setErrorMsg('');
    setSubmitted(true);
  };

  return (
    <section id="cta-section" className="py-16 md:py-24 bg-gradient-to-b from-slate-900 to-neutral-950 text-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="bg-slate-900/90 rounded-3xl p-6 sm:p-12 border border-slate-800 shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Direct Response Copy Left Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 tracking-wider uppercase">
                <span>{cta.kicker}</span>
                <span aria-hidden="true">·</span>
                <span>Live Test On Your Phone</span>
              </div>

              <h2 
                className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight"
                style={{ textWrap: 'balance' }}
              >
                {cta.title}
              </h2>

              <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
                {cta.description}
              </p>

              <p className="text-base sm:text-lg text-slate-200 leading-relaxed font-medium">
                {cta.actionPrompt}
              </p>

              <div className="p-4 bg-slate-800/80 rounded-xl border border-slate-700 text-sm text-emerald-300 font-semibold">
                👉 {cta.pitch}
              </div>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400 font-medium">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Free 10-minute call
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Custom demo on your number
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Zero technical skills needed
                </span>
              </div>
            </div>

            {/* Direct Booking Form Right Column (5 cols) */}
            <div className="lg:col-span-5 bg-white text-slate-900 rounded-2xl p-6 sm:p-7 shadow-xl border border-slate-100">
              
              {submitted ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">
                    Demo Call Scheduled!
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Thank you, <strong className="text-slate-900">{form.doctorName}</strong>. We have booked your 10-minute walk-through for <strong className="text-slate-900">{form.clinicName}</strong>.
                  </p>
                  <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg text-xs font-medium text-left space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <MessageSquare className="w-3.5 h-3.5" />
                      What happens next:
                    </p>
                    <p>
                      Our founder will send a direct WhatsApp message to <strong className="font-mono">{form.phone}</strong> with a test link set up for your clinic name.
                    </p>
                  </div>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-xs text-slate-500 hover:text-slate-700 underline underline-offset-2 pt-2"
                  >
                    Edit details or book another slot
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-slate-100 pb-3 mb-2">
                    <h3 className="text-base font-extrabold text-slate-900">
                      Book Your 10-Minute Demo
                    </h3>
                    <p className="text-xs text-slate-500">
                      See how it works on your own phone with your clinic name.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-2.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                      {errorMsg}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Doctor Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dr. Rajesh Sharma"
                      value={form.doctorName}
                      onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Clinic / Hospital Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Smiles Dental Care"
                      value={form.clinicName}
                      onChange={(e) => setForm({ ...form, clinicName: e.target.value })}
                      className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98200 XXXXX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Bengaluru"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Clinic Size
                      </label>
                      <select
                        value={form.chairs}
                        onChange={(e) => setForm({ ...form, chairs: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                      >
                        <option value="1-2 chairs">1-2 Dental Chairs</option>
                        <option value="3-5 chairs">3-5 Dental Chairs</option>
                        <option value="6+ chairs">6+ Chairs / Hospital</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Preferred Time
                      </label>
                      <select
                        value={form.preferredTime}
                        onChange={(e) => setForm({ ...form, preferredTime: e.target.value })}
                        className="w-full text-xs px-3 py-2.5 rounded-lg border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none bg-white"
                      >
                        <option value="Today evening">Today Evening</option>
                        <option value="Tomorrow morning">Tomorrow Morning</option>
                        <option value="Tomorrow afternoon">Tomorrow Afternoon</option>
                        <option value="This weekend">This Weekend</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-3 inline-flex items-center justify-center gap-2 py-3 px-4 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-xl shadow-md transition-colors"
                  >
                    <span>{cta.buttonText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] text-center text-slate-500 pt-1">
                    {cta.subtext}
                  </p>
                </form>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
