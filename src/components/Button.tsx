"use client";

import React from 'react';
import { useTheme } from '@/hooks/useThemeprovider';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const { colors } = useTheme();

  const baseStyles = 'px-6 py-3 font-medium text-sm uppercase tracking-widest transition-all duration-300 ease-in-out focus:outline-none';
  
  // Variants now dynamically consume direct token mappings from the config file
  const variants = {
    primary: `${colors.btnPrimaryBg} ${colors.btnPrimaryText} ${colors.btnPrimaryHover} shadow-sm`,
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