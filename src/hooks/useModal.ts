"use client";

import { useState, useEffect } from "react";

export function useModal(isOpen: boolean, onClose: () => void) {
  const [mounted, setMounted] = useState(false);

  // Safely manage structural portal mounting on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background viewport scroll leakages
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Global escape key handler sequence
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return { shouldRender: isOpen && mounted };
}