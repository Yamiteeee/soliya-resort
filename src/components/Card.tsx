"use client";

import React from 'react';
import { useTheme } from "@/hooks/useThemeprovider";

interface CardProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  tag?: string;
  className?: string; // Gives the parent structural control
  aspectRatio?: string; // e.g., 'aspect-video', 'aspect-[4/3]', 'aspect-[16/10]'
}

export default function Card({ 
  imageSrc, 
  altText, 
  title, 
  description, 
  tag,
  className = '',
  aspectRatio = 'aspect-[16/10]' // Cinematic wide ratio prevents vertical room cuts
}: CardProps) {
  const { colors } = useTheme();

  return (
    <div className={`group overflow-hidden transition-all duration-300 hover:shadow-md ${colors.surface} ${className}`}>
      {/* Image Frame Wrapper with Dynamic Aspect Ratio */}
      <div className={`relative w-full overflow-hidden bg-zinc-100 ${aspectRatio}`}>
        <img 
          src={imageSrc} 
          alt={altText} 
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-103"
          loading="lazy"
        />
        {tag && (
          <span className={`absolute top-4 left-4 text-[9px] uppercase tracking-widest px-2.5 py-1 font-bold ${colors.tagBg} ${colors.tagText}`}>
            {tag}
          </span>
        )}
      </div>

      {/* Content Meta Frame */}
      <div className="p-6 space-y-2">
        <h3 className={`font-serif text-lg font-normal tracking-wide ${colors.text}`}>{title}</h3>
        <p className={`text-xs leading-relaxed font-sans ${colors.muted}`}>{description}</p>
      </div>
    </div>
  );
}