'use client';

import { useState, useRef, useCallback } from 'react';
import { GeneratorState, SubmitPayload } from '@/lib/types';
import { usePolling } from './usePolling';
import { useStatsContext } from '@/context/StatsContext';
import { THUMBNAIL_SIZE_PX } from '@/lib/constants';

const INITIAL_STATE: GeneratorState = {
  status: 'idle',
  jobId: null,
  videoUrl: null,
  errorMessage: null,
  submittedAt: null,
  newlyUnlockedBadge: null,
};

function generateThumbnail(file: File): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = THUMBNAIL_SIZE_PX;
      canvas.height = THUMBNAIL_SIZE_PX;
      const ctx = canvas.getContext('2d')!;
      ctx.drawImage(img, 0, 0, THUMBNAIL_SIZE_PX, THUMBNAIL_SIZE_PX);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/jpeg', 0.6));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      resolve('');
    };
    img.src = url;
  });
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function useGeneratorState() {
  const [state, setState] = useState<GeneratorState>(INITIAL_STATE);
  const submitGuard = useRef(false);
  const pendingEntryRef = useRef<{
    productName: string;
    platform: SubmitPayload['platform'];
    thumbnailDataUrl: string;
  } | null>(null);

  const { incrementAndCheck, addHistoryEntry } = useStatsContext();

  const handleSuccess = useCallback(
    (videoUrl: string) => {
      const newBadge = incrementAndCheck();
      setState((prev) => ({ ...prev, status: 'success', videoUrl, newlyUnlockedBadge: newBadge }));
      if (pendingEntryRef.current) {
        addHistoryEntry({
          id: crypto.randomUUID(),
          productName: pendingEntryRef.current.productName,
          platform: pendingEntryRef.current.platform,
          videoUrl,
          thumbnailDataUrl: pendingEntryRef.current.thumbnailDataUrl,
          generatedAt: new Date().toISOString(),
        });
        pendingEntryRef.current = null;
      }
      submitGuard.current = false;
    },
    [incrementAndCheck, addHistoryEntry]
  );

  const handleError = useCallback((message: string) => {
    setState((prev) => ({ ...prev, status: 'error', errorMessage: message }));
    submitGuard.current = false;
    pendingEntryRef.current = null;
  }, []);

  const handleTimeout = useCallback(() => {
    setState((prev) => ({
      ...prev,
      status: 'error',
      errorMessage: 'This is taking longer than expected. Please try again.',
    }));
    submitGuard.current = false;
    pendingEntryRef.current = null;
  }, []);

  const jobId = state.status === 'polling' ? state.jobId : null;

  usePolling({
    jobId,
    onSuccess: handleSuccess,
    onError: handleError,
    onTimeout: handleTimeout,
  });

  const submit = useCallback(
    async (
      payload: Omit<SubmitPayload, 'imageBase64' | 'imageMimeType' | 'imageFileName'>,
      imageFile: File
    ) => {
      if (submitGuard.current) return;
      submitGuard.current = true;

      setState({ status: 'submitting', jobId: null, videoUrl: null, errorMessage: null, submittedAt: Date.now(), newlyUnlockedBadge: null });

      const [imageBase64, thumbnailDataUrl] = await Promise.all([
        readFileAsDataURL(imageFile),
        generateThumbnail(imageFile),
      ]);

      pendingEntryRef.current = {
        productName: payload.productName,
        platform: payload.platform,
        thumbnailDataUrl,
      };

      const body: SubmitPayload = {
        ...payload,
        imageBase64,
        imageMimeType: imageFile.type,
        imageFileName: imageFile.name,
      };

      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const data = await res.json();

        if (data.videoUrl) {
          handleSuccess(data.videoUrl);
          return;
        }

        if (data.jobId) {
          setState((prev) => ({ ...prev, status: 'polling', jobId: data.jobId }));
          return;
        }

        handleError(data.error ?? 'Unexpected response from server');
      } catch {
        handleError('Network error. Please check your connection and try again.');
      }
    },
    [handleSuccess, handleError]
  );

  const reset = useCallback(() => {
    submitGuard.current = false;
    pendingEntryRef.current = null;
    setState(INITIAL_STATE);
  }, []);

  const clearBadge = useCallback(() => {
    setState((prev) => ({ ...prev, newlyUnlockedBadge: null }));
  }, []);

  return { state, submit, reset, clearBadge };
}
