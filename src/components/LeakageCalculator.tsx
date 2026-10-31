/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { IndianRupee, Calculator, ArrowRight, TrendingUp } from 'lucide-react';

interface LeakageCalculatorProps {
  onBookCall: () => void;
}

export const LeakageCalculator: React.FC<LeakageCalculatorProps> = ({ onBookCall }) => {
  const [monthlyInquiries, setMonthlyInquiries] = useState(120);
  const [missedRate, setMissedRate] = useState(35); // 35% after hours or missed calls
  const [avgTicket, setAvgTicket] = useState(4500); // INR per dental patient (RCT, crown, cleaning, filling)

  const lostPatientsMonthly = Math.round((monthlyInquiries * (missedRate / 100)));
  const monthlyRevenueLost = lostPatientsMonthly * avgTicket;
  const yearlyRevenueLost = monthlyRevenueLost * 12;

  // Realistic recovery with NexusForge (instant 5-second WhatsApp booking captures ~60% of lost leads)
  const recoveredPatients = Math.round(lostPatientsMonthly * 0.6);
  const monthlyRecoveredRevenue = recoveredPatients * avgTicket;

  return (
    <section id="calculator" className="py-16 md:py-24 bg-slate-50 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-rose-700 tracking-wider uppercase mb-3">
            <span>Clinic Math</span>
            <span aria-hidden="true">·</span>
            <span>Calculate Your Numbers</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            How Much Money Is Your Dental Clinic Leaking Right Now?
          </h2>
          <p className="text-sm sm:text-base text-slate-600">
            Slide the bars below to see how many patients walk away when nobody answers after hours.
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Sliders (7 cols) */}
          <div className="lg:col-span-7 space-y-7">
            
            {/* Slider 1: Monthly Inquiries */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  Monthly Clicks & Inquiries
                </label>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono tabular-nums">
                  {monthlyInquiries} inquiries
                </span>
              </div>
              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={monthlyInquiries}
                onChange={(e) => setMonthlyInquiries(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                <span>30 (Small Clinic)</span>
                <span>250 (Active Ads)</span>
                <span>500 (Hospital / Multi-chair)</span>
              </div>
            </div>

            {/* Slider 2: Missed Rate */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  Inquiries After 8 PM or While Staff Is Busy
                </label>
                <span className="text-sm sm:text-base font-extrabold text-rose-700 font-mono tabular-nums">
                  {missedRate}% missed
                </span>
              </div>
              <input
                type="range"
                min="15"
                max="60"
                step="5"
                value={missedRate}
                onChange={(e) => setMissedRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-rose-600"
              />
              <p className="text-[11px] text-slate-600 mt-1">
                Indian clinics average 35% of patient inquiries outside normal 10 AM – 7 PM working hours.
              </p>
            </div>

            {/* Slider 3: Avg Treatment Value */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs sm:text-sm font-bold text-slate-800">
                  Average Treatment Value Per Patient
                </label>
                <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono tabular-nums">
                  ₹{avgTicket.toLocaleString('en-IN')}
                </span>
              </div>
              <input
                type="range"
                min="1500"
                max="20000"
                step="500"
                value={avgTicket}
                onChange={(e) => setAvgTicket(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-600 mt-1">
                <span>₹1,500 (Cleanings/Fillings)</span>
                <span>₹8,000 (Root Canals/Crowns)</span>
                <span>₹20,000+ (Implants/Braces)</span>
              </div>
            </div>

          </div>

          {/* Result Card (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 text-white rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-rose-400 uppercase tracking-wider mb-2">
                <span>Estimated Lost Revenue</span>
                <span>Every Month</span>
              </div>

              {/* Big bold INR amount */}
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums tracking-tight my-2">
                ₹{monthlyRevenueLost.toLocaleString('en-IN')}
              </div>

              <p className="text-xs text-slate-300 mb-6">
                That is <strong className="text-white">{lostPatientsMonthly} patients</strong> who found your clinic online this month but booked with your competitor because nobody answered their message.
              </p>

              <div className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/80 space-y-2 mb-6">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Yearly Leaked Money:</span>
                  <span className="font-mono font-bold text-rose-300 tabular-nums">
                    ₹{yearlyRevenueLost.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700">
                  <span className="text-emerald-400 font-medium">Extra Patients Recovered:</span>
                  <span className="font-mono font-bold text-emerald-300 tabular-nums">
                    +{recoveredPatients} patients / mo
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-emerald-400 font-medium">Extra Clinic Collections:</span>
                  <span className="font-mono font-bold text-emerald-300 tabular-nums">
                    +₹{monthlyRecoveredRevenue.toLocaleString('en-IN')} / mo
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={onBookCall}
              className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-colors"
            >
              <span>Stop This Leak On Your Phone</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
