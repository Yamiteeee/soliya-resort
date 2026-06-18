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
    <div className={`min-h-screen flex flex-col font-sans antialiased relative z-0 ${className}`}>
      
      {/* 1. IMMERSIVE FIXED NAVIGATION BAR */}
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
      {/* Added bottom padding so content never gets cut off behind the new taller unified bar */}
      <main className="relative z-10 flex-1 pb-32 md:pb-40">
        {children}
      </main>

      {/* 3. FIXED LAYOUT STICKY BOTTOM SLOT */}
      <div className="relative z-30">
        {bookingBarSlot}
      </div>
      
    </div>
  );
}