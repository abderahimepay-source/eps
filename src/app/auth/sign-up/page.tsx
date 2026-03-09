"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { GraduationCap, ArrowRight } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Firebase Auth logic
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl shadow-lg">
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="font-headline text-3xl font-bold text-primary">RiyadiPlan AI</span>
          </Link>
        </div>
        
        <Card className="border-none shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold font-headline">إنشاء حساب جديد</CardTitle>
            <CardDescription className="font-tajawal">
              انضم إلى آلاف الأساتذة الجزائريين اليوم
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">الاسم</Label>
                  <Input id="firstName" required className="h-12" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">اللقب</Label>
                  <Input id="lastName" required className="h-12" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">المؤسسة التعليمية</Label>
                <Input id="school" placeholder="مثلاً: مدرسة العربي بن مهيدي" required className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" placeholder="example@email.com" required className="h-12" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input id="password" type="password" required className="h-12" />
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-accent hover:bg-accent/90" disabled={loading}>
                {loading ? "جاري إنشاء الحساب..." : "إنشاء حساب"}
              </Button>
            </form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-muted-foreground w-full">
              لديك حساب بالفعل؟{" "}
              <Link href="/auth/sign-in" className="text-primary font-bold hover:underline">
                تسجيل الدخول
              </Link>
            </p>
          </CardFooter>
        </Card>
        
        <div className="mt-8">
          <Link href="/" className="flex items-center justify-center gap-2 text-muted-foreground hover:text-primary transition-colors">
            <ArrowRight className="h-4 w-4" />
            <span>العودة للرئيسية</span>
          </Link>
        </div>
      </div>
    </div>
  );
}