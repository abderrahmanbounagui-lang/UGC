'use client';

import { useState, FormEvent } from 'react';
import { Platform } from '@/lib/types';
import { useGeneratorState } from '@/hooks/useGeneratorState';
import { ImageDropzone } from './ImageDropzone';
import { PlatformSelector } from './PlatformSelector';
import { SubmitButton } from './SubmitButton';

interface FormErrors {
  image?: string;
  productName?: string;
  productDescription?: string;
}

interface VideoGeneratorFormProps {
  generatorState: ReturnType<typeof useGeneratorState>;
}

export function VideoGeneratorForm({ generatorState }: VideoGeneratorFormProps) {
  const { state, submit } = generatorState;

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [platform, setPlatform] = useState<Platform>('tiktok');
  const [errors, setErrors] = useState<FormErrors>({});

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!imageFile) errs.image = 'Please upload a product image.';
    if (!productName.trim()) errs.productName = 'Product name is required.';
    if (!productDescription.trim()) errs.productDescription = 'Description is required.';
    return errs;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    await submit(
      { productName: productName.trim(), productDescription: productDescription.trim(), platform },
      imageFile!
    );
  }

  const busy = state.status === 'submitting' || state.status === 'polling';

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <ImageDropzone value={imageFile} onChange={setImageFile} error={errors.image} />

      <div>
        <label htmlFor="productName" className="block text-sm font-medium text-gray-700 mb-1.5">
          Product Name
        </label>
        <input
          id="productName"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="e.g. Ultra Sneaker Pro"
          disabled={busy}
          aria-describedby={errors.productName ? 'productName-error' : undefined}
          className={[
            'w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors duration-150',
            'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
            errors.productName ? 'border-red-400' : 'border-gray-300',
            busy ? 'bg-gray-50 cursor-not-allowed' : 'bg-white',
          ].join(' ')}
        />
        {errors.productName && (
          <p id="productName-error" className="mt-1 text-xs text-red-500">{errors.productName}</p>
        )}
      </div>

      <div>
        <label htmlFor="productDescription" className="block text-sm font-medium text-gray-700 mb-1.5">
          Product Description
        </label>
        <textarea
          id="productDescription"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          placeholder="Describe your product — key features, target audience, tone…"
          rows={3}
          disabled={busy}
          aria-describedby={errors.productDescription ? 'productDescription-error' : undefined}
          className={[
            'w-full rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition-colors duration-150 resize-none',
            'focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200',
            errors.productDescription ? 'border-red-400' : 'border-gray-300',
            busy ? 'bg-gray-50 cursor-not-allowed' : 'bg-white',
          ].join(' ')}
        />
        {errors.productDescription && (
          <p id="productDescription-error" className="mt-1 text-xs text-red-500">{errors.productDescription}</p>
        )}
      </div>

      <PlatformSelector value={platform} onChange={setPlatform} />

      <SubmitButton status={state.status} />
    </form>
  );
}
