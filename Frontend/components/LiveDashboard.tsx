import React, { useState, useEffect } from 'react';
import { CameraIcon, ActivityIcon, AlertTriangleIcon, ChevronRightIcon, ZapIcon } from './Icons';
import { NavigationProps } from '../types';

export const LiveDashboard: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isActive, setIsActive] = useState(false);
  const [serverStatus, setServerStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking');
  const [logs, setLogs] = useState<string[]>([]);
  
  // Explicitly use http:// for localhost to avoid browser upgrading to https automatically
  const API_URL = 'http://localhost:8000';

  // Check if backend is alive and sync system state
  useEffect(() => {
    const checkHealth = async () => {
      try {
        // Simple GET request to root
        const res = await fetch(`${API_URL}/`, {
            method: 'GET',
            mode: 'cors', // Important: enables cross-origin requests
            headers: {
              'Accept': 'application/json',
            },
        });
        
        if (res.ok) {
             const data = await res.json();
             setServerStatus('connected');
             // Sync the active state with backend
             if (data.running !== undefined && data.running !== isActive) {
               setIsActive(data.running);
             }
        } else {
             // Even if 404, the server responded, so it's technically connected
             if (res.status === 404) setServerStatus('connected');
             else setServerStatus('disconnected');
        }
      } catch (e) {
        console.error("Health check failed:", e);
        setServerStatus('disconnected');
      }
    };
    
    // Initial check
    checkHealth();
    
    // Poll every 5 seconds
    const interval = setInterval(checkHealth, 5000);
    return () => clearInterval(interval);
  }, [isActive]);

  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 4)]);
  };

  const handleStart = async () => {
    try {
      const res = await fetch(`${API_URL}/start`, { 
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setIsActive(true);
        addLog("System initialized. Camera stream active.");
      } else {
        addLog("Error: Could not start system. Check backend logs.");
      }
    } catch (e) {
      console.error("Start error:", e);
      addLog("Error: Could not start system. Is the backend running?");
    }
  };

  const handleStop = async () => {
    try {
      const res = await fetch(`${API_URL}/stop`, { 
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (res.ok) {
        setIsActive(false);
        addLog("System halted.");
      } else {
        addLog("Error: Could not stop system. Check backend logs.");
        setIsActive(false); // Force UI update
      }
    } catch (e) {
      console.error("Stop error:", e);
      addLog("Error: Could not stop system.");
      setIsActive(false); // Force UI update
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Dashboard Header */}
      <header className="bg-slate-950 border-b border-white/10 p-4 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => onNavigate('landing')}
               className="text-gray-400 hover:text-white flex items-center gap-1 text-sm font-medium transition-colors"
             >
               <span className="transform rotate-180 inline-block"><ChevronRightIcon className="w-4 h-4" /></span>
               Back to Home
             </button>
             <div className="h-6 w-px bg-gray-800"></div>
             <div className="font-bold text-xl tracking-tight">IndraNav <span className="text-brand-500 font-normal">Live Control</span></div>
          </div>
          <div className="flex items-center gap-3">
             <span className={`flex items-center gap-2 text-xs font-mono px-3 py-1 rounded-full border ${serverStatus === 'connected' ? 'bg-green-500/10 border-green-500/20 text-green-400' : 'bg-red-500/10 border-red-500/20 text-red-400'}`}>
                <div className={`w-2 h-2 rounded-full ${serverStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                {serverStatus === 'connected' ? 'BACKEND CONNECTED' : 'BACKEND OFFLINE'}
             </span>
          </div>
        </div>
      </header>

      <main className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Video Feed Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-black rounded-2xl overflow-hidden aspect-video border border-gray-800 relative shadow-2xl">
              {isActive && serverStatus === 'connected' ? (
                <img 
                  key={Date.now()} // Force re-mount on state change if needed, though simple src often suffices.
                  src={`${API_URL}/video_feed`}
                  alt="Live Drowsiness Detection Feed"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    // Fallback if image fails to load (stream broken)
                    (e.target as HTMLImageElement).style.display = 'none';
                    setServerStatus('disconnected');
                  }}
                  onLoad={(e) => {
                     (e.target as HTMLImageElement).style.display = 'block';
                  }}
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 bg-slate-900/50">
                   <CameraIcon className="w-16 h-16 mb-4 opacity-50" />
                   <p className="font-mono text-sm">{serverStatus === 'connected' ? 'SYSTEM STANDBY' : 'WAITING FOR SERVER CONNECTION...'}</p>
                </div>
              )}
              
              {/* Overlay HUD */}
              <div className="absolute top-4 left-4 flex gap-2">
                 <div className="bg-black/60 backdrop-blur px-3 py-1 rounded border border-white/10 text-xs font-mono text-gray-300">
                    CAM_01: {isActive ? 'ACTIVE' : 'OFFLINE'}
                 </div>
              </div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={handleStart}
                disabled={isActive || serverStatus === 'disconnected'}
                className={`p-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
                    isActive 
                    ? 'bg-slate-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-green-600 hover:bg-green-500 text-white shadow-lg shadow-green-900/20'
                }`}
              >
                <ZapIcon className="w-5 h-5" />
                START SYSTEM
              </button>
              <button 
                onClick={handleStop}
                disabled={!isActive}
                className={`p-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all ${
                    !isActive 
                    ? 'bg-slate-800 text-gray-500 cursor-not-allowed' 
                    : 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20'
                }`}
              >
                <div className="w-4 h-4 bg-white rounded-sm"></div>
                STOP SYSTEM
              </button>
            </div>
            
            {serverStatus === 'disconnected' && (
                <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-xl">
                   <div className="flex items-start gap-3">
                        <AlertTriangleIcon className="w-6 h-6 text-yellow-500 flex-shrink-0" />
                        <div>
                            <h4 className="text-yellow-500 font-bold text-sm">Backend Not Detected</h4>
                            <p className="text-gray-400 text-sm mt-1">
                                1. Ensure <code>fastapi_server.py</code> is running.<br/>
                                2. Check the console for CORS errors.<br/>
                                3. If using Chrome, try allowing insecure content for localhost.
                            </p>
                        </div>
                   </div>
                </div>
            )}
          </div>

          {/* Sidebar Stats & Logs */}
          <div className="space-y-6">
             <div className="glass-panel p-6 rounded-2xl border border-white/10">
                <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-4">Real-time Metrics</h3>
                
                <div className="space-y-4">
                   <div>
                      <div className="flex justify-between text-sm mb-1">
                         <span className="text-gray-400">EAR (Eye Aspect Ratio)</span>
                         <span className="text-brand-400 font-mono">0.28</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-brand-500 w-[65%]"></div>
                      </div>
                   </div>
                   <div>
                      <div className="flex justify-between text-sm mb-1">
                         <span className="text-gray-400">MAR (Mouth Aspect Ratio)</span>
                         <span className="text-brand-400 font-mono">0.12</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                         <div className="h-full bg-green-500 w-[20%]"></div>
                      </div>
                   </div>
                </div>
             </div>

             <div className="glass-panel p-6 rounded-2xl border border-white/10 h-64 flex flex-col">
                 <h3 className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-4 flex items-center gap-2">
                    <ActivityIcon className="w-4 h-4" /> System Logs
                 </h3>
                 <div className="flex-1 overflow-y-auto space-y-2 font-mono text-xs text-gray-500">
                    {logs.length === 0 && <span className="opacity-50 italic">Waiting for events...</span>}
                    {logs.map((log, i) => (
                        <div key={i} className="border-l-2 border-slate-700 pl-2 py-0.5">{log}</div>
                    ))}
                 </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
};
