'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Maximize2, X } from 'lucide-react';

interface ArticleMediaProps {
  image: {
    url: string;
    caption: string;
    credit: string;
    alt: string;
  };
}

export default function ArticleMedia({ image }: ArticleMediaProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgSrc, setImgSrc] = useState(image.url);

  return (
    <>
      <figure className="my-6 space-y-2 rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200">
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-neutral-200 group">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={image.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => {
              // fallback if url fails
              setImgSrc('https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1200&q=80');
            }}
          />

          <button
            onClick={() => setIsZoomed(true)}
            className="absolute bottom-3 left-3 p-2 rounded-lg bg-black/60 hover:bg-black/80 text-white backdrop-blur-sm transition opacity-0 group-hover:opacity-100"
            title="تكبير الصورة"
            aria-label="تكبير الصورة"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* BBC Caption & Credit */}
        <figcaption className="p-3.5 text-xs text-neutral-600 bg-neutral-50/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="leading-relaxed text-neutral-700">{image.caption}</span>
          <span className="flex items-center gap-1 text-[11px] text-neutral-500 font-mono flex-shrink-0">
            <Camera className="w-3.5 h-3.5 text-neutral-400" />
            <span>{image.credit}</span>
          </span>
        </figcaption>
      </figure>

      {/* Image Lightbox Modal */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 animate-fadeIn"
          onClick={() => setIsZoomed(false)}
        >
          <button
            onClick={() => setIsZoomed(false)}
            className="absolute top-6 left-6 p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition"
            aria-label="إغلاق الصورة المكبرة"
          >
            <X className="w-6 h-6" />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imgSrc}
            alt={image.alt}
            className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
          />
          <p className="text-white text-center text-sm mt-4 max-w-2xl px-4">{image.caption}</p>
        </div>
      )}
    </>
  );
}
