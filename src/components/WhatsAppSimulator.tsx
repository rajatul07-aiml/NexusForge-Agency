/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { Send, CheckCheck, RefreshCw, Table, Phone, Download } from 'lucide-react';
import { ChatMessage, SheetLead } from '../types';

const INITIAL_SHEET_DATA: SheetLead[] = [
  {
    id: 'lead-1',
    timestamp: 'Today, 9:14 PM',
    patientName: 'Vikram Malhotra',
    phone: '+91 98201 44821',
    treatment: 'Root Canal Treatment',
    preferredSlot: 'Tomorrow 11:30 AM',
    status: 'Confirmed'
  },
  {
    id: 'lead-2',
    timestamp: 'Today, 8:45 PM',
    patientName: 'Priya Sundaram',
    phone: '+91 98450 19320',
    treatment: 'Teeth Cleaning & Polish',
    preferredSlot: 'Tomorrow 5:00 PM',
    status: 'Confirmed'
  },
  {
    id: 'lead-3',
    timestamp: 'Today, 7:30 PM',
    patientName: 'Amit Verma',
    phone: '+91 97112 88402',
    treatment: 'Clear Aligners Consultation',
    preferredSlot: 'Saturday 10:00 AM',
    status: 'Pending Call'
  }
];

const PRESET_SCENARIOS = [
  {
    id: 'pain',
    label: '9:42 PM Toothache',
    patientName: 'Rohit Deshmukh',
    patientPhone: '+91 98920 33119',
    userPrompt: 'Hi doctor, my molar has sharp pain since dinner. Can I get an appointment tomorrow?',
    treatment: 'Emergency Tooth Pain / Checkup',
    slot: 'Tomorrow 10:30 AM'
  },
  {
    id: 'cleaning',
    label: 'Teeth Cleaning Query',
    patientName: 'Sunita Rao',
    patientPhone: '+91 98231 77621',
    userPrompt: 'Hello, what is the cost of teeth cleaning and scaling? Looking for evening slot.',
    treatment: 'Teeth Cleaning & Scaling',
    slot: 'Tomorrow 6:00 PM'
  },
  {
    id: 'braces',
    label: 'Braces for Child',
    patientName: 'Kavita Chawla',
    patientPhone: '+91 99100 55410',
    userPrompt: 'Hi, I want a consultation for ceramic braces for my 14yo son this weekend.',
    treatment: 'Orthodontic Braces Consultation',
    slot: 'Saturday 11:00 AM'
  }
];

