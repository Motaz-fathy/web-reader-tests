'use client';

import React from 'react';
import Link from 'next/link';
import RenderModeBadge from '@/components/RenderModeBadge';
import { useLanguage } from '@/context/LanguageContext';
import { Article } from '@/types';

interface CategoryViewClientProps {
  categorySlug: string;
}

export default function CategoryViewClient({ categorySlug }: CategoryViewClientProps) {
  const { t, articlesData } = useLanguage();
  const articlesMap = (articlesData?.articles as unknown as Record<string, Article>) || {};

  const filteredArticles = Object.values(articlesMap).filter(
    (article) => article.categorySlug === categorySlug
  );

  const categoryName = filteredArticles[0]?.category || categorySlug;

  return (
    <div className="bbc-container py-8 max-w-5xl mx-auto px-4">
      <div className="border-b-4 border-bbc-red pb-3 mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-extrabold font-cairo text-neutral-900">
          {t('categoryTitle', 'category')}: <span className="text-bbc-red">{categoryName}</span>
        </h1>
        <span className="text-xs text-neutral-500 font-mono">
          {t('articleCount', 'category')}: {filteredArticles.length}
        </span>
      </div>

      {filteredArticles.length === 0 ? (
        <div className="bg-neutral-50 p-8 rounded-lg text-center text-neutral-600">
          <p className="text-lg">{t('noArticles', 'category')}</p>
          <Link href="/" className="mt-4 inline-block text-bbc-red font-bold hover:underline">
            {t('backToHome', 'category')}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredArticles.map((article) => (
            <Link
              key={article.id}
              href={`/articles/${article.slug}`}
              className="bg-white border border-neutral-200 rounded-lg p-5 hover:shadow-md transition flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-bbc-red bg-red-50 px-2 py-0.5 rounded">
                    {article.category}
                  </span>
                  <RenderModeBadge mode={article.renderMode} size="sm" />
                </div>
                <h2 className="text-xl font-bold font-cairo text-neutral-900 group-hover:text-bbc-red transition mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-neutral-600 line-clamp-3 mb-4">
                  {article.lead}
                </p>
              </div>
              <div className="text-xs text-neutral-400 font-mono border-t border-neutral-100 pt-3 flex justify-between">
                <span>{article.author.name}</span>
                <span>
                  {t('readTime', 'category')}: {article.readingTimeMinutes} {t('minutes', 'category')}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
