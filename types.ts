
import React from 'react';

export interface Feature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface Benefit {
  title: string;
  value: string;
  subtext: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  suggestion?: {
    sectionId: string;
    reason: string;
  };
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface AIResponse {
  text: string;
  suggestion?: {
    sectionId: string;
    reason: string;
  };
}
