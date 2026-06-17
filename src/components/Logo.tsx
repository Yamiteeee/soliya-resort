"use client";

import React from 'react';
import { useTheme } from '@/provider/themeprovider';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  const { colors } = useTheme();

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Abstract Geometric Wave/Sun Emblem */}
      <svg
        className={`h-9 w-9 ${colors.text}`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fine Circular Sun Frame */}
        <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
        {/* Minimalist Crest Wave */}
        <path
          d="M25 55C35 40 45 40 55 55C65 70 75 70 85 55"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M15 45C27 30 39 30 51 45C63 60 75 60 87 45"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>

      {/* Brand Wordmark Typography */}
      <div className="flex flex-col tracking-widest uppercase">
        <span className={`font-serif text-lg font-light ${colors.text}`}>
          Soliya
        </span>
        <span className={`font-sans text-[9px] tracking-[0.4em] font-medium -mt-1 ${colors.muted}`}>
          Siargao
        </span>
      </div>
    </div>
  );
}