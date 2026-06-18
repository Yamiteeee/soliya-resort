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
  formattedCheckIn: string;   // Passed down clean text presentation
  formattedCheckOut: string;  // Passed down clean text presentation
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
    <div className={`fixed bottom-0 left-0 z-40 w-full backdrop-blur-md px-6 py-4 shadow-xl md:py-5 ${colors.surface} ${className}`}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-5 md:flex-row md:gap-12">
        
        {/* Date Inputs Container */}
        <div className="grid w-full grid-cols-2 gap-6 text-left font-sans text-xs md:flex md:flex-1 md:gap-12">
          
          {/* Arrival Date Custom Input */}
          <div 
            onClick={() => checkInRef.current?.showPicker()} 
            className="group flex flex-col flex-1 pb-3 md:pb-0 cursor-pointer select-none"
          >
            <span className={`text-[10px] uppercase tracking-wider font-bold mb-1.5 transition-colors group-hover:${colors.accent} ${colors.muted}`}>
              Arrival Date
            </span>
            <span className={`text-sm tracking-wide ${colors.inputValueText || "text-zinc-800 font-medium"}`}>
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
            className="group flex flex-col flex-1 pb-3 md:pb-0 cursor-pointer select-none"
          >
            <span className={`text-[10px] uppercase tracking-wider font-bold mb-1.5 transition-colors group-hover:${colors.accent} ${colors.muted}`}>
              Departure Date
            </span>
            <span className={`text-sm tracking-wide ${colors.inputValueText || "text-zinc-800 font-medium"}`}>
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
            className={`w-full text-xs py-3.5 px-8 shadow-md border-none md:w-auto font-semibold uppercase tracking-widest transition-transform active:scale-[0.98] ${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover}`}
          >
            Reserve Sanctuary
          </Button>
        </div>

      </div>
    </div>
  );
}