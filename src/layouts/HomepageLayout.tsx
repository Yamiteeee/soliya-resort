"use client";

import React, { useEffect, useState } from 'react';
import Button from '@/components/Button';
import Logo from '@/components/Logo';
import { useTheme } from '@/provider/themeprovider';

interface HomepageLayoutProps {
  children: React.ReactNode;
}

export default function HomepageLayout({ children }: HomepageLayoutProps) {
  const { colors, theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Force sync execution to happen purely client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // Structural skeleton matching system defaults to prevent visual flashes
  if (!mounted) {
    return (
      <div className="min-h-screen font-sans antialiased bg-stone-50 text-stone-900 dark:bg-stone-950 dark:text-stone-100">
        <nav className="fixed top-0 z-50 w-full border-b border-stone-200 bg-stone-50/80 dark:border-stone-800 dark:bg-stone-950/60 backdrop-blur-md h-[69px]" />
        <main className="relative pb-24 md:pb-0">{children}</main>
      </div>
    );
  }

  return (
    <div className={`min-h-screen font-sans antialiased transition-colors duration-300 ${colors.bg} ${colors.text} ${
      theme === 'dark' 
        ? 'selection:bg-emerald-500 selection:text-stone-950' 
        : 'selection:bg-emerald-900 selection:text-stone-100'
    }`}>
      
      {/* 1. Global Minimalist Navigation */}
      <nav className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${colors.border} ${colors.navBg} backdrop-blur-md`}>
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl md:px-12">
          <a href="#" className="transition-opacity hover:opacity-90">
            <Logo />
          </a>
          
          <div className="hidden items-center space-x-8 text-xs font-medium uppercase tracking-widest md:flex">
            <a href="#experience" className="transition-colors hover:opacity-80">The Experience</a>
            <a href="#villas" className="transition-colors hover:opacity-80">Sanctuaries</a>
            <a href="#lifestyle" className="transition-colors hover:opacity-80">Island Life</a>
            
            <button 
              onClick={toggleTheme}
              className={`ml-4 p-2 transition-colors focus:outline-none hover:opacity-80 ${colors.muted}`}
              aria-label="Toggle Design Theme"
            >
              {theme === "light" ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M16.243 17.657l.707.707M6.343 6.343l.707-.707M12 7a5 5 0 100 10 5 5 0 000-10z" />
                </svg>
              )}
            </button>
          </div>

          <div>
            <Button variant="outline" className="hidden px-4 py-2 text-xs md:block">
              Inquire
            </Button>
          </div>
        </div>
      </nav>

      {/* 2. Main Sections */}
      <main className="relative pb-24 md:pb-0">
        {children}
      </main>

      {/* 3. Global Modern Footer */}
      <footer className={`border-t px-6 py-12 md:px-12 md:pb-28 transition-colors duration-300 ${colors.surface} ${colors.muted} ${colors.border}`}>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <h4 className={`mb-4 font-serif text-lg font-medium ${colors.text}`}>Soliya Siargao</h4>
            <p className="max-w-xs text-sm leading-relaxed">
              A conscious eco-luxury sanctuary hidden along the pristine shores of General Luna, islands of the Philippines.
            </p>
          </div>
          <div>
            <h5 className={`mb-4 text-xs font-medium uppercase tracking-widest ${colors.text}`}>Navigation</h5>
            <ul className="space-y-2 text-sm">
              <li><a href="#experience" className="transition-colors hover:text-emerald-500">The Experience</a></li>
              <li><a href="#villas" className="transition-colors hover:text-emerald-500">Sanctuaries</a></li>
              <li><a href="#lifestyle" className="transition-colors hover:text-emerald-500">Island Life</a></li>
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
          <p className="tracking-wide">Where the Swell Meets Soul.</p>
        </div>
      </footer>

      {/* 4. Sticky Booking Bar */}
      <div className={`fixed bottom-0 left-0 z-40 w-full border-t backdrop-blur-sm px-6 py-4 shadow-xl md:py-5 transition-colors duration-300 ${colors.surface} ${colors.border}`}>
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 md:flex-row md:gap-8">
          <div className="grid w-full grid-cols-2 gap-3 text-left font-sans text-xs md:flex md:flex-1 md:gap-6">
            <div className={`flex flex-col flex-1 border-b md:border-b-0 md:border-r pb-1 md:pb-0 md:pr-4 ${colors.border}`}>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">Check-In</span>
              <input type="date" className={`bg-transparent font-medium focus:outline-none w-full ${colors.text}`} defaultValue="2026-07-15" />
            </div>
            <div className={`flex flex-col flex-1 border-b md:border-b-0 md:border-r pb-1 md:pb-0 md:pr-4 ${colors.border}`}>
              <span className="text-[10px] uppercase tracking-wider text-stone-500 font-medium mb-1">Check-Out</span>
              <input type="date" className={`bg-transparent font-medium focus:outline-none w-full ${colors.text}`} defaultValue="2026-07-22" />
            </div>
          </div>
          <Button variant="primary" className="w-full text-xs py-3 px-8 shadow-md md:w-auto">
            Reserve Sanctuary
          </Button>
        </div>
      </div>

    </div>
  );
}