/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageSquare, X, Send, CheckCircle2 } from 'lucide-react';

interface FloatingWhatsAppCTAProps {
  onOpenBooking: () => void;
}

export const FloatingWhatsAppCTA: React.FC<FloatingWhatsAppCTAProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const [clinicName, setClinicName] = useState('');
  const [sentTest, setSentTest] = useState(false);

  const handleSendTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setSentTest(true);
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40">
      {/* Popover Window */}
      {isOpen && (
        <div 
          className="mb-3 w-[310px] sm:w-[350px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-200"
          role="dialog"
          aria-label="WhatsApp Quick Connect"
        >
          {/* Header */}
          <div className="bg-[#075e54] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <img
                  src="/assets/aistudio/nexusforge_4574fd28.jpeg"
                  alt="NexusForge"
                  className="w-9 h-9 rounded-full object-contain bg-white p-0.5 border border-emerald-400"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <h4 className="text-xs font-bold leading-tight">NexusForge Auto-Receptionist</h4>
                <p className="text-[10px] text-emerald-200">Online 24/7 · WhatsApp Direct</p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setSentTest(false);
              }}
              className="text-emerald-100 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-slate-50 text-xs text-slate-700 space-y-3">
            {sentTest ? (
              <div className="text-center py-3 space-y-2">
                <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h5 className="font-bold text-slate-900 text-sm">Test Setup Ready!</h5>
                <p className="text-[11px] text-slate-600 leading-normal">
                  We are preparing a live WhatsApp demonstration for <strong className="text-slate-900">{clinicName || 'your clinic'}</strong> to <strong className="font-mono text-slate-900">{phone}</strong>.
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full mt-2 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors cursor-pointer"
                >
                  Confirm 10-Minute Walkthrough →
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-2xs">
                  <p className="font-medium text-slate-800 leading-relaxed">
                    👋 <strong>Namaste Doctor!</strong> Want to see how fast NexusForge replies on your own phone?
                  </p>
                </div>

                <form onSubmit={handleSendTest} className="space-y-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Your Clinic Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Dental Care"
                      value={clinicName}
                      onChange={(e) => setClinicName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Your WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98200 XXXXX"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                    <span>Send Test to My WhatsApp</span>
                  </button>
                </form>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Or book directly:</span>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      onOpenBooking();
                    }}
                    className="text-emerald-700 font-bold hover:underline cursor-pointer"
                  >
                    10-Min Demo Call →
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open WhatsApp Quick Demo"
        className="group flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20ba5a] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer border-2 border-white"
      >
        {/* WhatsApp Icon */}
        <div className="relative flex items-center justify-center">
          <MessageSquare className="w-5 h-5 fill-current" />
        </div>
        <span className="text-xs sm:text-sm font-bold tracking-tight whitespace-nowrap">
          Test on WhatsApp
        </span>
      </button>
    </div>
  );
};
