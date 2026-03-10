"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Shield, CreditCard, Sparkles, Check } from "lucide-react";
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, firestore } = useFirebase();

  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

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
                {profile?.isPro ? 'باقة PRO' : 'الباقة المجانية'}
              </CardTitle>
              <CardDescription className="text-primary/70 font-rajdhani">
                رصيدك الحالي: {profile?.credit_balance || 0} اعتماد
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm font-tajawal">
                <Check className="h-4 w-4 text-green-500" />
                <span>{profile?.isPro ? 'مذكرات غير محدودة' : 'مذكرات محدودة (3/شهر)'}</span>
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
              <Link href="/pricing" className="w-full">
                <Button className="w-full bg-primary text-white">
                  {profile?.isPro ? 'إدارة الاشتراك' : 'ترقية الحساب'}
                </Button>
              </Link>
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
                    <Label htmlFor="firstName">الاسم الكامل</Label>
                    <Input id="firstName" defaultValue={profile?.displayName || ''} className="h-11" readOnly />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">الرصيد</Label>
                    <Input id="lastName" defaultValue={`${profile?.credit_balance || 0} اعتماد`} className="h-11 font-rajdhani" readOnly />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني</Label>
                  <Input id="email" type="email" defaultValue={profile?.email || ''} className="h-11" readOnly />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="school">المؤسسة التعليمية</Label>
                  <Input id="school" defaultValue={profile?.school || ''} className="h-11" readOnly />
                </div>
                <p className="text-xs text-muted-foreground font-tajawal">تحرير البيانات الشخصية متاح للمشتركين في باقة PRO.</p>
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
                <Button variant="outline">تغيير كلمة المرور</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
