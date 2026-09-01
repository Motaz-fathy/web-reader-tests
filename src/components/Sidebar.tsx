'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { relatedArticles } from '@/data/articles';
import RenderModeBadge from './RenderModeBadge';
import InteractivePoll from './InteractivePoll';
import { useLanguage } from '@/context/LanguageContext';
import { 
  TrendingUp, 
  Radio, 
  Sparkles, 
  Eye, 
  Play, 
  Pause,
} from 'lucide-react';

export default function Sidebar() {
  const { t, articlesData } = useLanguage();
  const [isRadioPlaying, setIsRadioPlaying] = useState(false);

  const mostReadList = articlesData?.mostRead || [];

  return (
    <aside aria-label="Sidebar" className="space-y-8">
      {/* BBC Live Radio Card */}
      <div className="rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-bbc-black p-5 text-white border border-neutral-800 shadow-md">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-red-600 text-white">
              <Radio className="w-4 h-4 animate-pulse" />
            </span>
            <span className="text-xs font-bold text-red-400 font-cairo">
              {t('radio.badge', 'home')}
            </span>
          </div>
          <span className="text-[10px] bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
            {t('radio.live', 'home')}
          </span>
        </div>

        <h4 className="font-bold text-sm text-white font-cairo mb-2">
          {t('radio.title', 'home')}
        </h4>
        <p className="text-xs text-neutral-400 mb-4 leading-relaxed">
          {t('radio.desc', 'home')}
        </p>

        <button
          onClick={() => setIsRadioPlaying(!isRadioPlaying)}
          className="w-full py-2.5 px-4 rounded-xl bg-bbc-red hover:bg-bbc-darkred text-white text-xs font-bold transition flex items-center justify-center gap-2 shadow-md"
        >
          {isRadioPlaying ? (
            <>
              <Pause className="w-4 h-4" />
              <span>{t('radio.stopBtn', 'home')}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{t('radio.playBtn', 'home')}</span>
            </>
          )}
        </button>
      </div>

      {/* Most Read Articles */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-4">
          <h3 className="text-base font-bold text-neutral-950 font-cairo flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-bbc-red" />
            {t('mostRead.title', 'home')}
          </h3>
          <span className="text-xs text-neutral-400 font-mono">
            {t('mostRead.updated', 'home')}
          </span>
        </div>

        <div className="space-y-4">
          {mostReadList.map((story) => (
            <Link
              key={story.rank}
              href={story.href}
              className="flex items-start gap-3.5 group pb-3.5 border-b border-neutral-100 last:border-0 last:pb-0"
            >
              {/* Numeric Ranking Badge */}
              <span className="w-8 h-8 rounded-lg bg-neutral-100 text-neutral-800 font-mono font-black text-lg flex items-center justify-center flex-shrink-0 group-hover:bg-bbc-red group-hover:text-white transition duration-200 shadow-2xs">
                {story.rank}
              </span>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] text-neutral-400">
                  <span className="text-bbc-red font-bold">{story.category}</span>
                  {story.viewsCount && (
                    <span className="flex items-center gap-1 font-mono">
                      <Eye className="w-3 h-3" /> {story.viewsCount}
                    </span>
                  )}
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-bbc-red transition line-clamp-2 leading-snug font-cairo">
                  {story.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Interactive Poll */}
      <InteractivePoll />

      {/* Related Stories */}
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-xs">
        <h3 className="text-base font-bold text-neutral-950 font-cairo mb-4 border-b border-neutral-200 pb-3 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          {t('related.title', 'home')}
        </h3>

        <div className="space-y-4">
          {relatedArticles.map((story) => (
            <Link
              key={story.id}
              href={story.href}
              className="block group space-y-2 pb-3.5 border-b border-neutral-100 last:border-0 last:pb-0"
            >
              <div className="flex items-center justify-between text-[11px] text-neutral-500">
                <span className="font-bold text-bbc-red">{story.category}</span>
                {story.renderMode && (
                  <RenderModeBadge mode={story.renderMode} size="sm" />
                )}
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900 group-hover:text-bbc-red transition line-clamp-2 leading-snug font-cairo">
                {story.title}
              </h4>
              <span className="text-[11px] text-neutral-400 font-mono block">
                {story.timeAgo}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
