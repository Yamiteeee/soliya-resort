"use client";

import React from 'react';
import { useTheme } from '@/hooks/useThemeprovider';

interface CardProps {
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  tag?: string;
}

export default function Card({ imageSrc, altText, title, description, tag }: CardProps) {
  const { colors } = useTheme();

  return (
    <div className={`group overflow-hidden border transition-all duration-300 hover:shadow-md ${colors.border} ${colors.surface}`}>
      <div className={`relative h-64 w-full overflow-hidden ${colors.bg}`}>
        <img 
          src={imageSrc} 
          alt={altText} 
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
        {tag && (
          <span className={`absolute top-4 left-4 text-[10px] uppercase tracking-widest px-3 py-1 font-medium ${colors.tagBg} ${colors.tagText}`}>
            {tag}
          </span>
        )}
      </div>
      <div className="p-6">
        <h3 className={`font-serif text-xl font-medium mb-2 ${colors.text}`}>{title}</h3>
        <p className={`text-sm leading-relaxed font-sans ${colors.muted}`}>{description}</p>
      </div>
    </div>
  );
}