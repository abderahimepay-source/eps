"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Search, Filter, MoreVertical, FileText, Calendar, ChevronLeft } from "lucide-react";
import Link from 'next/link';

const MOCK_PLANS = [
  { id: '1', title: 'تنسيق الحركات الكبرى', year: 'السنة الأولى', field: 'الوضعيات والتنقلات', date: '2024/05/12', credits: 2 },
  { id: '2', title: 'الرمي من الثبات', year: 'السنة الثالثة', field: 'الحركات القاعدية', date: '2024/05/10', credits: 2 },
  { id: '3', title: 'تنظيم الفضاء والمشاركة', year: 'السنة الثانية', field: 'الهيكلة والبناء', date: '2024/05/08', credits: 2 },
  { id: '4', title: 'القفز الطويل والتوازن', year: 'السنة الرابعة', field: 'الوضعيات والتنقلات', date: '2024/05/05', credits: 2 },
];

export default function LessonPlansPage() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold font-headline mb-2">مذكراتي</h1>
            <p className="text-muted-foreground font-tajawal">استعرض وعدل جميع مذكراتك المحفوظة.</p>
          </div>
          <Link href="/lesson-plans/create">
            <Button className="bg-accent hover:bg-accent/90 gap-2 h-12 px-6">
              <Plus className="h-5 w-5" />
              مذكرة جديدة
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="ps-10 h-11" placeholder="بحث في المذكرات..." />
          </div>
          <Button variant="outline" className="h-11 gap-2">
            <Filter className="h-4 w-4" />
            تصفية
          </Button>
        </div>

        <div className="grid gap-4">
          {MOCK_PLANS.map((plan) => (
            <Card key={plan.id} className="border-none shadow-sm hover:shadow-md transition-all group">
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold font-tajawal text-lg">{plan.title}</h3>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground font-tajawal">
                      <span className="flex items-center gap-1"><GraduationCap className="h-3 w-3" /> {plan.year}</span>
                      <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {plan.field}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {plan.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Link href={`/lesson-plans/${plan.id}`}>
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
                      <ChevronLeft className="h-5 w-5" />
                    </Button>
                  </Link>
                  <Button variant="ghost" size="icon" className="text-muted-foreground">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

import { GraduationCap } from 'lucide-react';