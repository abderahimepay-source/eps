
"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
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
  LogOut,
  Pencil,
  Loader2
} from "lucide-react";
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { signOut, updateProfile } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const { user, firestore, auth } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    displayName: '',
    school: '',
    phoneNumber: '',
    directorate: ''
  });

  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

  // Sync form data with profile data when it loads
  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || '',
        school: profile.school || '',
        phoneNumber: profile.phoneNumber || '',
        directorate: profile.directorate || ''
      });
    }
  }, [profile]);

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/');
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !profileRef) return;

    setIsUpdating(true);
    try {
      // 1. Update Firestore Document
      await updateDoc(profileRef, {
        ...formData,
        updatedAt: serverTimestamp()
      });

      // 2. Update Auth Profile Display Name
      await updateProfile(user, {
        displayName: formData.displayName
      });

      toast({
        title: "تم التحديث",
        description: "تمت تحديث بياناتك الشخصية بنجاح.",
      });
      setIsEditOpen(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "تعذر تحديث البيانات. يرجى المحاولة لاحقاً.",
      });
    } finally {
      setIsUpdating(false);
    }
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
            <Link href="/pricing">
              <Button className="bg-accent hover:bg-accent/90 h-11 px-6 font-bold shadow-lg shadow-accent/20">
                شحن الرصيد الآن
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
                  الرصيد وعمليات الشحن
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
                  <p className="text-xs font-bold text-muted-foreground border-b pb-2">مميزات المنصة:</p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-tajawal text-foreground/80">
                      <Check className="h-4 w-4 text-green-500 shrink-0" />
                      <span>مذكرات ذكية متوافقة مع المنهاج</span>
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
              <CardFooter className="bg-muted/10 p-4 border-t">
                <Link href="/pricing" className="w-full">
                  <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5 font-bold">
                    استكشف باقات الشحن
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Settings Column */}
          <div className="md:col-span-2 space-y-6">
            <Card className="border-none shadow-sm bg-white">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="font-headline text-xl flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    المعلومات المهنية والشخصية
                  </CardTitle>
                  <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Pencil className="h-4 w-4" />
                        تعديل
                      </Button>
                    </DialogTrigger>
                    <DialogContent dir="rtl" className="rounded-2xl sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle className="font-headline">تعديل الملف الشخصي</DialogTitle>
                        <DialogDescription className="font-tajawal">
                          حدث معلوماتك المهنية التي تظهر في المذكرات.
                        </DialogDescription>
                      </DialogHeader>
                      <form onSubmit={handleUpdateProfile} className="space-y-4 py-4">
                        <div className="space-y-2">
                          <Label htmlFor="displayName">الاسم واللقب</Label>
                          <Input 
                            id="displayName" 
                            value={formData.displayName} 
                            onChange={(e) => setFormData({...formData, displayName: e.target.value})} 
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phoneNumber">رقم الهاتف</Label>
                          <Input 
                            id="phoneNumber" 
                            value={formData.phoneNumber} 
                            onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})} 
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="school">المؤسسة التعليمية</Label>
                          <Input 
                            id="school" 
                            value={formData.school} 
                            onChange={(e) => setFormData({...formData, school: e.target.value})} 
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="directorate">مديرية التربية</Label>
                          <Input 
                            id="directorate" 
                            value={formData.directorate} 
                            onChange={(e) => setFormData({...formData, directorate: e.target.value})} 
                            required
                          />
                        </div>
                        <DialogFooter className="gap-2">
                          <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>إلغاء</Button>
                          <Button type="submit" className="bg-primary hover:bg-primary/90" disabled={isUpdating}>
                            {isUpdating ? <Loader2 className="h-4 w-4 animate-spin me-2" /> : null}
                            حفظ التغييرات
                          </Button>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
                <CardDescription className="font-tajawal">هذه المعلومات تظهر تلقائياً في ترويسة مذكراتك البيداغوجية.</CardDescription>
              </CardHeader>
              <CardFooter className="border-t pt-6 flex justify-between items-center">
                 <p className="text-xs text-muted-foreground font-tajawal">آخر تحديث: {formatDate(profile?.updatedAt)}</p>
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

    