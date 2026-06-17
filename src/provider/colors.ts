// src/provider/colors.ts
export const solidColors = {
  // 1. Hero & Top Bar Theme Canvas
  bg: "bg-zinc-900",            
  navBg: "bg-zinc-900/90",      

  // 2. Main Page Content Canvas
  contentBg: "bg-stone-50",     
  surface: "bg-zinc-100/70",    
  border: "border-zinc-200/80", 

  // 3. Typography & Accents
  text: "text-zinc-800",        
  textLight: "text-zinc-100",   
  textHoverLight: "hover:text-white", // Dynamic bright-white pop on header links
  muted: "text-zinc-500",       // For standard light content sections
  mutedLight: "text-zinc-400/80", // Opaque silver/ivory for high readability in dark/hero zones
  accent: "text-emerald-800",   

  // 4. Badges / Tags (Dynamic Overrides)
  tagBg: "bg-emerald-900",      
  tagText: "text-stone-100",    

  // 5. Button Specific Themes
  btnPrimaryBg: "bg-emerald-800",
  btnPrimaryText: "text-white",
  btnPrimaryHover: "hover:bg-emerald-700",

  // 6. Global Text Selection Theme
  selectionBg: "selection:bg-zinc-800",
  selectionText: "selection:text-zinc-100",
} as const;