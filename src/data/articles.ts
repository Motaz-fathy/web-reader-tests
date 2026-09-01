import { Article, RelatedStory, MostReadStory, LiveEvent } from '@/types';
import arArticlesData from '../../public/ar/articlesData.json';
import enArticlesData from '../../public/en/articlesData.json';

export const bbcArticles: Record<string, Article> = arArticlesData.articles as any;
export const sampleLiveEvents: LiveEvent[] = arArticlesData.liveEvents as any;
export const breakingNewsItems = [
  { id: 'b1', text: 'ريال مدريد يقتنص صدارة الليغا بعد فوز درامي في كلاسيكو الأرض' },
  { id: 'b2', text: 'تقنية التسلل شبه الآلية تحسم حالات تحكيمية دقيقة في قمة البرنابيو' },
  { id: 'b3', text: 'هانزي فليك: قدمنا مباراة قوية وتفاصيل صغيرة حسمت الكلاسيكو' },
  { id: 'b4', text: 'أنشيلوتي: التركيز التكتيكي والتحولات السريعة كانا مفتاح الفوز' },
];
export const mostReadArticles: MostReadStory[] = arArticlesData.mostRead as any;

export const relatedArticles: RelatedStory[] = [
  {
    id: 'r1',
    title: 'لماذا ألغى الحكم هدف التعادل لوست هام؟ مراجعة شاملة لبروتوكول الـ VAR',
    category: 'تحليل تحكيمي',
    timeAgo: 'قبل ساعتين',
    imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=600&q=80',
    href: '/articles/c3r0eyydnwgo',
    renderMode: 'GSR',
  },
  {
    id: 'r2',
    title: 'جدول ترتيب الدوري الإنجليزي بعد نهاية الجولة وموقف المنافسين',
    category: 'إحصائيات',
    timeAgo: 'قبل 4 ساعات',
    imageUrl: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=600&q=80',
    href: '/articles/isr-premier-league',
    renderMode: 'ISR',
  },
  {
    id: 'r3',
    title: 'تصريحات مدربي البريميرليغ بعد الاجتماع الطارئ مع لجنة الحكام',
    category: 'مؤتمرات',
    timeAgo: 'قبل 6 ساعات',
    imageUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80',
    href: '/articles/ssr-breaking-news',
    renderMode: 'SSR',
  },
];

/**
 * Language-aware getters for localized data
 */
export function getBbcArticles(lang: 'ar' | 'en' = 'ar'): Record<string, Article> {
  const data = lang === 'en' ? enArticlesData : arArticlesData;
  return data.articles as any;
}

export function getArticleBySlug(slug: string, lang: 'ar' | 'en' = 'ar'): Article | undefined {
  const articles = getBbcArticles(lang);
  return articles[slug];
}

export function getMostReadArticles(lang: 'ar' | 'en' = 'ar'): MostReadStory[] {
  const data = lang === 'en' ? enArticlesData : arArticlesData;
  return data.mostRead as any;
}

export function getSampleLiveEvents(lang: 'ar' | 'en' = 'ar'): LiveEvent[] {
  const data = lang === 'en' ? enArticlesData : arArticlesData;
  return data.liveEvents as any;
}

export function getBreakingNewsItems(lang: 'ar' | 'en' = 'ar') {
  if (lang === 'en') {
    return [
      { id: 'b1', text: 'Real Madrid top La Liga following dramatic El Clásico win' },
      { id: 'b2', text: 'Semi-automated offside technology resolves tight calls at Bernabéu' },
      { id: 'b3', text: 'Hansi Flick: We put up a strong performance; fine margins decided Clásico' },
      { id: 'b4', text: 'Ancelotti: Tactical discipline and swift transitions were key to victory' },
    ];
  }
  return breakingNewsItems;
}
