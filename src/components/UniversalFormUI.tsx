"use client";

import React from "react";
import { useTheme } from "@/hooks/useThemeprovider";
import { FormFieldSchema } from "@/types";

interface UniversalFormUIProps {
  schema: FormFieldSchema[];
  values: Record<string, any>;
  onChange: (fieldName: string, value: any) => void;
  className?: string;
}

export default function UniversalFormUI({
  schema,
  values,
  onChange,
  className = "space-y-6"
}: UniversalFormUIProps) {
  const { colors } = useTheme();
  
  // Luxury minimalist border structure with floating focus states and modern layout spacing
  const baseInputClass = `w-full px-0 py-3 bg-transparent ${colors.text} placeholder:text-zinc-400/60 focus:outline-none transition-all duration-300 text-sm tracking-wide border-b border-zinc-300 dark:border-zinc-700 focus:border-emerald-800 dark:focus:border-emerald-600 focus:pl-1`;

  return (
    <div className={className}>
      {schema.map((field, index) => {
        const fieldValue = values[field.name] ?? "";

        return (
          <div 
            key={field.name} 
            className="space-y-1.5 flex flex-col text-left animate-fadeIn"
            style={{ 
              animationDelay: `${index * 60}ms`,
              animationFillMode: 'both' 
            }}
          >
            {/* Elegant Upper Label Marks */}
            <label className={`block text-[10px] font-sans font-bold uppercase tracking-[0.18em] transition-colors duration-300 ${colors.muted} opacity-80`}>
              {field.label} {field.required && <span className="text-emerald-700 dark:text-emerald-500 ml-0.5">*</span>}
            </label>

            {/* RENDER TEXTAREA */}
            {field.type === "textarea" && (
              <textarea
                rows={3}
                className={`${baseInputClass} resize-none focus:ring-0`}
                placeholder={field.placeholder}
                value={fieldValue}
                onChange={(e) => onChange(field.name, e.target.value)}
                required={field.required}
              />
            )}

            {/* RENDER SELECT DROPDOWN */}
            {field.type === "select" && (
              <div className="relative w-full group">
                <select
                  className={`${baseInputClass} appearance-none pr-10 cursor-pointer focus:ring-0`}
                  value={fieldValue}
                  onChange={(e) => onChange(field.name, e.target.value)}
                  required={field.required}
                >
                  {field.placeholder && (
                    <option value="" disabled className={colors.surface}>
                      {field.placeholder}
                    </option>
                  )}
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt} className={`py-3 ${colors.surface}`}>
                      {opt}
                    </option>
                  ))}
                </select>
                <div className={`absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none transition-transform duration-300 group-hover:translate-y-[1px] ${colors.muted}`}>
                  <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            )}

            {/* RENDER STANDARD INPUT FIELDS */}
            {field.type !== "textarea" && field.type !== "select" && (
              <div className="relative w-full">
                <input
                  type={field.type}
                  className={`${baseInputClass} ${
                    field.type === "date" ? "cursor-pointer [color-scheme:light] dark:[color-scheme:dark]" : ""
                  }`}
                  placeholder={field.placeholder}
                  value={fieldValue}
                  min={field.min}
                  max={field.max}
                  onChange={(e) => {
                    const val = field.type === "number" ? Number(e.target.value) : e.target.value;
                    onChange(field.name, val);
                  }}
                  required={field.required}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}