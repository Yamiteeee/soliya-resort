import { BookingFormState, AccommodationComparison, FormFieldSchema } from "@/types";

// PREMIUM LIVE STATUS CONTRACT INTERFACE
export interface SanctuaryRoomStatus {
  id: number;
  name: string;
  status: "Occupied" | "Available";
  color: string;
}

// PREMIUM LIVE STATUS OBJECT DATA - CENTRALIZED
export interface SanctuaryRoomStatus {
  id: number;
  name: string;
  status: "Occupied" | "Available";
  color: string;
  pricePerNight: number;
}

export const SANCTUARY_ROOM_STATUS: SanctuaryRoomStatus[] = [
  { id: 1, name: "Cloud 9 Ocean Suite", status: "Occupied", color: "bg-amber-500/20 text-amber-800 border-amber-600/20", pricePerNight: 550 },
  { id: 2, name: "The Canopy Loft", status: "Available", color: "bg-emerald-50 text-emerald-800 border-emerald-600/20", pricePerNight: 420 },
  { id: 3, name: "Soliya Eco Villa", status: "Occupied", color: "bg-amber-500/20 text-amber-800 border-amber-600/20", pricePerNight: 780 },
];
export const INITIAL_FORM_STATE: BookingFormState = {
  room: "Cloud 9 Ocean Suite",
  name: "",
  email: "",
  phone: "",
  guests: 1,
  message: "",
};

export const ACCOMMODATION_DATA: AccommodationComparison[] = [
  {
    title: "Cloud 9 Ocean Suite",
    features: "Panoramic Pacific views, private plunge pool, outdoor rain shower, private balcony hammock.",
    bestFor: "Honeymoons & Avid Surfers",
  },
  {
    title: "The Canopy Loft",
    features: "Elevated among coconut trees, floor-to-ceiling glass paneling, open skylight, standalone tub.",
    bestFor: "Creative Solitude & Digital Nomads",
  },
  {
    title: "Soliya Eco Villa",
    features: "100% Sustainable bamboo architecture, zero-footprint solar grid, private path to local lagoon.",
    bestFor: "Eco-Conscious Small Groups",
  },
];

export const TABLE_HEADERS = ["Sanctuary Type", "Premium Features & Architecture", "Ideal For"];

// --- CENTRALIZED STEP SCHEMAS FOR UNIVERSAL FORM ---
export const STEP_1_SCHEMA: FormFieldSchema[] = [
  { name: "checkIn", label: "Check-In Date", type: "date", required: true },
  { name: "checkOut", label: "Check-Out Date", type: "date", required: true },
];

export const STEP_2_SCHEMA: FormFieldSchema[] = [
  { 
    name: "room", 
    label: "Select Suite or Villa", 
    type: "select", 
    /* FIXED: Adjusted string values to match room status mapping properties exactly */
    options: ["Cloud 9 Ocean Suite", "The Canopy Loft", "Soliya Eco Villa"],
    required: true 
  },
  { name: "guests", label: "Total Guests", type: "number", min: 1, max: 10, required: true },
];

export const STEP_3_SCHEMA: FormFieldSchema[] = [
  { name: "name", label: "Your Full Name", type: "text", placeholder: "John Doe", required: true },
  { name: "email", label: "Email Address", type: "email", placeholder: "hello@example.com", required: true },
  { name: "phone", label: "Contact Number", type: "tel", placeholder: "+63 900 000 0000", required: true },
];

export const STEP_4_SCHEMA: FormFieldSchema[] = [
  { name: "message", label: "Special Requests or Notes", type: "textarea", placeholder: "Dietary requirements, surf guide configurations, airport transfers..." },
];



/**
 * Returns the matching form fields dynamic map depending on the current active step index
 */
export function getSchemaForStep(step: number): FormFieldSchema[] {
  switch (step) {
    case 1: return STEP_1_SCHEMA;
    case 2: return STEP_2_SCHEMA;
    case 3: return STEP_3_SCHEMA;
    case 4: return STEP_4_SCHEMA;
    default: return STEP_1_SCHEMA;
  }

  
}