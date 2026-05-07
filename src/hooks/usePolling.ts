'use client';

import { useEffect, useRef, useCallback } from 'react';
import { POLL_MAX_ATTEMPTS } from '@/lib/constants';

const BACKOFF_STEPS = [3000, 4000, 6000, 10000, 15000, 30000];

function getDelay(attempt: number): number {
  return BACKOFF_STEPS[Math.min(attempt, BACKOFF_STEPS.length - 1)];
}

interface UsePollingOptions {
  jobId: string | null;
  onSuccess: (videoUrl: string) => void;
  onError: (message: string) => void;
  onTimeout: () => void;
}

export function usePolling({ jobId, onSuccess, onError, onTimeout }: UsePollingOptions) {
  const attemptRef = useRef(0);
  const networkErrorCountRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRef = useRef(false);

  const poll = useCallback(async () => {
    if (!activeRef.current || !jobId) return;

    if (attemptRef.current >= POLL_MAX_ATTEMPTS) {
      onTimeout();
      return;
    }

    try {
      const res = await fetch(`/api/status/${jobId}`);
      const data = await res.json();
      networkErrorCountRef.current = 0;

      if (data.videoUrl) {
        onSuccess(data.videoUrl);
        return;
      }

      if (data.error) {
        onError(data.error);
        return;
      }

      // Still processing — schedule next poll
      attemptRef.current++;
      const delay = getDelay(attemptRef.current);
      if (activeRef.current) {
        timeoutRef.current = setTimeout(poll, delay);
      }
    } catch {
      networkErrorCountRef.current++;
      if (networkErrorCountRef.current >= 3) {
        onError('Connection lost. Please check your network and try again.');
        return;
      }
      // Silent retry
      attemptRef.current++;
      const delay = getDelay(attemptRef.current);
      if (activeRef.current) {
        timeoutRef.current = setTimeout(poll, delay);
      }
    }
  }, [jobId, onSuccess, onError, onTimeout]);

  useEffect(() => {
    if (!jobId) return;

    activeRef.current = true;
    attemptRef.current = 0;
    networkErrorCountRef.current = 0;

    timeoutRef.current = setTimeout(poll, BACKOFF_STEPS[0]);

    return () => {
      activeRef.current = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [jobId, poll]);
}
