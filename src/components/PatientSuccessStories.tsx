/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, CheckCircle2 } from 'lucide-react';

interface SuccessStory {
  id: string;
  category: 'rct' | 'aligners' | 'hospital';
  doctor: string;
  specialty: string;
  clinic: string;
  city: string;
  chairs: string;
  metric: string;
  headline: string;
  story: string;
  before: string;
  after: string;
}

const STORIES: SuccessStory[] = [
  {
    id: 's1',
    category: 'rct',
    doctor: 'Dr. Sneha Iyer',
    specialty: 'BDS, Endodontics',
    clinic: 'Root & Crown Dental Studio',
    city: 'HSR Layout, Bengaluru',
    chairs: '3 Chairs',
    metric: '₹1.4 Lakh Extra In Month 1',
    headline: 'Booked 24 extra root canal patients who used to walk away at night.',
    story: 'We spent money on Google and Instagram ads, but people usually clicked after 9 PM when our clinic was shut. By next morning, they had already booked with another dentist down the road. NexusForge replies on WhatsApp in 4 seconds. In our first 30 days, we booked 24 patients who messaged after hours. That is ₹1.4 Lakhs in clinic collections we used to lose completely.',
    before: 'Lost 5-7 night inquiries every week to competitors',
    after: 'Instant WhatsApp reply books the chair while staff sleeps'
  },
  {
    id: 's2',
    category: 'aligners',
    doctor: 'Dr. Pooja Deshpande',
    specialty: 'MDS, Orthodontics',
    clinic: 'Align Dental Care',
    city: 'Shivaji Nagar, Pune',
    chairs: '2 Chairs',
    metric: '9 High-Ticket Aligner Cases',
    headline: 'High-ticket orthodontic patients get booked in under 2 minutes.',
    story: 'Braces and clear aligners are high-value treatments (₹50,000+). When parents message on a Sunday evening, they want quick answers. NexusForge greets them warmly on WhatsApp, shows them open consultation slots, and logs their details in our Google Sheet. We closed 9 new aligner cases last month directly from late-night inquiries.',
    before: 'Slow replies caused parents to call 3 other ortho clinics',
    after: 'Consultation slot picked and confirmed within 2 minutes'
  },
  {
    id: 's3',
    category: 'hospital',
    doctor: 'Dr. Manpreet Singh',
    specialty: 'MDS, Oral Surgery',
    clinic: 'Smile Craft Multi-Specialty Dental Hospital',
    city: 'Sector 35, Chandigarh',
    chairs: '6 Chairs',
    metric: 'Zero Missed Leads In Peak Hours',
    headline: 'My front desk is calm even during the crazy 6 PM patient rush.',
    story: 'Between 5 PM and 8 PM, our clinic is packed. Receptionists are handling billing, answering upset walk-ins, and sterilizing trays. The clinic phone would ring twice and go unanswered. Now, NexusForge catches every single WhatsApp message immediately. My receptionist opens the Google Sheet, sees who booked, and simply prepares their files.',
    before: 'Front desk missed 30+ calls a week during walk-in rush',
    after: 'Every inquiry captured and organized in Google Sheets'
  },
  {
    id: 's4',
    category: 'rct',
    doctor: 'Dr. Harshil Patel',
    specialty: 'BDS, Implantology',
    clinic: 'Patel Dental Care & Implant Center',
    city: 'Satellite, Ahmedabad',
    chairs: '4 Chairs',
    metric: '19 Sunday Inquiries Recovered',
    headline: 'Sunday used to be our biggest leak. Now it fills our Monday schedule.',
    story: 'Our clinic is closed on Sundays, but that is the exact day patients with toothache have free time to look for a dentist. NexusForge captured 19 patient bookings last Sunday alone while I was having lunch with my family. My Monday morning chairs were completely full before we even opened the shutters.',
    before: 'Zero appointments booked on Sundays while clinic was closed',
    after: 'Monday chair schedule filled automatically on WhatsApp'
  },
  {
    id: 's5',
    category: 'hospital',
    doctor: 'Dr. Arvind Swaminathan',
    specialty: 'BDS, Cosmetic Dentistry',
    clinic: 'Swaminathan Dental Clinic',
    city: 'Anna Nagar, Chennai',
    chairs: '3 Chairs',
    metric: '38 Empty Chair Slots Filled',
    headline: 'Zero tech headache. My staff was using it smoothly on Day 1.',
    story: 'I was worried because my receptionist is not very tech-savvy. But there was literally nothing to learn. Patients chat on WhatsApp, and my staff just looks at a clean Google Sheet on her front-desk computer every morning. In our very first month, we filled 38 empty afternoon chair slots that used to stay vacant.',
    before: 'Afternoon chair slots frequently remained empty',
    after: 'Auto-Receptionist offers open slots to patients 24/7'
  }
];

