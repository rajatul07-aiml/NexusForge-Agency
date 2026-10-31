/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ShieldCheck, Clock, Layers, HelpCircle, PhoneCall } from 'lucide-react';

interface FAQProps {
  onBookCall?: () => void;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Security' | 'Setup' | 'Software';
}

const FAQS: FAQItem[] = [
  {
    id: 'security',
    category: 'Security',
    question: 'Is our patient data safe and private?',
    answer: 'Yes, 100%. All messages run directly through your clinic\'s official WhatsApp business account. Patient names, phone numbers, and requested slots go straight into your private Google Sheet that only you and your staff can access. We never sell, share, or store patient records.'
  },
  {
    id: 'setup-time',
    category: 'Setup',
    question: 'How long does setup take?',
    answer: 'Under 48 hours. You do not have to write code, build forms, or set up complicated tools. Our team handles the entire setup for you. We connect it to your clinic\'s WhatsApp number, test every response with you, and show your front desk how to view the Google Sheet in a quick 10-minute walk-through.'
  },
  {
    id: 'software-integration',
    category: 'Software',
    question: 'Does this work with our existing clinic software or replace our receptionist?',
    answer: 'It works right alongside whatever you already use—whether you use Practo, other clinic software, or a paper register. NexusForge does not replace your receptionist. It acts like their 24/7 assistant. When your receptionist is busy taking payments or the clinic is closed for the night, NexusForge grabs the patient before they message your competitor. Your staff simply checks the Google Sheet each morning to call and confirm.'
  },
  {
    id: 'medical-advice',
    category: 'Security',
    question: 'What happens if a patient asks complex medical questions?',
    answer: 'NexusForge only handles appointment bookings, clinic directions, timings, and standard service inquiries you approve ahead of time. If a patient asks for medical diagnosis or clinical advice, the system politely tells them that the doctor will review their case in person, captures their phone number, and alerts your staff.'
  },
  {
    id: 'staff-training',
    category: 'Setup',
    question: 'Does my front desk staff need any technical training?',
    answer: 'None at all. If your staff knows how to use WhatsApp and open a Google Sheet on a laptop, tablet, or mobile phone, they are already fully trained. No new complicated apps to install, no passwords for staff to forget.'
  },
  {
    id: 'phone-number',
    category: 'Software',
    question: 'Can we use our existing clinic phone number?',
    answer: 'Yes. We configure the system directly on your clinic\'s existing mobile or business WhatsApp number so your patients recognize your trusted brand immediately.'
  }
];

export const FAQ: React.FC<FAQProps> = ({ onBookCall }) => {
  const [openId, setOpenId] = useState<string | null>('security');

  const toggleFAQ = (id: string) => {
    setOpenId(prev => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-16 md:py-24 bg-white border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 tracking-wider uppercase mb-3">
            <span>Got Questions?</span>
            <span aria-hidden="true">·</span>
            <span>Straight Answers</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            Frequently Asked Questions
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Common questions from dental clinic and hospital owners across India.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3.5">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 shadow-2xs hover:border-slate-300"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-slate-400 font-mono">
                      {faq.category === 'Security' ? '🔒' : faq.category === 'Setup' ? '⚡' : '⚙️'}
                    </span>
                    <span className="text-base sm:text-lg font-bold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 text-slate-600 transition-transform duration-200 ${isOpen ? 'rotate-180 bg-emerald-50 text-emerald-700 border-emerald-200' : ''}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Banner */}
        <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-sm sm:text-base font-bold text-slate-900">
              Have a specific question about your clinic's setup?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Speak directly with our founder on a quick 10-minute call.
            </p>
          </div>
          {onBookCall && (
            <button
              onClick={onBookCall}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Ask On 10-Min Call</span>
            </button>
          )}
        </div>

      </div>
    </section>
  );
};
