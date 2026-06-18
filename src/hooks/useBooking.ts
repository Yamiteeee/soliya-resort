"use client";

import { useState, useMemo, useCallback } from "react";
import { SANCTUARY_ROOM_STATUS } from "@/provider/Mockdata";

export interface BookingFormState {
  room: string;
  guests: number;
  [key: string]: any;
}

export function useBooking() {
  const [isOpen, setIsOpen] = useState(false);
  const [success, setSuccess] = useState(false);
  const [step, setStep] = useState<number>(1);

  // Form Field Primitive Values State Engine 
  const [form, setForm] = useState<BookingFormState>({
    room: "",
    guests: 1,
  });

  // Helper to generate dynamic safe ISO date strings
  const getTodayString = (offsetDays = 0) => {
    const d = new Date();
    if (offsetDays > 0) d.setDate(d.getDate() + offsetDays);
    return d.toISOString().split("T")[0];
  };

  const [checkIn, setRawCheckIn] = useState<string>(getTodayString());
  const [checkOut, setRawCheckOut] = useState<string>(getTodayString(1));

  // Enforce logical calendar booking boundaries cleanly on date mutations
  const setCheckIn = useCallback((dateStr: string) => {
    setRawCheckIn(dateStr);
    if (!dateStr) return;
    
    const newInDate = new Date(dateStr);
    const currentOutDate = new Date(checkOut);

    if (!isNaN(newInDate.getTime()) && (!checkOut || currentOutDate <= newInDate)) {
      const nextDay = new Date(newInDate);
      nextDay.setDate(nextDay.getDate() + 1);
      setRawCheckOut(nextDay.toISOString().split("T")[0]);
    }
  }, [checkOut]);

  const setCheckOut = useCallback((dateStr: string) => {
    setRawCheckOut(dateStr);
  }, []);

  // Comprehensive Form & State Reset Logic Engine
  const reset = useCallback(() => {
    setForm({ room: "", guests: 1 });
    setRawCheckIn(getTodayString());
    setRawCheckOut(getTodayString(1));
    setStep(1);
    setSuccess(false);
  }, []);

  // Compute live cached night counter metrics safely
  const nights = useMemo(() => {
    if (!checkIn || !checkOut) return 0;
    const inDate = new Date(checkIn);
    const outDate = new Date(checkOut);
    const diff = outDate.getTime() - inDate.getTime();
    return diff > 0 ? Math.ceil(diff / (1000 * 60 * 60 * 24)) : 0;
  }, [checkIn, checkOut]);

  // Integrated Form Change Controller Node 
  const onFormChange = useCallback((fieldName: string, value: any) => {
    if (fieldName === "checkIn") {
      setCheckIn(value);
    } else if (fieldName === "checkOut") {
      setCheckOut(value);
    } else {
      setForm((prev) => ({ ...prev, [fieldName]: value }));
    }
  }, [setCheckIn, setCheckOut]);

  // Fast hash mapping logic calculation for sub-nodes
  const roomMetaMap = useMemo(() => {
    const map: Record<string, { occupied: boolean; price: number }> = {};
    SANCTUARY_ROOM_STATUS.forEach(room => {
      map[room.name.toLowerCase()] = {
        occupied: room.status === "Occupied",
        price: room.pricePerNight
      };
    });
    return map;
  }, []);

  const isRoomOccupied = useCallback((roomName: string) => {
    return !!roomMetaMap[roomName.toLowerCase()]?.occupied;
  }, [roomMetaMap]);

  // Consolidated Business Invoicing Model Logic
  const priceSummary = useMemo(() => {
    const selectedRoom = form.room ? roomMetaMap[form.room.toLowerCase()] : null;
    const pricePerNight = selectedRoom ? selectedRoom.price : 0;
    const subtotal = pricePerNight * nights;
    const luxuryTax = subtotal * 0.12;

    return {
      pricePerNight,
      nights,
      subtotal,
      luxuryTax,
      total: subtotal + luxuryTax
    };
  }, [form.room, nights, roomMetaMap]);

  // Calendar Day Generation Processing Node
  const calendarDays = useMemo(() => {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const daysArray: Array<{ day: number | null; dateStr?: string; type: "selected" | "between" | "open" | "empty" }> = [];
    for (let i = 0; i < firstDayIndex; i++) daysArray.push({ day: null, type: "empty" });
    
    for (let d = 1; d <= totalDays; d++) {
      const dayStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      let state: "selected" | "between" | "open" = "open";

      if (checkIn === dayStr || checkOut === dayStr) state = "selected";
      else if (checkIn && checkOut && dayStr > checkIn && dayStr < checkOut) state = "between";

      daysArray.push({ day: d, dateStr: dayStr, type: state });
    }
    return daysArray;
  }, [checkIn, checkOut]);

  // Navigation Procedures
  const onNext = useCallback(() => setStep((s) => Math.min(s + 1, 4)), []);
  const onBack = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);
  const openBooking = useCallback(() => setIsOpen(true), []);
  
  const closeBooking = useCallback(() => {
    setIsOpen(false);
    reset(); // Clears all inputs and sequence traces gracefully
  }, [reset]);

  const onSubmit = useCallback(() => {
    setSuccess(true);
  }, []);

  return {
    isOpen,
    success,
    step,
    form,
    checkIn,
    checkOut,
    setCheckIn,
    setCheckOut,
    reset,
    nights,
    calendarDays,
    priceSummary,
    isRoomOccupied,
    onFormChange,
    onNext,
    onBack,
    openBooking,
    closeBooking,
    onSubmit,
    showSuccess: onSubmit, // 👈 FIXED: Corrected structural typo from howSuccess to showSuccess
  };
}