'use client';

import { HistoryEntry as HistoryEntryType } from '@/lib/types';
import { PLATFORM_OPTIONS } from '@/lib/constants';

interface HistoryEntryProps {
  entry: HistoryEntryType;
  onReplay: (videoUrl: string) => void;
}

function formatRelativeDate(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export function HistoryEntry({ entry, onReplay }: HistoryEntryProps) {
  const platformLabel = PLATFORM_OPTIONS.find((p) => p.value === entry.platform)?.label ?? entry.platform;

  return (
    <li className="flex items-center gap-3 rounded-lg p-2 hover:bg-gray-50 transition-colors duration-100">
      {entry.thumbnailDataUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={entry.thumbnailDataUrl}
          alt={entry.productName}
          width={40}
          height={40}
          className="h-10 w-10 flex-shrink-0 rounded-lg object-cover border border-gray-200"
        />
      ) : (
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-400 text-xs border border-gray-200">
          ?
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-gray-900">{entry.productName}</p>
        <p className="text-[11px] text-gray-400">
          {platformLabel} · {formatRelativeDate(entry.generatedAt)}
        </p>
      </div>

      <button
        type="button"
        onClick={() => onReplay(entry.videoUrl)}
        className="flex-shrink-0 rounded-md border border-gray-200 px-2.5 py-1 text-[11px] font-medium text-indigo-600 hover:bg-indigo-50 transition-colors duration-100"
      >
        Replay
      </button>
    </li>
  );
}
