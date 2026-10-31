/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface DemoBookingForm {
  doctorName: string;
  clinicName: string;
  phone: string;
  city: string;
  chairs: string;
  preferredTime: string;
}

export interface SheetLead {
  id: string;
  timestamp: string;
  patientName: string;
  phone: string;
  treatment: string;
  preferredSlot: string;
  status: 'Confirmed' | 'Pending Call' | 'Follow-up';
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'patient';
  text: string;
  time: string;
  quickReplies?: string[];
  isAction?: boolean;
}
