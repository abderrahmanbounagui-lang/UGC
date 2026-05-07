'use client';

import { BADGE_THRESHOLDS } from '@/lib/constants';
import { BadgeId } from '@/lib/types';

interface BadgeRowProps {
  unlockedBadges: BadgeId[];
}

export function BadgeRow({ unlockedBadges }: BadgeRowProps) {
  return (
    <div className="flex items-center gap-3">
      {BADGE_THRESHOLDS.map((badge) => {
        const unlocked = unlockedBadges.includes(badge.id);
        return (
          <div key={badge.id} className="flex flex-col items-center gap-0.5" title={`${badge.label} (${badge.threshold} videos)`}>
            <span
              className={[
                'flex h-8 w-8 items-center justify-center rounded-full text-base transition-all duration-500',
                unlocked
                  ? 'badge-glow bg-indigo-100 text-indigo-600 shadow-sm'
                  : 'bg-gray-100 text-gray-400 grayscale opacity-50',
              ].join(' ')}
              aria-label={unlocked ? `${badge.label} badge unlocked` : `${badge.label} badge locked`}
            >
              {badge.emoji}
            </span>
            <span className={`text-[10px] font-medium ${unlocked ? 'text-indigo-600' : 'text-gray-400'}`}>
              {badge.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
