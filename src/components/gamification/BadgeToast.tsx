'use client';

import { useEffect, useState } from 'react';
import { BadgeId } from '@/lib/types';
import { BADGE_THRESHOLDS } from '@/lib/constants';

interface BadgeToastProps {
  badgeId: BadgeId | null;
  onDismiss: () => void;
}

export function BadgeToast({ badgeId, onDismiss }: BadgeToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!badgeId) return;
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDismiss, 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [badgeId, onDismiss]);

  if (!badgeId) return null;

  const badge = BADGE_THRESHOLDS.find((b) => b.id === badgeId);
  if (!badge) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className={[
        'fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl border border-indigo-200 bg-white px-4 py-3 shadow-lg transition-all duration-300',
        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0',
      ].join(' ')}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-lg">
        {badge.emoji}
      </span>
      <div>
        <p className="text-xs font-semibold text-gray-900">Badge unlocked!</p>
        <p className="text-xs text-gray-500">{badge.label}</p>
      </div>
      <button
        type="button"
        onClick={() => { setVisible(false); setTimeout(onDismiss, 300); }}
        className="ml-1 rounded p-1 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Dismiss"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
