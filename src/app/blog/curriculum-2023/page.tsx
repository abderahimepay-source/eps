"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ClipboardPenLine, ArrowRight, Calendar, Clock, User, Share2, Tag } from "lucide-react";

export default function CurriculumBlogPost() {
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

      <main className="container max-w-4xl mx-auto py-12 px-4 space-y-8">
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-bold">
            <Tag className="h-4 w-4" />
            مناهج تربوية
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-headline leading-tight">
            دليل شامل لمنهاج التربية البدنية والرياضية 2023 في الجزائر
          </h1>
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><User className="h-4 w-4" /> فريق Modakira البيداغوجي</span>
            <span className="flex items-center gap-2"><Calendar className="h-4 w-4" /> 15 مارس 2024</span>
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> 8 دقائق قراءة</span>
          </div>
        </header>

        <div className="prose prose-teal max-w-none text-start text-foreground/80 leading-loose space-y-8">
          <p className="text-xl font-medium text-foreground">
            يعد المنهاج الجديد للتربية البدنية والرياضية للمرحلة الابتدائية (2023) في الجزائر خطوة نوعية نحو تعزيز المقاربة بالكفاءات، حيث يركز على الطفل كمركز للعملية التعليمية. في هذا المقال، سنفكك هيكلية هذا المنهاج وكيفية تطبيقه في مذكراتك اليومية.
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline text-primary">1. الهيكلية العامة للمنهاج</h2>
            <p>يتوزع المنهاج على خمس سنوات دراسية (من السنة الأولى إلى الخامسة ابتدائي)، حيث تهدف كل سنة إلى تحقيق "كفاءة ختامية شاملة" تضمن نمو الطفل حركياً، نفسياً، واجتماعياً.</p>
            <ul className="list-disc list-inside space-y-2 bg-muted/30 p-6 rounded-2xl border">
              <li><strong>السنة الأولى والثانية:</strong> التركيز على الوضعيات والهيئات الطبيعية والتنقلات البسيطة.</li>
              <li><strong>السنة الثالثة:</strong> بداية بناء جمل حركية للجري والرمي.</li>
              <li><strong>السنة الرابعة والخامسة:</strong> العمل الجماعي والرياضات القاعدية والجمباز.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline text-primary">2. ميادين التعلم الثلاثة</h2>
            <p>تم تقسيم الأنشطة في كل مستوى دراسي إلى ثلاثة ميادين أساسية تضمن تغطية كافة الجوانب المهارية:</p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-5 border rounded-2xl bg-white shadow-sm">
                <h4 className="font-bold mb-2">الوضعيات والتنقلات</h4>
                <p className="text-sm">تركز على توازن الجسم، الهيئات الطبيعية، وتغيير الاتجاهات.</p>
              </div>
              <div className="p-5 border rounded-2xl bg-white shadow-sm">
                <h4 className="font-bold mb-2">الحركات القاعدية</h4>
                <p className="text-sm">تشمل الجري، الرمي، الوثب، والجمباز الفني والايقاعي.</p>
              </div>
              <div className="p-5 border rounded-2xl bg-white shadow-sm">
                <h4 className="font-bold mb-2">الهيكلة والبناء</h4>
                <p className="text-sm">تركز على استغلال الفضاء المتاح والرياضات الجماعية وقوانين المنافسة.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline text-primary">3. صياغة الأهداف الإجرائية (SMART)</h2>
            <p>أكبر تحدٍ يواجه الأساتذة هو صياغة "أهداف إجرائية" قابلة للقياس. المنهاج الجزائري يشدد على أن يكون الهدف:</p>
            <p className="bg-primary/5 p-4 border-r-4 border-primary italic">"أن يكون المتعلم قادراً على [فعل إجرائي] + [المورد المعرفي] + [معيار الأداء]."</p>
            <p>مثال: "أن يؤدي المتعلم الجري المتعرج بين 5 أقماع دون لمسها في زمن أقل من 30 ثانية."</p>
          </section>

          <section className="bg-accent/5 p-8 rounded-3xl border border-accent/20 space-y-4">
            <h2 className="text-2xl font-bold font-headline text-accent">الخلاصة: كيف يساعدك Modakira؟</h2>
            <p>لقد قمنا ببرمجة ذكاء Modakira الاصطناعي بناءً على هذا المنهاج حصرياً. عندما تختار مستوى "السنة الرابعة" وميدان "الحركات القاعدية"، فإن النظام يقترح عليك أهدافاً SMART مستخرجة حرفياً من وثيقة المنهاج الرسمي 2023، مما يضمن لك مذكرات احترافية خالية من الأخطاء البيداغوجية.</p>
            <Link href="/auth/sign-up">
              <Button className="bg-accent hover:bg-accent/90 gap-2">جرب إنشاء مذكرة الآن</Button>
            </Link>
          </section>
        </div>

        <footer className="pt-12 border-t flex items-center justify-between">
          <div className="flex gap-4">
            <Button variant="outline" size="icon" className="rounded-full"><Share2 className="h-4 w-4" /></Button>
          </div>
          <Link href="/blog">
            <Button variant="ghost" className="gap-2">شاهد المزيد من المقالات <ArrowRight className="h-4 w-4" /></Button>
          </Link>
        </footer>
      </main>

      <footer className="border-t py-12 text-center text-sm text-muted-foreground bg-white mt-20">
        © 2024 Modakira. جميع الحقوق محفوظة للأستاذ الجزائري.
      </footer>
    </div>
  );
}