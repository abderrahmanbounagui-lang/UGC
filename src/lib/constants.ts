import { BadgeDefinition, Platform } from './types';

export interface PlatformOption {
  value: Platform;
  label: string;
  group: string;
}

export const PLATFORM_OPTIONS: PlatformOption[] = [
  // TikTok
  { value: 'tiktok', label: 'TikTok', group: 'TikTok' },
  { value: 'tiktok-ads', label: 'TikTok Ads', group: 'TikTok' },
  // Instagram
  { value: 'instagram-reels', label: 'Reels', group: 'Instagram' },
  { value: 'instagram-story', label: 'Story', group: 'Instagram' },
  { value: 'instagram-feed', label: 'Feed', group: 'Instagram' },
  // YouTube
  { value: 'youtube-shorts', label: 'YouTube Shorts', group: 'YouTube' },
  { value: 'youtube-ads', label: 'YouTube Ads', group: 'YouTube' },
  // Facebook
  { value: 'facebook-reels', label: 'Reels', group: 'Facebook' },
  { value: 'facebook-feed', label: 'Feed', group: 'Facebook' },
  { value: 'facebook-ads', label: 'Ads', group: 'Facebook' },
  // Other
  { value: 'snapchat', label: 'Snapchat', group: 'Other' },
  { value: 'pinterest', label: 'Pinterest', group: 'Other' },
  { value: 'linkedin-ads', label: 'LinkedIn Ads', group: 'Other' },
  { value: 'twitter-x', label: 'Twitter / X', group: 'Other' },
  { value: 'google-ads', label: 'Google Ads', group: 'Other' },
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
