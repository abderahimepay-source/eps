"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GraduationCap, BookOpen, Target, Award, ChevronRight, CheckCircle2 } from "lucide-react";
import { CURRICULUM_DATA } from '@/lib/curriculum';

export default function AboutCurriculum() {
  const curriculum = CURRICULUM_DATA.curriculum_data;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">RiyadiPlan AI</span>
        </Link>
        <nav className="flex gap-4 items-center">
          <Link href="/auth/sign-in">
            <Button variant="ghost">دخول</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button className="bg-accent hover:bg-accent/90">ابدأ الآن</Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1 container max-w-5xl mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6">
          <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-semibold bg-primary/10 text-primary mb-4">
            <BookOpen className="h-4 w-4 me-2" />
            دليل المنهاج الرسمي 2023
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-headline leading-tight">
            فهم عميق للمنهاج الجزائري <br />
            <span className="text-primary">عبر المقاربة بالكفاءات</span>
          </h1>
          <p className="text-xl text-muted-foreground font-tajawal max-w-3xl mx-auto leading-relaxed">
            تعتمد منصة RiyadiPlan AI على أحدث المناهج التربوية الجزائرية لضمان تقديم محتوى بيداغوجي دقيق يساعد الأستاذ في بناء حصص تعليمية متكاملة.
          </p>
        </section>

        {/* Interactive Curriculum explorer */}
        <section className="space-y-8">
          <div className="flex items-center gap-3 mb-8">
            <Target className="h-8 w-8 text-accent" />
            <h2 className="text-3xl font-bold font-headline">استكشف المستويات الدراسية</h2>
          </div>

          <Tabs defaultValue="1" className="w-full" dir="rtl">
            <TabsList className="grid grid-cols-5 h-auto p-1 bg-muted/50 rounded-2xl mb-8">
              {curriculum.map((grade) => (
                <TabsTrigger 
                  key={grade.grade} 
                  value={grade.grade.toString()}
                  className="rounded-xl py-3 data-[state=active]:bg-primary data-[state=active]:text-white transition-all font-tajawal text-xs md:text-sm"
                >
                  {grade.grade_name.replace(' ابتدائي', '')}
                </TabsTrigger>
              ))}
            </TabsList>

            {curriculum.map((grade) => (
              <TabsContent key={grade.grade} value={grade.grade.toString()} className="animate-in fade-in duration-500">
                <div className="grid gap-8">
                  {/* Overall Competence Card */}
                  <Card className="border-none shadow-lg bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-primary font-headline">
                        <Award className="h-6 w-6" />
                        الكفاءة الشاملة للسنة {grade.grade_name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-lg font-tajawal leading-relaxed text-foreground/80 italic">
                        "{grade.overall_competence}"
                      </p>
                    </CardContent>
                  </Card>

                  {/* Fields Breakdown */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {grade.fields.map((field: any, idx: number) => (
                      <Card key={idx} className="border-none shadow-sm hover:shadow-md transition-shadow bg-white">
                        <CardHeader className="pb-4">
                          <div className="h-10 w-10 bg-accent/10 rounded-full flex items-center justify-center mb-4">
                            <span className="font-bold text-accent">{idx + 1}</span>
                          </div>
                          <CardTitle className="text-xl font-headline">{field.field_name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="p-3 bg-muted/30 rounded-lg">
                            <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2 font-tajawal">الكفاءة الختامية</h4>
                            <p className="text-sm font-tajawal leading-relaxed">{field.final_competence}</p>
                          </div>
                          
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="resources" className="border-none">
                              <AccordionTrigger className="text-sm font-bold text-primary hover:no-underline py-2">
                                الموارد المعرفية
                              </AccordionTrigger>
                              <AccordionContent>
                                <ul className="space-y-2 pt-2">
                                  {Object.keys(field.Knowledge_resources).map((cat) => (
                                    <li key={cat} className="text-xs font-tajawal flex items-center gap-2 text-muted-foreground">
                                      <CheckCircle2 className="h-3 w-3 text-accent shrink-0" />
                                      {cat.replace(/_/g, ' ')}
                                    </li>
                                  ))}
                                </ul>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </section>

        {/* Methodology Section */}
        <section className="bg-accent/5 rounded-3xl p-8 md:p-12 border border-accent/10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-headline">كيف يتم بناء المذكرة؟</h2>
              <p className="text-lg font-tajawal text-muted-foreground leading-relaxed">
                نقوم في RiyadiPlan AI بترجمة أهداف المنهاج إلى أهداف إجرائية (SMART) ذكية، ثم نقوم بصياغة المذكرة وفق المراحل البيداغوجية المعتمدة رسمياً:
              </p>
              <ul className="space-y-4">
                {[
                  { t: "المرحلة التحضيرية", d: "جانب تنظيمي، تسخين عام وخاص، ولعبة تمهيدية." },
                  { t: "المرحلة التعلمية", d: "مواقف تعلمية، ورشات، وألعاب شبه رياضية تخدم الهدف." },
                  { t: "المرحلة الختامية", d: "لعبة هادئة، تمارين استرخاء، وتقييم الحصة." }
                ].map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="h-8 w-8 bg-white shadow-sm rounded-full flex items-center justify-center shrink-0 font-bold text-accent border border-accent/20">
                      {i + 1}
                    </div>
                    <div>
                      <h4 className="font-bold font-headline">{step.t}</h4>
                      <p className="text-sm text-muted-foreground font-tajawal">{step.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square md:aspect-video rounded-2xl overflow-hidden shadow-2xl bg-white p-2">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/10 z-0"></div>
              <div className="relative z-10 h-full w-full border border-dashed rounded-xl flex items-center justify-center p-8 text-center flex-col gap-4">
                <Sparkles className="h-12 w-12 text-primary animate-pulse" />
                <h3 className="text-xl font-bold font-headline text-primary">المولد الذكي</h3>
                <p className="text-sm font-tajawal text-muted-foreground">يقوم الذكاء الاصطناعي بربط موردك المعرفي بالكفاءة الختامية تلقائياً لضمان الدقة.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12">
          <Card className="bg-primary border-none shadow-2xl p-8 md:p-16 text-primary-foreground relative overflow-hidden">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-5xl font-bold font-headline">جاهز للتحضير بذكاء؟</h2>
              <p className="text-xl opacity-90 font-tajawal max-w-2xl mx-auto">
                انضم الآن لمئات الأساتذة الذين وفروا وقتهم وجهدهم باستخدام RiyadiPlan AI.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Link href="/auth/sign-up">
                  <Button size="lg" className="h-14 px-10 text-xl bg-white text-primary hover:bg-white/90 shadow-xl">
                    ابدأ مجاناً
                    <ChevronRight className="ms-2 h-6 w-6" />
                  </Button>
                </Link>
                <Link href="/auth/sign-in">
                  <Button size="lg" variant="outline" className="h-14 px-10 text-xl border-white/30 hover:bg-white/10">
                    تسجيل الدخول
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t py-12 bg-white">
        <div className="container px-4 mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="bg-primary p-1 rounded-md">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-headline font-bold text-xl text-primary">RiyadiPlan AI</span>
          </div>
          <p className="text-sm text-muted-foreground font-tajawal">
            © 2024 RiyadiPlan AI. دليل المنهاج التربوي الجزائري الرسمي.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Sparkles(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  );
}
