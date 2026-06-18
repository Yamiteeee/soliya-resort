"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useEffect, useState } from "react";

export default function PageLoader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Keep loader visible for 2.2 seconds, then trigger slide out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // FIXED: Explicitly typed function using Framer Motion's custom 'Variants' definition
  const getDropVariants = (delay: number, xOffset: number): Variants => ({
    initial: { opacity: 0, y: 10, x: xOffset, scale: 0.4 },
    animate: { 
      opacity: [0, 1, 1, 0],
      y: [-2, -22, -12], 
      scale: [0.4, 1, 0.8, 0],
      transition: { 
        duration: 1.2, 
        delay: delay, 
        ease: "linear", // Swapped to canonical string literal
        repeat: Infinity,
        repeatDelay: 0.4
      }
    }
  });

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-stone-950 text-stone-100"
        >
          <div className="flex flex-col items-center max-w-xs text-center px-6 relative">
            
            {/* 1. Animated Vector Emblem */}
            <motion.svg
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-16 w-16 text-stone-100 mb-6"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="44" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 5" />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 0.3, ease: "easeInOut" }}
                d="M25 55C35 40 45 40 55 55C65 70 75 70 85 55"
                stroke="#10b981"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            </motion.svg>

            {/* 2. Masked Staggered Typography Reveal */}
            <div className="overflow-hidden h-7 mb-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.215, 0.610, 0.355, 1] }}
                className="font-serif text-2xl font-light tracking-[0.25em] uppercase text-stone-100"
              >
                Soliya
              </motion.h1>
            </div>

            <div className="overflow-hidden h-4">
              <motion.p
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.215, 0.610, 0.355, 1] }}
                className="font-sans text-[10px] tracking-[0.4em] uppercase text-stone-400 font-medium"
              >
                Siargao Island
              </motion.p>
            </div>

            {/* 3. Fluid Wave Signature & Dynamic Splash */}
            <div className="w-32 h-12 mt-6 relative flex flex-col items-center justify-center overflow-visible">
              
              {/* Splashing Vector Droplets */}
              <motion.span 
                variants={getDropVariants(1.1, -15)} initial="initial" animate="animate"
                className="absolute left-1/2 w-1.5 h-1.5 rounded-full bg-emerald-400/80" 
              />
              <motion.span 
                variants={getDropVariants(0.9, 0)} initial="initial" animate="animate"
                className="absolute left-1/2 w-1 h-2 rounded-full bg-emerald-400" 
              />
              <motion.span 
                variants={getDropVariants(1.3, 12)} initial="initial" animate="animate"
                className="absolute left-1/2 w-1.5 h-1.5 rounded-full bg-emerald-500/60" 
              />

              {/* Minimalist Cresting Wave Path */}
              <svg 
                className="w-full h-6 text-stone-800" 
                viewBox="0 0 120 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.6, delay: 0.2, ease: "easeInOut" }}
                  d="M0 16C15 16 20 8 35 8C50 8 55 20 70 20C85 20 90 4 105 4C115 4 118 10 120 12"
                  stroke="url(#waveGradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="waveGradient" x1="0" y1="0" x2="120" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#292524" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                </defs>
              </svg>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}