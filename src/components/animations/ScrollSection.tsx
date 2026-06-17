// src/components/ScrollSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
}

export default function ScrollSection({ children, id, className = "" }: ScrollSectionProps) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, x: 40 }} // Soft start off-screen to the right (shorter distance = cleaner slide)
      whileInView={{ opacity: 1, x: 0 }} // Slides smoothly into place
      viewport={{ 
        once: true,      // Ensures the animation plays once and stays locked in place!
        amount: 0.15     // Triggers slightly earlier (15% visibility) for a highly responsive feel
      }}
      transition={{ 
        duration: 0.9,   // Slightly longer duration for an effortless silk-smooth draw
        ease: [0.215, 0.610, 0.355, 1.000], // Premium cubic-bezier curve (Ease Out Quad/Cubic hybrid)
      }}
    >
      {children}
    </motion.div>
  );
}