
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ClipboardPenLine, ArrowRight, Info, Zap, CreditCard, Sparkles, HelpCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PricingGuidePage() {
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
        <Link href="/">
          <Button variant="ghost" className="gap-2">
            <ArrowRight className="h-4 w-4" />
            العودة للرئيسية
          </Button>
        </Link>
      </header>

      <main className="container max-w-4xl mx-auto py-12 px-4 space-y-12">
        <div className="text-center space-y-4">
          <div className="bg-primary/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Info className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-headline">دليل الاعتمادات والأسعار</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            تعرف على كيفية عمل نظام الذكاء الاصطناعي في Modakira وكيفية إدارة رصيدك بكفاءة.
          </p>
        </div>

        {/* What are Credits? */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <CreditCard className="h-6 w-6" />
            <h2 className="text-2xl font-bold font-headline">ما هي الاعتمادات (Credits)؟</h2>
          </div>
          <p className="text-lg leading-relaxed text-muted-foreground">
            الاعتمادات هي "العملة" المستخدمة داخل منصة Modakira لتشغيل نماذج الذكاء الاصطناعي (Gemini). بدلاً من دفع اشتراك شهري ثابت قد لا تستخدمه بالكامل، نعتمد نظام "الدفع حسب الاستخدام" لضمان أفضل قيمة مقابل مالك.
          </p>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="border-none shadow-sm bg-primary/5">
              <CardContent className="pt-6">
                <p className="font-bold text-primary mb-2">شفافية كاملة</p>
                <p className="text-sm">يتم خصم الرصيد فقط عند توليد أهداف أو صياغة مذكرة كاملة.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-accent/5">
              <CardContent className="pt-6">
                <p className="font-bold text-accent mb-2">صلاحية دائمة</p>
                <p className="text-sm">الاعتمادات التي تشتريها لا تنتهي صلاحيتها وتظل في حسابك حتى تستخدمها.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Tokens and Usage */}
        <section className="space-y-6 bg-white p-8 rounded-3xl border shadow-sm">
          <div className="flex items-center gap-3 text-accent">
            <Zap className="h-6 w-6" />
            <h2 className="text-2xl font-bold font-headline text-foreground">العلاقة بين التوكنز والاعتمادات</h2>
          </div>
          <div className="space-y-4">
            <p className="leading-relaxed">
              تستخدم نماذج الذكاء الاصطناعي ما يسمى بـ <span className="font-bold text-primary">"التوكنز" (Tokens)</span> لمعالجة النصوص. في Modakira، قمنا بتبسيط العملية لك:
            </p>
            <div className="bg-muted p-6 rounded-2xl text-center">
              <p className="text-2xl font-bold font-rajdhani text-primary">1 اعتماد = 1,000 توكن أساسي</p>
            </div>
            <ul className="space-y-3 ps-4 list-disc text-muted-foreground">
              <li>توليد الأهداف الإجرائية يستهلك كمية قليلة جداً من التوكنز.</li>
              <li>صياغة المذكرة الكاملة تستهلك كمية أكبر نظراً للتفصيل البيداغوجي العميق.</li>
              <li>بشكل تقديري، الباقة الأساسية (150 اعتماد) تكفي لإنتاج حوالي <span className="font-bold text-foreground">40 مذكرة كاملة</span>.</li>
            </ul>
          </div>
        </section>

        {/* Pricing Plans Summary */}
        <section className="space-y-6">
          <div className="flex items-center gap-3 text-primary">
            <Sparkles className="h-6 w-6" />
            <h2 className="text-2xl font-bold font-headline">باقات الشحن المتوفرة</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 border rounded-2xl space-y-3">
              <h3 className="font-bold text-xl">الباقة الأساسية</h3>
              <p className="text-2xl font-bold text-primary">500 د.ج</p>
              <p className="text-sm text-muted-foreground">تمنحك 150 اعتماد (حوالي 40 مذكرة).</p>
            </div>
            <div className="p-6 border-2 border-primary bg-primary/5 rounded-2xl space-y-3 relative">
              <div className="absolute -top-3 right-4 bg-primary text-white text-[10px] px-2 py-0.5 rounded-full">الأفضل قيمة</div>
              <h3 className="font-bold text-xl">باقة المحترفين PRO</h3>
              <p className="text-2xl font-bold text-primary">1000 د.ج</p>
              <p className="text-sm text-muted-foreground">تمنحك 300 اعتماد (حوالي 80 مذكرة).</p>
            </div>
          </div>
        </section>

        {/* FAQ Quick Links */}
        <section className="bg-muted/30 p-8 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 font-bold text-lg">
            <HelpCircle className="h-5 w-5 text-primary" />
            أسئلة شائعة
          </div>
          <div className="space-y-4 text-sm">
            <div>
              <p className="font-bold">كيف أشحن رصيدي؟</p>
              <p className="text-muted-foreground">عبر بوابة Chargily الآمنة باستخدام البطاقة الذهبية أو بطاقة CIB.</p>
            </div>
            <div>
              <p className="font-bold">هل يقل الرصيد إذا فشل التوليد؟</p>
              <p className="text-muted-foreground">لا، النظام مبرمج لخصم الرصيد فقط عند نجاح عملية صياغة المذكرة واستلامك للمحتوى.</p>
            </div>
          </div>
        </section>

        <div className="text-center pt-8">
          <Link href="/pricing">
            <Button size="lg" className="h-14 px-10 text-xl bg-accent hover:bg-accent/90">
              اشحن رصيدك الآن
            </Button>
          </Link>
        </div>
      </main>

      <footer className="border-t py-12 text-center text-sm text-muted-foreground bg-white mt-20">
        © 2024 Modakira. جميع الحقوق محفوظة للأستاذ الجزائري.
      </footer>
    </div>
  );
}
