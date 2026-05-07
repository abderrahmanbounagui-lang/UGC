'use client';

interface VideoResultProps {
  videoUrl: string;
  onGenerateAnother: () => void;
}

export function VideoResult({ videoUrl, onGenerateAnother }: VideoResultProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Video is ready"
      className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-md"
    >
      <div className="flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-600">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </span>
        <p className="text-sm font-semibold text-gray-900">Your video is ready</p>
      </div>

      <video
        src={videoUrl}
        controls
        autoPlay
        playsInline
        crossOrigin="anonymous"
        className="w-full rounded-lg bg-black"
        style={{ maxHeight: '480px' }}
      />

      <div className="flex flex-col gap-2 sm:flex-row">
        <a
          href={videoUrl}
          download
          className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-indigo-600 px-4 py-2.5 text-sm font-medium text-indigo-600 transition-colors duration-150 hover:bg-indigo-50"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Download Video
        </a>
        <button
          type="button"
          onClick={onGenerateAnother}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition-colors duration-150 hover:bg-gray-700"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
          Generate Another
        </button>
      </div>
    </div>
  );
}
