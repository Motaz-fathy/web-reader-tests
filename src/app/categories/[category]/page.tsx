import React from 'react';
import { bbcArticles } from '@/data/articles';
import CategoryViewClient from '@/components/CategoryViewClient';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  const categories = Array.from(
    new Set(Object.values(bbcArticles).map((a) => a.categorySlug))
  );
  return categories.map((category) => ({ category }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return <CategoryViewClient categorySlug={params.category} />;
}
