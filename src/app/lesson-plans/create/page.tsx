
"use client";

import { useState, useRef } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { CURRICULUM_DATA } from '@/lib/curriculum';
import { generateObjectives } from '@/ai/flows/generate-lesson-objectives';
import { draftLessonPlan } from '@/ai/flows/draft-lesson-plan';
import { Sparkles, CheckCircle2, Loader2, BookOpen, CreditCard, ChevronRight, Download, Copy, ClipboardCheck, School, User, Calendar, Clock, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirebase, useDoc, useMemoFirebase } from '@/firebase';
import { trackAiUsage, incrementLessonPlanCount } from '@/firebase/usage';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { doc } from 'firebase/firestore';

type Step = 'curriculum' | 'objectives' | 'review';

export default function CreateLessonPlan() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore, user } = useFirebase();
  const [step, setStep] = useState<Step>('curriculum');
  const [loading, setLoading] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showInsufficientCredits, setShowInsufficientCredits] = useState(false);
  const [pdfMode, setPdfMode] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);
  
  // Selection State
  const [gradeId, setGradeId] = useState<string>('');
  const [learningField, setLearningField] = useState('');
  const [knowledgeResource, setKnowledgeResource] = useState('');
  const [specificResource, setSpecificResource] = useState('');
  
  // AI Results
  const [aiObjectives, setAiObjectives] = useState<string[]>([]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [terminalCompetence, setTerminalCompetence] = useState('');
  const [lessonPlan, setLessonPlan] = useState<{ introductoryStage: string; buildingStage: string; finalStage: string } | null>(null);

  // Load profile for header
  const profileRef = useMemoFirebase(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'profiles', user.uid);
  }, [user, firestore]);
  const { data: profile } = useDoc(profileRef);

  const curriculum = CURRICULUM_DATA.curriculum_data;
  const currentYearData = gradeId ? curriculum.find(g => g.grade.toString() === gradeId) : null;
  const fields = currentYearData?.fields || [];
  const currentFieldData = learningField ? fields.find((f: any) => f.field_name === learningField) : null;
  const resourceCategories = currentFieldData?.Knowledge_resources || {};

  const handleGenerateObjectives = async () => {
    if (!user || !firestore) {
      toast({ title: "خطأ", description: "يجب تسجيل الدخول أولاً", variant: "destructive" });
      return;
    }
    
    if (!currentYearData) return;

    setLoading(true);
    try {
      const result = await generateObjectives({
        studyYear: currentYearData.grade_name,
        learningField,
        knowledgeResource,
        specificResource
      });

      if (result.usage?.totalTokens) {
        await trackAiUsage(firestore, user.uid, {
          totalTokens: result.usage.totalTokens,
          feature: 'Objective Generation'
        });
      }

      setAiObjectives(result.objectives);
      setTerminalCompetence(result.terminalCompetence);
      setStep('objectives');
    } catch (error: any) {
      if (error.message === "Insufficient credits") {
        setShowInsufficientCredits(true);
      } else {
        toast({ 
          title: "فشل إنشاء الأهداف", 
          description: error.message || "حدث خطأ غير متوقع", 
          variant: "destructive" 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDraftPlan = async () => {
    if (!user || !firestore) return;
    setLoading(true);
    try {
      const result = await draftLessonPlan({
        selectedObjective: selectedObjectives,
        terminalCompetence
      });

      if (result.usage?.totalTokens) {
        await trackAiUsage(firestore, user.uid, {
          totalTokens: result.usage.totalTokens,
          feature: 'Lesson Plan Drafting'
        });
      }

      setLessonPlan(result);
      await incrementLessonPlanCount(firestore, user.uid);
      setStep('review');
    } catch (error: any) {
      if (error.message === "Insufficient credits") {
        setShowInsufficientCredits(true);
      } else {
        toast({ 
          title: "فشل إنشاء المذكرة", 
          description: error.message || "حدث خطأ أثناء صياغة المذكرة", 
          variant: "destructive" 
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    if (!lessonPlan) return;
    const text = `
الموضوع: ${specificResource}
الأهداف:
${selectedObjectives.map((obj, i) => `${i + 1}. ${obj}`).join('\n')}

المرحلة التحضيرية:
${lessonPlan.introductoryStage}

المرحلة التعلمية الرئيسية:
${lessonPlan.buildingStage}

المرحلة الختامية:
${lessonPlan.finalStage}
    `.trim();

    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast({ title: "تم النسخ", description: "تم نسخ محتوى المذكرة إلى الحافظة" });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleDownloadPDF = async () => {
    if (!printRef.current || !lessonPlan) return;
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
        pdf.save(`${specificResource || 'lesson-plan'}.pdf`);
        
        toast({ title: "نجاح", description: "تم تحميل ملف PDF بنجاح" });
      } catch (error) {
        console.error('PDF Error:', error);
        toast({ title: "خطأ", description: "فشل إنشاء ملف PDF", variant: "destructive" });
      } finally {
        setIsExporting(false);
        setPdfMode(false);
      }
    }, 100);
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
          "mb-1 last:mb-0 text-gray-700 leading-relaxed text-start text-xs sm:text-sm",
          isHeader && "font-bold text-gray-900 mt-2 first:mt-0 border-r-2 border-primary/30 pr-2 bg-primary/5 py-0.5",
          isBullet && "pr-4 relative before:content-['•'] before:absolute before:right-0 before:text-primary",
          pdfMode && isHeader && "mt-1 bg-transparent border-black"
        )}>
          {isBullet ? trimmedLine.replace(/^[*•-]\s*/, '') : trimmedLine}
        </div>
      );
    });
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <div className="bg-primary p-2.5 rounded-2xl shadow-sm">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-xl sm:text-2xl font-bold font-headline">إنشاء مذكرة بيداغوجية</h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-between max-w-xs mx-auto mb-8 px-4">
          {[
            { id: 'curriculum', label: 'المورد' },
            { id: 'objectives', label: 'الأهداف' },
            { id: 'review', label: 'المذكرة' }
          ].map((s, idx) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={cn(
                "h-7 w-7 rounded-full flex items-center justify-center text-[10px] font-bold transition-all border-2",
                step === s.id ? "bg-primary border-primary text-white scale-110" : 
                (idx === 0 && step !== 'curriculum') || (idx === 1 && step === 'review') ? "bg-primary/20 border-primary text-primary" : "bg-muted border-muted text-muted-foreground"
              )}>
                {idx + 1}
              </div>
              <span className={cn("text-[9px] font-tajawal", step === s.id ? "text-primary font-bold" : "text-muted-foreground")}>{s.label}</span>
            </div>
          ))}
        </div>
        
        {step === 'curriculum' && (
          <Card className="border-none shadow-xl bg-white">
            <CardHeader className="pb-4">
              <CardTitle className="font-headline text-lg">1. تحديد المورد المعرفي</CardTitle>
              <CardDescription className="font-tajawal text-xs">اختر المعطيات لتوليد أهداف دقيقة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label className="text-xs">المستوى الدراسي</Label>
                  <Select onValueChange={(val) => { setGradeId(val); setLearningField(''); setKnowledgeResource(''); setSpecificResource(''); }} value={gradeId}>
                    <SelectTrigger className="h-10 bg-gray-50/50">
                      <SelectValue placeholder="اختر السنة" />
                    </SelectTrigger>
                    <SelectContent>
                      {curriculum.map(item => (
                        <SelectItem key={item.grade} value={item.grade.toString()}>{item.grade_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">ميدان التعلم</Label>
                  <Select onValueChange={(val) => { setLearningField(val); setKnowledgeResource(''); setSpecificResource(''); }} value={learningField} disabled={!gradeId}>
                    <SelectTrigger className="h-10 bg-gray-50/50">
                      <SelectValue placeholder="اختر الميدان" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((f: any) => (
                        <SelectItem key={f.field_name} value={f.field_name}>{f.field_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">المورد المعرفي</Label>
                  <Select onValueChange={(val) => { setKnowledgeResource(val); setSpecificResource(''); }} value={knowledgeResource} disabled={!learningField}>
                    <SelectTrigger className="h-10 bg-gray-50/50">
                      <SelectValue placeholder="اختر المورد" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(resourceCategories).map(cat => (
                        <SelectItem key={cat} value={cat}>{cat.replaceAll('_', ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs">العنصر المحدد</Label>
                  <Select onValueChange={setSpecificResource} value={specificResource} disabled={!knowledgeResource}>
                    <SelectTrigger className="h-10 bg-gray-50/50">
                      <SelectValue placeholder="اختر العنصر" />
                    </SelectTrigger>
                    <SelectContent>
                      {(resourceCategories[knowledgeResource] || []).map((res: string) => (
                        <SelectItem key={res} value={res}>{res}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleGenerateObjectives} 
                disabled={loading || !specificResource} 
                className="bg-accent hover:bg-accent/90 w-full h-11 text-sm font-bold shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4 me-2" /> : <Sparkles className="h-4 w-4 me-2" />}
                {loading ? "جاري المعالجة..." : "توليد الأهداف الإجرائية"}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 'objectives' && (
          <Card className="border-none shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="font-headline text-lg">2. اختيار الأهداف (SMART)</CardTitle>
              <CardDescription className="font-tajawal text-xs">اختر الأهداف التي تخدم حصتك</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2.5">
              {aiObjectives.map((obj, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all",
                    selectedObjectives.includes(obj) ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "hover:border-primary/50 bg-gray-50/30"
                  )} 
                  onClick={() => {
                    setSelectedObjectives(prev => prev.includes(obj) ? prev.filter(o => o !== obj) : [...prev, obj]);
                  }}
                >
                  <Checkbox checked={selectedObjectives.includes(obj)} className="h-4 w-4 mt-0.5" />
                  <Label className="text-xs sm:text-sm cursor-pointer leading-relaxed font-tajawal">{obj}</Label>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setStep('curriculum')} className="h-10 w-full sm:w-auto px-6">
                <ChevronRight className="h-4 w-4 ms-2" />
                السابق
              </Button>
              <Button 
                onClick={handleDraftPlan} 
                disabled={loading || selectedObjectives.length === 0} 
                className="bg-accent hover:bg-accent/90 flex-1 h-10 text-sm font-bold"
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4 me-2" /> : <BookOpen className="h-4 w-4 me-2" />}
                صياغة المذكرة الكاملة
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 'review' && lessonPlan && (
          <div className="space-y-6 pb-20">
            {/* Actions Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 no-print">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto gap-2 border-primary text-primary hover:bg-primary/5 h-10" 
                onClick={handleCopyToClipboard}
              >
                {isCopied ? <ClipboardCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {isCopied ? "تم النسخ" : "نسخ النص"}
              </Button>
              <Button 
                className="w-full sm:w-auto gap-2 bg-accent hover:bg-accent/90 h-10 shadow-lg" 
                onClick={handleDownloadPDF}
                disabled={isExporting}
              >
                {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                تحميل PDF
              </Button>
            </div>

            {/* Document Preview */}
            <div 
              ref={printRef} 
              className={cn(
                "bg-white rounded-xl shadow-2xl overflow-hidden border border-border/50 transition-all duration-200",
                pdfMode && "pdf-simple-mode shadow-none border-none rounded-none"
              )}
              id="lesson-plan-document"
            >
              <header className={cn("p-6 bg-gradient-to-br from-gray-50 to-white border-b", pdfMode && "p-4 border-black")}>
                <div className="grid grid-cols-3 gap-4 items-start">
                  <div className="space-y-1 text-[10px] text-muted-foreground font-tajawal">
                    <div className="flex items-center gap-1 font-bold text-primary">
                      <School className="h-3 w-3" />
                      <span>{profile?.school || "..."}</span>
                    </div>
                    <div>أ/{profile?.displayName || "..."}</div>
                    <div>تاريخ: {new Date().toLocaleDateString('ar-DZ')}</div>
                  </div>
                  <div className="text-center space-y-0.5">
                    <h1 className={cn("text-xl font-bold font-headline text-gray-900", pdfMode && "text-lg")}>مذكـرة تربويـة</h1>
                    <p className="text-[9px] text-muted-foreground">التربية البدنية والرياضية</p>
                  </div>
                  <div className={cn("bg-white p-2 rounded-lg border border-dashed border-primary/30 text-[9px]", pdfMode && "border-solid border-black")}>
                    <div className="flex justify-between"><span>المستوى:</span><span className="font-bold">{currentYearData?.grade_name}</span></div>
                    <div className="flex justify-between"><span>الميدان:</span><span className="font-bold">{learningField}</span></div>
                  </div>
                </div>
                <div className={cn("mt-4 text-center p-2 bg-primary/5 rounded-xl border border-primary/10", pdfMode && "bg-transparent border-black")}>
                  <h2 className="text-sm font-bold font-headline text-primary">الموضوع: {specificResource}</h2>
                </div>
              </header>

              <div className={cn("p-6 space-y-6 text-start", pdfMode && "p-4 space-y-3")}>
                {/* Objectives */}
                <section className="space-y-2">
                  <h3 className="text-xs font-bold font-headline flex items-center gap-2 pb-1 border-b border-primary/20">
                    <CheckCircle2 className="h-3 w-3 text-primary" />
                    الأهداف الإجرائية (SMART)
                  </h3>
                  <div className="space-y-1">
                    {selectedObjectives.map((obj, i) => (
                      <div key={i} className="flex gap-2 text-[10px] text-gray-700 bg-gray-50/50 p-1.5 rounded-md leading-tight">
                        <span className="font-bold text-primary">{i + 1}.</span>
                        {obj}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Stages */}
                <div className="space-y-4">
                  {[
                    { title: 'المرحلة التحضيرية', time: '10-15 د', content: lessonPlan.introductoryStage, icon: Clock, color: 'primary' },
                    { title: 'المرحلة التعلمية', time: '25-30 د', content: lessonPlan.buildingStage, icon: Info, color: 'accent' },
                    { title: 'المرحلة الختامية', time: '5-10 د', content: lessonPlan.finalStage, icon: CheckCircle2, color: 'muted' }
                  ].map((stage, idx) => (
                    <section key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px] font-bold">
                        <div className="flex items-center gap-1.5">
                          <span className={cn(
                            "h-5 w-5 rounded flex items-center justify-center text-white",
                            stage.color === 'primary' ? "bg-primary" : stage.color === 'accent' ? "bg-accent" : "bg-gray-400"
                          )}>{idx + 1}</span>
                          <h4 className="font-headline">{stage.title}</h4>
                        </div>
                        <span className="text-muted-foreground">{stage.time}</span>
                      </div>
                      <div className={cn(
                        "p-3 rounded-xl border-r-2 bg-gray-50/30",
                        stage.color === 'primary' ? "border-primary" : stage.color === 'accent' ? "border-accent" : "border-gray-300",
                        pdfMode && "bg-transparent border-black p-2"
                      )}>
                        {formatStageContent(stage.content)}
                      </div>
                    </section>
                  ))}
                </div>

                {/* Footer Signature */}
                <footer className="pt-6 grid grid-cols-2 gap-4 text-center border-t border-dashed border-gray-200">
                  <div className="space-y-1">
                    <p className="font-bold text-[10px]">إمضاء الأستاذ</p>
                    <div className="h-10 border border-gray-100 rounded-lg bg-gray-50/30"></div>
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-[10px]">تأشيرة السيد المدير</p>
                    <div className="h-10 border border-gray-100 rounded-lg bg-gray-50/30"></div>
                  </div>
                </footer>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button variant="ghost" onClick={() => setStep('curriculum')} className="text-muted-foreground font-tajawal text-xs">
                البدء من جديد
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Credits Dialog */}
      <AlertDialog open={showInsufficientCredits} onOpenChange={setShowInsufficientCredits}>
        <AlertDialogContent dir="rtl" className="max-w-[90vw] sm:max-w-lg rounded-2xl">
          <AlertDialogHeader>
            <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit mb-4">
              <CreditCard className="h-8 w-8 text-accent" />
            </div>
            <AlertDialogTitle className="text-center font-headline">عذراً، رصيدك غير كافٍ</AlertDialogTitle>
            <AlertDialogDescription className="text-center font-tajawal text-sm leading-relaxed">
              لقد استهلكت جميع اعتماداتك المتاحة. لإنشاء المزيد من المذكرات الذكية، يرجى شحن رصيدك.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 mt-4">
            <AlertDialogAction onClick={() => router.push('/pricing')} className="bg-primary flex-1 h-11">شحن الرصيد</AlertDialogAction>
            <AlertDialogCancel className="h-11 flex-1">إغلاق</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
