"use client";

import React from "react";
import { createPortal } from "react-dom";
import { useModal } from "@/hooks/useModal";

interface UniversalModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string; // Allows parent overrides for wrapper constraints
}

export default function UniversalModal({
  isOpen,
  onClose,
  children,
  className = "max-w-xl"
}: UniversalModalProps) {
  const { shouldRender } = useModal(isOpen, onClose);

  if (!shouldRender) return null;

  const modalLayoutRoot = (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-zinc-950/30 p-4 sm:p-6 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className={`w-full ${className} transform transition-all duration-300 scale-100 focus:outline-none`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );

  return createPortal(modalLayoutRoot, document.body);
}