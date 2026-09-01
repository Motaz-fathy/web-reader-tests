'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  X, 
  Layers, 
  Sparkles, 
  RefreshCw, 
  Server, 
  Laptop, 
  CheckCircle2, 
  Clock, 
  Zap, 
  ExternalLink,
  Code2,
  Copy,
  Check
} from 'lucide-react';
import { RenderMode } from '@/types';

import { useLanguage } from '@/context/LanguageContext';

interface RenderComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RenderComparisonModal({ isOpen, onClose }: RenderComparisonModalProps) {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'matrix' | RenderMode>('matrix');
  const [copiedCode, setCopiedCode] = useState(false);

  if (!isOpen) return null;

  const modesData = {
    GSR: {
      name: 'GSR / SSG (Generated Static Rendering)',
      tagline: 'توليد ثابت مسبق أثناء البناء (Build Time) لأقصى سرعة وأقل استهلاك للخوادم',
      icon: <Sparkles className="w-5 h-5 text-emerald-400" />,
      color: 'emerald',
      demoUrl: '/articles/c3r0eyydnwgo',
      demoTitle: 'مقال مراجعة قرارات الـ VAR في الدوري الإنجليزي',
      ttfb: '< 20ms (فائق السرعة عبر Edge CDN)',
      freshness: 'ثابت حتى عملية Build جديدة',
      seo: 'ممتاز 100% (HTML جاهز لمحركات البحث)',
      cost: 'منخفض جداً (استضافة ملفات ثابتة)',
      code: `// app/articles/[slug]/page.tsx (GSR Mode)
// يتم التوليد المسبق لكل المعرفات عند الـ Build

export async function generateStaticParams() {
  const slugs = ['c3r0eyydnwgo', 'premier-league-guide'];
  return slugs.map((slug) => ({ slug }));
}

export const dynamic = 'force-static';

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug);
  return <ArticleView article={article} />;
}`,
      pros: [
        'أسرع استجابة ممكنة في العالم (تخدم مباشرة من أقرب Edge CDN).',
        'صفر حمل على قواعد البيانات وخوادم التطبيق أثناء تصفح الملايين.',
        'مثالي للمقالات التحليلية، التحقيقات، والأرشيف الإخباري الدائم.',
      ],
      cons: [
        'أي تعديل في المقال يتطلب إعادة بناء وتشغيل Deployment كامل أو استخدام On-demand revalidation.',
      ],
    },
    ISR: {
      name: 'ISR (Incremental Static Regeneration)',
      tagline: 'تحديث المحتوى الثابت تلقائياً في الخلفية كل فترة زمنية دون إعادة بناء الموقع كاملاً',
      icon: <RefreshCw className="w-5 h-5 text-purple-400" />,
      color: 'purple',
      demoUrl: '/articles/isr-premier-league',
      demoTitle: 'تقرير إحصائيات وصراع الصدارة في البريميرليغ',
      ttfb: '< 35ms (كاش مجدد في الخلفية)',
      freshness: 'يتجدد تلقائياً كل 30 ثانية أو عند الطلب',
      seo: 'ممتاز 100% (HTML مجدد على السيرفر)',
      cost: 'اقتصادي جداً (يعاد بناؤه فقط عند انتهاء الكاش)',
      code: `// app/articles/[slug]/page.tsx (ISR Mode)
// إعادة التوليد في الخلفية كل 30 ثانية

export const revalidate = 30; // بالثواني

export default async function ISRArticlePage({ params }: { params: { slug: string } }) {
  const article = await fetchArticleWithLiveStats(params.slug, {
    next: { revalidate: 30 }
  });
  
  return <ArticleView article={article} revalidatedAt={new Date()} />;
}

// كما يمكن تجديد الصفحة فورياً عبر API:
// revalidatePath('/articles/isr-premier-league');`,
      pros: [
        'يجمع بين سرعة الصفحات الثابتة وحيوية البيانات المحدثة دورياً.',
        'الزائر الأول بعد انتهاء المدة يحصل على الصفحة المخبأة، بينما يبني Next.js النسخة الجديدة في الخلفية (Stale-While-Revalidate).',
        'إمكانية التحديث اليدوي الفوري عند تعديل المقال في CMS عبر On-demand Revalidation.',
      ],
      cons: [
        'الزائر قد يرى محتوى أقدم ببضع ثوانٍ حتى تنتهي معالجة النسخة الجديدة في الخلفية.',
      ],
    },
    SSR: {
      name: 'SSR (Server-Side Rendering)',
      tagline: 'توليد HTML مخصص على الخادم في اللحظة نفسها عند كل طلب HTTP جديد',
      icon: <Server className="w-5 h-5 text-amber-400" />,
      color: 'amber',
      demoUrl: '/articles/ssr-breaking-news',
      demoTitle: 'مؤتمر الأخبار العاجلة لرابطة البريميرليغ',
      ttfb: '150ms - 350ms (حسب سرعة الخادم وقواعد البيانات)',
      freshness: 'لحظية 100% مطابقة لوقت الطلب',
      seo: 'ممتاز 100% (HTML كامل لكل طلب)',
      cost: 'متوسط إلى مرتفع مع كثافة الزيارات المليونية',
      code: `// app/articles/[slug]/page.tsx (SSR Mode)
// معالجة خادميّة ديناميكية في كل زيارة بدون كاش

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

export default async function SSRArticlePage({ params }: { params: { slug: string } }) {
  // جلب البيانات مع كل Request
  const breakingData = await fetchLiveBreakingNews(params.slug, {
    cache: 'no-store'
  });
  
  const serverTimestamp = new Date().toISOString();
  return <ArticleView article={breakingData} generatedAt={serverTimestamp} />;
}`,
      pros: [
        'البيانات دقيقة ومحدثة حتى اللحظة بالمللي ثانية.',
        'إمكانية قراءة ملفات تعريف الارتباط (Cookies)، الرؤوس (Headers)، وتخصيص المحتوى حسب موقع الزائر.',
        'مثالي لغرف الأخبار العاجلة والمؤتمرات المباشرة الحساسة.',
      ],
      cons: [
        'وقت الاستجابة (TTFB) يعتمد على أداء الخادم وقواعد البيانات.',
        'استهلاك أعلى لموارد الخادم عند التدفقات المفاجئة للزوار.',
      ],
    },
    CSR: {
      name: 'CSR (Client-Side Rendering)',
      tagline: 'تنزيل هيكل واجهة المستخدم ثم جلب ومعالجة الأحداث الحية مباشرة في متصفح الزائر',
      icon: <Laptop className="w-5 h-5 text-blue-400" />,
      color: 'blue',
      demoUrl: '/articles/csr-live-match',
      demoTitle: 'تغطية ديربي لندن المباشرة دقيقة بدقيقة (أرسنال ضد وست هام)',
      ttfb: '< 40ms للهيكل الأولي + اتصال حي بالعميل',
      freshness: 'تدفق لحظي مستمر بدون إعادة تحميل الصفحة',
      seo: 'متوسط (يتطلب معالجة JS أو SSR أولي للهيكل)',
      cost: 'منخفض جداً على الخادم (المعالجة في جهاز الزائر)',
      code: `'use client';

import { useState, useEffect } from 'react';

export default function CSRLiveMatchPage() {
  const [events, setEvents] = useState<LiveEvent[]>([]);
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    // اتصال لحظي عبر WebSockets أو Server-Sent Events أو Polling
    const interval = setInterval(async () => {
      const latestEvents = await fetch('/api/live-events').then(res => res.json());
      setEvents(latestEvents);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return <LiveTimeline events={events} />;
}`,
      pros: [
        'تجربة مستخدم تفاعلية وغنية تشبه التطبيقات المكتبية (Single Page Application).',
        'تحديثات فورية للأهداف والبطاقات وتدخلات الـ VAR بدون وميض أو تحديث للصفحة.',
        'إمكانية التفاعل المحلي مع الفلاتر والإحصائيات والرسوم البيانية فورا.',
      ],
      cons: [
        'تحميل أولي لحزم جافاسكريبت في متصفح العميل.',
      ],
    },
  };

