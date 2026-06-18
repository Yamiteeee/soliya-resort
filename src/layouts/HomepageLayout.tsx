"use client";

import React from "react";
import Logo from "@/components/Logo";

interface HomepageLayoutProps {
  children: React.ReactNode;
  navAction?: React.ReactNode;      
  bookingBarSlot?: React.ReactNode; 
  className?: string;
}

export default function HomepageLayout({
  children,
  navAction,
  bookingBarSlot,
  className = "",
}: HomepageLayoutProps) {
  return (
    // Added relative and isolated stacking container context via z-0
    <div className={`min-h-screen font-sans antialiased relative z-0 ${className}`}>
      
      {/* 1. IMMERSIVE FIXED NAVIGATION BAR */}
      {/* Reduced z-index to z-40 so modals (z-50 or higher) always dominate */}
      <nav className="fixed top-0 z-40 w-full backdrop-blur-md transition-all duration-300">
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl md:px-12">
          <a href="#" className="transition-opacity hover:opacity-90">
            <Logo variant="light" />
          </a>
          
          {/* Main Links */}
          <div className="hidden items-center space-x-8 text-xs font-bold uppercase tracking-[0.2em] md:flex">
            <a href="#experience" className="transition-all duration-300">The Experience</a>
            <a href="#villas" className="transition-all duration-300">Sanctuaries</a>
            <a href="#lifestyle" className="transition-all duration-300">Island Life</a>
          </div>
          
          {/* Action Trigger Slot */}
          <div className="flex items-center">{navAction}</div>
        </div>
      </nav>

      {/* 2. CORE CONTENT STREAM */}
      <main className="relative z-10 pb-32 md:pb-24">
        {children}
      </main>

      {/* 3. GLOBAL FOOTER MARKS */}
      <footer className="px-6 py-12 md:px-12 md:pb-32">
        <div className="mx-auto max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs tracking-wider">
          <p className="font-medium">© 2026 Soliya Siargao. All rights reserved.</p>
          <p className="font-serif italic">Where the swell meets soul.</p>
        </div>
      </footer>

      {/* 4. FIXED LAYOUT STICKY BOTTOM SLOT */}
      {/* Lowered to z-30 so it sits below nav and modal stacks */}
      <div className="relative z-30">
        {bookingBarSlot}
      </div>
      
    </div>
  );
}