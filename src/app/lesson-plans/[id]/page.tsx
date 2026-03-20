"use client";

import { use } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Download, 
  ArrowRight, 
  FileText, 
  Calendar, 
  ClipboardPenLine, 
  BookOpen, 
  Loader2,
  ExternalLink,
  User,
  School,
  Clock,
  CheckCircle2,
  Info
} from "lucide-react";
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";

export default function LessonPlanDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, firestore } = useFirebase();
  const { toast } = useToast();
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const memoizedDocRef = useMemoFirebase(() => {
    if (!user || !firestore || !id) return null;
    return doc(firestore, 'profiles', user.uid, 'lessonPlans', id);
  }, [user, firestore, id]);

  const { data: plan, isLoading } = useDoc(memoizedDocRef);

  // Fetch profile for the teacher's name and school in the header
  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

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
    toast({ 
      title: "تصدير إلى Google Drive", 
      description: "يرجى اختيار 'Save to Google Drive' من قائمة الوجهات (Destination) في نافذة الطباعة.",
    });
    setTimeout(() => {
      window.print();
    }, 500);
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 no-print">
          <Link href="/lesson-plans" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors self-start">
            <ArrowRight className="h-4 w-4" />
            <span className="font-tajawal">العودة للمذكرات</span>
          </Link>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none gap-2 border-primary text-primary hover:bg-primary/5" 
              onClick={handleExportToDrive}
            >
              <ExternalLink className="h-4 w-4" />
              تصدير لـ Drive
            </Button>
            <Button 
              className="flex-1 sm:flex-none gap-2 bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20" 
              onClick={handleDownloadPDF}
              disabled={isExporting}
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              تحميل PDF
            </Button>
          </div>
        </div>

        {/* Professional Lesson Plan Document */}
        <div 
          ref={printRef} 
          className="bg-white rounded-xl shadow-2xl overflow-hidden border border-border/50 print:shadow-none print:border-none print:rounded-none"
          id="lesson-plan-document"
        >
          {/* Official Document Header */}
          <header className="p-8 sm:p-10 bg-gradient-to-br from-gray-50 to-white border-b relative">
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-primary no-print"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Institutional Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary font-bold">
                  <School className="h-5 w-5" />
                  <span className="font-headline text-lg">{profile?.school || "المؤسسة التعليمية"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-tajawal">
                  <User className="h-4 w-4" />
                  <span>أ/{profile?.displayName || "الأستاذ"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-tajawal">
                  <Calendar className="h-4 w-4" />
                  <span>تاريخ: {plan.createdAt?.toDate().toLocaleDateString('ar-DZ')}</span>
                </div>
              </div>

              {/* Title Central */}
              <div className="text-center space-y-2">
                <Badge variant="outline" className="border-primary text-primary font-bold font-tajawal px-4 py-1">
                  التربية البدنية والرياضية
                </Badge>
                <h1 className="text-3xl font-bold font-headline text-gray-900 leading-tight">
                  مذكـرة تربويـة
                </h1>
                <p className="text-muted-foreground font-tajawal text-sm">مستخرجة من منصة Modakira</p>
              </div>

              {/* Lesson Metadata */}
              <div className="bg-white p-4 rounded-xl border border-dashed border-primary/30 space-y-2 shadow-sm">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-tajawal">المستوى:</span>
                  <span className="font-bold text-primary">{plan.year}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-tajawal">الميدان:</span>
                  <span className="font-bold text-primary">{plan.field}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground font-tajawal">الرقم التسلسلي:</span>
                  <span className="font-mono text-accent">#{plan.id.slice(-6).toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <h2 className="text-xl font-bold font-headline text-primary">الموضوع: {plan.title}</h2>
            </div>
          </header>

          <CardContent className="p-8 sm:p-12 space-y-12 text-start">
            {/* Objectives Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3 pb-2 border-b-2 border-primary/20">
                <div className="bg-primary/10 p-2.5 rounded-xl">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold font-headline text-gray-800">الأهداف الإجرائية (SMART)</h3>
              </div>
              
              <div className="grid gap-4 ps-2">
                {plan.objectives?.map((obj: string, i: number) => (
                  <div key={i} className="flex gap-4 items-start group">
                    <div className="h-7 w-7 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-xs font-bold transition-colors group-hover:bg-primary group-hover:text-white">
                      {i + 1}
                    </div>
                    <div className="p-4 rounded-2xl bg-gray-50/50 border border-transparent hover:border-primary/20 hover:bg-white transition-all w-full">
                      <p className="font-tajawal text-gray-700 leading-relaxed">{obj}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Stages Section */}
            <div className="space-y-10">
              {[
                { 
                  title: 'المرحلة التحضيرية', 
                  time: '10-15 د',
                  content: plan.stages.introductory_stage, 
                  color: 'primary',
                  icon: Clock
                },
                { 
                  title: 'المرحلة التعلمية الرئيسية', 
                  time: '25-30 د',
                  content: plan.stages.building_stage, 
                  color: 'accent',
                  icon: Info
                },
                { 
                  title: 'المرحلة الختامية', 
                  time: '5-10 د',
                  content: plan.stages.final_stage, 
                  color: 'muted-foreground',
                  icon: CheckCircle2
                }
              ].map((stage, idx) => {
                const isPrimary = stage.color === 'primary';
                const isAccent = stage.color === 'accent';

                return (
                  <section key={idx} className="space-y-6 relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "h-10 w-10 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shrink-0",
                          isPrimary ? "bg-primary" : isAccent ? "bg-accent" : "bg-gray-400"
                        )}>
                          {idx + 1}
                        </div>
                        <h3 className="text-xl font-bold font-headline text-gray-900">{stage.title}</h3>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-tajawal text-muted-foreground bg-gray-100 px-3 py-1 rounded-full">
                        <stage.icon className="h-4 w-4" />
                        <span>المدة: {stage.time}</span>
                      </div>
                    </div>

                    <div className={cn(
                      "p-8 rounded-3xl border-r-8 shadow-sm font-tajawal text-gray-700 leading-loose whitespace-pre-wrap relative overflow-hidden",
                      isPrimary ? "bg-primary/5 border-primary" : isAccent ? "bg-accent/5 border-accent" : "bg-gray-50 border-gray-300"
                    )}>
                      {/* Sub-section patterns highlighting (Optional visual improvement) */}
                      <div className="relative z-10">
                        {stage.content}
                      </div>
                      
                      {/* Background decorative watermark */}
                      <div className="absolute -bottom-6 -left-6 opacity-[0.03] select-none no-print">
                        <stage.icon className="h-32 w-32" />
                      </div>
                    </div>
                  </section>
                )
              })}
            </div>

            {/* Formal Footer Signatures */}
            <footer className="pt-20 grid grid-cols-2 gap-12 text-center mt-12 border-t-2 border-dashed border-gray-200">
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="font-bold font-headline text-gray-900 text-lg underline underline-offset-8 decoration-primary/30">إمضاء الأستاذ</p>
                  <p className="text-xs text-muted-foreground font-tajawal">{profile?.displayName}</p>
                </div>
                <div className="h-24 border border-gray-100 rounded-2xl bg-gray-50/30 flex items-center justify-center text-[10px] text-gray-300 italic">
                  مكان التوقيع
                </div>
              </div>
              <div className="space-y-8">
                <div className="space-y-2">
                  <p className="font-bold font-headline text-gray-900 text-lg underline underline-offset-8 decoration-accent/30">تأشيرة السيد المدير</p>
                  <p className="text-xs text-muted-foreground font-tajawal">ختم المؤسسة</p>
                </div>
                <div className="h-24 border border-gray-100 rounded-2xl bg-gray-50/30 flex items-center justify-center text-[10px] text-gray-300 italic">
                  مكان الختم والتوقيع
                </div>
              </div>
            </footer>
          </CardContent>

          {/* Document Footer */}
          <div className="bg-gray-50 p-4 border-t flex items-center justify-between text-[10px] text-muted-foreground font-tajawal">
            <span>تم الإنشاء بواسطة Modakira AI - الجزائر</span>
            <span className="dir-ltr font-rajdhani">{new Date().getFullYear()} © Modakira.dz</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
