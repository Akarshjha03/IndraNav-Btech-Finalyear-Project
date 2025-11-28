import React from 'react';
import { ChevronRightIcon } from './Icons';
import { NavigationProps } from '../types';

export const Hero: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <div className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center">

        {/* Text Content */}
        <div className="lg:w-1/2 text-center lg:text-left z-10 mb-12 lg:mb-0">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-medium mb-8">
            <span className="flex h-2 w-2 rounded-full bg-brand-400 mr-2 animate-pulse"></span>
            Now Available in Early Access
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6">
            Stay Awake.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-brand-600">
              Arrive Alive.
            </span>
          </h1>
          <p className="mt-4 text-xl text-gray-400 max-w-2xl mx-auto lg:mx-0">
            IndraNav uses biometric monitoring to detect drowsiness before it becomes dangerous. Your intelligent guardian for every journey.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl shadow-lg shadow-brand-500/30 transition-all transform hover:-translate-y-1 flex items-center justify-center"
            >
              View Live Demo
              <ChevronRightIcon className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-gray-500 text-sm font-medium">
            <span className="text-brand-400">Tech Stack</span>
            <div className="hidden sm:block h-4 w-px bg-gray-700"></div>
            <span>OpenCV</span>
            <span>Dlib</span>
            <span>Scipy Spatial Distance</span>
            <span>Imutils</span>
          </div>
        </div>

        {/* Hero Visual / Illustration */}
        <div className="lg:w-1/2 relative z-10 lg:pl-10">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 group bg-slate-900">
            {/* Note: Using a representative placeholder. Replace the src below with your specific uploaded image path. */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent z-10 pointer-events-none"></div>
            <img
              src="https://raw.githubusercontent.com/Akarshjha03/PocketProjects/main/asleep_preview.png"
              alt="Driver Dashboard Analysis HUD"
              className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Corner badge to indicate live software view */}
            <div className="absolute top-4 right-4 z-20">
              <div className="flex items-center space-x-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg border border-white/10">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-white tracking-wider">SYSTEM ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Decorative Glow */}
          <div className="absolute -inset-4 bg-brand-500/20 blur-3xl -z-10 rounded-full opacity-50"></div>
        </div>
      </div>
    </div>
  );
};