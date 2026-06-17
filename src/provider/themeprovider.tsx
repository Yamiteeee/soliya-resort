"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

// Define your design system color palette
const themeColors = {
  light: {
    bg: "bg-stone-50",
    surface: "bg-stone-100", // Soft contrast for section grids & card panels
    text: "text-stone-900",
    muted: "text-stone-600",   // Shifted to 600 for clean luxury readability scores
    accent: "text-emerald-900",
    border: "border-stone-200",
    navBg: "bg-stone-50/80",   // FIXED: Changed from dark stone to clear glass blur for light mode
  },
  dark: {
    bg: "bg-stone-950",
    surface: "bg-stone-900",
    text: "text-stone-100",
    muted: "text-stone-400",
    accent: "text-emerald-500",
    border: "border-stone-800",
    navBg: "bg-stone-950/60",
  },
};

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  colors: typeof themeColors.light; // Exposes the current color mapping
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("soliya-theme") as Theme;
    if (savedTheme) {
      setThemeState(savedTheme);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeState(prefersDark ? "dark" : "light");
    }
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem("soliya-theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      setTheme, 
      colors: themeColors[theme] 
    }}>
      <div className={`${themeColors[theme].bg} ${themeColors[theme].text} transition-colors duration-300 min-h-screen`}>
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