'use client';

import { useEffect, useState } from 'react';
import { ESTIMATED_DURATION_S } from '@/lib/constants';

interface GenerationProgressProps {
  startedAt: number | null;
  isSuccess: boolean;
}

export function GenerationProgress({ startedAt, isSuccess }: GenerationProgressProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startedAt) return;
    const interval = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startedAt) / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  const rawProgress = Math.min((elapsed / ESTIMATED_DURATION_S) * 90, 90);
  const progress = isSuccess ? 100 : rawProgress;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Video generation in progress"
      className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-8 shadow-md"
    >
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-gray-900">Generating your video…</p>
        <p className="text-xs text-gray-500">Usually takes ~{ESTIMATED_DURATION_S} seconds</p>
      </div>

      <div className="relative h-2 w-full overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-indigo-600 transition-all duration-700 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="flex items-center justify-between text-xs text-gray-400">
        <span>{Math.round(progress)}%</span>
        <span>{elapsed}s elapsed</span>
      </div>
    </div>
  );
}
