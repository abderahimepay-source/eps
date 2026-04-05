
"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BookOpen, CreditCard, Sparkles, TrendingUp, Zap } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useFirebase, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit, doc, where } from 'firebase/firestore';
import { cn } from "@/lib/utils";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useMemo } from 'react';

const ARABIC_DAYS = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

export default function Dashboard() {
  const { user, firestore } = useFirebase();

  // 1. Fetch User Profile for stats
  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

  // 2. Fetch Usage Logs for the last 7 days
  const logsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    return query(
      collection(firestore, 'profiles', user.uid, 'usage_logs'),
      where('createdAt', '>=', sevenDaysAgo),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);
  const { data: logs } = useCollection(logsQuery);

  const totalTokens = logs?.reduce((acc, log) => acc + (log.tokensConsumed || 0), 0) || 0;

  // 3. Process logs for the chart
  const chartData = useMemo(() => {
    const data = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(now.getDate() - i);
      const dayName = ARABIC_DAYS[date.getDay()];
      const dayTokens = logs?.filter(log => {
        const logDate = log.createdAt?.toDate();
        return logDate && logDate.toDateString() === date.toDateString();
      }).reduce((sum, log) => sum + (log.tokensConsumed || 0), 0) || 0;

      data.push({
        name: dayName,
        count: dayTokens,
      });
    }
    return data;
  }, [logs]);

  const stats = [
    { label: 'إجمالي المذكرات المولدة', value: profile?.totalLessonPlansCreated || 0, icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'رصيد الاعتمادات', value: profile?.credit_balance || 0, icon: CreditCard, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'التوكنز المستهلك (أسبوعياً)', value: totalTokens.toLocaleString(), icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-100' },
  ];

  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold font-headline mb-1">لوحة التحكم</h1>
            <p className="text-sm text-muted-foreground font-tajawal">مرحباً {profile?.displayName || 'أستاذ'}، كيف يمكننا مساعدتك اليوم؟</p>
          </div>
          <Link href="/lesson-plans/create">
            <Button className="bg-accent hover:bg-accent/90 w-full sm:w-auto h-11 gap-2">
              <Zap className="h-4 w-4" />
              إنشاء مذكرة الآن
            </Button>
          </Link>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground font-tajawal">{stat.label}</p>
                  <p className="text-xl font-bold font-rajdhani">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-none shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-lg">
              <TrendingUp className="h-5 w-5 text-primary" />
              نشاط استهلاك الذكاء الاصطناعي
            </CardTitle>
            <CardDescription className="font-tajawal text-xs">معدل استهلاك التوكنز خلال آخر 7 أيام</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="name" fontSize={12} />
                <Tooltip 
                  cursor={{fill: 'transparent'}} 
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2 border rounded-lg shadow-sm font-tajawal text-xs">
                          <p className="font-bold">{payload[0].payload.name}</p>
                          <p className="text-primary">التوكنز: {payload[0].value.toLocaleString()}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index === 6 ? '#FF8033' : '#47CFD6'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
