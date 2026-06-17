"use client";

import React from 'react';
import { useTheme } from '@/provider/themeprovider';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const { colors } = useTheme();

  const baseStyles = 'px-6 py-3 font-medium text-sm uppercase tracking-widest transition-all duration-300 ease-in-out focus:outline-none';
  
  // Variants now dynamically point to colors configured inside the ThemeProvider
  const variants = {
    primary: `${colors.accent === 'text-emerald-500' ? 'bg-emerald-500 text-stone-950 hover:bg-emerald-400' : 'bg-emerald-900 text-stone-100 hover:bg-emerald-800'} shadow-sm`,
    secondary: `${colors.surface} ${colors.text} hover:opacity-90 shadow-sm border ${colors.border}`,
    outline: `border ${colors.border} ${colors.text} hover:${colors.accent}`,
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}