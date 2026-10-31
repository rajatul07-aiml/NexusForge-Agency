/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { PhoneCall, Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNavClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(anchorId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single element) */}
        <a href="#" className="flex items-center gap-2.5 text-slate-900 font-extrabold text-lg sm:text-xl tracking-tight whitespace-nowrap shrink-0 group">
          <img
            src="/assets/aistudio/nexusforge_4574fd28.jpeg"
            alt="NexusForge Logo"
            className="w-9 h-9 rounded-lg object-contain border border-slate-200/80 shadow-xs bg-white p-0.5"
            referrerPolicy="no-referrer"
          />
          <span>NexusForge</span>
        </a>

        {/* Zone 2: Clean single-line nav links (desktop) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium text-slate-600">
          <a href="#the-problem" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            The Problem
          </a>
          <a href="#demo-simulator" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Live Demo
          </a>
          <a href="#the-solution" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            The Solution
          </a>
          <a href="#how-it-works" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            How It Works
          </a>
          <a href="#calculator" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            Calculator
          </a>
          <a href="#faq" className="hover:text-slate-900 transition-colors whitespace-nowrap shrink-0">
            FAQ
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Book 10-Min Demo</span>
          </button>

          {/* Mobile menu hamburger toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-2 text-sm font-medium text-slate-700">
            <button
              onClick={() => handleMobileNavClick('the-problem')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              The Problem
            </button>
            <button
              onClick={() => handleMobileNavClick('demo-simulator')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors font-semibold text-emerald-700 cursor-pointer"
            >
              Live WhatsApp Demo
            </button>
            <button
              onClick={() => handleMobileNavClick('the-solution')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              The Solution
            </button>
            <button
              onClick={() => handleMobileNavClick('how-it-works')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => handleMobileNavClick('calculator')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Lost Revenue Calculator
            </button>
            <button
              onClick={() => handleMobileNavClick('faq')}
              className="text-left px-3 py-2 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Frequently Asked Questions
            </button>
          </div>

          <div className="pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-xs cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Book 10-Min Demo</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
