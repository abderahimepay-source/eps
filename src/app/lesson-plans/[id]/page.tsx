
"use client";

import { use } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  Share2, 
  Printer, 
  ArrowRight, 
  FileText, 
  Calendar, 
  GraduationCap, 
  BookOpen, 
  Loader2,
  ExternalLink
} from "lucide-react";
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';

export default function LessonPlanDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { user, firestore } = useFirebase();
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const memoizedDocRef = useMemoFirebase(() => {
    if (!user || !firestore || !id) return null;
    return doc(firestore, 'profiles', user.uid, 'lessonPlans', id);
  }, [user, firestore, id]);

  const { data: plan, isLoading } = useDoc(memoizedDocRef);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setIsExporting(true);
    
    try {
      const element = printRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
      });
      
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${plan?.title || 'lesson-plan'}.pdf`);
      
      toast({ title: "نجاح", description: "تم تحميل ملف PDF بنجاح" });
    } catch (error) {
      console.error('PDF Generation Error:', error);
      toast({ title: "خطأ", description: "فشل إنشاء ملف PDF", variant: "destructive" });
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportToDrive = () => {
    // Note: A full Google Drive integration requires OAuth. 
    // This provides a "printable" version that the user can "Save to Drive" via Chrome's print dialog.
    window.print();
  };

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
          <p className="text-muted-foreground font-tajawal">جاري تحميل تفاصيل المذكرة...</p>
        </div>
      </AppLayout>
    );
  }

  if (!plan) {
    return (
      <AppLayout>
        <div className="text-center py-20 space-y-4">
          <h2 className="text-2xl font-bold font-headline">المذكرة غير موجودة</h2>
          <Link href="/lesson-plans">
            <Button variant="outline">العودة لقائمة المذكرات</Button>
          </Link>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 pb-20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/lesson-plans" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors self-start">
            <ArrowRight className="h-4 w-4" />
            <span className="font-tajawal">العودة للمذكرات</span>
          </Link>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none gap-2" 
              onClick={handleExportToDrive}
            >
              <ExternalLink className="h-4 w-4" />
              تصدير لـ Drive
            </Button>
            <Button 
              className="flex-1 sm:flex-none gap-2 bg-accent hover:bg-accent/90" 
              onClick={handleDownloadPDF}
              disabled={isExporting}
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              تحميل PDF
            </Button>
          </div>
        </div>

        {/* Content Area for Export/Display */}
        <div ref={printRef} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-border/50">
          <header className="bg-primary/10 p-6 sm:p-10 border-b relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent"></div>
            <div className="flex flex-col md:flex-row justify-between gap-6 relative z-10">
              <div className="space-y-4">
                <Badge variant="secondary" className="bg-primary/20 text-primary-foreground text-xs px-3 py-1">
                  مذكرة بيداغوجية ذكية
                </Badge>
                <h1 className="text-2xl sm:text-4xl font-bold font-headline leading-tight text-primary">
                  {plan.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-tajawal">
                  <span className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-accent" />
                    {plan.year}
                  </span>
                  <span className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-accent" />
                    {plan.field}
                  </span>
                  <span className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-accent" />
                    {plan.createdAt?.toDate().toLocaleDateString('ar-DZ')}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <div className="text-center p-3 bg-white/50 backdrop-blur rounded-2xl border border-white/50 shadow-sm">
                  <p className="text-[10px] text-muted-foreground font-tajawal">رقم المذكرة</p>
                  <p className="font-bold font-rajdhani">#{plan.id.slice(-4).toUpperCase()}</p>
                </div>
              </div>
            </div>
          </header>

          <CardContent className="p-6 sm:p-10 space-y-10">
            {/* Objectives Section */}
            <section className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 p-2 rounded-lg">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <h2 className="text-xl font-bold font-headline">الأهداف الإجرائية (SMART)</h2>
              </div>
              <div className="grid gap-3 ps-4 border-r-2 border-accent/20">
                {plan.objectives?.map((obj: string, i: number) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="h-5 w-5 rounded-full bg-accent/10 text-accent flex items-center justify-center shrink-0 text-[10px] font-bold mt-0.5">
                      {i + 1}
                    </div>
                    <p className="font-tajawal text-sm sm:text-base leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </section>

            <Separator />

            {/* Stages Section */}
            <div className="space-y-12">
              {[
                { 
                  title: 'المرحلة التحضيرية (10-15 د)', 
                  content: plan.stages.introductory_stage, 
                  color: 'border-blue-500', 
                  bg: 'bg-blue-50/30' 
                },
                { 
                  title: 'المرحلة التعلمية الرئيسية (25-30 د)', 
                  content: plan.stages.building_stage, 
                  color: 'border-primary', 
                  bg: 'bg-primary/5' 
                },
                { 
                  title: 'المرحلة الختامية (5-10 د)', 
                  content: plan.stages.final_stage, 
                  color: 'border-orange-500', 
                  bg: 'bg-orange-50/30' 
                }
              ].map((stage, idx) => (
                <section key={idx} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-8 w-8 rounded-full border-2 ${stage.color} flex items-center justify-center font-bold text-sm shrink-0`}>
                      {idx + 1}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold font-headline">{stage.title}</h3>
                  </div>
                  <div className={`p-6 rounded-3xl border-r-4 ${stage.color} ${stage.bg} font-tajawal text-sm sm:text-base leading-loose whitespace-pre-wrap shadow-sm`}>
                    {stage.content}
                  </div>
                </section>
              ))}
            </div>

            {/* Footer Signatures (For professional look) */}
            <footer className="pt-20 grid grid-cols-2 gap-8 text-center border-t border-dashed mt-12">
              <div className="space-y-12">
                <p className="font-bold font-headline text-muted-foreground underline decoration-accent/30 underline-offset-4">إمضاء الأستاذ</p>
                <div className="h-10"></div>
              </div>
              <div className="space-y-12">
                <p className="font-bold font-headline text-muted-foreground underline decoration-primary/30 underline-offset-4">تأشيرة السيد المدير</p>
                <div className="h-10"></div>
              </div>
            </footer>
          </CardContent>
        </div>
      </div>
    </AppLayout>
  );
}
