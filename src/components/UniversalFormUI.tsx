"use client";

import React, { useMemo } from "react";
import Logo from "@/components/Logo";
import { useTheme } from "@/hooks/useThemeprovider";
import { FormFieldSchema } from "@/types";
import { SANCTUARY_ROOM_STATUS } from "@/provider/Mockdata";

interface UniversalFormUIProps {
  schema: FormFieldSchema[];
  values: Record<string, any>;
  onChange: (fieldName: string, value: any) => void;
  className?: string;
}

// 1. ISOLATED PERFORMANCE MEMO FIELD COMPONENT
const FormFieldItem = React.memo(({
  field,
  index,
  value,
  isOccupied,
  isRoomOccupiedFn,
  onChange,
  baseInputClass
}: {
  field: FormFieldSchema;
  index: number;
  value: any;
  isOccupied: boolean;
  isRoomOccupiedFn: (name: string) => boolean;
  onChange: (fieldName: string, value: any) => void;
  baseInputClass: string;
}) => {
  return (
    <div 
      className="space-y-1.5 flex flex-col text-left will-change-transform"
      style={{ 
        animation: `fadeIn 0.3s ease-out ${index * 40}ms both`
      }}
    >
      {/* Elegant Upper Label Marks */}
      <label className="block text-[10px] font-sans font-bold uppercase tracking-[0.18em] text-zinc-500">
        {field.label} {field.required && <span className="text-emerald-800 ml-0.5">*</span>}
      </label>

      {/* RENDER TEXTAREA */}
      {field.type === "textarea" && (
        <textarea
          rows={3}
          className={`${baseInputClass} resize-none focus:ring-0`}
          placeholder={field.placeholder}
          value={value}
          onChange={(e) => onChange(field.name, e.target.value)}
          required={field.required}
        />
      )}

      {/* RENDER SELECT DROPDOWN */}
      {field.type === "select" && (
        <div className="relative w-full group">
          <select
            className={`${baseInputClass} appearance-none pr-10 cursor-pointer focus:ring-0 text-zinc-900 ${
              isOccupied ? "border-amber-500 focus:border-amber-500 text-amber-800" : ""
            }`}
            value={value}
            onChange={(e) => onChange(field.name, e.target.value)}
            required={field.required}
          >
            {field.placeholder && (
              <option value="" disabled className="text-zinc-400 bg-white">
                {field.placeholder}
              </option>
            )}
            {field.options?.map((opt) => {
              const occupied = isRoomOccupiedFn(opt);
              return (
                <option 
                  key={opt} 
                  value={opt} 
                  disabled={occupied}
                  className={`py-3 bg-white font-sans ${
                    occupied ? "text-zinc-300 line-through bg-zinc-50" : "text-zinc-900 font-medium"
                  }`}
                >
                  {opt} {occupied ? "— (Fully Booked)" : ""}
                </option>
              );
            })}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-1 pointer-events-none text-zinc-400">
            <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          {isOccupied && (
            <p className="text-[10px] text-amber-700 tracking-wide font-sans mt-1 font-medium">
              This sanctuary is occupied for the selected window. Please choose an available refuge.
            </p>
          )}
        </div>
      )}

      {/* RENDER STANDARD INPUT FIELDS */}
      {field.type !== "textarea" && field.type !== "select" && (
        <div className="relative w-full">
          <input
            type={field.type}
            className={`${baseInputClass} ${
              field.type === "date" ? "cursor-pointer [color-scheme:light]" : ""
            }`}
            placeholder={field.placeholder}
            value={value}
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
}, (prevProps, nextProps) => {
  // Ultra strict rendering guard rule: Only update if value changes or structural schemas shift
  return (
    prevProps.value === nextProps.value && 
    prevProps.isOccupied === nextProps.isOccupied &&
    prevProps.field === nextProps.field
  );
});

FormFieldItem.displayName = "FormFieldItem";

// 2. MAIN CONTAINER
export default function UniversalFormUI({
  schema,
  values,
  onChange,
  className = "space-y-6"
}: UniversalFormUIProps) {
  const { colors } = useTheme();
  
  const baseInputClass = "w-full px-0 py-3 bg-transparent text-zinc-900 font-sans placeholder:text-zinc-400 focus:outline-none transition-all duration-300 text-sm tracking-wide border-b border-zinc-200 focus:border-zinc-800 focus:pl-1";

  // Cache rooms map instantly to avoid O(N) lookup array filtering cycles inside loop rendering passes
  const occupiedRoomsMap = useMemo(() => {
    const map: Record<string, boolean> = {};
    SANCTUARY_ROOM_STATUS.forEach(room => {
      map[room.name.toLowerCase()] = room.status === "Occupied";
    });
    return map;
  }, []);

  // O(1) Instant Lookup Handler function passed down
  const isRoomOccupied = React.useCallback((roomName: string) => {
    return !!occupiedRoomsMap[roomName.toLowerCase()];
  }, [occupiedRoomsMap]);

  return (
    <div className={`bg-white text-zinc-900 p-6 md:p-8 rounded-sm shadow-xl border border-zinc-100 ${className}`}>
      
      {/* BRAND EMBELLISHMENT */}
      <div className="flex flex-col items-start pb-4 border-b border-zinc-100 mb-5">
        <Logo variant="dark" className="scale-90 -ml-2" />
        <p className="text-[11px] font-sans tracking-widest text-zinc-400 uppercase mt-2">
          Sanctuary Reservation Form
        </p>
      </div>

      {/* Live Room Status Ribbon Bar */}
      <div className="mb-6 bg-zinc-50/50 rounded-sm p-3.5 border border-zinc-100 text-left">
        <span className="block text-[9px] font-sans font-bold uppercase tracking-[0.2em] text-zinc-400 mb-2">
          Live Sanctuary Availability
        </span>
        <div className="flex flex-wrap gap-2">
          {SANCTUARY_ROOM_STATUS.map((room) => (
            <div 
              key={room.id} 
              className={`flex items-center gap-2 text-[10px] px-2.5 py-1 rounded-full border font-sans font-medium tracking-wide ${room.color}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${
                room.status === "Available" ? "bg-emerald-600 opacity-90 animate-pulse" : "bg-amber-600"
              }`} />
              <span>{room.name}:</span>
              <span className="font-bold lowercase opacity-90">{room.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Render optimized nodes mapping frame loop */}
      {schema.map((field, index) => {
        const fieldValue = values[field.name] ?? "";
        const isCurrentSelectionOccupied = field.type === "select" && isRoomOccupied(fieldValue);

        return (
          <FormFieldItem
            key={field.name}
            field={field}
            index={index}
            value={fieldValue}
            isOccupied={isCurrentSelectionOccupied}
            isRoomOccupiedFn={isRoomOccupied}
            onChange={onChange}
            baseInputClass={baseInputClass}
          />
        );
      })}
    </div>
  );
}