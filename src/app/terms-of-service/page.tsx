"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ClipboardPenLine, ArrowRight, FileText, AlertCircle, CreditCard, Scale, ShieldAlert } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background font-tajawal" dir="rtl">
      {/* Simple Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <ClipboardPenLine className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">Modakira</span>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة للرئيسية
          </Button>
        </Link>
      </header>

      <main className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12 text-start">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-headline m-0">شروط الخدمة</h1>
          <p className="text-muted-foreground text-lg italic">يرجى قراءة القواعد المنظمة لاستخدام المنصة بعناية.</p>
        </div>

        <div className="prose prose-teal max-w-none space-y-10 text-foreground/80 leading-relaxed">
          
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Scale className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">1. قبول الشروط ووصف الخدمة</h2>
            </div>
            <p>باستخدامك لمنصة Modakira، فإنك توافق على الالتزام بهذه الشروط. المنصة هي خدمة سحابية (SaaS) تستخدم الذكاء الاصطناعي لتوليد محتوى بيداغوجي لأساتذة التربية البدنية وفق المنهاج الجزائري الرسمي.</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ShieldAlert className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">2. الحسابات والمسؤولية</h2>
            </div>
            <p>يجب أن يكون عمرك 18 عاماً على الأقل. أنت مسؤول عن الحفاظ على سرية كلمة مرورك وعن كافة الأنشطة التي تتم عبر حسابك. يمنع منعاً باتاً مشاركة الحساب مع أشخاص آخرين، فالحساب مخصص للاستخدام الشخصي فقط.</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <AlertCircle className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">3. سياسة الاستخدام المقبول</h2>
            </div>
            <div className="bg-destructive/5 p-6 rounded-2xl border border-destructive/20">
              <p className="font-bold text-destructive mb-2">يحظر تماماً القيام بما يلي:</p>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>استخدام الخدمة لأغراض غير قانونية أو تخريبية.</li>
                <li>محاولة الوصول غير المصرح به أو الهندسة العكسية للبرمجيات.</li>
                <li>توليد محتوى مسيء أو ينتهك أخلاقيات المهنة التربوية.</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <CreditCard className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">4. الدفع، الاشتراكات، والتحصيل</h2>
            </div>
            <p>تعتمد الخدمة نظام "الاعتمادات" التي يتم شراؤها عبر بوابة <strong>Chargily</strong>. يتم تفعيل الاعتمادات فورياً بعد نجاح عملية الدفع.</p>
            <p className="font-bold">سياسة الاسترجاع:</p>
            <p>نظراً للطبيعة الرقمية والفورية للخدمة، <strong>لا نوفر استرجاعاً للأموال</strong> بعد استهلاك الاعتمادات لتوليد المحتوى، إلا في حالات الخلل التقني المثبت الذي منعك من الحصول على مذكرتك.</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Scale className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">5. إخلاء المسؤولية والملكية الفكرية</h2>
            </div>
            <p>نحن نمتلك الكود المصدري والتصميم، بينما تمتلك أنت (المستخدم) كامل الحقوق في المذكرات التي تقوم بتوليدها لاستخدامها في مسارك المهني.</p>
            <p className="bg-muted p-4 rounded-xl text-sm italic">"يتم تقديم الخدمة كما هي (As Is). المنصة أداة مساعدة، ويجب على الأستاذ مراجعة المحتوى المولد وتكييفه بيداغوجياً قبل تقديمه رسمياً. نحن غير مسؤولين عن أي أخطاء تربوية ناتجة عن عدم المراجعة."</p>
          </section>

          <section className="bg-primary/5 p-8 rounded-3xl border border-primary/20">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 m-0">6. القانون الحاكم</h2>
            <p>تخضع هذه الشروط وتفسر وفقاً للقوانين السارية في <strong>الجمهورية الجزائرية الديمقراطية الشعبية</strong>.</p>
          </section>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-white">
        © 2024 Modakira. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
