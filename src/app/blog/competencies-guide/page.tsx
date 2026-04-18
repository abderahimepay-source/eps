"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ClipboardPenLine, ArrowRight, Tag, Calendar, User, BookOpen, Layers, Target, CheckCircle2 } from "lucide-react";
import { CURRICULUM_DATA } from '@/lib/curriculum';

export default function CompetenciesGuidePost() {
  return (
    <div className="min-h-screen bg-background font-tajawal" dir="rtl">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <ClipboardPenLine className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">Modakira</span>
        </Link>
        <Link href="/blog">
          <Button variant="ghost" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة للمدونة
          </Button>
        </Link>
      </header>

      <main className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold">
            <Tag className="h-4 w-4" />
            تحليل بيداغوجي
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight text-gray-900">
            دليل الكفاءات الختامية ومركباتها في التربية البدنية (2023)
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2 font-bold text-primary"><User className="h-4 w-4" /> الخبير البيداغوجي لـ Modakira</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> 20 مارس 2024</span>
          </div>
        </header>

        <section className="prose prose-teal max-w-none text-start space-y-6">
          <div className="bg-muted/30 p-8 rounded-3xl border-r-4 border-primary">
            <p className="text-xl font-medium text-foreground leading-relaxed italic">
              "إن فهم الكفاءة الختامية ليس مجرد قراءة لنص بيداغوجي، بل هو إدراك للمسار الحركي والنفسي الذي يسلكه التلميذ. مركبات الكفاءة هي الجسور التي نصل بها إلى تحقيق تلك الغاية."
            </p>
          </div>

          <p className="text-lg leading-relaxed text-muted-foreground">
            تعتبر المقاربة بالكفاءات حجر الزاوية في المنهاج الجزائري الجديد (2023). في هذا الدليل، سنستعرض الهيكل البيداغوجي لكل مستوى، مركزين على <strong>الكفاءات الختامية الشاملة</strong> و <strong>مركباتها</strong> التي تشكل العمود الفقري لكل مذكرة بيداغوجية ناجحة.
          </p>
        </section>

        <div className="space-y-16">
          {CURRICULUM_DATA.curriculum_data.map((grade) => (
            <section key={grade.grade} className="bg-white rounded-3xl border shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="bg-primary p-6 text-primary-foreground">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white/20 p-2 rounded-xl">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold font-headline">{grade.grade_name}</h2>
                </div>
                <div className="mt-4 bg-white/10 p-4 rounded-2xl border border-white/20">
                  <h4 className="text-xs uppercase tracking-wider font-bold mb-1 opacity-80">الكفاءة الختامية الشاملة للمستوى:</h4>
                  <p className="text-lg font-bold leading-relaxed">
                    {grade.overall_competence}
                  </p>
                </div>
              </div>

              <div className="p-6 lg:p-8 space-y-10">
                {grade.fields.map((field, fIdx) => (
                  <div key={fIdx} className="space-y-6">
                    <div className="flex items-center gap-3 text-primary border-b-2 border-primary/10 pb-3">
                      <Layers className="h-6 w-6" />
                      <h3 className="text-xl font-bold font-headline">ميدان: {field.field_name}</h3>
                    </div>
                    
                    <div className="grid lg:grid-cols-2 gap-8">
                      {/* Field Competence */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-accent font-bold text-sm">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>الكفاءة الختامية للميدان:</span>
                        </div>
                        <p className="bg-accent/5 p-5 rounded-2xl border border-accent/20 font-medium text-gray-800 leading-relaxed shadow-sm">
                          {field.final_competence}
                        </p>
                      </div>

                      {/* Compounds */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm">
                          <BookOpen className="h-4 w-4" />
                          <span>مركبات الكفاءة (Compétences Composées):</span>
                        </div>
                        <ul className="space-y-3">
                          {field.Competency_compound.map((compound, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-xl border border-transparent hover:border-primary/20 transition-colors">
                              <span className="h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                {cIdx + 1}
                              </span>
                              <span className="leading-relaxed">{compound}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-gray-900 text-white p-10 rounded-[3rem] space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10 text-center space-y-6">
            <h2 className="text-3xl font-bold font-headline">كيف توظف هذه المعلومات في مذكراتك؟</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
              تذكر دائماً أن "مركبات الكفاءة" هي التي توجهك لاختيار الأهداف الإجرائية (الأفعال الحركية). عندما تخطط لحصة، اختر مركبة واحدة لتكون هي المحور الأساسي الذي تبني عليه وضعياتك التعلمية.
            </p>
            <div className="pt-4">
              <Link href="/lesson-plans/create">
                <Button className="bg-primary hover:bg-primary/90 h-14 px-10 text-xl font-bold rounded-2xl shadow-xl shadow-primary/20">
                  ابدأ صياغة مذكرتك الآن بذكاء
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 text-center text-sm text-muted-foreground bg-white mt-20">
        © 2024 Modakira. جميع الحقوق محفوظة لأساتذة التربية البدنية والرياضية.
      </footer>
    </div>
  );
}
