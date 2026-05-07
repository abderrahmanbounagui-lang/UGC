'use client';

import { useCallback } from 'react';
import { BadgeId, HistoryEntry, PVGStats } from '@/lib/types';
import { BADGE_THRESHOLDS, HISTORY_MAX_ENTRIES } from '@/lib/constants';
import { useLocalStorage } from './useLocalStorage';

const DEFAULT_STATS: PVGStats = {
  totalGenerated: 0,
  unlockedBadges: [],
  lastBadgeShown: null,
};

export function useStats() {
  const [stats, setStats] = useLocalStorage<PVGStats>('pvg_stats', DEFAULT_STATS);
  const [history, setHistory] = useLocalStorage<HistoryEntry[]>('pvg_history', []);

  const incrementAndCheck = useCallback((): BadgeId | null => {
    let newlyUnlocked: BadgeId | null = null;

    setStats((prev) => {
      const oldCount = prev.totalGenerated;
      const newCount = oldCount + 1;

      const badge = BADGE_THRESHOLDS.find(
        (b) => oldCount < b.threshold && newCount >= b.threshold
      );

      if (badge && !prev.unlockedBadges.includes(badge.id)) {
        newlyUnlocked = badge.id;
        return {
          totalGenerated: newCount,
          unlockedBadges: [...prev.unlockedBadges, badge.id],
          lastBadgeShown: badge.id,
        };
      }

      return { ...prev, totalGenerated: newCount };
    });

    return newlyUnlocked;
  }, [setStats]);

  const addHistoryEntry = useCallback(
    (entry: HistoryEntry) => {
      setHistory((prev) => {
        const updated = [entry, ...prev];
        if (updated.length > HISTORY_MAX_ENTRIES) {
          updated.pop();
        }
        return updated;
      });
    },
    [setHistory]
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, [setHistory]);

  return { stats, history, incrementAndCheck, addHistoryEntry, clearHistory };
}
