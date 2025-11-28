import React from 'react';
import { CpuIcon, DatabaseIcon, ZapIcon, ChevronRightIcon } from './Icons';
import { NavigationProps } from '../types';

export const SystemDesign: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <section id="system-design" className="py-24 relative overflow-hidden bg-slate-900">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-brand-500/10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 bg-blue-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-base text-brand-500 font-semibold tracking-wide uppercase">Under the Hood</h2>
          <h2 className="mt-2 text-3xl md:text-4xl font-extrabold text-white mb-4">
            System Design & Model Architecture
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            IndraNav utilizes industry-standard computer vision techniques to ensure high-fidelity facial landmark detection.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Card 1: The Model */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-brand-500/50 transition-colors group">
            <div className="w-14 h-14 bg-brand-900/50 rounded-xl flex items-center justify-center mb-6 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
              <CpuIcon className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Facial Landmark Predictor</h3>
            <div className="h-1 w-12 bg-brand-500 rounded-full mb-6"></div>
            <p className="text-gray-300 leading-relaxed">
              We employ a <span className="text-white font-semibold">Self-trained dlib 68-point facial landmark predictor</span>. This robust model maps key facial structures including eyes, eyebrows, nose, and jawline, enabling precise Eye Aspect Ratio (EAR) calculations.
            </p>
          </div>

          {/* Card 2: The Dataset */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-brand-500/50 transition-colors group">
            <div className="w-14 h-14 bg-brand-900/50 rounded-xl flex items-center justify-center mb-6 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
              <DatabaseIcon className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Training Dataset</h3>
            <div className="h-1 w-12 bg-brand-500 rounded-full mb-6"></div>
            <p className="text-gray-300 leading-relaxed">
              The model is trained on the <span className="text-white font-semibold">iBUG 300-W dataset</span>. This comprehensive dataset contains thousands of images of faces with 68 annotated landmarks, covering a wide range of poses, lighting conditions, and expressions.
            </p>
          </div>

          {/* Card 3: Training Method */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 hover:border-brand-500/50 transition-colors group">
            <div className="w-14 h-14 bg-brand-900/50 rounded-xl flex items-center justify-center mb-6 border border-brand-500/20 group-hover:bg-brand-500/20 transition-colors">
              <ZapIcon className="w-8 h-8 text-brand-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Training Methodology</h3>
            <div className="h-1 w-12 bg-brand-500 rounded-full mb-6"></div>
            <p className="text-gray-300 leading-relaxed">
              Implemented using <span className="text-white font-semibold italic">"One Millisecond Face Alignment with an Ensemble of Regression Trees"</span> (Kazemi & Sullivan, 2014). This gradient boosting approach ensures ultra-fast, real-time performance on edge devices.
            </p>
          </div>

        </div>

        {/* Technical Diagram Placeholder / Visual */}
        <div className="mt-16 glass-panel rounded-2xl border border-white/10 p-2 overflow-hidden">
          <div className="bg-slate-950 rounded-xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="flex-1 space-y-4">
                <div className="inline-block px-3 py-1 bg-brand-500/20 rounded text-brand-400 text-xs font-mono mb-2">PIPELINE ARCHITECTURE</div>
                <h4 className="text-2xl font-bold text-white">From Input to Alert</h4>
                <ul className="space-y-4 mt-6">
                  <li className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
                    <span>Input Frame Capture (OpenCV)</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
                    <span>Grayscale Conversion & Face Detection (dlib HOG)</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
                    <span>68-Point Landmark Prediction</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-brand-500 rounded-full mr-3"></div>
                    <span>EAR (Eye Aspect Ratio) Calculation</span>
                  </li>
                  <li className="flex items-center text-gray-400">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
                    <span className="text-white">Drowsiness Threshold Check & Alert Trigger</span>
                  </li>
                </ul>
              </div>
              <div className="flex-1 w-full flex justify-center">
                {/* Schematic Representation */}
                <div className="w-full max-w-sm aspect-square bg-slate-900 rounded-full border-2 border-dashed border-gray-700 flex items-center justify-center relative">
                  <div className="absolute inset-0 rounded-full border border-brand-500/10 animate-[spin_10s_linear_infinite]"></div>
                  <div className="text-center">
                    <div className="text-4xl font-black text-brand-600 mb-2">68</div>
                    <div className="text-xs text-gray-500 font-mono uppercase">Facial Landmarks</div>
                  </div>
                  {/* Nodes around the circle */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-3 h-3 bg-gray-700 rounded-full"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 45}deg) translate(140px) rotate(-${i * 45}deg)`
                      }}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mt-12 flex justify-center">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-500/25 hover:-translate-y-1"
          >
            Launch Live System
            <ChevronRightIcon className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};