export const WhatsAppSimulator: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm0',
      sender: 'bot',
      text: 'Namaste! Welcome to Dr. Sharma’s Dental Care. Our clinic is closed for the night, but our Auto-Receptionist is here 24/7. How can we help your smile tonight?',
      time: '9:41 PM',
      quickReplies: [
        'Tooth pain / Emergency checkup',
        'Teeth cleaning & whitening',
        'Braces or aligners consultation'
      ]
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sheetLeads, setSheetLeads] = useState<SheetLead[]>(INITIAL_SHEET_DATA);
  const [newestLeadId, setNewestLeadId] = useState<string | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendPatientMessage = (text: string, customPatientName?: string, customPhone?: string, customTreatment?: string, customSlot?: string) => {
    if (!text.trim()) return;

    const userMsgId = 'usr-' + Date.now();
    const currentTime = '9:42 PM';
    const newMsg: ChatMessage = {
      id: userMsgId,
      sender: 'patient',
      text: text,
      time: currentTime
    };

    setMessages(prev => [...prev, newMsg]);
    setInputText('');
    setIsTyping(true);

    // Bot response after 1 second (simulating <3 second fast response)
    setTimeout(() => {
      setIsTyping(false);
      const botMsgId = 'bot-' + Date.now();
      const patientName = customPatientName || 'Rohit Deshmukh';
      const patientPhone = customPhone || '+91 98920 33119';
      const treatment = customTreatment || (text.includes('clean') ? 'Teeth Cleaning' : text.includes('brace') ? 'Braces Consult' : 'Emergency Tooth Pain');
      const preferredSlot = customSlot || 'Tomorrow 10:30 AM';

      const botReply: ChatMessage = {
        id: botMsgId,
        sender: 'bot',
        text: `Got it! We have reserved your chair for ${treatment} with Dr. Sharma on ${preferredSlot}. We have also updated our clinic schedule and your details are saved. See you then!`,
        time: '9:42 PM'
      };

      setMessages(prev => [...prev, botReply]);

      // Instantly push to Google Sheet!
      const newSheetRow: SheetLead = {
        id: 'lead-' + Date.now(),
        timestamp: 'Just now (9:42 PM)',
        patientName: patientName,
        phone: patientPhone,
        treatment: treatment,
        preferredSlot: preferredSlot,
        status: 'Confirmed'
      };

      setSheetLeads(prev => [newSheetRow, ...prev]);
      setNewestLeadId(newSheetRow.id);
      setTimeout(() => setNewestLeadId(null), 4000);
    }, 1200);
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'm0',
        sender: 'bot',
        text: 'Namaste! Welcome to Dr. Sharma’s Dental Care. Our clinic is closed for the night, but our Auto-Receptionist is here 24/7. How can we help your smile tonight?',
        time: '9:41 PM',
        quickReplies: [
          'Tooth pain / Emergency checkup',
          'Teeth cleaning & whitening',
          'Braces or aligners consultation'
        ]
      }
    ]);
    setSheetLeads(INITIAL_SHEET_DATA);
    setNewestLeadId(null);
  };

  const handleDownloadCSV = () => {
    const headers = "Timestamp,Patient Name,Phone,Treatment,Preferred Slot,Status\n";
    const rows = sheetLeads
      .map((l) => `"${l.timestamp}","${l.patientName}","${l.phone}","${l.treatment}","${l.preferredSlot}","${l.status}"`)
      .join("\n");
    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'nexusforge_patient_leads_sample.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="demo-simulator" className="py-16 md:py-24 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-3">
            <span>Live Demonstration</span>
            <span aria-hidden="true">·</span>
            <span>Test On This Screen Right Now</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-4">
            See Exactly What Happens When a Patient Messages at 9:42 PM
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            Click any patient scenario below. Watch NexusForge answer on WhatsApp in seconds and log the booking directly into the clinic's Google Sheet.
          </p>
        </div>

        {/* Quick Scenario Picker */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
          <span className="text-xs font-semibold text-slate-400 mr-1">Try a scenario:</span>
          {PRESET_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              onClick={() => handleSendPatientMessage(sc.userPrompt, sc.patientName, sc.patientPhone, sc.treatment, sc.slot)}
              className="px-3.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 active:bg-slate-600 text-slate-200 border border-slate-700 rounded-lg transition-colors"
            >
              👉 {sc.label}
            </button>
          ))}
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-400 hover:text-white transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Demo</span>
          </button>
        </div>

        {/* Split Grid: WhatsApp phone on left, Google Sheet on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: WhatsApp Mobile Phone Interface (5 cols) */}
          <div className="lg:col-span-5 mx-auto w-full max-w-sm bg-neutral-950 rounded-[32px] p-3 shadow-2xl border-4 border-slate-800">
            {/* Phone Speaker & Camera notch */}
            <div className="w-24 h-4 bg-neutral-800 rounded-full mx-auto mb-2"></div>

            {/* WhatsApp App Screen */}
            <div className="bg-[#0b141a] text-slate-100 rounded-[24px] overflow-hidden flex flex-col h-[490px] border border-neutral-800">
              
              {/* WhatsApp Chat Header */}
              <div className="bg-[#202c33] px-3.5 py-2.5 flex items-center justify-between border-b border-[#2a3942]">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">
                    D
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white truncate max-w-[170px]">
                      Dr. Sharma's Dental Care
                    </h4>
                    <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                      <span>WhatsApp Auto-Receptionist</span>
                      <span>·</span>
                      <span>Online 24/7</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <Phone className="w-4 h-4 text-slate-300" />
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 p-3 overflow-y-auto space-y-3 bg-[#0b141a] bg-opacity-95 text-xs">
                <div className="text-center my-1">
                  <span className="text-[10px] bg-[#182229] text-slate-400 px-2 py-0.5 rounded">
                    Today · 9:41 PM
                  </span>
                </div>

                {messages.map((m) => {
                  const isBot = m.sender === 'bot';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}
                    >
                      <div
                        className={`max-w-[85%] rounded-lg p-2.5 shadow-sm text-xs leading-relaxed ${
                          isBot
                            ? 'bg-[#202c33] text-slate-100 rounded-tl-none'
                            : 'bg-[#005c4b] text-white rounded-tr-none'
                        }`}
                      >
                        <p>{m.text}</p>
                        <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-400">
                          <span>{m.time}</span>
                          {!isBot && <CheckCheck className="w-3 h-3 text-sky-400" />}
                        </div>
                      </div>

                      {/* Quick Replies if available */}
                      {isBot && m.quickReplies && (
                        <div className="flex flex-col gap-1.5 mt-2 w-full max-w-[85%]">
                          {m.quickReplies.map((qr, idx) => (
                            <button
                              key={idx}
                              onClick={() => handleSendPatientMessage(qr)}
                              className="text-left text-[11px] bg-[#202c33] hover:bg-[#2a3942] text-emerald-400 font-medium px-2.5 py-1.5 rounded border border-[#2a3942] transition-colors"
                            >
                              👉 {qr}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="flex items-center gap-1.5 bg-[#202c33] text-slate-400 text-xs px-3 py-2 rounded-lg w-fit">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-[10px] ml-1">Replying in 2s...</span>
                  </div>
                )}
                <div ref={chatBottomRef} />
              </div>

              {/* Chat Input Bar */}
              <div className="bg-[#202c33] p-2 flex items-center gap-2 border-t border-[#2a3942]">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendPatientMessage(inputText);
                  }}
                  placeholder="Type a message as a patient..."
                  className="flex-1 bg-[#2a3942] text-xs text-white placeholder-slate-400 rounded-lg px-3 py-2 outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  onClick={() => handleSendPatientMessage(inputText)}
                  className="w-8 h-8 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shrink-0 transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live Google Sheet (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-800/90 rounded-2xl p-4 sm:p-5 border border-slate-700 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-700">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Table className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                      <span>Clinic Lead Registry (Google Sheet)</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      Auto-syncs from WhatsApp in real time. Zero data entry for your front desk.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleDownloadCSV}
                    title="Export sample sheet leads to CSV"
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-700/70 hover:bg-slate-700 rounded-md border border-slate-600 transition-colors"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download CSV</span>
                  </button>
                  <div className="text-xs text-slate-300 font-mono bg-slate-900/80 px-2.5 py-1 rounded border border-slate-700">
                    Total: {sheetLeads.length}
                  </div>
                </div>
              </div>

              {/* Spreadsheet Table View */}
              <div className="mt-4 overflow-x-auto rounded-lg border border-slate-700">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-300 uppercase text-[10px] tracking-wider border-b border-slate-700">
                    <tr>
                      <th className="py-2.5 px-3">Time</th>
                      <th className="py-2.5 px-3">Patient Name</th>
                      <th className="py-2.5 px-3">Phone</th>
                      <th className="py-2.5 px-3">Treatment</th>
                      <th className="py-2.5 px-3">Slot Booked</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60 font-mono text-[11px] tabular-nums">
                    {sheetLeads.map((lead) => {
                      const isNew = lead.id === newestLeadId;
                      return (
                        <tr
                          key={lead.id}
                          className={`transition-colors ${
                            isNew ? 'bg-emerald-950/80 text-emerald-200' : 'bg-slate-800/50 hover:bg-slate-800 text-slate-200'
                          }`}
                        >
                          <td className="py-2.5 px-3 whitespace-nowrap text-slate-400">
                            {lead.timestamp}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-white whitespace-nowrap font-sans">
                            {lead.patientName}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap text-slate-300">
                            {lead.phone}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap font-sans">
                            {lead.treatment}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap text-emerald-300 font-semibold font-sans">
                            {lead.preferredSlot}
                          </td>
                          <td className="py-2.5 px-3 whitespace-nowrap">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-sans font-medium bg-emerald-900/60 text-emerald-300 border border-emerald-700/50">
                              {lead.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* What the Doctor / Clinic Owner sees */}
              <div className="mt-4 pt-3 border-t border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-300">
                <p>
                  <strong className="text-white">Every morning at 9:00 AM:</strong> Your receptionist opens this single sheet, calls each patient to confirm, and prepares the dental chair.
                </p>
                <span className="text-emerald-400 font-semibold shrink-0">
                  Zero Missed Inquiries
                </span>
              </div>
            </div>

            {/* Explanatory callout for 45-year-old clinic owner */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="font-bold text-white mb-1">What the Patient Experiences</p>
                <p className="text-slate-300 leading-normal">
                  They find you on Google, click WhatsApp, and get an immediate reply. They feel taken care of before your competitors even wake up.
                </p>
              </div>
              <div className="p-3.5 bg-slate-800/50 rounded-xl border border-slate-700">
                <p className="font-bold text-white mb-1">What Your Receptionist Does</p>
                <p className="text-slate-300 leading-normal">
                  Zero phone tag. Zero scrambling for scratch pads. All patient details and time slots are already organized neatly in Google Sheets.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
