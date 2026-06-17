"use client";

import React from 'react';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { useTheme } from '@/hooks/useThemeprovider';

interface HomepageLayoutProps {
  children: React.ReactNode;
}

export default function HomepageLayout({ children }: HomepageLayoutProps) {
  const { colors } = useTheme();

  return (
    <div className={`min-h-screen font-sans antialiased ${colors.contentBg} ${colors.text} ${colors.selectionBg} ${colors.selectionText}`}>
      
      {/* 1. Global Minimalist Navigation */}
      <nav className={`fixed top-0 z-50 w-full border-b backdrop-blur-md ${colors.border} ${colors.navBg} ${colors.textLight}`}>
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl md:px-12">
          
          {/* Clean, readable logo anchor */}
          <a href="#" className="transition-opacity hover:opacity-90">
            <Logo variant="dark" />
          </a>
          
          {/* Links Visibility - Leverages clean theme configuration hover rules */}
          <div className={`hidden items-center space-x-8 text-xs font-medium uppercase tracking-[0.2em] md:flex ${colors.textLight} opacity-90`}>
            <a href="#experience" className={`transition-all duration-300 ${colors.textHoverLight} hover:opacity-100 opacity-85`}>The Experience</a>
            <a href="#villas" className={`transition-all duration-300 ${colors.textHoverLight} hover:opacity-100 opacity-85`}>Sanctuaries</a>
            <a href="#lifestyle" className={`transition-all duration-300 ${colors.textHoverLight} hover:opacity-100 opacity-85`}>Island Life</a>
          </div>

          <div>
            <Button 
              variant="primary" 
              className="hidden px-5 py-2.5 text-xs font-semibold border-none md:block shadow-sm"
            >
              Inquire Now
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. Main Content Stream */}
      <main className="relative pb-24 md:pb-0">
        {children}
      </main>

      {/* 3. Global Modern Footer */}
      <footer className={`border-t px-6 py-12 md:px-12 md:pb-28 ${colors.surface} ${colors.muted} ${colors.border}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h4 className={`mb-4 font-serif text-lg font-medium ${colors.text}`}>Soliya Siargao</h4>
            <p className="max-w-xs text-sm leading-relaxed">
              A conscious eco-luxury sanctuary hidden safely along the pristine shores of General Luna, islands of the Philippines.
            </p>
          </div>
          <div>
            <h5 className={`mb-4 text-xs font-medium uppercase tracking-widest ${colors.text}`}>Navigation</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#experience" className={`transition-colors hover:${colors.accent}`}>The Experience</a></li>
              <li><a href="#villas" className={`transition-colors hover:${colors.accent}`}>Sanctuaries</a></li>
              <li><a href="#lifestyle" className={`transition-colors hover:${colors.accent}`}>Island Life</a></li>
            </ul>
          </div>
          <div>
            <h5 className={`mb-4 text-xs font-medium uppercase tracking-widest ${colors.text}`}>Sustainability</h5>
            <p className="text-sm leading-relaxed">
              Proudly single-use plastic free. Powered partially by solar energy and deep love for our oceans.
            </p>
          </div>
        </div>
        <div className={`mx-auto max-w-7xl border-t mt-10 pt-6 text-xs flex flex-col md:flex-row justify-between gap-4 ${colors.border}`}>
          <p>&copy; {new Date().getFullYear()} Soliya Siargao Resort. Built with Next.js & Tailwind CSS.</p>
          <p className={`tracking-wide font-medium ${colors.muted}`}>Where the Swell Meets Soul.</p>
        </div>
      </footer>

      {/* 4. Sticky Booking Bar */}
      <div className={`fixed bottom-0 left-0 z-40 w-full border-t backdrop-blur-md px-6 py-4 shadow-xl md:py-5 ${colors.surface} ${colors.border}`}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
          <div className="grid w-full grid-cols-2 gap-3 text-left font-sans text-xs md:flex md:flex-1 md:gap-6">
            <div className={`flex flex-col flex-1 border-b md:border-b-0 md:border-r pb-1 md:pb-0 md:pr-4 ${colors.border}`}>
              <span className={`text-[10px] uppercase tracking-wider ${colors.muted} font-medium mb-1`}>Check-In</span>
              <input type="date" className={`bg-transparent font-medium focus:outline-none w-full ${colors.text}`} defaultValue="2026-07-15" />
            </div>
            <div className={`flex flex-col flex-1 border-b md:border-b-0 md:border-r pb-1 md:pb-0 md:pr-4 ${colors.border}`}>
              <span className={`text-[10px] uppercase tracking-wider ${colors.muted} font-medium mb-1`}>Check-Out</span>
              <input type="date" className={`bg-transparent font-medium focus:outline-none w-full ${colors.text}`} defaultValue="2026-07-22" />
            </div>
          </div>
          <Button variant="primary" className="w-full text-xs py-3 px-8 shadow-md border-none md:w-auto">
            Reserve Sanctuary
          </Button>
        </div>
      </div>

    </div>
  );
}