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
  const { t, articlesData, language } = useLanguage();
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

      {/* Category Deep-Dive Editorial Dossier */}
      <section className="mt-12 pt-8 border-t-2 border-neutral-200">
        <div className="bg-neutral-50 rounded-2xl p-6 sm:p-8 border border-neutral-200 space-y-6">
          <div className="border-b border-neutral-200 pb-3">
            <span className="text-xs font-bold text-bbc-red font-mono uppercase tracking-wider block mb-1">
              {language === 'ar' ? 'الملف التحريري المتخصص' : 'Specialized Editorial Dossier'}
            </span>
            <h2 className="text-2xl font-black font-cairo text-neutral-900">
              {categorySlug === 'sport'
                ? language === 'ar'
                  ? 'التحليل الرياضي المعمق: ثورة التكتيك والتكنولوجيا في الملاعب الإنجليزية والأوروبية'
                  : 'In-Depth Sports Analysis: Tactical Evolution & Technology in Modern Football'
                : categorySlug === 'breaking'
                ? language === 'ar'
                  ? 'غرفة الأخبار العاجلة: معايير التحقق اللحظي وسرعة البث في الأزمات والمؤتمرات الكبرى'
                  : 'Breaking Newsroom: Real-Time Verification Standards & Rapid Broadcast in Crisis'
                : language === 'ar'
                ? 'البث الحي والتغطيات التفاعلية: كواليس صناعة المحتوى اللحظي دقيقة بدقيقة'
                : 'Live Streaming & Interactive Telemetry: The Architecture of Real-Time Event Journalism'}
            </h2>
          </div>

          <div className="space-y-4 text-neutral-800 leading-[1.85] text-sm sm:text-base">
            {categorySlug === 'sport' ? (
              language === 'ar' ? (
                <>
                  <p>
                    تشهد الساحة الرياضية الدولية في الآونة الأخيرة تحولاً جذرياً في أساليب قراءة وتحليل المباريات الكبرى، حيث لم تعد المهارة الفردية وحدها كافية لترجيح كفة الفرق في المسابقات النخبوية مثل الدوري الإنجليزي الممتاز والدوري الإسباني ودوري أبطال أوروبا.
                  </p>
                  <p>
                    أصبح الاعتماد على تحليلات البيانات اللحظية ومؤشرات الأهداف المتوقعة عنصراً حاسماً في صياغة خطط اللعب، إذ تستعين الأجهزة الفنية بكاميرات التتبع البصري الدقيقة لقياس سرعات التحول والمسافات المقطوعة بالكرة وبدونها في كل ربع ساعة من عمر المواجهات.
                  </p>
                  <p>
                    كما فرض تطبيق تقنيات الفيديو المساعد ومنظومات التسلل شبه الآلية واقعاً تحكيمياً جديداً يهدف إلى حماية العدالة التنافسية وتقليل الجدل التحكيمي الذي رافق قرارات ركلات الجزاء والبطاقات المباشرة لعقود طويلة في الملاعب الإنجليزية.
                  </p>
                  <p>
                    وتظهر الإحصائيات الرسمية أن منظومة الـ VAR نجحت في تصحيح أكثر من 95% من الأخطاء الواضحة، إلا أن التحدي الأكبر لا يزال يتمثل في المحافظة على نسق وسرعة المباراة وعدم استنزاف حماس الجماهير الحاضرة في المدرجات بفترات مراجعة مطولة.
                  </p>
                  <p>
                    وتواكب شبكة BBC News عربي هذه الثورة الرياضية من خلال تقديم منصات رقمية متعددة الأنماط، تدمج بين التحليل التكتيكي الثابت والتقارير المحدثة تلقائياً كل 30 ثانية لتزويد القراء بخلاصة فنية شاملة تتجاوز مجرد سرد النتيجة الرقمية.
                  </p>
                  <p>
                    كما تتيح ميزة الاستماع الصوتي الذكي للقراء ومحبي الرياضة متابعة التحليلات المعمقة وأبرز تصريحات المدربين أثناء التنقل بجودة صوتية طبيعية، مما يرسخ مفاهيم جديدة للإعلام الرياضي التفاعلي القائم على شمولية الوصول ودقة المحتوى.
                  </p>
                  <p>
                    ويؤكد كبار المحللين أن التنافسية العالية في البريميرليغ هذا الموسم تعكس نضجاً تكتيكياً لدى مدربي القمة الذين استطاعوا الجمع بين الكثافة البدنية العالية والمرونة التكتيكية في المداورة لمواجهة ضغط الروزنامة المزدحمة.
                  </p>
                  <p>
                    إن تغطيتنا الرياضية المستمرة تستهدف تفكيك هذه الجوانب المعقدة وتقديمها للقارئ العربي بلغة واضحة ورصينة، تجمع بين متعة المتابعة وعمق المعرفة الرياضية المستندة إلى أحدث المعايير العلمية والتقنية في عالم كرة القدم.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    International sports journalism is experiencing a profound paradigm shift in how premier fixtures are dissected, as raw individual brilliance alone no longer guarantees victory in elite competitions such as the Premier League, La Liga, and UEFA Champions League.
                  </p>
                  <p>
                    Reliance on real-time data analytics and Expected Goals (xG) models has become integral to tactical orchestration, with technical staffs utilizing high-frequency optical tracking systems to measure transitional speed and positional pressing structures.
                  </p>
                  <p>
                    The full integration of Video Assistant Referees and Semi-Automated Offside Technology establishes a modernized officiating landscape designed to safeguard sporting fairness while curbing decades-old controversies surrounding tight penalty box infractions.
                  </p>
                  <p>
                    Official performance metrics affirm that video reviews corrected over 95% of clear on-field errors, yet the prevailing architectural priority remains preserving competitive rhythm and preventing spectator disengagement during intricate offside evaluations.
                  </p>
                  <p>
                    BBC News Arabic keeps pace with this analytical revolution by deploying multi-paradigm digital architectures, merging static baseline reports with dynamic ISR tables updating every 30 seconds to provide comprehensive intelligence beyond mere scorelines.
                  </p>
                  <p>
                    Integrating intelligent voice playback empowers sports fans to absorb deep-dive tactical breakdowns and managerial statements on the go with human-like vocal fidelity, inaugurating a new benchmark in accessible digital sports journalism.
                  </p>
                  <p>
                    Distinguished analysts note that the relentless intensity of the ongoing campaign reflects advanced tactical maturity among top managers who masterfully balance pressing intensity with squad rotation to manage rigorous calendar demands.
                  </p>
                  <p>
                    Our continuous sports coverage is dedicated to breaking down these multifaceted dynamics, delivering authoritative insights that satisfy passionate football followers through rigorous, verified technical analysis.
                  </p>
                </>
              )
            ) : categorySlug === 'breaking' ? (
              language === 'ar' ? (
                <>
                  <p>
                    تمثل تغطية الأخبار العاجلة الاختبار الحقيقي لغرف الأخبار العالمية، حيث يتطلب المشهد الإعلامي المتسارع موازنة دقيقة وحساسة بين ضرورة السبق الصحفي والالتزام الصارم بمعايير الدقة والتحقق من المصادر الميدانية المعتمدة.
                  </p>
                  <p>
                    في حالات المؤتمرات الصحفية الطارئة والأزمات الكبرى، تتضاعف وتيرة تدفق المعلومات وتتعدد الروايات غير المؤكدة عبر منصات التواصل الاجتماعي، مما يضع على عاتق المؤسسات الصحفية الرصينة مسؤولية التدقيق الصارم قبل نشر أي بيان.
                  </p>
                  <p>
                    تعتمد شبكة BBC News عربي في تغطيتها العاجلة على بروتوكولات تحريرية صارمة تشمل مطابقة الخبر من مصدرين رسميين مستقلين على الأقل، مع المتابعة الميدانية اللحظية لمجريات المؤتمرات في لندن ومختلف العواصم العالمية.
                  </p>
                  <p>
                    ومن الناحية التقنية، توظف المنصة نمط الرندرة في جانب الخادم (SSR) لضمان تجاوز الذاكرة الوسيطة بالكامل، مما يضمن وصول التعديلات الفورية والتصريحات العاجلة إلى أجهزة القراء في اللحظة نفسها دون أي تأخير ناتج عن الكاش الثابت.
                  </p>
                  <p>
                    كما يتيح التكامل المباشر مع واجهات الاستماع الصوتي الذكية تحويل النشرات العاجلة إلى تدفقات صوتية فورية، ليتمكن المتابعون من الاستماع إلى آخر المستجدات والبيانات الرسمية حتى في ظروف الاتصال الضعيف أو أثناء القيادة.
                  </p>
                  <p>
                    إن التزامنا بالأصالة الصحفية والنزاهة المهنية هو البوصلة التي توجه تغطياتنا الإخبارية العاجلة، لنضمن تقديم محتوى موثوق يعكس الواقع بدقة متناهية ويحترم عقل القارئ العربي في كل مكان.
                  </p>
                  <p>
                    وتواصل غرف المتابعة المركزية عملها على مدار الساعة لرصد كافة التطورات السياسية والاقتصادية والرياضية العاجلة، وتقديم تحليلات معمقة تشرح أبعاد القرارات المفاجئة وتأثيراتها المباشرة على المجتمعات والأسواق الدولية.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Breaking news reporting represents the ultimate acid test for global news organizations, where fast-moving events demand a delicate, uncompromising equilibrium between instantaneous speed and rigorous factual verification across field sources.
                  </p>
                  <p>
                    During emergency press conferences and unforeseen regulatory shifts, the velocity of unvetted social media rumors surges exponentially, placing an acute obligation on established journalistic institutions to filter and verify raw reports before publication.
                  </p>
                  <p>
                    BBC News Arabic adheres strictly to rigorous editorial guidelines requiring multi-source corroboration across independent official authorities, backed by real-time correspondent validation directly from conference rooms in London and global hubs.
                  </p>
                  <p>
                    Technically, the portal harnesses Next.js Server-Side Rendering (SSR) to enforce complete cache bypass, ensuring that freshly breaking declarations and regulatory decrees populate reader viewports synchronously without CDN latency.
                  </p>
                  <p>
                    Furthermore, direct integration with neural speech engines transforms breaking dispatches into live voice streams instantly, allowing audiences to absorb urgent developments effortlessly during daily commutes or mobile workflows.
                  </p>
                  <p>
                    Our enduring commitment to verified authenticity remains the driving compass behind our breaking coverage, guaranteeing transparent, truthful reporting that commands trust across global audiences.
                  </p>
                  <p>
                    Central monitoring desks operate 24/7 to observe unfolding developments, providing rapid contextual insights that explain the real-world ramifications of pivotal announcements across sports, industry, and international governance.
                  </p>
                </>
              )
            ) : (
              language === 'ar' ? (
                <>
                  <p>
                    تجسد التغطيات الحية المباشرة قمة التفاعل الرقمي بين غرف الأخبار والجمهور، حيث لم تعد متابعة الأحداث الكبرى تقتصر على قراءة تقرير لاحق، بل تحولت إلى تجربة غامرة يشارك فيها المتابع تفاصيل اللحظة دقيقة بدقيقة.
                  </p>
                  <p>
                    في مواجهات كلاسيكو الأرض والأحداث الرياضية ذات الطابع الاستثنائي، تتكامل النصوص الصحفية مع الرسوم التفاعلية، تدفقات الفيديو، وإحصائيات التسلل والسيطرة اللحظية التي تُعالج داخل متصفح المستخدم بنمط Client-Side Rendering.
                  </p>
                  <p>
                    تتيح هذه الهندسة التفاعلية تحديث بيانات المباراة وتدفق الإشارات الرقمية فور وقوع الأهداف أو البطاقات دون الحاجة إلى إعادة تحميل الصفحة، مما يضمن سلاسة فائقة وتجربة مستخدم تنافس التطبيقات الذكية الأصلية.
                  </p>
                  <p>
                    كما يمنح القارئ الصوتي المدمج مرونة إضافية لمتابعة الوصف الصوتي المباشر للمجريات التكتيكية، مما يتيح تجربة متعددة الوسائط تجمع بين الرؤية البصرية والاستماع الطبيعي عالي النقاء.
                  </p>
                  <p>
                    إن مهمتنا في التغطية الحية هي وضع القارئ في قلب الحدث وكأنه يجلس في مقاعد ملعب سانتياغو برنابيو، مستفيدين من أحدث تقنيات الويب السحابية لتقديم تغطية إعلامية رائدة تليق بتطلعات الجمهور العربي في شتى بقاع العالم.
                  </p>
                  <p>
                    وتستمر منصاتنا في تطوير آليات التفاعل الميداني وإشراك القراء عبر استطلاعات الرأي والأسئلة التفاعلية، لإثراء الحوار الرياضي والثقافي حول أكبر المواعيد التنافسية العالمية بروح مهنية وموضوعية عالية.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Live interactive coverage embodies the absolute pinnacle of digital media engagement, transforming major event reporting from static post-match recaps into vivid, minute-by-minute participatory journeys shared in real time with global audiences.
                  </p>
                  <p>
                    During blockbuster fixtures like El Clásico, written match telemetry harmonizes with interactive tactical diagrams, automated offside graphics, and live possession meters rendered seamlessly in browser memory via Client-Side Rendering.
                  </p>
                  <p>
                    This client-centric architecture ingests dynamic websocket pulses the moment goals are scored or VAR interventions conclude, preserving fluid UI continuity without disruptive document refreshes.
                  </p>
                  <p>
                    Integrated AI audio narration adds another dimension to accessibility, allowing followers to listen to live tactical dispatches with natural multilingual voice synthesis while monitoring ongoing events.
                  </p>
                  <p>
                    Our mission is to immerse readers directly into the electric atmosphere of the stadium, leveraging cutting-edge web performance to deliver live sports journalism that sets the industry standard worldwide.
                  </p>
                  <p>
                    Our interactive teams continually enhance second-screen engagement features, inviting readers to participate in live community polling and tactical debate during the most celebrated sporting fixtures on the global calendar.
                  </p>
                </>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
