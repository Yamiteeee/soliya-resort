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
        {/* Adjusted padding on md to give the links more side-to-side breathing room */}
        <div className="mx-auto flex items-center justify-between px-4 py-4 max-w-7xl md:px-6 lg:px-12">
          <a href="#" className="transition-opacity hover:opacity-90 flex-shrink-0">
            <Logo variant="light" />
          </a>
          
          {/* FIXED FOR TABLETS:
            - Replaced `space-x-8` with dynamic `gap-3 md:gap-4 lg:gap-8`
            - Set text to `text-[10px]` on tablet (`md:`) and scaled up to `lg:text-xs`
            - Lowered tracking slightly on tablets (`md:tracking-wider lg:tracking-[0.2em]`)
          */}
          <div className="hidden items-center text-[10px] lg:text-xs font-bold uppercase tracking-wider lg:tracking-[0.2em] md:flex gap-4 lg:gap-8 text-white">
            <a href="#experience" className="whitespace-nowrap transition-all duration-300 hover:opacity-70">The Philosophy</a>
            <a href="#villas" className="whitespace-nowrap transition-all duration-300 hover:opacity-70">Sanctuaries</a>
            {/* Added Activity Shortcut right here */}
            <a href="#adventures" className="whitespace-nowrap transition-all duration-300 text-amber-400 hover:opacity-80">Adventures</a>
            <a href="#wellness" className="whitespace-nowrap transition-all duration-300 hover:opacity-70">Wellness</a>
            <a href="#lifestyle" className="whitespace-nowrap transition-all duration-300 hover:opacity-70">Island Life</a>
          </div>
          
          <div className="flex items-center flex-shrink-0">{navAction}</div>
        </div>
      </nav>

      {/* 2. CORE CONTENT STREAM */}
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