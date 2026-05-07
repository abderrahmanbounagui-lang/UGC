'use client';

import { useRef, useState, DragEvent, ChangeEvent } from 'react';
import { MAX_IMAGE_SIZE_BYTES } from '@/lib/constants';

interface ImageDropzoneProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
}

export function ImageDropzone({ value, onChange, error }: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function validate(file: File): string | null {
    if (!file.type.startsWith('image/')) return 'Please upload an image file.';
    if (file.size > MAX_IMAGE_SIZE_BYTES) return 'Image must be under 10 MB.';
    return null;
  }

  function handleFile(file: File) {
    const err = validate(file);
    if (err) {
      alert(err);
      return;
    }
    onChange(file);
  }

  function handleDrop(e: DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }

  const previewUrl = value ? URL.createObjectURL(value) : null;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1.5">
        Product Image
      </label>
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload product image"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        className={[
          'relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer transition-colors duration-150 min-h-[160px]',
          dragging
            ? 'border-indigo-500 bg-indigo-50'
            : value
            ? 'border-indigo-400 bg-gray-50'
            : 'border-gray-300 bg-gray-50 hover:border-indigo-400 hover:bg-indigo-50/30',
          error ? 'border-red-400' : '',
        ].join(' ')}
      >
        {previewUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={previewUrl}
              alt="Product preview"
              className="max-h-40 max-w-full rounded-lg object-contain"
            />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="absolute top-2 right-2 rounded-full bg-white/90 p-1 text-gray-500 shadow hover:text-red-500 transition-colors"
              aria-label="Remove image"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 p-6 text-center">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm text-gray-500">
              Drag & drop or{' '}
              <span className="font-medium text-indigo-600">choose a file</span>
            </p>
            <p className="text-xs text-gray-400">PNG, JPG, WebP up to 10 MB</p>
          </div>
        )}
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={handleChange}
          aria-hidden="true"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
