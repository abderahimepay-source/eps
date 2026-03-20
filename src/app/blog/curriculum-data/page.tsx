
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Tag, Calendar, User, BookOpen, Layers } from "lucide-react";
import { CURRICULUM_DATA } from '@/lib/curriculum';

export default function CurriculumDataPost() {
  return (
    <div className="min-h-screen bg-background font-tajawal" dir="rtl">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
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
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent px-4 py-1.5 rounded-full text-sm font-bold">
            <Tag className="h-4 w-4" />
            وثائق رسمية
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight">
            المنهاج الرسمي بالتفصيل: الكفاءات والموارد المعرفية
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><User className="h-4 w-4" /> فريق Modakira البيداغوجي</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> 17 مارس 2024</span>
          </div>
        </header>

        <div className="space-y-12">
          {CURRICULUM_DATA.curriculum_data.map((grade) => (
            <section key={grade.grade} className="bg-white rounded-3xl border shadow-sm overflow-hidden">
              <div className="bg-primary p-6 text-white">
                <div className="flex items-center gap-3 mb-2">
                  <GraduationCap className="h-8 w-8" />
                  <h2 className="text-2xl font-bold font-headline">{grade.grade_name}</h2>
                </div>
                <p className="text-primary-foreground/90 text-sm leading-relaxed">
                  <span className="font-bold">الكفاءة الختامية الشاملة: </span>
                  {grade.overall_competence}
                </p>
              </div>

              <div className="p-6 space-y-8">
                {grade.fields.map((field, fIdx) => (
                  <div key={fIdx} className="space-y-4">
                    <div className="flex items-center gap-2 text-primary border-b pb-2">
                      <Layers className="h-5 w-5" />
                      <h3 className="text-xl font-bold font-headline">ميدان: {field.field_name}</h3>
                    </div>
                    
                    <div className="bg-muted/30 p-4 rounded-xl text-sm italic">
                      <span className="font-bold text-primary not-italic">الكفاءة الختامية للميدان: </span>
                      {field.final_competence}
                    </div>

                    <div className="grid gap-6">
                      <div className="space-y-2 text-start">
                        <h4 className="font-bold text-sm flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-accent" />
                          الموارد المعرفية:
                        </h4>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {Object.entries(field.Knowledge_resources).map(([cat, items]) => (
                            <div key={cat} className="border rounded-xl p-4 bg-gray-50/50">
                              <span className="block font-bold text-xs text-accent mb-2">{cat.replaceAll('_', ' ')}</span>
                              <ul className="list-disc list-inside text-xs space-y-1 text-muted-foreground">
                                {(items as string[]).map((item, iIdx) => (
                                  <li key={iIdx}>{item}</li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        <section className="bg-primary/5 p-8 rounded-3xl border border-primary/20 text-center space-y-4">
          <h2 className="text-2xl font-bold font-headline text-primary">هل تريد البدء في التحضير؟</h2>
          <p className="text-muted-foreground">كل هذه البيانات مدمجة في نظامنا الذكي لمساعدتك على صياغة مذكراتك في ثوانٍ.</p>
          <Link href="/lesson-plans/create">
            <Button className="bg-primary hover:bg-primary/90 h-12 px-8 text-lg font-bold">ابدأ الآن</Button>
          </Link>
        </section>
      </main>

      <footer className="border-t py-12 text-center text-sm text-muted-foreground bg-white mt-20">
        © 2024 Modakira. جميع الحقوق محفوظة للأستاذ الجزائري.
      </footer>
    </div>
  );
}
