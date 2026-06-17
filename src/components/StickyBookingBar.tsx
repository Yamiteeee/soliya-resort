"use client";

import React, { useState, useEffect, useRef } from 'react';
import Button from '@/components/Button';
import { useTheme } from '@/hooks/useThemeprovider';

export default function StickyBookingBar() {
  const { colors } = useTheme();

  // Get current date in Manila/Asia timezone format (YYYY-MM-DD)
  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    if (offsetDays > 0) d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const [checkIn, setCheckIn] = useState(getTodayString(28)); // Default to ~4 weeks out
  const [checkOut, setCheckOut] = useState(getTodayString(35)); // Default to 1 week stay
  const [totalNights, setTotalNights] = useState(7);

  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  // Recalculate total nights whenever check-in or check-out changes
  useEffect(() => {
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    
    if (!isNaN(date1.getTime()) && !isNaN(date2.getTime())) {
      const timeDiff = date2.getTime() - date1.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      setTotalNights(nights > 0 ? nights : 0);
    }
  }, [checkIn, checkOut]);

  // Handle Check-In change and enforce calendar logic
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);

    // Enforce that check-out must be at least 1 day after check-in
    const currentCheckOutDate = new Date(checkOut);
    const newCheckInDate = new Date(newCheckIn);

    if (currentCheckOutDate <= newCheckInDate) {
      const nextDay = new Date(newCheckInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  // Safe limits: cannot book dates in the past
  const minCheckIn = getTodayString();
  const minCheckOut = checkIn 
    ? (() => {
        const d = new Date(checkIn);
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
      })()
    : getTodayString(1);

  return (
    <div className={`fixed bottom-0 left-0 z-40 w-full border-t backdrop-blur-md px-6 py-4 shadow-xl md:py-5 ${colors.surface} ${colors.border}`}>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row md:gap-12">
        
        {/* Dynamic Interactive Date Form Blocks */}
        <div className="grid w-full grid-cols-2 gap-4 text-left font-sans text-xs md:flex md:flex-1 md:gap-8">
          
          {/* Check-In Custom Box */}
          <div 
            onClick={() => checkInRef.current?.showPicker()} 
            className={`group relative flex flex-col flex-1 border-b md:border-b-0 md:border-r pb-2 md:pb-0 md:pr-6 cursor-pointer select-none ${colors.border}`}
          >
            <span className={`text-[10px] uppercase tracking-wider ${colors.muted} font-medium mb-1 transition-colors group-hover:text-emerald-800`}>
              Arrival Date
            </span>
            <div className="relative flex items-center justify-between">
              <span className={`text-sm tracking-wide font-medium ${colors.text}`}>
                {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Select Date"}
              </span>
              {/* Invisible input overlay that listens perfectly to natural clicks */}
              <input 
                ref={checkInRef}
                type="date" 
                min={minCheckIn}
                value={checkIn}
                onChange={handleCheckInChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
              />
            </div>
          </div>

          {/* Check-Out Custom Box */}
          <div 
            onClick={() => checkOutRef.current?.showPicker()} 
            className={`group relative flex flex-col flex-1 border-b md:border-b-0 pb-2 md:pb-0 cursor-pointer select-none ${colors.border}`}
          >
            <span className={`text-[10px] uppercase tracking-wider ${colors.muted} font-medium mb-1 transition-colors group-hover:text-emerald-800`}>
              Departure Date
            </span>
            <div className="relative flex items-center justify-between">
              <span className={`text-sm tracking-wide font-medium ${colors.text}`}>
                {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : "Select Date"}
              </span>
              <input 
                ref={checkOutRef}
                type="date" 
                min={minCheckOut}
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer pointer-events-none"
              />
            </div>
          </div>

        </div>

        {/* Dynamic Action Button Stream & Night Counter */}
        <div className="flex w-full flex-col sm:flex-row items-center gap-4 md:w-auto min-w-[280px]">
          {totalNights > 0 && (
            <div className="text-center sm:text-right font-sans whitespace-nowrap">
              <span className={`text-[10px] uppercase tracking-widest block font-medium ${colors.muted}`}>
                Duration
              </span>
              <span className={`text-xs font-semibold ${colors.text}`}>
                {totalNights} {totalNights === 1 ? 'Night' : 'Nights'} in Paradise
              </span>
            </div>
          )}
          
          <Button 
            variant="primary" 
            className="w-full text-xs py-3.5 px-8 shadow-md border-none md:w-auto font-semibold uppercase tracking-widest transition-transform active:scale-[0.98]"
          >
            Reserve Sanctuary
          </Button>
        </div>

      </div>
    </div>
  );
}