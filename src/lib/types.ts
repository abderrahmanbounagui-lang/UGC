export type Platform = 'tiktok' | 'instagram-reels' | 'youtube-shorts';

export type GeneratorStatus = 'idle' | 'submitting' | 'polling' | 'success' | 'error';

export type BadgeId = 'creator' | 'pro-creator' | 'video-machine';

export interface GeneratorState {
  status: GeneratorStatus;
  jobId: string | null;
  videoUrl: string | null;
  errorMessage: string | null;
  submittedAt: number | null;
  newlyUnlockedBadge: BadgeId | null;
}

export interface SubmitPayload {
  productName: string;
  productDescription: string;
  platform: Platform;
  imageBase64: string;
  imageMimeType: string;
  imageFileName: string;
}

export interface PVGStats {
  totalGenerated: number;
  unlockedBadges: BadgeId[];
  lastBadgeShown: BadgeId | null;
}

export interface HistoryEntry {
  id: string;
  productName: string;
  platform: Platform;
  videoUrl: string;
  thumbnailDataUrl: string;
  generatedAt: string;
}

export interface BadgeDefinition {
  id: BadgeId;
  threshold: number;
  label: string;
  emoji: string;
}