  const copyToClipboard = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="bg-neutral-900 border border-neutral-700 text-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-neutral-950 px-6 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-bbc-red/20 text-bbc-red border border-bbc-red/40">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold font-cairo flex items-center gap-2">
                {t('modal.title', 'compare')}
              </h2>
              <p className="text-xs text-neutral-400">
                {t('modal.subtitle', 'compare')}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition"
            aria-label={t('modal.closeBtn', 'compare')}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-800 bg-neutral-950/60 px-6 overflow-x-auto gap-2 py-2">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'matrix'
                ? 'bg-neutral-800 text-white border border-neutral-700'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
            }`}
          >
            <Layers className="w-4 h-4 text-amber-400" />
            جدول المقارنة الشامل
          </button>

          {(['GSR', 'ISR', 'SSR', 'CSR'] as RenderMode[]).map((mode) => {
            const data = modesData[mode];
            const isActive = activeTab === mode;
            return (
              <button
                key={mode}
                onClick={() => setActiveTab(mode)}
                className={`px-4 py-2 text-xs sm:text-sm font-bold rounded-lg transition whitespace-nowrap flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800/40'
                }`}
              >
                {data.icon}
                <span>{mode}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'matrix' ? (
            <div className="space-y-6">
              {/* Responsive Comparison Table */}
              <div className="overflow-x-auto border border-neutral-800 rounded-lg">
                <table className="w-full text-right text-xs sm:text-sm">
                  <thead className="bg-neutral-950 text-neutral-300 font-bold border-b border-neutral-800">
                    <tr>
                      <th className="p-3.5">النمط الإخباري</th>
                      <th className="p-3.5">الاسم المعماري</th>
                      <th className="p-3.5">سرعة الاستجابة (TTFB)</th>
                      <th className="p-3.5">آلية التحديث والكاش</th>
                      <th className="p-3.5">أفضل استخدام في BBC</th>
                      <th className="p-3.5 text-center">النموذج الحي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800 text-neutral-300">
                    <tr className="hover:bg-neutral-800/30 transition">
                      <td className="p-3.5 font-bold text-emerald-400 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" /> GSR / SSG
                      </td>
                      <td className="p-3.5 font-mono text-xs">Generated Static Rendering</td>
                      <td className="p-3.5 text-emerald-300 font-semibold">&lt; 20ms (Edge)</td>
                      <td className="p-3.5">ثابت عند وقت البناء (Build-time)</td>
                      <td className="p-3.5">المقالات التحليلية، التحقيقات والأرشيف</td>
                      <td className="p-3.5 text-center">
                        <Link
                          href="/articles/c3r0eyydnwgo"
                          onClick={onClose}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 hover:bg-emerald-900 transition text-xs font-semibold"
                        >
                          معاينة <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>

                    <tr className="hover:bg-neutral-800/30 transition">
                      <td className="p-3.5 font-bold text-purple-400 flex items-center gap-1.5">
                        <RefreshCw className="w-4 h-4" /> ISR
                      </td>
                      <td className="p-3.5 font-mono text-xs">Incremental Static Regeneration</td>
                      <td className="p-3.5 text-purple-300 font-semibold">&lt; 35ms (Revalidated)</td>
                      <td className="p-3.5">يتجدد كل 30 ثانية في الخلفية + On-Demand</td>
                      <td className="p-3.5">جداول الترتيب، تحليلات الجولات الدورية</td>
                      <td className="p-3.5 text-center">
                        <Link
                          href="/articles/isr-premier-league"
                          onClick={onClose}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-purple-950 text-purple-300 border border-purple-700 hover:bg-purple-900 transition text-xs font-semibold"
                        >
                          معاينة <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>

                    <tr className="hover:bg-neutral-800/30 transition">
                      <td className="p-3.5 font-bold text-amber-400 flex items-center gap-1.5">
                        <Server className="w-4 h-4" /> SSR
                      </td>
                      <td className="p-3.5 font-mono text-xs">Server-Side Rendering (Dynamic)</td>
                      <td className="p-3.5 text-amber-300 font-semibold">150ms - 350ms</td>
                      <td className="p-3.5">توليد خادمي كامل في كل Request جديد</td>
                      <td className="p-3.5">المؤتمرات العاجلة، البيانات الحساسة اللحظية</td>
                      <td className="p-3.5 text-center">
                        <Link
                          href="/articles/ssr-breaking-news"
                          onClick={onClose}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700 hover:bg-amber-900 transition text-xs font-semibold"
                        >
                          معاينة <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>

                    <tr className="hover:bg-neutral-800/30 transition">
                      <td className="p-3.5 font-bold text-blue-400 flex items-center gap-1.5">
                        <Laptop className="w-4 h-4" /> CSR
                      </td>
                      <td className="p-3.5 font-mono text-xs">Client-Side Rendering (Live)</td>
                      <td className="p-3.5 text-blue-300 font-semibold">&lt; 40ms + Realtime</td>
                      <td className="p-3.5">تحديث مباشر في المتصفح عبر WebSockets/Timers</td>
                      <td className="p-3.5">التغطية الحية للمباريات دقيقة بدقيقة</td>
                      <td className="p-3.5 text-center">
                        <Link
                          href="/articles/csr-live-match"
                          onClick={onClose}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-950 text-blue-300 border border-blue-700 hover:bg-blue-900 transition text-xs font-semibold"
                        >
                          معاينة <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Architecture Recommendation Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-yellow-400" />
                    متى تختار ISR بدلاً من SSR في المواقع الإخبارية؟
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    إذا كان المحتوى يقرأه آلاف أو ملايين الزوار في نفس الدقيقة (مثل مقال نشر للتو)، فإن ISR يضمن استجابة فائقة السرعة من الـ CDN مع الحفاظ على التحديث التلقائي دون إسقاط قواعد البيانات والخوادم بحمل زائد.
                  </p>
                </div>

                <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-2">
                  <h4 className="font-bold text-white flex items-center gap-2 text-sm">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    المعادلة الذهبية لتطبيقات الأخبار في Next.js 14
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed">
                    دمج الأنماط (Hybrid Architecture): استخدام GSR للأرشيف والمقالات الثابتة، ISR للصفحات الإحصائية، SSR للأخبار العاجلة وطلبات التخصيص، و CSR لمكونات البث والتفاعل اللحظي.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Single Mode Deep-dive View */
            <div className="space-y-6">
              {(() => {
                const current = modesData[activeTab];
                return (
                  <>
                    <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div className="flex items-center gap-2.5">
                          {current.icon}
                          <h3 className="text-lg font-bold text-white font-cairo">{current.name}</h3>
                        </div>
                        <Link
                          href={current.demoUrl}
                          onClick={onClose}
                          className="px-3 py-1.5 rounded-lg bg-bbc-red hover:bg-bbc-darkred text-white text-xs font-bold transition flex items-center gap-1"
                        >
                          <span>مشاهدة التجربة الحية في الموقع</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                      <p className="text-sm text-neutral-300 leading-relaxed">{current.tagline}</p>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                        <span className="text-[11px] text-neutral-400 block mb-1">سرعة الاستجابة TTFB</span>
                        <span className="font-bold text-white text-xs sm:text-sm">{current.ttfb}</span>
                      </div>
                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                        <span className="text-[11px] text-neutral-400 block mb-1">تجدد البيانات</span>
                        <span className="font-bold text-white text-xs sm:text-sm">{current.freshness}</span>
                      </div>
                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                        <span className="text-[11px] text-neutral-400 block mb-1">محركات البحث (SEO)</span>
                        <span className="font-bold text-emerald-400 text-xs sm:text-sm">{current.seo}</span>
                      </div>
                      <div className="bg-neutral-950 p-3 rounded-lg border border-neutral-800">
                        <span className="text-[11px] text-neutral-400 block mb-1">تكلفة الخادم</span>
                        <span className="font-bold text-white text-xs sm:text-sm">{current.cost}</span>
                      </div>
                    </div>

                    {/* Code Snippet Box */}
                    <div className="bg-black rounded-xl border border-neutral-800 overflow-hidden">
                      <div className="bg-neutral-950 px-4 py-2.5 border-b border-neutral-800 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
                          <Code2 className="w-4 h-4 text-amber-400" />
                          <span>كود التطبيق في Next.js 14 App Router</span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(current.code)}
                          className="flex items-center gap-1 text-xs text-neutral-300 hover:text-white px-2 py-1 rounded bg-neutral-800 transition"
                        >
                          {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCode ? 'تم النسخ' : 'نسخ الكود'}</span>
                        </button>
                      </div>
                      <pre className="p-4 text-xs text-neutral-200 overflow-x-auto font-mono leading-relaxed bg-[#0d1117]">
                        <code>{current.code}</code>
                      </pre>
                    </div>

                    {/* Pros and Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-neutral-950/80 p-4 rounded-xl border border-emerald-900/40">
                        <h4 className="font-bold text-emerald-400 text-xs mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> المميزات ونقاط القوة
                        </h4>
                        <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-inside">
                          {current.pros.map((pro, i) => (
                            <li key={i}>{pro}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-neutral-950/80 p-4 rounded-xl border border-amber-900/40">
                        <h4 className="font-bold text-amber-400 text-xs mb-2 flex items-center gap-1.5">
                          <Clock className="w-4 h-4" /> الاعتبارات والمحددات
                        </h4>
                        <ul className="text-xs text-neutral-300 space-y-1.5 list-disc list-inside">
                          {current.cons.map((con, i) => (
                            <li key={i}>{con}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="bg-neutral-950 px-6 py-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
          <Link
            href="/compare"
            onClick={onClose}
            className="text-amber-400 hover:underline font-semibold"
          >
            الانتقال إلى صفحة التقرير الكامل مع الشروحات المفصلة ←
          </Link>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
