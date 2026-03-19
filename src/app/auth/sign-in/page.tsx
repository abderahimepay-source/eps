"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { GraduationCap, ArrowRight, Loader2 } from "lucide-react";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFirebase } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { auth } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "تم تسجيل الدخول",
        description: "مرحباً بك مجدداً!",
      });
      router.push('/dashboard');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ في الدخول",
        description: "البريد الإلكتروني أو كلمة المرور غير صحيحة.",
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
              <GraduationCap className="h-8 w-8 text-primary-foreground" />
            </div>
            <span className="font-headline text-3xl font-bold text-primary">Modakira</span>
          </Link>
        </div>
        
        <Card className="border-none shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold font-headline">تسجيل الدخول</CardTitle>
            <CardDescription className="font-tajawal">
              مرحباً بك مجدداً في منصة المعلم الذكية
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">كلمة المرور</Label>
                  <Link href="#" className="text-xs text-primary hover:underline">نسيت كلمة المرور؟</Link>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="h-12" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "دخول"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">أو</span>
              </div>
            </div>
            <p className="text-center text-sm text-muted-foreground">
              ليس لديك حساب؟{" "}
              <Link href="/auth/sign-up" className="text-primary font-bold hover:underline">
                أنشئ حساباً الآن
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
