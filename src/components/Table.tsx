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
}

export default function Table({ headers, data, className = '' }: TableProps) {
  const { colors } = useTheme();

  return (
    <div className={`w-full overflow-x-auto ${colors.selectionBg || "selection:bg-zinc-800"} ${colors.selectionText || "selection:text-zinc-100"} ${className}`}>
      <table className={`w-full min-w-[700px] border-collapse text-left text-sm ${colors.text}`}>
        
        {/* Header Block Using Clean Spacing (Borders Removed) */}
        <thead className={`text-[11px] uppercase tracking-[0.25em] font-bold ${colors.muted}`}>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Content Stream (Dividers and Custom Tones Removed) */}
        <tbody className="font-sans text-[13px] md:text-sm">
          {data.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              className={`group transition-all duration-300 ease-out hover:${colors.surface}`}
            >
              {/* Sanctuary Title Column */}
              <td className={`px-6 py-6 font-serif text-base font-normal tracking-wide transition-colors group-hover:${colors.accent}`}>
                {row.title}
              </td>
              
              {/* Core Features Column */}
              <td className={`px-6 py-6 max-w-sm leading-relaxed font-light ${colors.muted}`}>
                {row.features}
              </td>
              
              {/* Target Tag Column (Explicit Border & Shadow Scrubbed) */}
              <td className={`px-6 py-6 font-sans text-xs uppercase tracking-wider font-medium ${colors.muted}`}>
                <span className={`inline-block px-3 py-1 ${colors.surface}`}>
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