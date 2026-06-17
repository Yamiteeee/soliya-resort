// src/hooks/useThemeprovider.tsx
"use client";

import React, { createContext, useContext } from "react";
import { solidColors } from "@/provider/colors";

interface ThemeContextType {
  colors: typeof solidColors;
}

// Pass a valid default structure matching the type interface
const ThemeContext = createContext<ThemeContextType>({ colors: solidColors });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={{ colors: solidColors }}>
      <div className={`${solidColors.bg} min-h-screen antialiased`}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used safely inside a ThemeProvider container block");
  }
  return context;
}