import React from 'react';

export interface AnalysisResult {
  fatigueScore: number;
  status: 'Alert' | 'Slightly Drowsy' | 'Dangerously Drowsy';
  advice: string;
}

export interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export interface NavigationProps {
  onNavigate: (page: 'landing' | 'dashboard') => void;
}