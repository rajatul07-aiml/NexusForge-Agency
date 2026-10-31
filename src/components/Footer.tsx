/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenCopyVault: () => void;
  showServingBadge?: boolean;
  onToggleServingBadge?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ 
  onOpenBooking, 
  onOpenCopyVault,
  showServingBadge,
  onToggleServingBadge
}) => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800 text-xs">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5 text-white font-extrabold text-base tracking-tight mb-2">
              <img
                src="/assets/aistudio/nexusforge_4574fd28.jpeg"
                alt="NexusForge Logo"
                className="w-8 h-8 rounded-lg object-contain bg-white p-0.5 shadow-xs"
                referrerPolicy="no-referrer"
              />
              <span>NexusForge</span>
            </div>
            <p className="text-slate-500 max-w-md text-xs">
              WhatsApp AI Auto-Receptionist & automated lead-generation pipelines for dental clinics and hospitals across India.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-slate-300 font-medium">
            <a href="#the-problem" className="hover:text-white transition-colors">The Problem</a>
            <a href="#the-solution" className="hover:text-white transition-colors">The Solution</a>
            <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
            <a href="#calculator" className="hover:text-white transition-colors">Calculator</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <button
              onClick={onOpenCopyVault}
              className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
            >
              Raw Copy
            </button>
            {onToggleServingBadge && (
              <button
                onClick={onToggleServingBadge}
                title="Toggle Currently Serving 50+ Clinics Hero Badge Feature Flag"
                className="text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Hero Badge: {showServingBadge ? '50+ Clinics [Active]' : '[Hidden]'}
              </button>
            )}
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-400 text-[11px]">
          <p>© {new Date().getFullYear()} NexusForge. Built specifically for Indian dental clinics and hospitals.</p>
          <div className="flex items-center gap-4">
            <span>Direct WhatsApp & Google Sheets Integration</span>
            <span>·</span>
            <span>Zero Tech Jargon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
