'use client';

import React from "react";
import Link from "next/link";
import {
  Sparkles,
  RefreshCw,
  Server,
  Laptop,
  Layers,
  ExternalLink,
  Cpu,
  Globe,
} from "lucide-react";
import RenderModeBadge from "@/components/RenderModeBadge";
import { useLanguage } from "@/context/LanguageContext";

export default function ComparePage() {
  const { t } = useLanguage();

  return (
    <div className="bbc-container py-10 space-y-12">
      {/* Title Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="flex items-center gap-2">
          <span className="p-1.5 rounded-lg bg-bbc-red/10 text-bbc-red">
            <Layers className="w-5 h-5" />
          </span>
          <span className="text-xs font-bold text-bbc-red font-cairo uppercase tracking-wider">
            {t('page.badge', 'compare')}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-cairo text-neutral-950 leading-tight">
          {t('page.title', 'compare')}
        </h1>
        <p className="text-neutral-600 text-base leading-relaxed">
          {t('page.subtitle', 'compare')}
        </p>
      </div>

      {/* Comparison Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 1. GSR / SSG */}
        <div className="bg-white rounded-2xl border-2 border-emerald-200 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                <Sparkles className="w-6 h-6" />
              </span>
              <RenderModeBadge mode="GSR" size="sm" showIcon={false} />
            </div>

            <h3 className="text-lg font-bold text-neutral-900 font-cairo">
              {t('page.cards.gsr.title', 'compare')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('page.cards.gsr.desc', 'compare')}
            </p>

            <div className="space-y-1.5 pt-2 text-xs border-t border-neutral-100 font-mono">
              <div className="flex justify-between text-neutral-500">
                <span>زمن الاستجابة:</span>
                <strong className="text-emerald-700 font-bold">
                  &lt; 20ms
                </strong>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>حمل السيرفر:</span>
                <strong className="text-emerald-700">0% (CDN Static)</strong>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>تحديث البيانات:</span>
                <strong className="text-neutral-700">عند Build جديد</strong>
              </div>
            </div>
          </div>

          <Link
            href="/articles/c3r0eyydnwgo"
            className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center transition flex items-center justify-center gap-1"
          >
            <span>معاينة المقال الثابت</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 2. ISR */}
        <div className="bg-white rounded-2xl border-2 border-purple-200 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-purple-100 text-purple-800">
                <RefreshCw className="w-6 h-6" />
              </span>
              <RenderModeBadge mode="ISR" size="sm" showIcon={false} />
            </div>

            <h3 className="text-lg font-bold text-neutral-900 font-cairo">
              {t('page.cards.isr.title', 'compare')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('page.cards.isr.desc', 'compare')}
            </p>

            <div className="space-y-1.5 pt-2 text-xs border-t border-neutral-100 font-mono">
              <div className="flex justify-between text-neutral-500">
                <span>زمن الاستجابة:</span>
                <strong className="text-purple-700 font-bold">&lt; 35ms</strong>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>حمل السيرفر:</span>
                <strong className="text-purple-700">منخفض جداً</strong>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>تحديث البيانات:</span>
                <strong className="text-neutral-700">كل 30 ثانية</strong>
              </div>
            </div>
          </div>

          <Link
            href="/articles/isr-premier-league"
            className="w-full py-2 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold text-center transition flex items-center justify-center gap-1"
          >
            <span>معاينة المقال المجدد</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 3. SSR */}
        <div className="bg-white rounded-2xl border-2 border-amber-200 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-amber-100 text-amber-800">
                <Server className="w-6 h-6" />
              </span>
              <RenderModeBadge mode="SSR" size="sm" showIcon={false} />
            </div>

            <h3 className="text-lg font-bold text-neutral-900 font-cairo">
              {t('page.cards.ssr.title', 'compare')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('page.cards.ssr.desc', 'compare')}
            </p>

            <div className="space-y-1.5 pt-2 text-xs border-t border-neutral-100 font-mono">
              <div className="flex justify-between text-neutral-500">
                <span>زمن الاستجابة:</span>
                <strong className="text-amber-700 font-bold">
                  150ms - 350ms
                </strong>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>حمل السيرفر:</span>
                <strong className="text-amber-700">متوسط إلى مرتفع</strong>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>تحديث البيانات:</span>
                <strong className="text-neutral-700">لحظي (Real-time)</strong>
              </div>
            </div>
          </div>

          <Link
            href="/articles/ssr-breaking-news"
            className="w-full py-2 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold text-center transition flex items-center justify-center gap-1"
          >
            <span>معاينة المقال الخادمي</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 4. CSR */}
        <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 space-y-4 shadow-sm hover:shadow-md transition flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="p-2 rounded-xl bg-blue-100 text-blue-800">
                <Laptop className="w-6 h-6" />
              </span>
              <RenderModeBadge mode="CSR" size="sm" showIcon={false} />
            </div>

            <h3 className="text-lg font-bold text-neutral-900 font-cairo">
              {t('page.cards.csr.title', 'compare')}
            </h3>
            <p className="text-xs text-neutral-600 leading-relaxed">
              {t('page.cards.csr.desc', 'compare')}
            </p>

            <div className="space-y-1.5 pt-2 text-xs border-t border-neutral-100 font-mono">
              <div className="flex justify-between text-neutral-500">
                <span>زمن الاستجابة:</span>
                <strong className="text-blue-700 font-bold">
                  &lt; 40ms + Realtime
                </strong>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>حمل السيرفر:</span>
                <strong className="text-blue-700">منخفض جداً</strong>
              </div>
              <div className="flex justify-between text-neutral-500">
                <span>تحديث البيانات:</span>
                <strong className="text-neutral-700">فوري بالمتصفح</strong>
              </div>
            </div>
          </div>

          <Link
            href="/articles/csr-live-match"
            className="w-full py-2 px-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold text-center transition flex items-center justify-center gap-1"
          >
            <span>معاينة البث الحي</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Deep-Dive Architectural Decision Tree */}
      <section className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 border border-neutral-800 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-bbc-red/20 text-bbc-red">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-cairo">
              شجرة القرارات الهندسية في غرف الأخبار الرقمية (Decision Tree)
            </h2>
            <p className="text-xs text-neutral-400">
              كيف يحدد مهندسو البرمجيات النمط المناسب لكل صفحة؟
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
          <div className="space-y-3 bg-neutral-950 p-5 rounded-xl border border-neutral-800">
            <h3 className="text-sm font-bold text-yellow-400 flex items-center gap-2">
              <Globe className="w-4 h-4" />
              1. هل المحتوى عام ولا يعتمد على هوية المستخدم؟
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              إذا كانت الإجابة <strong>نعم</strong>، ابتعد عن SSR النقي واستخدم{" "}
              <strong>GSR أو ISR</strong>. هذا يضمن خدمة 99% من الزيارات من كاش
              الـ CDN دون لمس السيرفر، وتوفير ملايين الدولارات في تكاليف البنية
              التحتية.
            </p>
          </div>

          <div className="space-y-3 bg-neutral-950 p-5 rounded-xl border border-neutral-800">
            <h3 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              2. هل يتغير المحتوى كل عدة دقائق أو ساعات؟
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              استخدم <strong>ISR (Incremental Static Regeneration)</strong> مع
              وقت إعادة توليد مناسب (مثلاً <code>revalidate: 60</code>) أو اربط
              نظام إدارة المحتوى (CMS Webhook) بـ <code>revalidatePath</code>{" "}
              لتحديث فوري لحظة النشر.
            </p>
          </div>

          <div className="space-y-3 bg-neutral-950 p-5 rounded-xl border border-neutral-800">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Server className="w-4 h-4" />
              3. هل تتطلب الصفحة قراءة الـ Headers أو الجغرافيا اللحظية؟
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              اختر <strong>SSR (Server-Side Rendering)</strong> عبر{" "}
              <code>export const dynamic = &apos;force-dynamic&apos;</code>.
              سيتكفل الخادم ببناء الصفحة استجابة لكل طلب ومطابقة بلد الزائر
              وتوقيته فوراً.
            </p>
          </div>

          <div className="space-y-3 bg-neutral-950 p-5 rounded-xl border border-neutral-800">
            <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
              <Laptop className="w-4 h-4" />
              4. هل يحتاج المستخدم للتفاعل اللحظي (أهداف، تصويت، فلاتر)؟
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              استخدم <strong>CSR (Client-Side Rendering)</strong> للمكونات
              التفاعلية داخل الصفحة، مما يمنح القارئ تجربة تطبيق حية وسريعة دون
              أي وميض للصفحة.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
