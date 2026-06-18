"use client";

import React from 'react';
import { useTheme } from "@/hooks/useThemeprovider";

interface TableRowData {
  title: string;
  features: string;
  bestFor: string;
}

interface TableProps {
  headers: string[];
  data: TableRowData[];
  className?: string;
  isDark?: boolean; // Prop to adapt to dark background canvases
}

export default function Table({ headers, data, className = '', isDark = false }: TableProps) {
  const { colors } = useTheme();

  // Dynamic Theme Tokens mapped cleanly to prevent hardcoded canvas collisions
  const textBaseColor = isDark ? "text-white" : colors.text;
  const textMutedColor = isDark ? colors.mutedLight : colors.muted;
  const hoverBgColor = isDark ? "hover:bg-zinc-950/40" : `hover:${colors.surface}`;
  const tagBgColor = isDark ? "bg-black text-zinc-300" : colors.surface;
  const titleAccentColor = isDark ? "group-hover:text-emerald-400" : `group-hover:${colors.accent}`;

  return (
    <div className={`w-full overflow-x-auto ${colors.selectionBg || "selection:bg-zinc-800"} ${colors.selectionText || "selection:text-zinc-100"} ${className}`}>
      <table className={`w-full min-w-[700px] border-collapse text-left text-sm ${textBaseColor}`}>
        
        {/* Header Block Using Clean Spacing (Borders Removed) */}
        <thead className={`text-[11px] uppercase tracking-[0.25em] font-bold ${textMutedColor}`}>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Content Stream */}
        <tbody className="font-sans text-[13px] md:text-sm">
          {data.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              className={`group transition-all duration-300 ease-out ${hoverBgColor}`}
            >
              {/* Sanctuary Title Column */}
              <td className={`px-6 py-6 font-serif text-base font-normal tracking-wide transition-colors ${titleAccentColor}`}>
                {row.title}
              </td>
              
              {/* Core Features Column */}
              <td className={`px-6 py-6 max-w-sm leading-relaxed font-light ${textMutedColor}`}>
                {row.features}
              </td>
              
              {/* Target Tag Column */}
              <td className={`px-6 py-6 font-sans text-xs uppercase tracking-wider font-medium ${textMutedColor}`}>
                <span className={`inline-block px-3 py-1 rounded-xs ${tagBgColor}`}>
                  {row.bestFor}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}