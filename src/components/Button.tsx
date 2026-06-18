"use client";

import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  children, 
  className = '', 
  ...props 
}: ButtonProps) {

  const baseStyles = 'px-6 py-3 font-medium text-sm uppercase tracking-widest transition-all duration-300 ease-in-out focus:outline-none';
  
  // Clean, neutral default fallbacks. 
  // Any thematic overrides can be easily injected into `className` by the parent layout.
  const variants = {
    primary: 'bg-emerald-800 text-white hover:bg-emerald-950 shadow-sm',
    secondary: 'bg-[#faf8f5] text-[#2b221b] border border-[#e3d4c5] hover:bg-[#f5efe6] shadow-sm',
    outline: 'border border-current text-inherit hover:opacity-80',
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