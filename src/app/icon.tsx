import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
 
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';
 
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0c0a09', // stone-950 deep luxurious backdrop
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '25%', // Sleek rounded square look in the browser tab
          padding: '4px',
        }}
      >
        {/* Replicated vector lines directly from components/Logo.tsx */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 100 100"
          style={{ display: 'block' }}
        >
          {/* Circular Sun Frame */}
          <circle 
            cx="50" 
            cy="50" 
            r="44" 
            stroke="#f5f5f4" 
            strokeWidth="3" 
            strokeDasharray="6 6" 
            fill="none" 
          />
          {/* Primary Wave */}
          <path
            d="M25 55C35 40 45 40 55 55C65 70 75 70 85 55"
            stroke="#10b981" // emerald-500 accent line pop for the tab icon
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Secondary Accent Wave */}
          <path
            d="M15 45C27 30 39 30 51 45C63 60 75 60 87 45"
            stroke="#f5f5f4"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}