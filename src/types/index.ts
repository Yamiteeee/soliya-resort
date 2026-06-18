import React from "react";

export interface Sanctuary {
  title: string;
  description: string;
  features: string;
  bestFor: string;
  images: string[];
  specs: string[];
}

export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
}

export interface BookingFormState {
  room: string;
  name: string;
  email: string;
  phone: string;
  guests: number;
  message: string;
}

export interface AccommodationComparison {
  title: string;
  features: string;
  bestFor: string;
}

export interface FormFieldSchema {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "number" | "date" | "select" | "textarea";
  placeholder?: string;
  required?: boolean;
  options?: string[];
  min?: number | string;
  max?: number | string;
}

// Added Component Layout Props here
export interface BookingLayoutProps {
  isOpen: boolean;
  success: boolean;
  step: number;
  form: BookingFormState;
  nights: number;
  checkIn: string;
  checkOut: string;
  onClose: () => void;
  onNext: () => void;
  onBack: () => void;
  onFormChange: (fieldName: string, value: any) => void;
  onSubmit: (e: React.FormEvent) => void;
}