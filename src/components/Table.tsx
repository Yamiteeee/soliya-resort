"use client";

import React from 'react';
import { useTheme } from '@/provider/themeprovider';

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
    <div className={`w-full overflow-x-auto border ${colors.border}`}>
      <table className={`w-full min-w-[600px] border-collapse text-left text-sm ${colors.text}`}>
        <thead className={`${colors.surface} border-b ${colors.border} text-xs uppercase tracking-wider ${colors.muted} font-medium`}>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx} className="px-6 py-4">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody className={`divide-y ${colors.border} font-sans`}>
          {data.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-emerald-500/5 transition-colors">
              <td className="px-6 py-4 font-medium">{row.title}</td>
              <td className={`px-6 py-4 ${colors.muted}`}>{row.features}</td>
              <td className={`px-6 py-4 italic ${colors.muted}`}>{row.bestFor}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}