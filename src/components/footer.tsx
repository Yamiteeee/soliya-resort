"use client";

import React from 'react';
import Button from '@/components/Button';
import { useTheme } from "@/hooks/useThemeprovider";

interface StickyBookingBarProps {
  checkIn: string;
  checkOut: string;
  totalNights: number;
  minCheckIn?: string;
  minCheckOut?: string;
  formattedCheckIn: string;
  formattedCheckOut: string;
  checkInRef: React.RefObject<HTMLInputElement | null>;
  checkOutRef: React.RefObject<HTMLInputElement | null>;
  onCheckInChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckOutChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onReserveClick: () => void;
  className?: string;
}

export default function StickyBookingBar({
  checkIn,
  checkOut,
  totalNights,
  minCheckIn,
  minCheckOut,
  formattedCheckIn,
  formattedCheckOut,
  checkInRef,
  checkOutRef,
  onCheckInChange,
  onCheckOutChange,
  onReserveClick,
  className = '',
}: StickyBookingBarProps) {
  const { colors } = useTheme();

  return (
    <div className={`fixed bottom-0 left-0 z-40 w-full backdrop-blur-md px-6 pt-5 pb-4 shadow-2xl border-t border-white/10 ${colors.surface} ${className}`}>
      <div className="mx-auto max-w-7xl">
        
        {/* TOP LAYER: Interactive Booking Controls */}
        <div className="flex flex-col items-center justify-between gap-5 pb-5 md:flex-row md:gap-12">
          
          {/* Date Inputs Container */}
          <div className="grid w-full grid-cols-2 gap-6 text-left font-sans text-xs md:flex md:flex-1 md:gap-12">
            
            {/* Arrival Date Custom Input */}
            <div 
              onClick={() => checkInRef.current?.showPicker()} 
              className="group flex flex-col flex-1 pb-1 cursor-pointer select-none"
            >
              <span className={`text-[10px] uppercase tracking-wider font-bold mb-1.5 transition-colors group-hover:${colors.accent} ${colors.muted}`}>
                Arrival Date
              </span>
              <span className={`text-sm tracking-wide font-medium ${colors.text}`}>
                {formattedCheckIn}
              </span>
              
              <input 
                ref={checkInRef}
                type="date" 
                min={minCheckIn}
                value={checkIn}
                onChange={onCheckInChange}
                tabIndex={-1}
                className="sr-only"
              />
            </div>

            {/* Departure Date Custom Input */}
            <div 
              onClick={() => checkOutRef.current?.showPicker()} 
              className="group flex flex-col flex-1 pb-1 cursor-pointer select-none"
            >
              <span className={`text-[10px] uppercase tracking-wider font-bold mb-1.5 transition-colors group-hover:${colors.accent} ${colors.muted}`}>
                Departure Date
              </span>
              <span className={`text-sm tracking-wide font-medium ${colors.text}`}>
                {formattedCheckOut}
              </span>

              <input 
                ref={checkOutRef}
                type="date" 
                min={minCheckOut}
                value={checkOut}
                onChange={onCheckOutChange}
                tabIndex={-1}
                className="sr-only"
              />
            </div>
          </div>

          {/* Night Counter Display & Button */}
          <div className="flex w-full flex-col sm:flex-row items-center justify-end gap-6 md:w-auto min-w-[320px]">
            {totalNights > 0 && (
              <div className="text-center sm:text-right font-sans whitespace-nowrap sm:pr-2">
                <span className={`text-[10px] uppercase tracking-widest block font-bold mb-0.5 ${colors.muted}`}>
                  Duration
                </span>
                <span className={`text-xs font-semibold ${colors.text}`}>
                  {totalNights} {totalNights === 1 ? 'Night' : 'Nights'} in Paradise
                </span>
              </div>
            )}
            
            <Button 
              variant="primary" 
              onClick={onReserveClick}
              className={`w-full text-xs py-3.5 px-8 shadow-md border-none md:w-auto font-bold uppercase tracking-widest transition-transform active:scale-[0.98] ${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover}`}
            >
              Reserve Sanctuary
            </Button>
          </div>
        </div>

        {/* BOTTOM LAYER: Visible, Highly Professional Integrated Copyright Line */}
        <div className="mt-1 pt-3 border-t border-zinc-700/30 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] tracking-[0.15em] uppercase font-sans">
          <p className="text-zinc-400 font-medium">
            © 2026 Soliya Siargao. All rights reserved.
          </p>
          <p className="font-serif italic lowercase tracking-wide text-zinc-400 normal-case">
            where the swell meets soul.
          </p>
        </div>

      </div>
    </div>
  );
}