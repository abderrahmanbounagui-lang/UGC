'use client';

import { useState, useCallback } from 'react';
import { useGeneratorState } from '@/hooks/useGeneratorState';
import { Header } from '@/components/layout/Header';
import { VideoGeneratorForm } from '@/components/form/VideoGeneratorForm';
import { GenerationProgress } from '@/components/progress/GenerationProgress';
import { VideoResult } from '@/components/result/VideoResult';
import { BadgeToast } from '@/components/gamification/BadgeToast';
import { GenerationHistory } from '@/components/history/GenerationHistory';

export default function Home() {
  const generatorState = useGeneratorState();
  const { state, reset, clearBadge } = generatorState;

  const [replayVideoUrl, setReplayVideoUrl] = useState<string | null>(null);

  const handleReplay = useCallback((videoUrl: string) => {
    setReplayVideoUrl(videoUrl);
  }, []);

  const handleCloseReplay = useCallback(() => {
    setReplayVideoUrl(null);
  }, []);

  const isGenerating = state.status === 'submitting' || state.status === 'polling';
  const activeVideoUrl = replayVideoUrl ?? state.videoUrl;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 mx-auto w-full max-w-5xl px-4 py-8 sm:px-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_300px]">
          {/* Left column: form / progress / result */}
          <div className="flex flex-col gap-4">
            {/* Idle or error: show form */}
            {(state.status === 'idle' || state.status === 'error') && (
              <>
                {state.status === 'error' && (
                  <div
                    role="alert"
                    aria-live="assertive"
                    className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3"
                  >
                    <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                    </svg>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-700">{state.errorMessage}</p>
                    </div>
                    <button
                      type="button"
                      onClick={reset}
                      className="text-xs font-medium text-red-600 hover:text-red-800 transition-colors"
                    >
                      Try again
                    </button>
                  </div>
                )}

                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-md">
                  <h1 className="mb-1 text-lg font-semibold text-gray-900">Create Product Video</h1>
                  <p className="mb-6 text-sm text-gray-500">
                    Upload your product image and we&apos;ll generate a short-form video ready for your platform.
                  </p>
                  <VideoGeneratorForm generatorState={generatorState} />
                </div>
              </>
            )}

            {/* Generating: show progress */}
            {isGenerating && (
              <GenerationProgress
                startedAt={state.submittedAt}
                isSuccess={false}
              />
            )}

            {/* Success: show video or replay */}
            {(state.status === 'success' || replayVideoUrl) && activeVideoUrl && (
              <>
                {replayVideoUrl && (
                  <div className="flex items-center justify-between rounded-lg bg-indigo-50 px-4 py-2">
                    <p className="text-xs font-medium text-indigo-700">Replaying a past generation</p>
                    <button
                      type="button"
                      onClick={handleCloseReplay}
                      className="text-xs text-indigo-500 hover:text-indigo-700 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                )}
                <VideoResult
                  videoUrl={activeVideoUrl}
                  onGenerateAnother={() => {
                    setReplayVideoUrl(null);
                    reset();
                  }}
                />
              </>
            )}

            {/* History panel on mobile (below form) */}
            <div className="lg:hidden">
              <GenerationHistory onReplay={handleReplay} />
            </div>
          </div>

          {/* Right column: history (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-[73px]">
              <GenerationHistory onReplay={handleReplay} />
            </div>
          </aside>
        </div>
      </main>

      <BadgeToast badgeId={state.newlyUnlockedBadge} onDismiss={clearBadge} />
    </div>
  );
}
