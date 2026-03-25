"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  Shield, 
  Sparkles, 
  Check, 
  Phone, 
  MapPin, 
  School, 
  Mail, 
  Calendar,
  CreditCard,
  FileText,
  Lock,
  LogOut
} from "lucide-react";
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, firestore, auth } = useFirebase();
  const router = useRouter();

  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return '---';
    try {
      return timestamp.toDate().toLocaleDateString('ar-DZ', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return new Date(timestamp).toLocaleDateString('ar-DZ');
    }
  };

  return (
    <AppLayout>
      <div className="max-w-5xl mx-auto space-y-8 pb-10">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white p-8 rounded-3xl border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-primary/5 rounded-full -translate-x-10 -translate-y-10"></div>
          
          <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
            <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center border-2 border-primary/20 text-primary">
              <User className="h-12 w-12" />
            </div>
            <div className="text-center md:text-start space-y-2">
              <div className="flex flex-col md:flex-row items-center gap-3">
                <h1 className="text-3xl font-bold font-headline">{profile?.displayName || 'تحميل...'}</h1>
                {profile?.isPro ? (
                  <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 border-none px-3 py-1 text-xs font-bold gap-1 shadow-sm">
                    <Sparkles className="h-3 w-3" />
                    عضو محترف PRO
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="px-3 py-1 text-xs font-bold font-tajawal">حساب مجاني</Badge>
                )}
                {profile?.isAdmin && (
                  <Badge variant="destructive" className="px-3 py-1 text-xs font-bold font-tajawal">مسؤول النظام</Badge>
                )}
              </div>
              <p className="text-muted-foreground font-tajawal flex items-center justify-center md:justify-start gap-2">
                <Mail className="h-4 w-4" />
                {profile?.email}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 relative z-10">
            <Link href="/pricing" className={profile?.isPro ? "hidden" : "block"}>
              <Button className="bg-accent hover:bg-accent/90 h-11 px-6 font-bold shadow-lg shadow-accent/20">
                ترقية لـ PRO
              </Button>
            </Link>
            <Button variant="outline" className="h-11 px-6 border-destructive text-destructive hover:bg-destructive/5 gap-2" onClick={handleSignOut}>
              <LogOut className="h-4 w-4" />
              خروج
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Stats & Subscription Column */}
          <div className="md:col-span-1 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden bg-white">
              <CardHeader className="bg-primary/5 border-b">
                <CardTitle className="font-headline text-lg flex items-center gap-2 text-primary">
                  <CreditCard className="h-5 w-5" />
                  الرصيد والاشتراك
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div className="text-center space-y-1">
                  <p className="text-sm text-muted-foreground font-tajawal">الاعتمادات المتبقية</p>
                  <p className="text-4xl font-bold font-rajdhani text-primary">{profile?.credit_balance || 0}</p>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <FileText className="h-4 w-4" />
                      إجمالي المذكرات
                    </span>
                    <span className="font-bold">{profile?.totalLessonPlansCreated || 0}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30 text-sm">
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      تاريخ الانضمام
                    </span>
                    <span className="font-bold text-xs">{formatDate(profile?.createdAt)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <p className="text-xs font-bold text-muted-foreground border-b pb-2">مميزات باقتك الحالية:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-tajawal text-foreground/80">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span>{profile?.isPro ? 'مذكرات ذكية غير محدودة' : '10 اعتمادات مجانية شهرياً'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-tajawal text-foreground/80">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span>تنزيل PDF فائق الجودة</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-tajawal text-foreground/80">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span>دعم فني بيداغوجي متواصل</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              {!profile?.isPro && (
                <CardFooter className="bg-muted/10 p-4 border-t">
                  <Link href="/pricing" className="w-full">
                    <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 font-bold">
                      استكشف باقات PRO
                    </Button>
                  </Link>
                </CardFooter>
              )}
            </Card>

            <Card className="border-none shadow-sm bg-white overflow-hidden">
               <CardHeader className="bg-muted/50 border-b">
                <CardTitle className="font-headline text-lg flex items-center gap-2">
                  <Lock className="h-5 w-5 text-muted-foreground" />
                  الأمان
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-4">
                <p className="text-xs text-muted-foreground font-tajawal leading-relaxed">
                  يمكنك تحديث كلمة المرور الخاصة بك لتأمين حسابك بشكل دوري.
                </p>
                <Button variant="outline" className="w-full h-11" disabled>
                  تغيير كلمة المرور
                </Button>
                <p className="text-[10px] text-center text-muted-foreground italic">سيتم تفعيل هذه الميزة قريباً</p>
              </CardContent>
            </Card>
          </div>

          {/* Settings Column */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="border-b">
                <CardTitle className="font-headline text-xl flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  المعلومات المهنية والشخصية
                </CardTitle>
                <CardDescription className="font-tajawal">هذه المعلومات تظهر تلقائياً في ترويسة مذكراتك البيداغوجية.</CardDescription>
              </CardHeader>
              <CardContent className="pt-8 space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <Label className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      الاسم واللقب
                    </Label>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 font-bold text-foreground">
                      {profile?.displayName || '---'}
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <Label className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      البريد الإلكتروني
                    </Label>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 font-bold text-foreground overflow-hidden text-ellipsis">
                      {profile?.email || '---'}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                      <Phone className="h-4 w-4" />
                      رقم الهاتف
                    </Label>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 font-bold text-foreground">
                      {profile?.phoneNumber || 'غير مسجل'}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      مديرية التربية
                    </Label>
                    <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100 font-bold text-foreground">
                      {profile?.directorate || 'غير مسجلة'}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Label className="text-sm font-bold flex items-center gap-2 text-muted-foreground">
                    <School className="h-4 w-4" />
                    المؤسسة التعليمية (الابتدائية)
                  </Label>
                  <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10 font-bold text-primary text-lg">
                    {profile?.school || 'غير مسجلة'}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100 flex items-start gap-3">
                  <div className="p-2 bg-amber-100 rounded-xl">
                    <Shield className="h-5 w-5 text-amber-600" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-amber-800 font-headline">ملاحظة هامة</p>
                    <p className="text-xs text-amber-700 font-tajawal leading-relaxed">
                      المعلومات أعلاه تُستخدم حصرياً لتوليد ترويسة مذكراتك بشكل احترافي. لتعديل هذه البيانات، يرجى التواصل مع الدعم الفني أو الترقية لباقة PRO.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-6 flex justify-between items-center">
                 <p className="text-xs text-muted-foreground font-tajawal">آخر تحديث: {formatDate(profile?.updatedAt)}</p>
                 <Button variant="ghost" className="text-primary font-bold gap-2">
                   طلب تعديل البيانات
                   <ChevronLeft className="h-4 w-4" />
                 </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

const ChevronLeft = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m15 18-6-6 6-6"/>
  </svg>
);
