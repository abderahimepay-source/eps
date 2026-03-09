"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BookOpen, CreditCard, Sparkles, TrendingUp, History, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useFirebase, useDoc, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, limit, doc } from 'firebase/firestore';
import { cn } from "@/lib/utils";

export default function Dashboard() {
  const { user, firestore } = useFirebase();

  // 1. Fetch User Profile for stats
  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

  // 2. Fetch Recent Lesson Plans
  const plansQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'lessonPlans'),
      orderBy('createdAt', 'desc'),
      limit(4)
    );
  }, [user, firestore]);
  const { data: recentPlans } = useCollection(plansQuery);

  // 3. Fetch Usage Logs for token stats
  const logsQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'users', user.uid, 'usageLogs'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
  }, [user, firestore]);
  const { data: logs } = useCollection(logsQuery);

  const totalTokens = logs?.reduce((acc, log) => acc + (log.tokensConsumed || 0), 0) || 0;

  const stats = [
    { label: 'إجمالي المذكرات', value: profile?.totalLessonPlansCreated || 0, icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
    { label: 'رصيد الاعتمادات', value: profile?.creditBalance || 0, icon: CreditCard, color: 'text-accent', bg: 'bg-accent/10' },
    { label: 'إجمالي التوكنز', value: totalTokens.toLocaleString(), icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-100' },
    { label: 'الاسم', value: profile?.displayName || '---', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
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
        <div>
          <h1 className="text-3xl font-bold font-headline mb-2">لوحة التحكم</h1>
          <p className="text-muted-foreground font-tajawal">مرحباً بك مجدداً يا {profile?.displayName || 'أستاذ'}! إليك ملخص نشاطك البيداغوجي.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm text-muted-foreground font-tajawal truncate">{stat.label}</p>
                  <p className="text-xl font-bold font-rajdhani truncate">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
          <Card className="lg:col-span-4 border-none shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <TrendingUp className="h-5 w-5 text-primary" />
                نشاط الأسبوع الحالي
              </CardTitle>
              <CardDescription className="font-tajawal">عدد المذكرات المنشأة خلال الأيام الماضية</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: '#f5f5f5' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
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
              <CardTitle className="flex items-center gap-2 font-headline">
                <History className="h-5 w-5 text-primary" />
                آخر المذكرات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPlans?.length ? recentPlans.map((plan, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border hover:border-primary/30 transition-colors">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-sm font-tajawal truncate">{plan.title}</span>
                      <span className="text-xs text-muted-foreground font-tajawal">
                        {plan.createdAt?.toDate().toLocaleDateString('ar-DZ')}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                      مكتمل
                    </span>
                  </div>
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
