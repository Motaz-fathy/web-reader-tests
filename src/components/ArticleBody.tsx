'use client';

import React from 'react';
import { Article } from '@/types';
import VarStatsWidget from './VarStatsWidget';
import { Quote, AlertCircle, Info, TrendingUp, Tag } from 'lucide-react';
import Link from 'next/link';

interface ArticleBodyProps {
  article: Article;
  fontSize?: number;
}

export default function ArticleBody({ article, fontSize = 18 }: ArticleBodyProps) {
  return (
    <article className="space-y-6 text-neutral-900 leading-relaxed font-normal">
      {/* Intro paragraph if provided */}
      {article.fullText && (
        <div
          className="space-y-4 text-neutral-800 leading-[1.8]"
          style={{ fontSize: `${fontSize}px` }}
        >
          {article.fullText.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      {/* VAR Stats Widget if available */}
      {article.varStats && article.varStats.length > 0 && (
        <VarStatsWidget stats={article.varStats} />
      )}

      {/* Structured Sections */}
      {article.sections &&
        article.sections.map((section, idx) => (
          <section key={idx} className="space-y-4 pt-4 border-t border-neutral-100">
            {section.heading && (
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 font-cairo bbc-accent-line pb-2 mt-6">
                {section.heading}
              </h2>
            )}

            {/* Paragraphs */}
            <div
              className="space-y-4 text-neutral-800 leading-[1.8]"
              style={{ fontSize: `${fontSize}px` }}
            >
              {section.content.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* Blockquote with BBC Styling */}
            {section.quote && (
              <blockquote className="my-6 p-5 sm:p-6 rounded-2xl bg-neutral-50 border-r-4 border-bbc-red shadow-xs relative overflow-hidden">
                <Quote className="w-10 h-10 text-bbc-red/15 absolute top-3 left-4" />
                <p className="text-base sm:text-lg font-semibold text-neutral-900 italic font-cairo leading-relaxed mb-2">
                  &ldquo;{section.quote.text}&rdquo;
                </p>
                <footer className="text-xs sm:text-sm font-bold text-bbc-red font-cairo">
                  — {section.quote.author}
                </footer>
              </blockquote>
            )}

            {/* Callout Box */}
            {section.callout && (
              <div
                className={`my-6 p-4 sm:p-5 rounded-2xl border flex items-start gap-3.5 shadow-xs ${
                  section.callout.type === 'stats'
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : section.callout.type === 'warning'
                    ? 'bg-amber-50/70 border-amber-200 text-amber-950'
                    : 'bg-sky-50/70 border-sky-200 text-sky-950'
                }`}
              >
                <div className="p-2 rounded-xl bg-white shadow-xs flex-shrink-0">
                  {section.callout.type === 'stats' && <TrendingUp className="w-5 h-5 text-emerald-600" />}
                  {section.callout.type === 'warning' && <AlertCircle className="w-5 h-5 text-amber-600" />}
                  {section.callout.type === 'info' && <Info className="w-5 h-5 text-sky-600" />}
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm sm:text-base font-cairo">
                    {section.callout.title}
                  </h4>
                  <p className="text-xs sm:text-sm leading-relaxed opacity-90">
                    {section.callout.text}
                  </p>
                </div>
              </div>
            )}
          </section>
        ))}

      {/* Tags Section */}
      {article.tags && article.tags.length > 0 && (
        <div className="pt-8 mt-8 border-t border-neutral-200">
          <div className="flex items-center gap-2 mb-3 text-xs font-bold text-neutral-500">
            <Tag className="w-3.5 h-3.5 text-bbc-red" />
            <span>مواضيع ووسوم ذات صلة:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag, i) => (
              <Link
                key={i}
                href="/"
                className="px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-bbc-red hover:text-white text-neutral-700 text-xs font-medium transition duration-200 border border-neutral-200 shadow-2xs"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
