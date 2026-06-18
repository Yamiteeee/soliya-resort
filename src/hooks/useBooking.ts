"use client";

import { useState, useMemo } from "react";

export function useBooking() {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  // Helper to generate dynamic safe ISO date strings
  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    if (offsetDays > 0) d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
  };

  const [checkIn, setRawCheckIn] = useState<string>(getTodayString());
  const [checkOut, setRawCheckOut] = useState<string>(getTodayString(1));

  // Enforce logical calendar booking boundaries cleanly on date mutations
  const setCheckIn = (dateStr: string) => {
    setRawCheckIn(dateStr);
    const newInDate = new Date(dateStr);
    const currentOutDate = new Date(checkOut);

    if (!isNaN(newInDate.getTime()) && currentOutDate <= newInDate) {
      const nextDay = new Date(newInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setRawCheckOut(nextDay.toISOString().split("T")[0]);
    }
  };

  const setCheckOut = (dateStr: string) => {
    setRawCheckOut(dateStr);
  };

  // Compute live cached night counter metrics safely
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate.getTime() - inDate.getTime();
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  }, [checkIn, checkOut]);

  const openBooking = () => setIsOpen(true);
  const closeBooking = () => setIsOpen(false);
  const showSuccess = () => setSuccess(true);
  const reset = () => setSuccess(false);

  return {
    isOpen,
    success,
    checkIn,
    checkOut,
    nights,
    setCheckIn,
    setCheckOut,
    openBooking,
    closeBooking,
    showSuccess,
    reset,
  };
}