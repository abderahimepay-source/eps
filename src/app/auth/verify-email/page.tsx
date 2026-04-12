
"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ClipboardPenLine, MailCheck, ArrowRight, Loader2 } from "lucide-react";
import { useFirebase } from '@/firebase';
import { sendEmailVerification } from 'firebase/auth';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export default function VerifyEmailPage() {
  const { user } = useFirebase();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleResend = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await sendEmailVerification(user);
      toast({
        title: "تم إرسال الرابط",
        description: "تفقد بريدك الإلكتروني الآن.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "خطأ",
        description: "تعذر إرسال الرابط، يرجى المحاولة لاحقاً.",
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
        
        <Card className="border-none shadow-2xl text-center">
          <CardHeader className="pt-10">
            <div className="bg-primary/10 p-4 rounded-full w-fit mx-auto mb-4">
              <MailCheck className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold font-headline">تحقق من بريدك!</CardTitle>
            <CardDescription className="font-tajawal text-lg">
              لقد أرسلنا رابط تفعيل إلى بريدك الإلكتروني.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground font-tajawal text-sm leading-relaxed">
              يرجى النقر على الرابط الموجود في الرسالة لتفعيل حسابك والبدء في إنشاء مذكراتك البيداغوجية. إذا لم تجد الرسالة، تحقق من مجلد "البريد المزعج" (Spam).
            </p>
            <Button 
              variant="outline" 
              className="w-full h-12" 
              onClick={handleResend}
              disabled={loading}
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin me-2" /> : null}
              إعادة إرسال رابط التفعيل
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center border-t py-6">
            <Link href="/dashboard" className="text-sm text-primary font-bold hover:underline flex items-center gap-2">
              الذهاب إلى لوحة التحكم
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
