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
    // REDUCED VERTICAL PADDING ON MOBILE: `pt-3 pb-3` scales up to `md:pt-5 md:pb-4`
    <div className={`fixed bottom-0 left-0 z-40 w-full backdrop-blur-md px-4 md:px-6 pt-3 pb-3 md:pt-5 md:pb-4 shadow-2xl border-t border-white/10 ${colors.surface} ${className}`}>
      <div className="mx-auto max-w-7xl">
        
        {/* COMPACT INTERACTIVE ROW ON MOBILE */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between md:gap-12">
          
          {/* Main Controls Row: Holds Dates and CTA closely on mobile */}
          <div className="flex flex-row items-center justify-between gap-4 md:flex-1 md:gap-12">
            
            {/* Date Inputs Grid: Compact layout on mobile */}
            <div className="grid grid-cols-2 gap-4 text-left font-sans text-xs flex-1 max-w-[280px] sm:max-w-md md:max-w-none">
              
              {/* Arrival Date */}
              <div 
                onClick={() => checkInRef.current?.showPicker()} 
                className="group flex flex-col cursor-pointer select-none"
              >
                <span className={`text-[9px] md:text-[10px] uppercase tracking-wider font-bold mb-0.5 md:mb-1.5 transition-colors group-hover:${colors.accent} ${colors.muted}`}>
                  Arrival
                </span>
                <span className={`text-xs md:text-sm tracking-wide font-medium ${colors.text}`}>
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

              {/* Departure Date */}
              <div 
                onClick={() => checkOutRef.current?.showPicker()} 
                className="group flex flex-col cursor-pointer select-none"
              >
                <span className={`text-[9px] md:text-[10px] uppercase tracking-wider font-bold mb-0.5 md:mb-1.5 transition-colors group-hover:${colors.accent} ${colors.muted}`}>
                  Departure
                </span>
                <span className={`text-xs md:text-sm tracking-wide font-medium ${colors.text}`}>
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

            {/* CTA Button: Placed inline on mobile right next to dates */}
            <div className="flex-shrink-0">
              <Button 
                variant="primary" 
                onClick={onReserveClick}
                className={`text-[10px] md:text-xs py-2.5 px-4 md:py-3.5 md:px-8 shadow-md border-none font-bold uppercase tracking-widest transition-transform active:scale-[0.98] w-auto ${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover}`}
              >
                Reserve
              </Button>
            </div>

          </div>

          {/* Night Counter Display: Condensed position for larger screens */}
          {totalNights > 0 && (
            <div className="hidden sm:block md:text-right font-sans whitespace-nowrap md:pr-2 md:order-none">
              <span className={`text-[10px] uppercase tracking-widest block font-bold mb-0.5 ${colors.muted}`}>
                Duration
              </span>
              <span className={`text-xs font-semibold ${colors.text}`}>
                {totalNights} {totalNights === 1 ? 'Night' : 'Nights'}
              </span>
            </div>
          )}
          
        </div>

        {/* BOTTOM LAYER: HIDDEN ON MOBILE (`hidden md:flex`) to save height space */}
        <div className="hidden md:flex mt-1 pt-3 border-t border-zinc-700/30 flex-col sm:flex-row items-center justify-between gap-2 text-[10px] tracking-[0.15em] uppercase font-sans">
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