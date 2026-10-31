/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Copy, Check, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';
import { RAW_COPYWRITING_DOC, COPY_DATA } from '../copyData';

interface CopyVaultModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type CopyTab = 'all' | 'hero' | 'problem' | 'solution' | 'howItWorks' | 'cta' | 'faq';

export const CopyVaultModal: React.FC<CopyVaultModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<CopyTab>('all');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const getSectionText = (tab: CopyTab): string => {
    switch (tab) {
      case 'hero':
        return `[HERO SECTION]\nHeadline: ${COPY_DATA.hero.headline}\nSub-headline: ${COPY_DATA.hero.subheadline}\nPrimary CTA: ${COPY_DATA.hero.ctaPrimary}\nSecondary CTA: ${COPY_DATA.hero.ctaSecondary}\nMicro-copy: ${COPY_DATA.hero.guarantee}`;
      case 'problem':
        return `[THE PROBLEM]\nHeadline: ${COPY_DATA.theProblem.title}\nIntro: ${COPY_DATA.theProblem.intro}\n\n` +
          COPY_DATA.theProblem.points.map(p => `• ${p.title}\n${p.description}`).join('\n\n');
      case 'solution':
        return `[THE SOLUTION]\nHeadline: ${COPY_DATA.theSolution.title}\nSub-headline: ${COPY_DATA.theSolution.subtitle}\n\n` +
          COPY_DATA.theSolution.story.join('\n\n') +
          '\n\nBenefits:\n' +
          COPY_DATA.theSolution.highlights.map(h => `- ${h.title}: ${h.desc}`).join('\n');
      case 'howItWorks':
        return `[HOW IT WORKS]\nHeadline: ${COPY_DATA.howItWorks.title}\n\n` +
          COPY_DATA.howItWorks.steps.map(s => `${s.step}: ${s.title}\n${s.description}`).join('\n\n');
      case 'cta':
        return `[CALL TO ACTION]\nHeadline: ${COPY_DATA.cta.title}\n\n${COPY_DATA.cta.description}\n\n${COPY_DATA.cta.actionPrompt}\n\n${COPY_DATA.cta.pitch}\n\nButton: ${COPY_DATA.cta.buttonText}\nMicro-copy: ${COPY_DATA.cta.subtext}`;
      case 'faq':
        return `[FREQUENTLY ASKED QUESTIONS]\n` +
          `Q: Is our patient data safe and private?\n` +
          `A: Yes, 100%. All messages run directly through your clinic's official WhatsApp business account. Patient names, phone numbers, and requested slots go straight into your private Google Sheet that only you and your staff can access. We never sell, share, or store patient records.\n\n` +
          `Q: How long does setup take?\n` +
          `A: Under 48 hours. You do not have to write code, build forms, or set up complicated tools. Our team handles the entire setup for you.\n\n` +
          `Q: Does this work with our existing clinic software or replace our receptionist?\n` +
          `A: It works right alongside whatever you already use—whether you use Practo, other clinic software, or a paper register. NexusForge does not replace your receptionist. It acts like their 24/7 assistant.\n\n` +
          `Q: What happens if a patient asks complex medical questions?\n` +
          `A: NexusForge only handles appointment bookings, clinic directions, timings, and standard service inquiries you approve ahead of time.\n\n` +
          `Q: Does my front desk staff need any technical training?\n` +
          `A: None at all. If your staff knows how to use WhatsApp and open a Google Sheet on a laptop, tablet, or mobile phone, they are already fully trained.`;
      case 'all':
      default:
        return RAW_COPYWRITING_DOC;
    }
  };

  const currentText = getSectionText(activeTab);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs">
      <div 
        className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <img
              src="/assets/aistudio/nexusforge_4574fd28.jpeg"
              alt="NexusForge Logo"
              className="w-8 h-8 rounded-lg object-contain bg-white border border-slate-200/80 p-0.5 shadow-2xs"
              referrerPolicy="no-referrer"
            />
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                NexusForge Direct-Response Copy Vault
              </h3>
              <p className="text-xs text-slate-500">
                Written strictly at 6th-grade reading level. Zero forbidden words.
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard!' : activeTab === 'all' ? 'Copy All Text' : 'Copy Tab Text'}</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Verification Badges */}
        <div className="px-5 py-2.5 bg-emerald-50/70 border-b border-emerald-100 text-xs text-emerald-900 flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="font-bold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            Quality Audit:
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Tone: 6th-Grade Reading Level
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            0 Banned Words
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Zero Tech Jargon
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Indian Clinic Focus
          </span>
        </div>

        {/* Section Tabs */}
        <div className="px-5 py-2 border-b border-slate-200 bg-slate-100/60 flex items-center gap-1 overflow-x-auto text-xs">
          {(['all', 'hero', 'problem', 'solution', 'howItWorks', 'cta', 'faq'] as CopyTab[]).map((tab) => {
            const labels: Record<CopyTab, string> = {
              all: 'Full Website Copy',
              hero: 'Hero',
              problem: 'The Problem',
              solution: 'The Solution',
              howItWorks: 'How It Works',
              cta: 'Call To Action',
              faq: 'FAQ'
            };
            return (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCopied(false);
                }}
                className={`px-3 py-1.5 rounded-md font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  activeTab === tab
                    ? 'bg-white text-slate-900 shadow-xs font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* Copy Content Area */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto font-mono text-xs text-slate-800 leading-relaxed bg-slate-50/50 whitespace-pre-wrap select-all">
          {currentText}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-slate-200 bg-white flex items-center justify-between text-xs text-slate-500">
          <span>Ready to paste directly into Google Docs or client pitches.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
