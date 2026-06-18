"use client";

import { motion, AnimatePresence } from "framer-motion";
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
          <div className="flex flex-col items-center max-w-xs text-center px-6">
            
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

            {/* 3. Minimal Progress Line Accent */}
            {/* FIXED: Swapped out h-[1px] for the canonical h-px core utility */}
            <div className="w-24 h-px bg-stone-800 mt-8 relative overflow-hidden">
              <motion.div 
                initial={{ left: "-100%" }}
                animate={{ left: "100%" }}
                transition={{ duration: 1.8, ease: "easeInOut", repeat: 0 }}
                className="absolute top-0 bottom-0 left-0 w-1/2 bg-emerald-500"
              />
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}