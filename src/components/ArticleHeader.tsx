'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Article } from '@/types';
import RenderModeBadge from './RenderModeBadge';
import { 
  Clock, 
  Calendar, 
  Share2, 
  Twitter, 
  Facebook, 
  MessageCircle, 
  Copy, 
  Check, 
  Printer, 
  Bookmark, 
  Type, 
  Minus, 
  Plus 
} from 'lucide-react';

interface ArticleHeaderProps {
  article: Article;
  onFontSizeChange?: (delta: number) => void;
  fontSize?: number;
}

export default function ArticleHeader({
  article,
  onFontSizeChange,
  fontSize = 18,
}: ArticleHeaderProps) {
  const [copied, setCopied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const formatArabicDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareOnTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(article.title);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }
  };

  const shareOnWhatsApp = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`${article.title}\n${url}`);
      window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
    }
  };

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <header className="space-y-4 mb-6">
      {/* Category & Render Mode Badge */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/categories/${article.categorySlug}`}
            className="text-xs sm:text-sm font-bold text-bbc-red hover:underline tracking-wide"
          >
            {article.category}
          </Link>
          <span className="text-neutral-300">•</span>
          <RenderModeBadge mode={article.renderMode} size="sm" />
        </div>

        <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-mono">
          <Clock className="w-3.5 h-3.5" />
          <span>زمن القراءة: {article.readingTimeMinutes} دقائق</span>
        </div>
      </div>

      {/* Main Headline */}
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-neutral-950 font-cairo leading-[1.35] tracking-tight">
        {article.title}
      </h1>

      {/* Sub-headline / Lead */}
      <p className="text-base sm:text-lg text-neutral-700 font-normal leading-relaxed border-r-4 border-bbc-red pr-4 py-1 bg-neutral-50/50 rounded-l-lg">
        {article.lead}
      </p>

      {/* Author and Metadata Bar */}
      <div className="pt-3 flex flex-col md:flex-row md:items-center justify-between gap-4 border-y border-neutral-200 py-3.5">
        {/* Author details */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-neutral-800 text-white font-bold flex items-center justify-center text-sm border-2 border-bbc-red shadow-sm">
            {article.author.name.slice(0, 2)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-neutral-900">{article.author.name}</span>
              {article.author.socialHandle && (
                <span className="text-xs text-neutral-400 font-mono" dir="ltr">
                  {article.author.socialHandle}
                </span>
              )}
            </div>
            <span className="text-xs text-neutral-500 block">{article.author.role}</span>
          </div>
        </div>

        {/* Timestamps */}
        <div className="flex flex-col text-xs text-neutral-500 space-y-0.5 font-mono">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>نُشر في: {formatArabicDate(article.publishedAt)}</span>
          </div>
          {article.modifiedAt && (
            <span className="text-[11px] text-neutral-400 mr-5">
              آخر تدقيق وتحديث: {formatArabicDate(article.modifiedAt)}
            </span>
          )}
        </div>
      </div>

      {/* Action Toolbar (Font resize & Social Share) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
        {/* Font Size Adjuster */}
        {onFontSizeChange && (
          <div className="flex items-center gap-1.5 bg-neutral-100 p-1 rounded-lg">
            <span className="text-neutral-500 px-1 font-semibold flex items-center gap-1">
              <Type className="w-3.5 h-3.5" /> الخط:
            </span>
            <button
              onClick={() => onFontSizeChange(-1)}
              disabled={fontSize <= 14}
              className="p-1 rounded bg-white hover:bg-neutral-200 text-neutral-700 disabled:opacity-40 transition shadow-xs"
              title="تصغير حجم الخط"
              aria-label="تصغير حجم الخط"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-neutral-800 font-bold px-1.5">{fontSize}px</span>
            <button
              onClick={() => onFontSizeChange(1)}
              disabled={fontSize >= 26}
              className="p-1 rounded bg-white hover:bg-neutral-200 text-neutral-700 disabled:opacity-40 transition shadow-xs"
              title="تكبير حجم الخط"
              aria-label="تكبير حجم الخط"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Social Share Buttons */}
        <div className="flex items-center gap-1.5">
          <span className="text-neutral-500 ml-1 font-semibold hidden sm:inline-block">مشاركة:</span>
          
          <button
            onClick={shareOnWhatsApp}
            className="p-2 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition"
            title="مشاركة عبر واتساب"
            aria-label="مشاركة عبر واتساب"
          >
            <MessageCircle className="w-4 h-4" />
          </button>

          <button
            onClick={shareOnTwitter}
            className="p-2 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 transition"
            title="مشاركة عبر منصة إكس (تويتر)"
            aria-label="مشاركة على إكس"
          >
            <Twitter className="w-4 h-4" />
          </button>

          <button
            onClick={handleCopyLink}
            className="p-2 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition flex items-center gap-1 font-mono text-xs"
            title="نسخ الرابط"
            aria-label="نسخ رابط المقال"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'تم النسخ' : 'نسخ'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="p-2 rounded-lg bg-neutral-100 text-neutral-700 hover:bg-neutral-200 transition hidden sm:block"
            title="طباعة المقال"
            aria-label="طباعة هذا المقال"
          >
            <Printer className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsSaved(!isSaved)}
            className={`p-2 rounded-lg transition ${
              isSaved ? 'bg-red-50 text-bbc-red font-bold' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
            title="حفظ للقراءة لاحقاً"
            aria-label="حفظ المقال"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  );
}
