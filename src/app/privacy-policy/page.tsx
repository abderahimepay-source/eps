
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ClipboardPenLine, ArrowRight, ShieldCheck, Mail, Lock, Eye, Share2, UserCheck } from "lucide-react";

export default function PrivacyPolicyPage() {
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

      <main className="container max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-headline">سياسة الخصوصية</h1>
          <p className="text-muted-foreground text-lg italic font-tajawal">نحن نلتزم بحماية بياناتك وخصوصيتك المهنية. آخر تحديث: مارس 2024.</p>
        </div>

        <div className="prose prose-teal max-w-none space-y-10 text-foreground/80 leading-relaxed text-start">
          
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Eye className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">1. المعلومات التي نجمعها</h2>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-4">
              <p><strong>البيانات الشخصية:</strong> نجمع فقط البيانات الأساسية اللازمة لتشغيل حسابك، وهي: الاسم الكامل (أو اسم المستخدم) والبريد الإلكتروني فقط.</p>
              <p><strong>بيانات الاستخدام:</strong> عنوان IP، نوع المتصفح، الصفحات التي زرتها، ومدة البقاء، بالإضافة إلى ملفات تعريف الارتباط (Cookies) لتحسين تجربتك.</p>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <UserCheck className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">2. كيف ولماذا نجمع المعلومات؟</h2>
            </div>
            <p>يتم جمع البيانات عبر نماذج التسجيل وأدوات التحليل لمعالجة المدفوعات عبر <strong>Chargily</strong> وتوفير خدمات الذكاء الاصطناعي عبر <strong>Google Gemini</strong>.</p>
            <p>نحن لا نطلب ولا نخزن أرقام هواتفكم أو عناوين مؤسساتكم التعليمية لضمان أقصى درجات الخصوصية.</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Share2 className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">3. مشاركة البيانات مع أطراف ثالثة</h2>
            </div>
            <p>نحن لا نبيع بياناتك الشخصية أبداً. نشارك فقط البيانات الضرورية مع:</p>
            <ul className="list-disc list-inside space-y-3 ps-4 bg-muted/30 p-4 rounded-xl">
              <li><strong>Firebase (Google):</strong> لتخزين البيانات وضمان أمن الحسابات.</li>
              <li><strong>Chargily:</strong> لمعالجة عمليات الدفع عبر البطاقة الذهبية و CIB بشكل آمن.</li>
              <li><strong>Google Gemini AI:</strong> لمعالجة طلبات توليد المذكرات (لا يتم إرسال بيانات شخصية للنموذج).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Lock className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">4. أمن البيانات وتخزينها</h2>
            </div>
            <p>تُخزن جميع البيانات على خوادم سحابية مشفرة وآمنة مقدمة من Google Cloud. نستخدم بروتوكولات HTTPS و SSL لضمان عدم اعتراض بياناتك أثناء النقل.</p>
          </section>

          <section className="space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <ShieldCheck className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">5. حقوق المستخدم</h2>
            </div>
            <p>بصفتك مستخدماً، لديك الحق في الوصول إلى بياناتك، تعديلها، أو طلب حذف حسابك نهائياً. يمكنك القيام بذلك عبر واجهة التطبيق أو التواصل معنا.</p>
          </section>

          <section className="bg-primary/5 p-8 rounded-3xl border border-primary/20 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <Mail className="h-6 w-6" />
              <h2 className="text-2xl font-bold font-headline m-0">اتصل بنا</h2>
            </div>
            <p>لأي استفسارات تتعلق بالخصوصية، يرجى التواصل معنا:</p>
            <div className="flex flex-col gap-2 font-bold">
              <a href="mailto:support@modakira.ai" className="hover:text-primary transition-colors">البريد الإلكتروني: support@modakira.ai</a>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t py-8 text-center text-sm text-muted-foreground bg-white">
        © 2024 Modakira. جميع الحقوق محفوظة للأستاذ الجزائري.
      </footer>
    </div>
  );
}
