'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Flame, ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function BreakingNewsTicker() {
  const { t, language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const items = [
    t('ticker.item1', 'common'),
    t('ticker.item2', 'common'),
    t('ticker.item3', 'common'),
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isPlaying, items.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const currentText = items[currentIndex] || items[0];

  return (
    <div className="bg-bbc-red text-white py-2 px-3 shadow-inner select-none">
      <div className="bbc-container flex items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Urgent Badge */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="bg-black/30 backdrop-blur px-2.5 py-1 rounded font-black flex items-center gap-1 text-white tracking-wider">
            <Flame className="w-4 h-4 text-yellow-300 animate-bounce" />
            <span>{t('ticker.title', 'common')}</span>
          </div>
          <span className="hidden sm:inline-block text-white/60 font-mono text-xs">
            [{currentIndex + 1}/{items.length}]
          </span>
        </div>

        {/* Ticker Text */}
        <div 
          className="flex-1 overflow-hidden transition-all duration-300 ltr:text-left rtl:text-right font-medium"
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <Link 
            href="/articles/ssr-breaking-news"
            className="hover:underline hover:text-yellow-200 transition line-clamp-1 block"
          >
            {currentText}
          </Link>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-1 bg-black/20 rounded px-1.5 py-0.5 flex-shrink-0">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:bg-black/30 rounded text-white/80 hover:text-white transition"
            aria-label="Toggle auto play"
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handlePrev}
            className="p-1 hover:bg-black/30 rounded text-white/80 hover:text-white transition"
            aria-label="Previous item"
          >
            {language === 'ar' ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleNext}
            className="p-1 hover:bg-black/30 rounded text-white/80 hover:text-white transition"
            aria-label="Next item"
          >
            {language === 'ar' ? <ChevronLeft className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>
    </div>
  );
}
