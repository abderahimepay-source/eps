"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, FileText } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-background font-tajawal" dir="rtl">
      {/* Simple Header */}
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <div className="bg-primary p-1.5 rounded-lg">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="font-headline text-2xl font-bold tracking-tight text-primary">RiyadiPlan AI</span>
        </Link>
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة للرئيسية
          </Button>
        </Link>
      </header>

      <main className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <FileText className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline">شروط الخدمة</h1>
          <p className="text-muted-foreground">آخر تحديث: مارس 2024</p>
        </div>

        <div className="prose prose-teal max-w-none space-y-8 text-foreground/80 leading-relaxed text-start">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. قبول الشروط</h2>
            <p>بمجرد إنشاء حساب أو استخدام خدمات RiyadiPlan AI، فإنك توافق على الالتزام بهذه الشروط والسياسات المذكورة هنا.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. وصف الخدمة</h2>
            <p>RiyadiPlan AI هي منصة سحابية تستخدم الذكاء الاصطناعي لمساعدة أساتذة التربية البدنية في الجزائر على توليد مذكرات بيداغوجية وأهداف تعلمية وفق المنهاج الدراسي الرسمي.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. حسابات المستخدمين</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>يجب أن تكون المعلومات المقدمة عند التسجيل دقيقة وحديثة.</li>
              <li>أنت مسؤول عن الحفاظ على سرية كلمة المرور الخاصة بك.</li>
              <li>يمنع منعاً باتاً مشاركة الحساب مع أشخاص آخرين؛ الحساب مخصص للاستخدام الفردي فقط.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. سياسة الدفع والاشتراكات</h2>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>تعتمد الخدمة على نظام "الاعتمادات" (Credits) التي يتم شراؤها عبر منصة Chargily.</li>
              <li>الأسعار المعلنة نهائية وتشمل جميع الرسوم.</li>
              <li><strong>سياسة الاسترجاع:</strong> نظراً للطبيعة الرقمية والفورية للخدمة، لا توفر المنصة استرجاعاً للأموال بعد استخدام الاعتمادات لتوليد المحتوى، إلا في حالات الخلل التقني المثبت.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. الاستخدام المقبول</h2>
            <p>يُحظر استخدام المنصة في:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>محاولة اختراق أو تعطيل البنية التحتية للمنصة.</li>
              <li>استخدام المحتوى المولد لأغراض تجارية لإعادة البيع كخدمة منافسة.</li>
              <li>توليد محتوى مسيء أو غير قانوني.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. إخلاء المسؤولية</h2>
            <p>بينما نسعى لضمان أعلى درجات الدقة، فإن المحتوى المولد بواسطة الذكاء الاصطناعي يجب مراجعته من قبل الأستاذ قبل اعتماده رسمياً. المنصة غير مسؤولة عن أي قرارات تربوية أو إدارية ناتجة عن استخدام المحتوى.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">7. الملكية الفكرية</h2>
            <p>تمتلك RiyadiPlan AI كافة الحقوق المتعلقة بالكود المصدري، التصميم، والخوارزميات. يحق للمستخدم امتلاك المذكرات التي يقوم بتوليدها واستخدامها في مساره المهني والتربوي.</p>
          </section>

          <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h2 className="text-2xl font-bold text-primary mb-4">8. القانون الحاكم</h2>
            <p>تخضع هذه الشروط وتفسر وفقاً للقوانين السارية في الجمهورية الجزائرية الديمقراطية الشعبية.</p>
          </section>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-white">
        © 2024 RiyadiPlan AI. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
