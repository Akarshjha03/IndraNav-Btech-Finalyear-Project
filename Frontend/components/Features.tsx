import React from 'react';
import { EyeIcon, ActivityIcon, AlertTriangleIcon, ShieldCheckIcon } from './Icons';
import { Feature } from '../types';

const features: Feature[] = [
  {
    icon: <EyeIcon className="h-8 w-8 text-brand-400" />,
    title: "Real-time Monitoring",
    description: "Advanced computer vision algorithms track blink rate, eye closure duration, and head posture 60 times per second."
  },
  {
    icon: <AlertTriangleIcon className="h-8 w-8 text-accent-500" />,
    title: "Adaptive Alerts",
    description: "Multi-sensory warnings escalate from gentle vibrations to loud auditory alarms based on danger levels."
  },
  {
    icon: <ActivityIcon className="h-8 w-8 text-brand-400" />,
    title: "Trip Analytics",
    description: "Post-trip reports visualize your fatigue patterns, helping you plan safer driving schedules for long hauls."
  },
  {
    icon: <ShieldCheckIcon className="h-8 w-8 text-brand-400" />,
    title: "Emergency Protocol",
    description: "Automatically shares your location with emergency contacts if critical drowsiness is ignored."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-brand-500 font-semibold tracking-wide uppercase">Core Technology</h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
            A Copilot That Never Sleeps
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-400 mx-auto">
            IndraNav combines edge computing with behavioral psychology to keep you safe on every mile.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="pt-6">
                <div className="flow-root glass-panel rounded-2xl px-6 pb-8 h-full hover:bg-white/10 transition-colors duration-300 border border-white/5">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-slate-800 rounded-xl shadow-lg border border-white/10">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-white tracking-tight">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
