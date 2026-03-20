"use client";

import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  FileText, 
  Calendar, 
  ChevronLeft, 
  ClipboardPenLine, 
  BookOpen,
  Loader2
} from "lucide-react";
import Link from 'next/link';
import { useFirebase, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { useState } from 'react';

export default function LessonPlansPage() {
  const { user, firestore } = useFirebase();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch real lesson plans from Firestore
  const plansQuery = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return query(
      collection(firestore, 'profiles', user.uid, 'lessonPlans'),
      orderBy('createdAt', 'desc')
    );
  }, [user, firestore]);

  const { data: plans, isLoading } = useCollection(plansQuery);

  const filteredPlans = plans?.filter(plan => 
    plan.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    plan.field?.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-start">
            <h1 className="text-2xl sm:text-3xl font-bold font-headline mb-1">مذكراتي</h1>
            <p className="text-sm sm:text-base text-muted-foreground font-tajawal">استعرض وعدل جميع مذكراتك المحفوظة.</p>
          </div>
          <Link href="/lesson-plans/create" className="hidden sm:block">
            <Button className="bg-accent hover:bg-accent/90 gap-2 h-12 px-6 shadow-lg">
              <Plus className="h-5 w-5" />
              مذكرة جديدة
            </Button>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              className="ps-10 h-11 bg-white" 
              placeholder="بحث في المذكرات..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" className="h-11 gap-2 bg-white">
            <Filter className="h-4 w-4" />
            تصفية
          </Button>
        </div>

        <div className="grid gap-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-muted-foreground font-tajawal">جاري تحميل مذكراتك...</p>
            </div>
          ) : filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <Link key={plan.id} href={`/lesson-plans/${plan.id}`}>
                <Card className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden bg-white">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
                      <div className="bg-primary/10 p-2.5 sm:p-3 rounded-xl group-hover:bg-primary group-hover:text-white transition-colors shrink-0">
                        <FileText className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-bold font-tajawal text-sm sm:text-lg truncate group-hover:text-primary transition-colors">{plan.title}</h3>
                        <div className="flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-1 mt-1 text-[10px] sm:text-sm text-muted-foreground font-tajawal">
                          <span className="flex items-center gap-1 shrink-0">
                            <ClipboardPenLine className="h-3 w-3" /> 
                            {plan.year?.replace('_', ' ')}
                          </span>
                          <span className="flex items-center gap-1 shrink-0">
                            <BookOpen className="h-3 w-3" /> 
                            {plan.field}
                          </span>
                          <span className="flex items-center gap-1 shrink-0">
                            <Calendar className="h-3 w-3" /> 
                            {plan.createdAt?.toDate().toLocaleDateString('ar-DZ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary shrink-0">
                        <ChevronLeft className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <div className="text-center py-16 sm:py-20 border-2 border-dashed rounded-2xl bg-muted/20">
              <div className="bg-muted p-4 rounded-full w-fit mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-bold font-headline mb-2">لا توجد مذكرات</h3>
              <p className="text-sm sm:text-base text-muted-foreground font-tajawal mb-6 px-4">ابدأ بإنشاء مذكرتك الأولى الآن باستخدام الذكاء الاصطناعي.</p>
              <Link href="/lesson-plans/create">
                <Button variant="outline" className="gap-2 bg-white">
                  <Plus className="h-4 w-4" />
                  إنشاء مذكرة
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
