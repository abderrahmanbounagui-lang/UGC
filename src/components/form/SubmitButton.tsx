'use client';

import { GeneratorStatus } from '@/lib/types';

interface SubmitButtonProps {
  status: GeneratorStatus;
}

export function SubmitButton({ status }: SubmitButtonProps) {
  const busy = status === 'submitting' || status === 'polling';

  return (
    <button
      type="submit"
      disabled={busy}
      className={[
        'w-full flex items-center justify-center gap-2 rounded-xl py-3 px-6 text-sm font-semibold transition-colors duration-150',
        busy
          ? 'bg-indigo-400 text-white cursor-not-allowed'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800',
      ].join(' ')}
    >
      {busy ? (
        <>
          <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v3m0 12v3m9-9h-3M6 12H3m15.364-6.364l-2.121 2.121M8.757 15.243l-2.121 2.121m0-11.314l2.121 2.121m6.486 6.486l2.121 2.121" />
          </svg>
          Generating…
        </>
      ) : (
        <>
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 010 1.972l-11.54 6.347a1.125 1.125 0 01-1.667-.986V5.653z" />
          </svg>
          Generate Video
        </>
      )}
    </button>
  );
}
