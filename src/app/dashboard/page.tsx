"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { BookOpen, CreditCard, Sparkles, TrendingUp, History, Star } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const stats = [
  { label: 'إجمالي المذكرات', value: '42', icon: BookOpen, color: 'text-primary', bg: 'bg-primary/10' },
  { label: 'رصيد الاعتمادات', value: '24', icon: CreditCard, color: 'text-accent', bg: 'bg-accent/10' },
  { label: 'استخدام AI', value: '128', icon: Sparkles, color: 'text-purple-500', bg: 'bg-purple-100' },
  { label: 'نقاط التميز', value: '850', icon: Star, color: 'text-yellow-600', bg: 'bg-yellow-100' },
];

const data = [
  { name: 'أحد', count: 4 },
  { name: 'اثنين', count: 7 },
  { name: 'ثلاثاء', count: 5 },
  { name: 'أربعاء', count: 12 },
  { name: 'خميس', count: 8 },
];

export default function Dashboard() {
  return (
    <AppLayout>
      <div className="space-y-8 animate-in fade-in duration-500">
        <div>
          <h1 className="text-3xl font-bold font-headline mb-2">لوحة التحكم</h1>
          <p className="text-muted-foreground font-tajawal">مرحباً بك مجدداً يا أستاذ! إليك ملخص نشاطك البيداغوجي.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-none shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 flex items-center gap-4">
                <div className={cn("p-3 rounded-2xl", stat.bg)}>
                  <stat.icon className={cn("h-6 w-6", stat.color)} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground font-tajawal">{stat.label}</p>
                  <p className="text-2xl font-bold font-rajdhani">{stat.value}</p>
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
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip cursor={{ fill: '#f5f5f5' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                  <Bar dataKey="count" radius={[8, 8, 0, 0]} barSize={40}>
                    {data.map((entry, index) => (
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
                {[
                  { title: 'القفز الطويل - س4', date: 'منذ ساعتين', status: 'مكتمل' },
                  { title: 'ألعاب القوى - س1', date: 'يوم أمس', status: 'مسودة' },
                  { title: 'كرة اليد - س5', date: 'منذ 3 أيام', status: 'مكتمل' },
                  { title: 'الجمباز - س2', date: 'منذ أسبوع', status: 'مكتمل' },
                ].map((plan, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-background border hover:border-primary/30 transition-colors">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm font-tajawal">{plan.title}</span>
                      <span className="text-xs text-muted-foreground font-tajawal">{plan.date}</span>
                    </div>
                    <span className={cn(
                      "text-[10px] px-2 py-0.5 rounded-full",
                      plan.status === 'مكتمل' ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    )}>
                      {plan.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

import { cn } from "@/lib/utils";