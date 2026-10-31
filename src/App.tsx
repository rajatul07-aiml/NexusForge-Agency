/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { TrustedByMarquee } from './components/TrustedByMarquee';
import { WhatsAppSimulator } from './components/WhatsAppSimulator';
import { TheProblem } from './components/TheProblem';
import { TheSolution } from './components/TheSolution';
import { HowItWorks } from './components/HowItWorks';
import { LeakageCalculator } from './components/LeakageCalculator';
import { ClinicAuditChecklist } from './components/ClinicAuditChecklist';
import { ClinicProof } from './components/ClinicProof';
import { PatientSuccessStories } from './components/PatientSuccessStories';
import { CallToAction } from './components/CallToAction';
import { FAQ } from './components/FAQ';
import { FloatingWhatsAppCTA } from './components/FloatingWhatsAppCTA';
import { CopyVaultModal } from './components/CopyVaultModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isCopyVaultOpen, setIsCopyVaultOpen] = useState(false);
  // Feature flag: toggle "Currently Serving 50+ Clinics" social proof badge in Hero
  const [showServingBadge, setShowServingBadge] = useState<boolean>(true);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBooking = () => {
    const el = document.getElementById('cta-section');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToHowItWorks = () => {
    const el = document.getElementById('the-solution');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToDemo = () => {
    const el = document.getElementById('demo-simulator');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar Contract */}
      <Navbar
        onOpenBooking={scrollToBooking}
        onOpenCopyVault={() => setIsCopyVaultOpen(true)}
      />

      {/* Main Landing Page Experience */}
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero
          onSeeHowItWorks={scrollToHowItWorks}
          onTryDemo={scrollToDemo}
          showServingBadge={showServingBadge}
        />

        {/* Client Numbers & Medical/Dental Authority Marquee */}
        <TrustedByMarquee />

        {/* The Problem Section */}
        <TheProblem />

        {/* Live Interactive WhatsApp + Google Sheet Simulator */}
        <WhatsAppSimulator />

        {/* The Solution Section */}
        <TheSolution
          onBookCall={scrollToBooking}
        />

        {/* How It Works (3 Simple Steps) */}
        <HowItWorks
          onBookCall={scrollToBooking}
        />

        {/* Interactive Lost Revenue & Leakage Calculator */}
        <LeakageCalculator
          onBookCall={scrollToBooking}
        />

        {/* Clinic Lead Leakage Self-Audit Checklist */}
        <ClinicAuditChecklist
          onBookCall={scrollToBooking}
        />

        {/* Real Indian Dental Clinic Proof */}
        <ClinicProof />

        {/* Patient Success Stories & Clinic Outcomes Carousel/Grid */}
        <PatientSuccessStories />

        {/* Final Call To Action Section */}
        <CallToAction />

        {/* Frequently Asked Questions Section */}
        <FAQ onBookCall={scrollToBooking} />
      </main>

      {/* Footer */}
      <Footer
        onOpenBooking={scrollToBooking}
        onOpenCopyVault={() => setIsCopyVaultOpen(true)}
        showServingBadge={showServingBadge}
        onToggleServingBadge={() => setShowServingBadge((prev) => !prev)}
      />

      {/* Floating Scroll to Top Button (positioned cleanly beside WhatsApp CTA) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-5 right-48 sm:bottom-6 sm:right-56 z-30 w-10 h-10 rounded-full bg-slate-900/90 hover:bg-slate-900 text-white shadow-md flex items-center justify-center transition-all cursor-pointer border border-slate-700"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Floating WhatsApp Action Button with Quick Demo Popover */}
      <FloatingWhatsAppCTA onOpenBooking={scrollToBooking} />

      {/* Copy Vault Modal for instant copy-paste */}
      <CopyVaultModal
        isOpen={isCopyVaultOpen}
        onClose={() => setIsCopyVaultOpen(false)}
      />
    </div>
  );
}
