import { BadgeDefinition, Platform } from './types';

export const PLATFORM_OPTIONS: { value: Platform; label: string }[] = [
  { value: 'tiktok', label: 'TikTok' },
  { value: 'instagram-reels', label: 'Instagram Reels' },
  { value: 'youtube-shorts', label: 'YouTube Shorts' },
];

export const BADGE_THRESHOLDS: BadgeDefinition[] = [
  { id: 'creator', threshold: 5, label: 'Creator', emoji: '🎬' },
  { id: 'pro-creator', threshold: 10, label: 'Pro Creator', emoji: '🏆' },
  { id: 'video-machine', threshold: 25, label: 'Video Machine', emoji: '🚀' },
];

export const POLL_INTERVAL_MS = 3000;
export const POLL_MAX_ATTEMPTS = 40;
export const ESTIMATED_DURATION_S = 45;
export const HISTORY_MAX_ENTRIES = 50;
export const MAX_IMAGE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
export const THUMBNAIL_SIZE_PX = 40;
