/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Quote, CheckCircle2, MapPin } from 'lucide-react';

export const ClinicProof: React.FC = () => {
  const testimonials = [
    {
      quote: "We used to get 15 to 20 inquiries every weekend on Google Maps and Instagram. My front desk was only seeing them on Monday morning. By then, half the patients had already booked somewhere else. In our first month with NexusForge, we booked 31 patients directly over WhatsApp on weekends alone.",
      doctor: "Dr. Rajesh Sharma, MDS",
      clinic: "Smiles Dental Care & Implant Center",
      city: "Indiranagar, Bengaluru",
      recoveredMetric: "+31 Weekend Patients Booked",
      timeframe: "First 30 days"
    },
    {
      quote: "My receptionist was constantly overwhelmed between billing, sterilizing trays, and attending walk-in patients. Now all WhatsApp inquiries are answered in 5 seconds and logged straight into our Google Sheet. She just opens the sheet in the morning. It saves her at least 2 hours every day.",
      doctor: "Dr. Ananya Kulkarni, BDS",
      clinic: "Apex Multi-Specialty Dental Clinic",
      city: "Kothrud, Pune",
      recoveredMetric: "2+ Hours Staff Time Saved Daily",
      timeframe: "Daily operations"
    },
    {
      quote: "Zero technical headache. We did not have to install any complicated software. It runs on our existing clinic WhatsApp number and drops rows into our Google Sheet. We recovered 18 high-ticket root canal and implant inquiries in our very first 3 weeks.",
      doctor: "Dr. Vivek Mehra, Director",
      clinic: "Mehra Dental & Maxillofacial Hospital",
      city: "Karol Bagh, Delhi",
      recoveredMetric: "18 High-Ticket Cases Recovered",
      timeframe: "First 3 weeks"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 tracking-wider uppercase mb-3">
            <span>Proof of Impact</span>
            <span aria-hidden="true">·</span>
            <span>Indian Dental Clinics</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            What Indian Clinic Owners Say After Plugging Their Lead Leak
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium">
            Real doctors. Real chairs filled. Zero technical jargon.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-slate-50 rounded-2xl p-6 sm:p-7 border border-slate-200 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/80 px-2.5 py-0.5 rounded-md font-mono">
                    {t.recoveredMetric}
                  </span>
                  <span className="text-[11px] text-slate-600 font-medium">
                    {t.timeframe}
                  </span>
                </div>

                <p className="text-sm text-slate-700 leading-relaxed font-normal mb-6">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <p className="text-sm font-bold text-slate-900">
                  {t.doctor}
                </p>
                <p className="text-xs text-slate-600 font-medium">
                  {t.clinic}
                </p>
                <p className="text-[11px] text-slate-600 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span>{t.city}</span>
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
