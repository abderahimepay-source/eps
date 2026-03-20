"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ClipboardPenLine, ArrowRight, Loader2 } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';

export default function SignUpPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [school, setSchool] = useState('');
  
  const { auth, firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const displayName = `${firstName} ${lastName}`;

      // 2. Update Auth Profile
      await updateProfile(user, { displayName });

      // 3. Create UserProfile Document in Firestore
      const profileRef = doc(firestore, 'profiles', user.uid);
      await setDoc(profileRef, {
        uid: user.uid,
        email: user.email,
        displayName: displayName,
        school: school,
        directorate: '', // Can be updated later in profile settings
        isPro: false,
        credit_balance: 10, // Starting credits for new users
        totalLessonPlansCreated: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      toast({
        title: "تم إنشاء الحساب بنجاح",
        description: "مرحباً بك في Modakira!",
      });

      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ في التسجيل",
        description: error.message || "فشل إنشاء الحساب. حاول مرة أخرى.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary p-2 rounded-xl shadow-lg">
              <ClipboardPenLine className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="font-headline text-3xl font-bold text-primary">Modakira</span>
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
                  <Input 
                    id="firstName" 
                    required 
                    className="h-12" 
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">اللقب</Label>
                  <Input 
                    id="lastName" 
                    required 
                    className="h-12" 
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="school">المؤسسة التعليمية</Label>
                <Input 
                  id="school" 
                  placeholder="مثلاً: مدرسة العربي بن مهيدي" 
                  required 
                  className="h-12" 
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="example@email.com" 
                  required 
                  className="h-12" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="h-12" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-accent hover:bg-accent/90" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "إنشاء حساب"}
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
