import { BookingFormState, AccommodationComparison, FormFieldSchema } from "@/types";

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
    title: "Canopy Loft",
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
    options: ["Cloud 9 Ocean Suite", "Canopy Loft", "Soliya Eco Villa"],
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