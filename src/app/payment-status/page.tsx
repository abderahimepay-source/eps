"use client";

import { useSearchParams } from 'next/navigation';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState, Suspense } from 'react';

// The content component that uses the search params
function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get('payment');
  const credits = searchParams.get('credits');
  const checkoutId = searchParams.get('checkout_id');

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{
    title: string;
    description: string;
    icon: React.ReactNode | null;
    iconColor: string;
  }>({
    title: "",
    description: "",
    icon: null,
    iconColor: "",
  });

  useEffect(() => {
    // Simulate a small delay for better UX
    const timer = setTimeout(() => {
      setLoading(false);
      if (paymentStatus === 'success') {
        setMessage({
          title: "تم الدفع بنجاح!",
          description: `تم شحن حسابك بـ ${credits || 0} اعتماد. رقم المعاملة: ${checkoutId || 'غير متوفر'}.`,
          icon: <CheckCircle className="h-16 w-16 text-green-500" />,
          iconColor: "text-green-500",
        });
      } else if (paymentStatus === 'cancel') {
        setMessage({
          title: "تم إلغاء الدفع",
          description: "تم إلغاء عملية الدفع. يمكنك المحاولة مرة أخرى.",
          icon: <XCircle className="h-16 w-16 text-red-500" />,
          iconColor: "text-red-500",
        });
      } else {
        setMessage({
          title: "حالة دفع غير معروفة",
          description: "لم نتمكن من تحديد حالة الدفع الخاصة بك.",
          icon: <XCircle className="h-16 w-16 text-gray-400" />,
          iconColor: "text-gray-400",
        });
      }
    }, 1500); // 1.5 second delay

    return () => clearTimeout(timer);
  }, [paymentStatus, credits, checkoutId]);

  return (
    <Card className="w-full max-w-md text-center shadow-lg">
      <CardHeader className="flex flex-col items-center pt-8">
        {loading ? (
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        ) : (
          message.icon
        )}
        <CardTitle className={`mt-4 text-3xl font-bold font-headline ${message.iconColor}`}>
          {loading ? "جاري التحقق من حالة الدفع..." : message.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-muted-foreground font-tajawal text-lg">
          {!loading && message.description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pb-8">
        <Link href="/profile" passHref>
          <Button className="font-tajawal text-lg h-12 px-8">العودة إلى الملف الشخصي</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

// The Suspense fallback UI
function LoadingState() {
    return (
        <Card className="w-full max-w-md text-center shadow-lg">
            <CardHeader className="flex flex-col items-center pt-8">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
                <CardTitle className="mt-4 text-3xl font-bold font-headline">
                    جاري التحقق من حالة الدفع...
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-muted-foreground font-tajawal text-lg">
                    الرجاء الانتظار لحظات...
                </CardDescription>
            </CardContent>
             <CardFooter className="flex justify-center pb-8">
                <Button className="font-tajawal text-lg h-12 px-8" disabled>العودة إلى الملف الشخصي</Button>
            </CardFooter>
        </Card>
    );
}

// The main page component that provides the Suspense boundary
export default function PaymentStatusPage() {
  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-8rem)] py-12 px-4">
        <Suspense fallback={<LoadingState />}>
          <PaymentStatusContent />
        </Suspense>
      </div>
    </AppLayout>
  );
}
