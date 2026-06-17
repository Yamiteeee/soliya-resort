export interface Sanctuary {
  title: string;
  description: string;
  features: string;
  bestFor: string;
  images: string[];
  specs: string[];
}

// You can add more global types here later, like:
export interface BookingData {
  checkIn: string;
  checkOut: string;
  guests: number;
}