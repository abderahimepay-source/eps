"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BookOpen, CreditCard, Sparkles, TrendingUp, History, Star, ArrowLeft } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useFirebase, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit, doc } from 'firebase/firestore';
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Dashboard() {
  const { user, firestore } = useFirebase();

  // 1. Fetch User Profile for stats
  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

  // 2. Fetch Recent Lesson Plans
  const plansQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'profiles', user.uid, 'lessonPlans'),
      orderBy('createdAt', 'desc'),
      limit(4)
    );
  }, [user, firestore]);
  const { data: recentPlans } = useCollection(plansQuery);

  // 3. Fetch Usage Logs for token stats
  const logsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'profiles', user.uid, 'usage_logs'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
  }, [user, firestore]);
  const { data: logs } = useCollection(logsQuery);

  const totalTokens = logs?.reduce((acc, log) => acc + (log.tokensConsumed || 0), 0) || 0;

  const stats = [
    { label: 'اجمالي المذكرات المولدة بالذكاء الاصطناعي', value: profile?.totalLessonPlansCreated || 0, icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'رصيد الاعتمادات', value: profile?.credit_balance || 0, icon: CreditCard, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'إجمالي التوكنز', value: totalTokens.toLocaleString(), icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-100' },
  ];

  const chartData = [
    { name: 'أحد', count: 4 },
    { name: 'اثنين', count: 7 },
    { name: 'ثلاثاء', count: 5 },
    { name: 'أربعاء', count: 12 },
    { name: 'خميس', count: 8 },
  ];

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline mb-1">لوحة التحكم</h1>
            <p className="text-sm sm:text-base text-muted-foreground font-tajawal">مرحباً بك مجدداً يا {profile?.displayName || 'أستاذ'}!</p>
          </div>
          <Link href="/lesson-plans/create" className="lg:hidden">
            <Button className="bg-accent hover:bg-accent/90 w-full sm:w-auto h-11 gap-2">
              <Sparkles className="h-4 w-4" />
              إنشاء مذكرة
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-start gap-3 sm:gap-4">
                <div className={cn("p-2 sm:p-3 rounded-2xl shrink-0", stat.bg)}>
                  <stat.icon className={cn("h-5 w-5 sm:h-6 sm:w-6", stat.color)} />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-sm text-muted-foreground font-tajawal truncate">{stat.label}</p>
                  <p className="text-sm sm:text-xl font-bold font-rajdhani truncate">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 border-none shadow-sm">
            <CardHeader className="pb-2 sm:pb-6">
              <CardTitle className="flex items-center gap-2 font-headline text-lg sm:text-xl">
                <TrendingUp className="h-5 w-5 text-primary" />
                نشاط الأسبوع الحالي
              </CardTitle>
              <CardDescription className="font-tajawal text-xs sm:text-sm">عدد المذكرات المنشأة خلال الأيام الماضية</CardDescription>
            </CardHeader>
            <CardContent className="h-[250px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <XAxis dataKey="name" fontSize={12} />
                  <YAxis fontSize={12} />
                  <Tooltip cursor={{fill: 'transparent'}} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={24}>
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === 3 ? '#FF8033' : '#47CFD6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-lg sm:text-xl">
                <History className="h-5 w-5 text-primary" />
                آخر المذكرات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPlans?.length ? recentPlans.map((plan, i) => (
                  <Link key={i} href={`/lesson-plans/${plan.id}`}>
                    <div className="flex items-center justify-between p-3 mb-2 rounded-xl bg-background border hover:border-primary/30 transition-colors group">
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-xs sm:text-sm font-tajawal truncate group-hover:text-primary transition-colors">{plan.title}</span>
                        <span className="text-[10px] sm:text-xs text-muted-foreground font-tajawal">
                          {plan.createdAt?.toDate().toLocaleDateString('ar-DZ')}
                        </span>
                      </div>
                      <ArrowLeft className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                    </div>
                  </Link>
                )) : (
                  <p className="text-center py-8 text-muted-foreground text-sm font-tajawal">لا توجد مذكرات حالياً.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}
