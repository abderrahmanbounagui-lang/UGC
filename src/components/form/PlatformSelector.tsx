'use client';

import { Platform } from '@/lib/types';
import { PLATFORM_OPTIONS } from '@/lib/constants';

interface PlatformSelectorProps {
  value: Platform;
  onChange: (platform: Platform) => void;
}

export function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Target Platform
      </label>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Target platform">
        {PLATFORM_OPTIONS.map((option) => {
          const active = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              aria-pressed={active}
              className={[
                'rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-150 border',
                active
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white text-gray-600 border-gray-300 hover:border-indigo-400 hover:text-indigo-600',
              ].join(' ')}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
