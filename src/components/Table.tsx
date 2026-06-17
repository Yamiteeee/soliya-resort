"use client";

import React from 'react';
import { useTheme } from '@/hooks/useThemeprovider';

interface TableRowData {
  title: string;
  features: string;
  bestFor: string;
}

interface TableProps {
  headers: string[];
  data: TableRowData[];
}

export default function Table({ headers, data }: TableProps) {
  const { colors } = useTheme();

  return (
    // Removed the heavy outside border frame to let the layout breathe naturally
    <div className="w-full overflow-x-auto selection:bg-zinc-800 selection:text-white">
      <table className={`w-full min-w-[700px] border-collapse text-left text-sm ${colors.text}`}>
        
        {/* Luxury Thead: Swapped to fine borders, lowercase italic font-serif or tracking-widest uppercase sans */}
        <thead className={`border-b border-zinc-300/80 text-[11px] uppercase tracking-[0.25em] ${colors.muted} font-semibold`}>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-5 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        
        {/* Luxury Tbody: Generous vertical padding, ultra-faint borders, and a soft backdrop hover tint */}
        <tbody className="divide-y divide-zinc-200/60 font-sans text-[13px] md:text-sm">
          {data.map((row, rowIdx) => (
            <tr 
              key={rowIdx} 
              className="group transition-all duration-300 ease-out hover:bg-zinc-100/50"
            >
              {/* Row Title: Luxurious Serif Font swap to match room titles */}
              <td className="px-6 py-7 font-serif text-base font-medium tracking-wide text-zinc-900 group-hover:text-emerald-800 transition-colors">
                {row.title}
              </td>
              
              {/* Features: Crisp alignment and optimal line-height spacing for luxury reading */}
              <td className={`px-6 py-7 max-w-sm leading-relaxed text-zinc-600 font-light`}>
                {row.features}
              </td>
              
              {/* Best For: Styled cleanly without cliché italics, giving it an editorial editorial look */}
              <td className="px-6 py-7 font-sans text-xs uppercase tracking-wider text-zinc-500 font-medium">
                <span className="inline-block border border-zinc-200 bg-white px-3 py-1 rounded-sm shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
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