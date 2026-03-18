"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, ShieldCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
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
            <ShieldCheck className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-headline">سياسة الخصوصية</h1>
          <p className="text-muted-foreground">آخر تحديث: مارس 2024</p>
        </div>

        <div className="prose prose-teal max-w-none space-y-8 text-foreground/80 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">1. المعلومات التي نجمعها</h2>
            <p>نقوم بجمع نوعين من المعلومات لتقديم خدماتنا بشكل أفضل:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>المعلومات الشخصية:</strong> تشمل الاسم، البريد الإلكتروني، اسم المؤسسة التعليمية، ورقم الهاتف عند التسجيل.</li>
              <li><strong>معلومات الاستخدام:</strong> تشمل عنوان IP، نوع المتصفح، والصفحات التي تمت زيارتها لتحسين تجربة المستخدم.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">2. كيف نجمع المعلومات</h2>
            <p>يتم جمع البيانات عبر نماذج التسجيل المباشرة، ملفات تعريف الارتباط (Cookies) لتحسين الأداء، وأدوات التحليل لضمان جودة الخدمة.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">3. الغرض من جمع البيانات</h2>
            <p>نستخدم بياناتك من أجل:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>تخصيص المذكرات البيداغوجية وفقاً لمستواك ومؤسستك.</li>
              <li>إدارة حسابك ورصيد الاعتمادات الخاص بك.</li>
              <li>إرسال تنبيهات وتحديثات تتعلق بالخدمة أو المنهاج الدراسي.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">4. مشاركة البيانات مع أطراف ثالثة</h2>
            <p>لا نقوم ببيع بياناتك أبداً. نشارك فقط المعلومات الضرورية مع:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li><strong>Firebase (Google):</strong> لتخزين البيانات وضمان أمن الحسابات.</li>
              <li><strong>Chargily:</strong> لمعالجة عمليات الدفع بشكل آمن وسري.</li>
              <li><strong>Google Gemini AI:</strong> لمعالجة طلبات توليد المذكرات (دون إرسال بياناتك الشخصية الحساسة).</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">5. أمن البيانات</h2>
            <p>نحن نستخدم بروتوكولات تشفير متطورة وخوادم سحابية آمنة (Google Cloud) لحماية بياناتك من الوصول غير المصرح به.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-primary mb-4">6. حقوق المستخدم</h2>
            <p>لديك الحق الكامل في:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
              <li>الوصول إلى بياناتك الشخصية وتعديلها.</li>
              <li>طلب حذف حسابك وبياناتك نهائياً من أنظمتنا.</li>
              <li>الاعتراض على معالجة بياناتك لأغراض تسويقية.</li>
            </ul>
          </section>

          <section className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
            <h2 className="text-2xl font-bold text-primary mb-4">اتصل بنا</h2>
            <p>إذا كان لديك أي استفسار بخصوص خصوصية بياناتك، يرجى التواصل معنا عبر:</p>
            <p className="font-bold mt-2">البريد الإلكتروني: support@riyadiplan.ai</p>
            <p className="font-bold">واتساب: 213555000000+</p>
          </section>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-white">
        © 2024 RiyadiPlan AI. جميع الحقوق محفوظة.
      </footer>
    </div>
  );
}
