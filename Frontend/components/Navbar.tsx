import React, { useState } from 'react';
import { EyeIcon, MenuIcon, XIcon } from './Icons';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0 flex items-center space-x-2">
            <div className="bg-brand-500 p-1.5 rounded-lg">
                <EyeIcon className="h-6 w-6 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">IndraNav</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#features" className="hover:text-brand-500 text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="hover:text-brand-500 text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">How it Works</a>
              <a href="#system-design" className="hover:text-brand-500 text-gray-300 px-3 py-2 rounded-md text-sm font-medium transition-colors">System Design</a>
            </div>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-white/10 focus:outline-none"
            >
              {isOpen ? <XIcon className="block h-6 w-6" /> : <MenuIcon className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden glass-panel border-t border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
            <a href="#how-it-works" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">How it Works</a>
            <a href="#system-design" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">System Design</a>
          </div>
        </div>
      )}
    </nav>
  );
};