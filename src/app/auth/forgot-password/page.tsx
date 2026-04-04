"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ClipboardPenLine, ArrowRight, Loader2, MailCheck } from "lucide-react";
import { useState } from 'react';
import { useFirebase } from '@/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { useToast } from '@/hooks/use-toast';

export default function ForgotPasswordPage() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const { auth } = useFirebase();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await sendPasswordResetEmail(auth, email);
      setIsSubmitted(true);
      toast({
        title: "تم إرسال الرابط",
        description: "يرجى التحقق من بريدك الإلكتروني لإعادة تعيين كلمة المرور.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "تعذر إرسال رابط استعادة كلمة المرور. تأكد من صحة البريد الإلكتروني.",
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
          {!isSubmitted ? (
            <>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold font-headline">استعادة كلمة المرور</CardTitle>
                <CardDescription className="font-tajawal">
                  أدخل بريدك الإلكتروني وسنرسل لك رابطاً لتعيين كلمة مرور جديدة
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
                  <Button type="submit" className="w-full h-12 text-lg bg-primary hover:bg-primary/90" disabled={loading}>
                    {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "إرسال رابط الاستعادة"}
                  </Button>
                </form>
              </CardContent>
            </>
          ) : (
            <CardContent className="pt-10 pb-10 text-center space-y-4">
              <div className="bg-green-100 p-4 rounded-full w-fit mx-auto">
                <MailCheck className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-xl font-bold font-headline">تحقق من بريدك!</h3>
              <p className="text-muted-foreground font-tajawal">
                لقد أرسلنا رابطاً إلى <strong>{email}</strong>. اتبع التعليمات الواردة في الرسالة لإعادة تعيين كلمة المرور.
              </p>
              <Button variant="outline" className="w-full h-11" onClick={() => setIsSubmitted(false)}>
                إعادة المحاولة ببريد آخر
              </Button>
            </CardContent>
          )}
          <CardFooter className="flex justify-center border-t py-4">
            <Link href="/auth/sign-in" className="text-sm text-primary font-bold hover:underline flex items-center gap-2">
              <ArrowRight className="h-4 w-4" />
              العودة لتسجيل الدخول
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
