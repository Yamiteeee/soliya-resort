"use client";

import { useState, useEffect, useRef } from "react";
import { useBooking } from "@/hooks/useBooking";
import { BookingFormState } from "@/types";
import { INITIAL_FORM_STATE } from "@/provider/Mockdata";

export function useHomeBookingFlow() {
  const [step, setStep] = useState<number>(1);
  const [form, setForm] = useState<BookingFormState>(INITIAL_FORM_STATE);

  const checkInInputRef = useRef<HTMLInputElement | null>(null);
  const checkOutInputRef = useRef<HTMLInputElement | null>(null);

  const booking = useBooking();
  const { isOpen, setCheckIn, setCheckOut, closeBooking, showSuccess, reset } = booking;

  // Sync step changes when overlay opens
  useEffect(() => {
    if (isOpen) setStep(1);
  }, [isOpen]);

  const handleModalClose = () => {
    closeBooking();
    setTimeout(() => {
      setStep(1);
      reset();
    }, 300);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showSuccess();

    setTimeout(() => {
      handleModalClose();
      setForm(INITIAL_FORM_STATE);
    }, 2200);
  };

  const handleFormChange = (name: string, value: any) => {
    if (name === "checkIn") setCheckIn(value);
    else if (name === "checkOut") setCheckOut(value);
    else setForm((prev) => ({ ...prev, [name]: value }));
  };

  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return "Select Date";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return {
    step,
    setStep,
    form,
    checkInInputRef,
    checkOutInputRef,
    booking,
    handleModalClose,
    handleFormSubmit,
    handleFormChange,
    formatDisplayDate,
  };
}