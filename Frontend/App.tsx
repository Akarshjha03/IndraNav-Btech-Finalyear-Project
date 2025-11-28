import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { SystemDesign } from './components/SystemDesign';
import { LiveDashboard } from './components/LiveDashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');

  const navigateTo = (page: 'landing' | 'dashboard') => {
    setCurrentView(page);
    window.scrollTo(0, 0);
  };

  if (currentView === 'dashboard') {
    return <LiveDashboard onNavigate={navigateTo} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main>
        <Hero onNavigate={navigateTo} />
        <Features />
        
        {/* Simple "How it works" Section */}
        <section id="how-it-works" className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-extrabold text-white">How IndraNav Works</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-12 text-center">
                    <div className="relative">
                        <div className="w-16 h-16 bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-brand-400 border border-brand-500/30">1</div>
                        <h3 className="text-xl font-semibold text-white mb-3">Mount & Connect</h3>
                        <p className="text-gray-400">Place your device on the dashboard. Our app calibrates to your eye level instantly.</p>
                    </div>
                    <div className="relative">
                         <div className="w-16 h-16 bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-brand-400 border border-brand-500/30">2</div>
                        <h3 className="text-xl font-semibold text-white mb-3">Drive Safely</h3>
                        <p className="text-gray-400">AI monitors your fatigue levels in real-time, working silently in the background.</p>
                    </div>
                    <div className="relative">
                         <div className="w-16 h-16 bg-brand-900 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold text-brand-400 border border-brand-500/30">3</div>
                        <h3 className="text-xl font-semibold text-white mb-3">Stay Alert</h3>
                        <p className="text-gray-400">Receive instant audio-visual alerts if signs of drowsiness are detected.</p>
                    </div>
                </div>
            </div>
        </section>

        <SystemDesign onNavigate={navigateTo} />
      </main>
      
      {/* Simple copyright footer since main footer was removed */}
      <div className="bg-slate-950 border-t border-white/10 py-8 text-center text-gray-600 text-sm">
        <p>&copy; {new Date().getFullYear()} IndraNav Project. All rights reserved.</p>
      </div>
    </div>
  );
};

export default App;