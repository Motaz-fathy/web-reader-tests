'use client';

import React, { useState, useEffect } from 'react';
import { Article } from '@/types';
import ArticleHeader from './ArticleHeader';
import ArticleMedia from './ArticleMedia';
import AudioReader from './AudioReader';
import ArticleBody from './ArticleBody';
import LiveMatchHub from './LiveMatchHub';
import RenderHUD from './RenderHUD';
import Sidebar from './Sidebar';

interface ArticleViewClientProps {
  article: Article;
  serverTimestamp?: string;
}

export default function ArticleViewClient({
  article,
  serverTimestamp,
}: ArticleViewClientProps) {
  const [fontSize, setFontSize] = useState(18);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Reading scroll progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const scroll = (totalScroll / windowHeight) * 100;
        setScrollProgress(scroll);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleFontSizeChange = (delta: number) => {
    setFontSize((prev) => Math.min(26, Math.max(14, prev + delta)));
  };

  return (
    <>
      {/* Sticky Reading Progress Top Bar */}
      <div
        className="fixed top-0 left-0 right-0 h-1 bg-bbc-red z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="bbc-container py-6 sm:py-8">
        {/* Next.js 14 Render Diagnostics HUD */}
        <RenderHUD
          mode={article.renderMode}
          generatedAt={serverTimestamp || article.publishedAt}
          revalidateInterval={30}
          slug={article.slug}
        />

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mt-4">
          {/* Main Article Content (8 cols on lg) */}
          <main className="lg:col-span-8 bg-white">
            <ArticleHeader
              article={article}
              fontSize={fontSize}
              onFontSizeChange={handleFontSizeChange}
            />

            {/* Main Media Image */}
            <ArticleMedia image={article.mainImage} />

            {/* Audio Reader Web Player */}
            <AudioReader
              title={article.title}
              textToRead={article.fullText || article.lead}
              duration={article.audioDuration || '3:45'}
            />

            {/* CSR Interactive Match Hub if this is live match article */}
            {article.id === 'csr-live-match' && <LiveMatchHub />}

            {/* Article Structured Body */}
            <ArticleBody article={article} fontSize={fontSize} />
          </main>

          {/* Sidebar (4 cols on lg) */}
          <aside className="lg:col-span-4 sticky top-24">
            <Sidebar />
          </aside>
        </div>
      </div>
    </>
  );
}
