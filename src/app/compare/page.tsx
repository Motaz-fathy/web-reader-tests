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
  const { t, language } = useLanguage();

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

      {/* Comprehensive Architectural & Performance Dossier Section */}
      <section className="bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200 space-y-6">
        <div className="border-b border-neutral-200 pb-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-bbc-red/10 text-bbc-red text-xs font-bold font-mono mb-2">
            <Layers className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'تحليل معماري مقارن متقدم' : 'Advanced Architectural Benchmark'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black font-cairo text-neutral-950">
            {language === 'ar'
              ? 'مصفوفة الأداء والتكاليف واستراتيجيات التخزين المؤقت في بيئات الإنتاج الصحفي'
              : 'Performance Matrix, Infrastructure Costs, and Caching Strategies in Enterprise Media'}
          </h2>
          <p className="text-neutral-600 text-sm mt-1">
            {language === 'ar'
              ? 'دراسة تفصيلية تقارن أزمنة الاستجابة، استهلاك الخوادم، ومؤشرات الويب الحيوية Core Web Vitals عبر الأنماط الأربعة'
              : 'A detailed evaluation comparing response latency, server consumption, and Core Web Vitals across Next.js 14 rendering modes.'}
          </p>
        </div>

        <div className="space-y-4 text-neutral-800 leading-[1.85] text-sm sm:text-base">
          {language === 'ar' ? (
            <>
              <p>
                تمثل معمارية رندرة صفحات الويب العمود الفقري لأي مؤسسة إعلامية تطمح للجمع بين كثافة المحتوى وسرعة الانتشار، حيث تتباين أنماط Next.js 14 بشكل جوهري في كيفية معالجة البيانات وتوزيعها بين خوادم الأصل وشبكات الحافة وأجهزة القراء النهائية.
              </p>
              <p>
                يعتمد نمط التوليد الثابت مسبق البناء (Generated Static Rendering) على تشغيل دورة المعالجة كاملة أثناء مرحلة الـ Build، لإنتاج ملفات HTML وJSON فائقة الصغر تُوزع على خوادم Edge CDN الموزعة جغرافياً، مما يجعل زمن الاستجابة الأولي لا يتجاوز 15 إلى 25 مللي ثانية بغض النظر عن حجم الإقبال الجماهيري.
              </p>
              <p>
                وتبرز الجدوى الاقتصادية لنمط GSR عند التعامل مع المقالات الأرشيفية والتقارير الاستقصائية الدائمة، حيث يخفض هذا النمط استهلاك موارد وحدات المعالجة المركزية (CPU) وقواعد البيانات بنسبة تقارب 98% مقارنة بالمعالجة التقليدية، مما يجنب المؤسسات تكاليف الاستضافة الباهظة أثناء ذروات التصفح.
              </p>
              <p>
                في المقابل، يحل نمط التجديد التدريجي (Incremental Static Regeneration) المعضلة الأزلية بين ثبات الصفحات وتحديث المحتوى، عبر السماح بإعادة بناء الصفحة في الخلفية دون تعطيل القراء، مما يضمن بقاء مؤشرات الأداء الحيوية (Core Web Vitals) في النطاق المثالي دون أي تذبذب في مؤشر Cumulative Layout Shift.
              </p>
              <p>
                وعندما تتطلب التغطيات الإخبارية سرعة استجابة فورية للأحداث العاجلة، يبرز نمط المعالجة الخادميّة (Server-Side Rendering) ليوفر إمكانية جلب أحدث البيانات اللحظية مع كل نقرة، متيحاً لغرف الأخبار تطبيق تخصيص المحتوى الجغرافي والتحكم الصارم في رؤوس الحماية والتحقق من الهوية دون الاعتماد على كاش قديم.
              </p>
              <p>
                ورغم قوة الـ SSR وموثوقيته المطلقة، إلا أنه يفرض متطلبات تشغيلية عالية تستدعي استخدام مجمعات الاتصال بقواعد البيانات ومراقبة دقيقة لأزمنة الاستجابة لتفادي اختناق الخوادم عند تدفق أعداد مليونية من الزوار في أوقات الكوارث أو الأحداث الرياضية الاستثنائية.
              </p>
              <p>
                أما نمط المعالجة في جانب العميل (Client-Side Rendering)، فيوفر المرونة القصوى للتطبيقات التفاعلية كالمراكز الحية للمباريات، حيث يتولى المتصفح رسم واجهة المستخدم والتعامل مع بروتوكولات WebSocket وتدفقات SSE دون الحاجة لتحديث الصفحة بأكملها، مما يمنح تجربة استخدام شبيهة بالتطبيقات الأصلية.
              </p>
              <p>
                إن النجاح الحقيقي للمنصات الإخبارية الحديثة لا يكمن في التعصب لنمط برمجي واحد، بل في تبني المعمارية الهجينة (Hybrid Architecture) التي توظف كل نمط في موضعه الصحيح، مما يوفر أفضل توازن ممكن بين سرعة القراءة الفائقة، تفاعلية المستخدم اللحظية، وكفاءة التكاليف التشغيلية.
              </p>
              <p>
                ويتكامل هذا البناء المعماري المتناسق بسلاسة مع تقنيات القراءة الصوتية الذكية مثل Hamsa WebReader، حيث تتيح البنية الهيكلية المنضبطة للصفحات استخراج النصوص بدقة متناهية وبدء التدفق الصوتي المباشر خلال أجزاء من الثانية، لتقديم تجربة استماع احترافية وشاملة تواكب تطلعات القارئ العربي المعاصر.
              </p>
            </>
          ) : (
            <>
              <p>
                Web rendering architecture constitutes the foundational infrastructure of any modern media publication striving to balance editorial volume with ultra-low latency, where Next.js 14 paradigms diverge significantly in how payloads are computed and distributed between origin nodes, edge CDNs, and client devices.
              </p>
              <p>
                Generated Static Rendering (GSR/SSG) executes complete page synthesis during the build phase, generating highly optimized, immutable HTML and JSON bundles that disperse across global Edge CDN points of presence, achieving initial response latencies between 15 and 25 milliseconds regardless of audience concurrency.
              </p>
              <p>
                The financial and infrastructure dividends of GSR become prominent when serving evergreen archives and long-form investigative journalism, where static caching slashes origin CPU cycles and database query volumes by approximately 98%, eliminating hosting cost spikes during viral breaking traffic.
              </p>
              <p>
                Conversely, Incremental Static Regeneration (ISR) resolves the classical tension between static caching and continuous editorial updates by allowing headless background revalidation cycles, preserving optimal Core Web Vitals and zero Cumulative Layout Shift while keeping league tables and metrics fresh.
              </p>
              <p>
                When breaking bulletins and emergency sports rulings demand uncompromising data freshness, Server-Side Rendering (SSR) delivers the ultimate solution, computing fresh document trees on every incoming HTTP request and enabling precise geo-targeted content routing without stale cache risks.
              </p>
              <p>
                While SSR guarantees absolute data accuracy, it introduces operational overhead requiring database connection pooling, edge compute scaling, and proactive origin monitoring to prevent bottlenecks during millions of concurrent visits during championship finals.
              </p>
              <p>
                Client-Side Rendering (CSR) provides unmatched client flexibility for real-time match command hubs, delegating DOM rendering, WebSocket state streaming, and interactive telemetry to browser memory without requiring destructive page refreshes, delivering a native app feel.
              </p>
              <p>
                True engineering excellence in premier digital publications lies in adopting a cohesive Hybrid Architecture, assigning each rendering strategy to its optimal functional domain to reconcile lightning-fast initial reading speed, dynamic telemetry, and cloud operational efficiency.
              </p>
              <p>
                This harmonious architecture pairs seamlessly with accessibility solutions such as Hamsa WebReader, where clean document semantic structure allows rapid text extraction and sub-second PCM audio streaming, ensuring an effortless, natural listening experience for global audiences.
              </p>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
