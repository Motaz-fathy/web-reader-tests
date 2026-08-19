import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { bbcArticles } from '@/data/articles';
import ArticleViewClient from '@/components/ArticleViewClient';

interface PageProps {
  params: {
    slug: string;
  };
}

// Generate Static Params for GSR Static Rendering
export async function generateStaticParams() {
  return Object.keys(bbcArticles).map((slug) => ({
    slug,
  }));
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = bbcArticles[params.slug];
  if (!article) {
    return {
      title: 'المقال غير موجود',
    };
  }

  return {
    title: article.title,
    description: article.lead,
    openGraph: {
      title: `${article.title} | BBC News عربي`,
      description: article.lead,
      images: [
        {
          url: article.mainImage.url,
          alt: article.mainImage.alt,
        },
      ],
      type: 'article',
      publishedTime: article.publishedAt,
      modifiedTime: article.modifiedAt,
      authors: [article.author.name],
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.lead,
      images: [article.mainImage.url],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = bbcArticles[params.slug];

  if (!article) {
    notFound();
  }

  const serverTimestamp = new Date().toISOString();

  return <ArticleViewClient article={article} serverTimestamp={serverTimestamp} />;
}
