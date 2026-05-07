'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useStats } from '@/hooks/useStats';
import { BadgeId, HistoryEntry, PVGStats } from '@/lib/types';

interface StatsContextValue {
  stats: PVGStats;
  history: HistoryEntry[];
  incrementAndCheck: () => BadgeId | null;
  addHistoryEntry: (entry: HistoryEntry) => void;
  clearHistory: () => void;
}

const StatsContext = createContext<StatsContextValue | null>(null);

export function StatsProvider({ children }: { children: ReactNode }) {
  const value = useStats();
  return <StatsContext.Provider value={value}>{children}</StatsContext.Provider>;
}

export function useStatsContext() {
  const ctx = useContext(StatsContext);
  if (!ctx) throw new Error('useStatsContext must be used inside StatsProvider');
  return ctx;
}
