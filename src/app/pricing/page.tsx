
"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Check, Sparkles, Zap, Shield, Loader2 } from "lucide-react";
import { useFirebase } from '@/firebase';
import { useState } from 'react';
import { initiateChargilyCheckout } from '@/app/actions/chargily';
import { useToast } from '@/hooks/use-toast';

const PLANS = [
  {
    name: "باقة البداية",
    price: "100", // Price in DZD
    description: "لتجربة موسعة وإنشاء مذكرات أولية",
    credits: 15,
    tokens: "15,000",
    generations: "~4",
    features: [
      "15 اعتماد (Credits)",
      "حوالي 4 مذكرات كاملة شهرياً",
      "الوصول للمنهاج الرسمي 2023",
      "توليد الأهداف الذكية SMART",
      "حفظ المذكرات سحابياً"
    ],
    buttonText: "اشترك الآن",
    buttonVariant: "outline" as const,
    highlight: false,
    actionType: "buy" as const,
    isProUpgrade: false,
  },
  {
    name: "باقة المحترفين PRO",
    price: "500", // Price in DZD
    description: "للأداء الأقصى والإنتاجية العالية",
    credits: 150,
    tokens: "150,000",
    generations: "~40",
    features: [
      "150 اعتماد (Credits)",
      "حوالي 40 مذكرة كاملة شهرياً",
      "أولوية في معالجة الذكاء الاصطناعي",
      "دعم فني مخصص",
      "إمكانية التصدير بصيغ متعددة",
      "بدون إعلانات"
    ],
    buttonText: "اشترك الآن",
    buttonVariant: "default" as const,
    highlight: true,
    actionType: "buy" as const,
    isProUpgrade: true,
  },
  {
    name: "الباقة الأساسية",
    price: "300", // Price in DZD
    description: "للاستخدام المنتظم وإنتاجية مستمرة",
    credits: 50,
    tokens: "50,000",
    generations: "~12",
    features: [
      "50 اعتماد (Credits)",
      "حوالي 12 مذكرة كاملة شهرياً",
      "الوصول للمنهاج الرسمي 2023",
      "توليد الأهداف الذكية SMART",
      "حفظ المذكرات سحابياً"
    ],
    buttonText: "اشترك الآن",
    buttonVariant: "outline" as const,
    highlight: false,
    actionType: "buy" as const,
    isProUpgrade: false,
  }
];

export default function PricingPage() {
  const { user } = useFirebase();
  const { toast } = useToast();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);


  const handleSubscribe = async (plan: typeof PLANS[0]) => {
    if (plan.actionType !== "buy") return;
    if (!user) {
      toast({ title: "عذراً", description: "يجب تسجيل الدخول أولاً للتمكن من الاشتراك", variant: "destructive" });
      return;
    }

    setLoadingPlan(plan.name);
    try {
      const { checkoutUrl } = await initiateChargilyCheckout({
        userId: user.uid,
        creditsToBuy: plan.credits, // Pass credits to buy
        isProUpgrade: plan.isProUpgrade // Pass the PRO upgrade flag
      });
      window.location.href = checkoutUrl;
    } catch (error: any) {
      toast({
        title: "خطأ في الاتصال",
        description: error.message || "تعذر بدء عملية الدفع حالياً، حاول مرة أخرى.",
        variant: "destructive"
      });
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-12 py-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold font-headline">خطط الأسعار والاشتراكات</h1>
          <p className="text-xl text-muted-foreground font-tajawal max-w-2xl mx-auto">
            اختر الباقة التي تناسب احتياجاتك البيداغوجية ووفر ساعات من العمل الورقي.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3 lg:max-w-6xl lg:mx-auto">
          {PLANS.map((plan) => (
            <Card 
              key={plan.name} 
              className={plan.highlight ? "border-primary shadow-xl scale-105 relative overflow-hidden" : "border-none shadow-lg"}
            >
              {plan.highlight && (
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-4 py-1 text-xs font-bold rounded-bl-xl font-tajawal">
                  الأكثر طلباً
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="font-headline text-2xl">{plan.name}</CardTitle>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-4xl font-bold font-rajdhani">{plan.price}</span>
                  <span className="text-muted-foreground font-tajawal">د.ج</span>
                </div>
                <CardDescription className="font-tajawal mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-muted/50 p-4 rounded-xl space-y-2 text-center">
                  <div className="text-sm text-muted-foreground font-tajawal">سعة التوكنز</div>
                  <div className="text-2xl font-bold font-rajdhani text-primary">{plan.credits} اعتماد</div>
                  <div className="text-xs text-muted-foreground font-tajawal">({plan.tokens} توكن أساسي)</div>
                </div>
                
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm font-tajawal">
                      <div className="bg-primary/10 p-1 rounded-full">
                        <Check className="h-3 w-3 text-primary" />
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full h-12 text-lg ${plan.highlight ? 'bg-primary hover:bg-primary/90' : ''}`}
                  variant={plan.buttonVariant}
                  onClick={() => handleSubscribe(plan)}
                  disabled={loadingPlan === plan.name}
                >
                  {loadingPlan === plan.name ? (
                    <Loader2 className="h-5 w-5 animate-spin me-2" />
                  ) : null}
                  {plan.buttonText}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3 mt-20">
          <div className="flex flex-col items-center text-center space-y-3 p-6">
            <div className="bg-primary/10 p-4 rounded-2xl">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold font-headline">تفعيل فوري</h3>
            <p className="text-sm text-muted-foreground font-tajawal">يتم شحن الاعتمادات في حسابك مباشرة بعد تأكيد الدفع.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6">
            <div className="bg-accent/10 p-4 rounded-2xl">
              <Shield className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-bold font-headline">دفع آمن</h3>
            <p className="text-sm text-muted-foreground font-tajawal">طرق دفع محلية آمنة (بريدي موب، CCP) لسهولة التعامل.</p>
          </div>
          <div className="flex flex-col items-center text-center space-y-3 p-6">
            <div className="bg-primary/10 p-4 rounded-2xl">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-bold font-headline">ذكاء اصطناعي مطور</h3>
            <p className="text-sm text-muted-foreground font-tajawal">نستخدم أحدث نماذج Gemini لضمان دقة المحتوى البيداغوجي.</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
