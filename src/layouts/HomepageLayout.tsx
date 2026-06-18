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
      
      {/* 1. NAVIGATION BAR */}
      <nav className="fixed top-0 z-40 w-full backdrop-blur-md transition-all duration-300 border-b border-white/10 bg-zinc-950/20">
        <div className="mx-auto flex items-center justify-between px-6 py-4 max-w-7xl md:px-12">
          <a href="#" className="transition-opacity hover:opacity-90">
            <Logo variant="light" />
          </a>
          
          {/* Linked Target Navigation Grid */}
          <div className="hidden items-center space-x-8 text-xs font-bold uppercase tracking-[0.2em] md:flex text-white">
            <a href="#experience" className="transition-all duration-300 hover:opacity-70">The Philosophy</a>
            <a href="#villas" className="transition-all duration-300 hover:opacity-70">Sanctuaries</a>
            {/* Added Activity Shortcut right here */}
            <a href="#adventures" className="transition-all duration-300 text-amber-400 hover:opacity-80">Adventures</a>
            <a href="#wellness" className="transition-all duration-300 hover:opacity-70">Wellness</a>
            <a href="#lifestyle" className="transition-all duration-300 hover:opacity-70">Island Life</a>
          </div>
          
          <div className="flex items-center">{navAction}</div>
        </div>
      </nav>

      {/* 2. CORE CONTENT STREAM */}
      {/* Increased pb-44 dynamically for mobile viewports to prevent the food grid or footers from sliding under the bar */}
      <main className="relative z-10 flex-1 pb-44 sm:pb-36 md:pb-40">
        {children}
      </main>

      {/* 3. FIXED LAYOUT STICKY BOTTOM SLOT */}
      <div className="relative z-30">
        {bookingBarSlot}
      </div>
      
    </div>
  );
}