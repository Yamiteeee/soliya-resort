"use client";

import React, { useMemo, useRef, useState, useEffect } from 'react';

interface UseFooterProps {
  checkIn: string;
  setCheckIn: (date: string) => void;
  checkOut: string;
  setCheckOut: (date: string) => void;
}

export function useFooter({ checkIn, setCheckIn, checkOut, setCheckOut }: UseFooterProps) {
  const [mounted, setMounted] = useState(false);
  const checkInRef = useRef<HTMLInputElement>(null);
  const checkOutRef = useRef<HTMLInputElement>(null);

  // Suppress hydration mismatch flags on localized date structures
  useEffect(() => {
    setMounted(true);
  }, []);

  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    if (offsetDays > 0) d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split('T')[0];
  };

  const totalNights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const date1 = new Date(checkIn);
    const date2 = new Date(checkOut);
    
    if (!isNaN(date1.getTime()) && !isNaN(date2.getTime())) {
      const timeDiff = date2.getTime() - date1.getTime();
      const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return nights > 0 ? nights : 0;
    }
    return 0;
  }, [checkIn, checkOut]);

  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCheckIn = e.target.value;
    setCheckIn(newCheckIn);

    const currentCheckOutDate = new Date(checkOut);
    const newCheckInDate = new Date(newCheckIn);

    if (currentCheckOutDate <= newCheckInDate) {
      const nextDay = new Date(newCheckInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setCheckOut(nextDay.toISOString().split('T')[0]);
    }
  };

  const minCheckIn = getTodayString();
  const minCheckOut = checkIn 
    ? (() => {
        const d = new Date(checkIn);
        d.setDate(d.getDate() + 1);
        return d.toISOString().split('T')[0];
      })()
    : getTodayString(1);

  const formatDateString = (dateStr: string) => {
    if (!dateStr || !mounted) return "Select Date";
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return "Select Date";
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return {
    checkInRef,
    checkOutRef,
    totalNights,
    minCheckIn,
    minCheckOut,
    handleCheckInChange,
    formatDateString,
  };
}