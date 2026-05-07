'use client';

import { useState } from 'react';
import { useStatsContext } from '@/context/StatsContext';
import { HistoryEntry } from './HistoryEntry';

interface GenerationHistoryProps {
  onReplay: (videoUrl: string) => void;
}

export function GenerationHistory({ onReplay }: GenerationHistoryProps) {
  const { history, clearHistory } = useStatsContext();
  const [collapsed, setCollapsed] = useState(false);

  if (history.length === 0) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">Past Generations</p>
        <p className="mt-3 text-sm text-gray-400">No generations yet. Create your first video!</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => setCollapsed((c) => !c)}
        className="flex w-full items-center justify-between p-4 text-left"
        aria-expanded={!collapsed}
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Past Generations
          <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-indigo-100 px-1 text-[10px] font-bold text-indigo-600">
            {history.length}
          </span>
        </span>
        <svg
          className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${collapsed ? '' : 'rotate-180'}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>

      {!collapsed && (
        <>
          <ul className="max-h-[360px] overflow-y-auto px-3 pb-3 space-y-0.5">
            {history.map((entry) => (
              <HistoryEntry key={entry.id} entry={entry} onReplay={onReplay} />
            ))}
          </ul>
          <div className="border-t border-gray-100 px-4 py-2">
            <button
              type="button"
              onClick={clearHistory}
              className="text-[11px] text-gray-400 hover:text-red-500 transition-colors duration-100"
            >
              Clear history
            </button>
          </div>
        </>
      )}
    </div>
  );
}
