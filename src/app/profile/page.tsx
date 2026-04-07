
"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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
  Check, 
  Mail, 
  Calendar,
  CreditCard,
  FileText,
  LogOut,
  Pencil,
  Loader2,
  TrendingUp,
  ShieldCheck,
  Star
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

  const [formData, setFormData] = useState({
    displayName: ''
  });

  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

  useEffect(() => {
    if (profile) {
      setFormData({
        displayName: profile.displayName || ''
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
      await updateDoc(profileRef, {
        ...formData,
        updatedAt: serverTimestamp()
      });

      await updateProfile(user, {
        displayName: formData.displayName
      });

      toast({
        title: "تم التحديث",
        description: "تمت تحديث بياناتك بنجاح.",
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
      <div className="max-w-5xl mx-auto space-y-6 pb-12">
        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary to-primary/60 relative">
             <div className="absolute -bottom-12 right-8">
                <div className="h-24 w-24 rounded-3xl bg-white p-1 shadow-xl">
                   <div className="h-full w-full rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                      <User className="h-12 w-12" />
                   </div>
                </div>
             </div>
          </div>
          
          <div className="pt-16 pb-8 px-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-bold font-headline">{profile?.displayName || 'جاري التحميل...'}</h1>
                {profile?.isPro && (
                  <Badge className="bg-accent hover:bg-accent/90 gap-1 px-3 py-1">
                    <Star className="h-3 w-3 fill-current" />
                    محترف PRO
                  </Badge>
                )}
              </div>
              <p className="text-muted-foreground font-tajawal flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {profile?.email}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="rounded-xl h-11 px-6 gap-2">
                    <Pencil className="h-4 w-4" />
                    تعديل الاسم
                  </Button>
                </DialogTrigger>
                <DialogContent dir="rtl" className="rounded-3xl sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-headline text-xl">تعديل الملف الشخصي</DialogTitle>
                    <DialogDescription className="font-tajawal">
                      قم بتحديث اسم المستخدم الخاص بك.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleUpdateProfile} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="displayName">اسم المستخدم</Label>
                      <Input id="displayName" value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} required className="rounded-xl h-11" />
                    </div>
                    <DialogFooter className="gap-2 mt-4">
                      <Button type="button" variant="ghost" onClick={() => setIsEditOpen(false)}>إلغاء</Button>
                      <Button type="submit" className="bg-primary hover:bg-primary/90 px-8 rounded-xl" disabled={isUpdating}>
                        {isUpdating ? <Loader2 className="h-4 w-4 animate-spin me-2" /> : "حفظ التغييرات"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="rounded-xl h-11 px-6 border-destructive text-destructive hover:bg-destructive/5 gap-2" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                خروج
              </Button>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="border-none shadow-sm md:col-span-2 overflow-hidden bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6 border-b">
               <div className="space-y-1">
                  <CardTitle className="font-headline text-lg flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-primary" />
                    رصيد الاعتمادات الحالي
                  </CardTitle>
               </div>
               <Link href="/pricing">
                  <Button className="bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 rounded-xl">شحن الآن</Button>
               </Link>
            </CardHeader>
            <CardContent className="p-0">
               <div className="flex flex-col sm:flex-row items-center justify-around p-10 gap-8">
                  <div className="text-center space-y-1">
                    <p className="text-5xl font-bold font-rajdhani text-primary">{profile?.credit_balance || 0}</p>
                    <p className="text-sm text-muted-foreground font-tajawal">اعتماد متاح</p>
                  </div>
                  <div className="h-20 w-px bg-border hidden sm:block"></div>
                  <div className="space-y-4 w-full sm:w-auto">
                    <div className="flex items-center gap-4">
                       <div className="bg-primary/10 p-2 rounded-lg">
                          <TrendingUp className="h-5 w-5 text-primary" />
                       </div>
                       <div>
                          <p className="text-xs text-muted-foreground font-tajawal">معدل الاستهلاك</p>
                          <p className="font-bold font-rajdhani">25 / أسبوع</p>
                       </div>
                    </div>
                    <div className="flex items-center gap-4">
                       <div className="bg-purple-100 p-2 rounded-lg">
                          <ShieldCheck className="h-5 w-5 text-purple-600" />
                       </div>
                       <div>
                          <p className="text-xs text-muted-foreground font-tajawal">حالة الحساب</p>
                          <p className="font-bold font-tajawal text-sm">{profile?.isPro ? 'مفعل (احترافي)' : 'نشط (أساسي)'}</p>
                       </div>
                    </div>
                  </div>
               </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-white overflow-hidden">
             <CardHeader className="bg-muted/30 border-b">
                <CardTitle className="font-headline text-lg">إحصائيات سريعة</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-xl">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-tajawal text-sm">إجمالي المذكرات</span>
                   </div>
                   <span className="font-bold font-rajdhani text-lg">{profile?.totalLessonPlansCreated || 0}</span>
                </div>

                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="bg-accent/10 p-2 rounded-xl">
                        <Calendar className="h-5 w-5 text-accent" />
                      </div>
                      <span className="font-tajawal text-sm">تاريخ الانضمام</span>
                   </div>
                   <span className="font-bold text-xs">{formatDate(profile?.createdAt)}</span>
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
