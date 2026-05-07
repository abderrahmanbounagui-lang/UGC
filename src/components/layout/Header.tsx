'use client';

import { useStatsContext } from '@/context/StatsContext';
import { BadgeRow } from '@/components/gamification/BadgeRow';

export function Header() {
  const { stats } = useStatsContext();

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white text-sm">
            🎬
          </span>
          <span className="text-sm font-semibold text-gray-900 tracking-tight">
            Product Video Generator
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-500">
            <span className="font-semibold text-gray-900">{stats.totalGenerated}</span>
            <span>{stats.totalGenerated === 1 ? 'video' : 'videos'} created</span>
          </div>
          <BadgeRow unlockedBadges={stats.unlockedBadges} />
        </div>
      </div>
    </header>
  );
}
