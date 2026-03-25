
"use client";

import { use } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { 
  Download, 
  ArrowRight, 
  Calendar, 
  Loader2,
  ExternalLink,
  User,
  School,
  Clock,
  CheckCircle2,
  Info,
  Trash2
} from "lucide-react";
import { useFirebase, useDoc, useMemoFirebase, deleteDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import Link from 'next/link';
import { useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { useToast } from '@/hooks/use-toast';
import { cn } from "@/lib/utils";
import { useRouter } from 'next/navigation';

export default function LessonPlanDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user, firestore } = useFirebase();
  const { toast } = useToast();
  const router = useRouter();
  const printRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [pdfMode, setPdfMode] = useState(false);

  const memoizedDocRef = useMemoFirebase(() => {
    if (!user || !firestore || !id) return null;
    return doc(firestore, 'profiles', user.uid, 'lessonPlans', id);
  }, [user, firestore, id]);

  const { data: plan, isLoading } = useDoc(memoizedDocRef);

  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;
    setIsExporting(true);
    setPdfMode(true);
    
    setTimeout(async () => {
      try {
        const element = printRef.current!;
        const canvas = await html2canvas(element, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });
        
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
        });
        
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`${plan?.title || 'lesson-plan'}.pdf`);
        
        toast({ title: "نجاح", description: "تم تحميل ملف PDF المبسط بنجاح" });
      } catch (error) {
        console.error('PDF Generation Error:', error);
        toast({ title: "خطأ", description: "فشل إنشاء ملف PDF", variant: "destructive" });
      } finally {
        setIsExporting(false);
        setPdfMode(false);
      }
    }, 100);
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

  const handleDelete = () => {
    if (!memoizedDocRef) return;
    setIsDeleting(true);
    deleteDocumentNonBlocking(memoizedDocRef);
    toast({ title: "تم الحذف", description: "تم حذف المذكرة من قاعدة البيانات بنجاح" });
    router.push('/lesson-plans');
  };

  const formatStageContent = (content: string) => {
    if (!content) return null;
    const lines = content.split('\n');
    return lines.map((line, i) => {
      const trimmedLine = line.trim();
      if (!trimmedLine) return <div key={i} className={cn(pdfMode ? "h-1" : "h-4")} />;
      const isHeader = /^(\d+\.|\*|-)?\s*[^:]{2,40}:/.test(trimmedLine) || 
                       trimmedLine.includes('الجانب التنظيمي') || 
                       trimmedLine.includes('التسخين') ||
                       trimmedLine.includes('الورشة');
      const isBullet = trimmedLine.startsWith('*') || trimmedLine.startsWith('-') || trimmedLine.startsWith('•');
      return (
        <div key={i} className={cn(
          "mb-1 last:mb-0 text-gray-700 leading-relaxed text-start",
          isHeader && "font-bold text-gray-900 mt-3 first:mt-0 border-r-4 border-primary/30 pr-3 bg-primary/5 py-0.5 rounded-l-md",
          isBullet && "pr-6 relative before:content-['•'] before:absolute before:right-1 before:text-primary before:font-bold",
          pdfMode && isHeader && "mt-2 bg-transparent border-black pr-2"
        )}>
          {isBullet ? trimmedLine.replace(/^[*•-]\s*/, '') : trimmedLine}
        </div>
      );
    });
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
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" className="text-destructive hover:bg-destructive/10 hover:text-destructive gap-2 h-11 px-4">
                  <Trash2 className="h-4 w-4" />
                  حذف
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent dir="rtl" className="rounded-2xl">
                <AlertDialogHeader>
                  <AlertDialogTitle className="font-headline">هل أنت متأكد من الحذف؟</AlertDialogTitle>
                  <AlertDialogDescription className="font-tajawal">
                    سيتم حذف المذكرة نهائياً من قاعدة البيانات ولا يمكن التراجع عن هذا الإجراء.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="gap-2">
                  <AlertDialogCancel className="font-tajawal">إلغاء</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90 font-tajawal">
                    تأكيد الحذف
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none gap-2 border-primary text-primary hover:bg-primary/5 h-11" 
              onClick={handleExportToDrive}
            >
              <ExternalLink className="h-4 w-4" />
              تصدير لـ Drive
            </Button>
            <Button 
              className="flex-1 sm:flex-none gap-2 bg-accent hover:bg-accent/90 shadow-lg shadow-accent/20 h-11" 
              onClick={handleDownloadPDF}
              disabled={isExporting}
            >
              {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
              تحميل PDF مبسط
            </Button>
          </div>
        </div>

        <div 
          ref={printRef} 
          className={cn(
            "bg-white rounded-xl shadow-2xl overflow-hidden border border-border/50 print:shadow-none print:border-none print:rounded-none transition-all duration-200",
            pdfMode && "pdf-simple-mode"
          )}
          id="lesson-plan-document"
        >
          <header className={cn(
            "p-8 sm:p-10 bg-gradient-to-br from-gray-50 to-white border-b relative",
            pdfMode && "p-4 border-black"
          )}>
            {!pdfMode && <div className="absolute top-0 right-0 left-0 h-1.5 bg-primary no-print"></div>}
            
            <div className={cn("grid grid-cols-1 md:grid-cols-3 gap-8 items-start", pdfMode && "gap-4")}>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold">
                  {!pdfMode && <School className="h-5 w-5" />}
                  <span className="font-headline text-lg">{profile?.school || "المؤسسة التعليمية"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-tajawal">
                  {!pdfMode && <User className="h-4 w-4" />}
                  <span>أ/{profile?.displayName || "الأستاذ"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm font-tajawal">
                  {!pdfMode && <Calendar className="h-4 w-4" />}
                  <span>تاريخ: {plan.createdAt?.toDate().toLocaleDateString('ar-DZ')}</span>
                </div>
              </div>

              <div className="text-center space-y-1">
                {!pdfMode && (
                  <Badge variant="outline" className="border-primary text-primary font-bold font-tajawal px-4 py-1">
                    التربية البدنية والرياضية
                  </Badge>
                )}
                <h1 className={cn("text-3xl font-bold font-headline text-gray-900 leading-tight", pdfMode && "text-xl")}>
                  مذكـرة تربويـة
                </h1>
                {pdfMode && <p className="text-xs font-bold">التربية البدنية والرياضية</p>}
                {!pdfMode && <p className="text-muted-foreground font-tajawal text-xs">مستخرجة من منصة Modakira</p>}
              </div>

              <div className={cn(
                "bg-white p-4 rounded-xl border border-dashed border-primary/30 space-y-2 shadow-sm",
                pdfMode && "p-2 border-solid border-black shadow-none"
              )}>
                <div className="flex justify-between text-[10px] sm:text-xs">
                  <span className="text-muted-foreground font-tajawal">المستوى:</span>
                  <span className="font-bold">{plan.year}</span>
                </div>
                <div className="flex justify-between text-[10px] sm:text-xs">
                  <span className="text-muted-foreground font-tajawal">الميدان:</span>
                  <span className="font-bold">{plan.field}</span>
                </div>
                {!pdfMode && (
                  <div className="flex justify-between text-[10px] sm:text-xs">
                    <span className="text-muted-foreground font-tajawal">الرقم التسلسلي:</span>
                    <span className="font-mono text-accent">#{plan.id.slice(-6).toUpperCase()}</span>
                  </div>
                )}
              </div>
            </div>

            <div className={cn(
              "mt-8 text-center p-4 bg-primary/5 rounded-2xl border border-primary/10",
              pdfMode && "mt-4 p-2 bg-transparent border-black"
            )}>
              <h2 className={cn("text-xl font-bold font-headline text-primary", pdfMode && "text-lg")}>الموضوع: {plan.title}</h2>
            </div>
          </header>

          <CardContent className={cn("p-8 sm:p-12 space-y-10 text-start", pdfMode && "p-4 space-y-4")}>
            <section className="space-y-4">
              <div className={cn("flex items-center gap-3 pb-2 border-b-2 border-primary/20", pdfMode && "border-black pb-1")}>
                {!pdfMode && (
                  <div className="bg-primary/10 p-2 rounded-xl">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                )}
                <h3 className="text-lg font-bold font-headline text-gray-800">الأهداف الإجرائية (SMART)</h3>
              </div>
              
              <div className={cn("grid gap-2 ps-2", pdfMode && "ps-0")}>
                {plan.objectives?.map((obj: string, i: number) => (
                  <div key={i} className="flex gap-2 items-start">
                    <div className={cn(
                      "h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 text-[10px] font-bold",
                      pdfMode && "bg-transparent border border-black text-black"
                    )}>
                      {i + 1}
                    </div>
                    <div className={cn(
                      "p-2 rounded-lg bg-gray-50/50 border border-transparent w-full text-start",
                      pdfMode && "p-1 bg-transparent border-none"
                    )}>
                      <p className="font-tajawal text-gray-700 leading-tight text-sm">{obj}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <div className={cn("space-y-8", pdfMode && "space-y-4")}>
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
                  <section key={idx} className="space-y-3 relative">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <div className={cn(
                          "h-8 w-8 rounded-lg flex items-center justify-center text-white font-bold shadow-md shrink-0",
                          isPrimary ? "bg-primary" : isAccent ? "bg-accent" : "bg-gray-400",
                          pdfMode && "bg-transparent border border-black text-black shadow-none rounded-sm h-6 w-6 text-xs"
                        )}>
                          {idx + 1}
                        </div>
                        <h3 className={cn("text-lg font-bold font-headline text-gray-900", pdfMode && "text-sm")}>{stage.title}</h3>
                      </div>
                      <div className={cn(
                        "flex items-center gap-1 text-[10px] font-tajawal text-muted-foreground bg-gray-100 px-2 py-0.5 rounded-full",
                        pdfMode && "bg-transparent border border-black text-black rounded-sm px-1"
                      )}>
                        {!pdfMode && <stage.icon className="h-3 w-3" />}
                        <span>المدة: {stage.time}</span>
                      </div>
                    </div>

                    <div className={cn(
                      "p-6 rounded-2xl border-r-4 shadow-sm font-body text-gray-700 leading-relaxed text-start relative overflow-hidden",
                      isPrimary ? "bg-primary/5 border-primary" : isAccent ? "bg-accent/5 border-accent" : "bg-gray-50 border-gray-300",
                      pdfMode && "p-2 border-r-2 bg-transparent border-black shadow-none rounded-none"
                    )}>
                      <div className="relative z-10 space-y-0.5">
                        {formatStageContent(stage.content)}
                      </div>
                    </div>
                  </section>
                )
              })}
            </div>

            <footer className={cn("pt-12 grid grid-cols-2 gap-8 text-center mt-8 border-t-2 border-dashed border-gray-200", pdfMode && "pt-4 mt-4 border-black border-solid border-t")}>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className={cn("font-bold font-headline text-gray-900 text-sm", pdfMode && "text-xs")}>إمضاء الأستاذ</p>
                  <p className="text-[10px] text-muted-foreground font-tajawal">{profile?.displayName}</p>
                </div>
                <div className={cn("h-16 border border-gray-100 rounded-xl bg-gray-50/30", pdfMode && "h-12 border-black rounded-sm bg-transparent")}></div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1">
                  <p className={cn("font-bold font-headline text-gray-900 text-sm", pdfMode && "text-xs")}>تأشيرة السيد المدير</p>
                  <p className="text-[10px] text-muted-foreground font-tajawal">ختم المؤسسة</p>
                </div>
                <div className={cn("h-16 border border-gray-100 rounded-xl bg-gray-50/30", pdfMode && "h-12 border-black rounded-sm bg-transparent")}></div>
              </div>
            </footer>
          </CardContent>

          <div className="bg-gray-50 p-2 border-t flex items-center justify-between text-[8px] text-muted-foreground font-tajawal">
            <span>تم الإنشاء بواسطة Modakira AI - الجزائر</span>
            <span className="dir-ltr font-rajdhani">{new Date().getFullYear()} © Modakira.dz</span>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
