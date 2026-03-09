"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Shield, CreditCard, Bell, Sparkles, Check } from "lucide-react";

export default function ProfilePage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold font-headline mb-2">الملف الشخصي</h1>
          <p className="text-muted-foreground font-tajawal">إدارة معلوماتك الشخصية واشتراكك.</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Subscription Card */}
          <Card className="md:col-span-1 border-primary/20 bg-primary/5 shadow-none overflow-hidden relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-primary">
                <Sparkles className="h-5 w-5" />
                باقة PRO
              </CardTitle>
              <CardDescription className="text-primary/70">مفعلة حتى 2025/01/01</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-tajawal">
                <Check className="h-4 w-4 text-green-500" />
                <span>مذكرات غير محدودة</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-tajawal">
                <Check className="h-4 w-4 text-green-500" />
                <span>تحميل PDF بلمسة واحدة</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-tajawal">
                <Check className="h-4 w-4 text-green-500" />
                <span>أولوية في دعم AI</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full bg-primary text-white">إدارة الاشتراك</Button>
            </CardFooter>
          </Card>

          {/* Settings */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <User className="h-5 w-5 text-muted-foreground" />
                  المعلومات الشخصية
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">الاسم</Label>
                    <Input id="firstName" defaultValue="أحمد" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">اللقب</Label>
                    <Input id="lastName" defaultValue="علي" className="h-11" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" defaultValue="ahmed.ali@education.dz" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">المؤسسة التعليمية</Label>
                  <Input id="school" defaultValue="متوسطة الفاتح، البليدة" className="h-11" />
                </div>
                <Button className="bg-primary hover:bg-primary/90 mt-2">حفظ التغييرات</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <Shield className="h-5 w-5 text-muted-foreground" />
                  الأمان
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPass">كلمة المرور الحالية</Label>
                  <Input id="currentPass" type="password" placeholder="••••••••" className="h-11" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPass">كلمة المرور الجديدة</Label>
                  <Input id="newPass" type="password" className="h-11" />
                </div>
                <Button variant="outline">تغيير كلمة المرور</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}