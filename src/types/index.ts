export type RenderMode = 'GSR' | 'ISR' | 'SSR' | 'CSR';

export interface Author {
  name: string;
  role: string;
  avatar?: string;
  socialHandle?: string;
}

export interface VarStatistic {
  category: string;
  total: number;
  correct: number;
  overturned: number;
  percentage: number;
}

export interface LiveEvent {
  id: string;
  minute: number;
  type: 'goal' | 'card' | 'var' | 'sub' | 'whistle' | 'info';
  title: string;
  description: string;
  timestamp: string;
  team?: 'arsenal' | 'westham' | 'referee';
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  lead: string;
  category: string;
  categorySlug: string;
  publishedAt: string;
  modifiedAt: string;
  author: Author;
  readingTimeMinutes: number;
  mainImage: {
    url: string;
    caption: string;
    credit: string;
    alt: string;
  };
  audioUrl?: string;
  audioDuration?: string;
  fullText: string;
  sections: {
    heading?: string;
    content: string[];
    quote?: {
      text: string;
      author: string;
    };
    callout?: {
      type: 'info' | 'warning' | 'stats';
      title: string;
      text: string;
    };
  }[];
  tags: string[];
  varStats?: VarStatistic[];
  renderMode: RenderMode;
  renderModeDescription: string;
}

export interface RelatedStory {
  id: string;
  title: string;
  category: string;
  timeAgo: string;
  imageUrl: string;
  href: string;
  renderMode?: RenderMode;
}

export interface MostReadStory {
  rank: number;
  title: string;
  category: string;
  href: string;
  viewsCount?: string;
}

export interface RenderInfo {
  mode: RenderMode;
  title: string;
  badgeColor: string;
  description: string;
  nextConfigCode: string;
  cacheStrategy: string;
  idealFor: string;
  generatedAt: string;
  revalidateIntervalSeconds?: number;
}