export const PatientSuccessStories: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'rct' | 'aligners' | 'hospital'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredStories = activeTab === 'all' 
    ? STORIES 
    : STORIES.filter(s => s.category === activeTab);

  const currentStory = filteredStories[currentIndex] || filteredStories[0];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? filteredStories.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === filteredStories.length - 1 ? 0 : prev + 1));
  };

  const handleTabChange = (tab: 'all' | 'rct' | 'aligners' | 'hospital') => {
    setActiveTab(tab);
    setCurrentIndex(0);
  };

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-800 tracking-wider uppercase mb-3">
            <span>Real Clinic Results</span>
            <span aria-hidden="true">·</span>
            <span>Across India</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4"
            style={{ textWrap: 'balance' }}
          >
            How Indian Clinic Owners Stopped Their Lead Leakage
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Direct stories from doctors who stopped losing patients to missed calls and after-hours silence.
          </p>
        </div>

        {/* Filter Tabs (Interactive Functional Buttons) */}
        <div className="flex items-center justify-center gap-1.5 p-1.5 bg-slate-200/70 rounded-xl max-w-lg mx-auto mb-10 overflow-x-auto">
          <button
            onClick={() => handleTabChange('all')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All Clinics ({STORIES.length})
          </button>
          <button
            onClick={() => handleTabChange('rct')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'rct'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Root Canal & Implants
          </button>
          <button
            onClick={() => handleTabChange('aligners')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'aligners'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Braces & Aligners
          </button>
          <button
            onClick={() => handleTabChange('hospital')}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'hospital'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Multi-Chair Centers
          </button>
        </div>

        {/* Featured Story Showcase Card */}
        {currentStory && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm relative mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Outcome & Story (8 cols) */}
              <div className="lg:col-span-8 space-y-5">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100/90 px-3 py-1 rounded-md font-mono">
                    {currentStory.metric}
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-medium text-slate-600">
                    {currentStory.chairs}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
                  "{currentStory.headline}"
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                  {currentStory.story}
                </p>

                {/* Before vs After Contrast Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-slate-100 text-xs">
                  <div className="p-3 bg-rose-50/70 border border-rose-200/60 rounded-xl">
                    <p className="font-bold text-rose-800 mb-0.5">Before NexusForge:</p>
                    <p className="text-slate-600">{currentStory.before}</p>
                  </div>
                  <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl">
                    <p className="font-bold text-emerald-800 mb-0.5">With NexusForge:</p>
                    <p className="text-slate-700 font-medium">{currentStory.after}</p>
                  </div>
                </div>
              </div>

              {/* Right Column: Doctor & Clinic Identity Card (4 cols) */}
              <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between h-full space-y-6">
                <div>
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white font-extrabold text-base flex items-center justify-center mb-4 shadow-2xs">
                    {currentStory.doctor.split(' ')[1]?.[0] || 'D'}
                  </div>
                  <h4 className="text-base font-bold text-slate-900">
                    {currentStory.doctor}
                  </h4>
                  <p className="text-xs text-emerald-700 font-semibold mb-2">
                    {currentStory.specialty}
                  </p>
                  <p className="text-xs text-slate-700 font-medium">
                    {currentStory.clinic}
                  </p>
                  <p className="text-xs text-slate-600 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{currentStory.city}</span>
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200 text-xs text-slate-600 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Verified Indian Dental Practice</span>
                </div>
              </div>

            </div>

            {/* Carousel Navigation Footer */}
            <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs font-medium text-slate-600">
                Story <span className="font-bold text-slate-900 font-mono">{currentIndex + 1}</span> of <span className="font-mono">{filteredStories.length}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous story"
                  className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next story"
                  className="w-9 h-9 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-slate-700 flex items-center justify-center transition-colors shadow-2xs"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Quick Grid Thumbnails */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {filteredStories.map((story, idx) => (
            <button
              key={story.id}
              onClick={() => setCurrentIndex(idx)}
              className={`text-left p-4 rounded-xl border transition-all text-xs ${
                idx === currentIndex
                  ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'bg-white/80 border-slate-200 hover:border-slate-300 text-slate-600'
              }`}
            >
              <p className="font-bold text-slate-900 truncate mb-1">
                {story.doctor} · {story.city.split(',')[1]?.trim() || story.city}
              </p>
              <p className="text-emerald-700 font-semibold font-mono text-[11px] mb-1">
                {story.metric}
              </p>
              <p className="text-slate-600 line-clamp-2 leading-snug">
                {story.headline}
              </p>
            </button>
          ))}
        </div>

      </div>
    </section>
  );
};
