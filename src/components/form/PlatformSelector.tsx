'use client';

import { Platform } from '@/lib/types';
import { PLATFORM_OPTIONS } from '@/lib/constants';

interface PlatformSelectorProps {
  value: Platform;
  onChange: (platform: Platform) => void;
}

// Build groups in insertion order
const GROUPS = PLATFORM_OPTIONS.reduce<Record<string, typeof PLATFORM_OPTIONS>>((acc, opt) => {
  if (!acc[opt.group]) acc[opt.group] = [];
  acc[opt.group].push(opt);
  return acc;
}, {});

export function PlatformSelector({ value, onChange }: PlatformSelectorProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Target Platform
      </label>
      <div className="flex flex-col gap-3" role="group" aria-label="Target platform">
        {Object.entries(GROUPS).map(([group, options]) => (
          <div key={group}>
            <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              {group}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {options.map((option) => {
                const active = value === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => onChange(option.value)}
                    aria-pressed={active}
                    className={[
                      'rounded-full px-3 py-1 text-xs font-medium transition-colors duration-150 border',
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
        ))}
      </div>
    </div>
  );
}
