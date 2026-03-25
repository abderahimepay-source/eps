
"use client";

import { useState } from 'react';
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
import { Sparkles, CheckCircle2, Loader2, BookOpen, CreditCard, ChevronRight, ChevronLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase';
import { trackAiUsage, incrementLessonPlanCount } from '@/firebase/usage';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";

type Step = 'curriculum' | 'objectives' | 'review';

export default function CreateLessonPlan() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore, user } = useFirebase();
  const [step, setStep] = useState<Step>('curriculum');
  const [loading, setLoading] = useState(false);
  const [showInsufficientCredits, setShowInsufficientCredits] = useState(false);
  
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

  const handleSaveLessonPlan = async () => {
    if (!user || !firestore || !lessonPlan || !currentYearData) return;
    setLoading(true);
    try {
      // Create a unique ID and new plan object
      const newPlanId = Date.now().toString();
      const newPlan = {
        id: newPlanId,
        userId: user.uid,
        title: `${specificResource} - ${currentYearData.grade_name}`,
        year: currentYearData.grade_name,
        field: learningField,
        objectives: selectedObjectives,
        stages: {
          introductory_stage: lessonPlan.introductoryStage,
          building_stage: lessonPlan.buildingStage,
          final_stage: lessonPlan.finalStage,
        },
        createdAt: new Date().toISOString(),
      };

      // Save to LocalStorage
      const localPlans = JSON.parse(localStorage.getItem('modakira_plans') || '[]');
      localPlans.push(newPlan);
      localStorage.setItem('modakira_plans', JSON.stringify(localPlans));

      // Still increment count in Firestore for profile stats
      await incrementLessonPlanCount(firestore, user.uid);
      
      toast({ title: "نجاح", description: "تم حفظ المذكرة محلياً بنجاح" });
      router.push('/lesson-plans');
    } catch (error: any) {
      toast({ title: "خطأ", description: "فشل الحفظ المحلي", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="bg-primary p-2.5 sm:p-3 rounded-2xl shadow-sm shrink-0">
            <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-primary-foreground" />
          </div>
          <h1 className="text-xl sm:text-3xl font-bold font-headline">إنشاء مذكرة بيداغوجية</h1>
        </div>

        {/* Stepper Indicators */}
        <div className="flex items-center justify-between max-w-xs mx-auto mb-8 px-4">
          {[
            { id: 'curriculum', label: 'المورد' },
            { id: 'objectives', label: 'الأهداف' },
            { id: 'review', label: 'المراجعة' }
          ].map((s, idx) => (
            <div key={s.id} className="flex flex-col items-center gap-2">
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2",
                step === s.id ? "bg-primary border-primary text-white scale-110 shadow-md" : 
                (idx === 0 && step !== 'curriculum') || (idx === 1 && step === 'review') ? "bg-primary/20 border-primary text-primary" : "bg-muted border-muted text-muted-foreground"
              )}>
                {idx + 1}
              </div>
              <span className={cn("text-[10px] sm:text-xs font-tajawal", step === s.id ? "text-primary font-bold" : "text-muted-foreground")}>{s.label}</span>
            </div>
          ))}
        </div>
        
        {step === 'curriculum' && (
          <Card className="border-none shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="font-headline text-lg sm:text-xl">1. تحديد المورد المعرفي</CardTitle>
              <CardDescription className="font-tajawal text-sm">اختر السنة والميدان لتوليد أهداف دقيقة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label className="text-sm">المستوى الدراسي</Label>
                  <Select onValueChange={(val) => { setGradeId(val); setLearningField(''); setKnowledgeResource(''); setSpecificResource(''); }} value={gradeId}>
                    <SelectTrigger className="h-11 sm:h-12 bg-gray-50/50">
                      <SelectValue placeholder="اختر السنة" />
                    </SelectTrigger>
                    <SelectContent>
                      {curriculum.map(item => (
                        <SelectItem key={item.grade} value={item.grade.toString()}>{item.grade_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">ميدان التعلم</Label>
                  <Select onValueChange={(val) => { setLearningField(val); setKnowledgeResource(''); setSpecificResource(''); }} value={learningField} disabled={!gradeId}>
                    <SelectTrigger className="h-11 sm:h-12 bg-gray-50/50">
                      <SelectValue placeholder="اختر الميدان" />
                    </SelectTrigger>
                    <SelectContent>
                      {fields.map((f: any) => (
                        <SelectItem key={f.field_name} value={f.field_name}>{f.field_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">المورد المعرفي</Label>
                  <Select onValueChange={(val) => { setKnowledgeResource(val); setSpecificResource(''); }} value={knowledgeResource} disabled={!learningField}>
                    <SelectTrigger className="h-11 sm:h-12 bg-gray-50/50">
                      <SelectValue placeholder="اختر المورد" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(resourceCategories).map(cat => (
                        <SelectItem key={cat} value={cat}>{cat.replaceAll('_', ' ')}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">العنصر المحدد</Label>
                  <Select onValueChange={setSpecificResource} value={specificResource} disabled={!knowledgeResource}>
                    <SelectTrigger className="h-11 sm:h-12 bg-gray-50/50">
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
            <CardFooter className="pt-2">
              <Button 
                onClick={handleGenerateObjectives} 
                disabled={loading || !specificResource} 
                className="bg-accent hover:bg-accent/90 w-full h-12 text-base sm:text-lg shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 me-2" /> : <Sparkles className="h-5 w-5 me-2" />}
                {loading ? "جاري المعالجة..." : "توليد الأهداف الإجرائية"}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 'objectives' && (
          <Card className="border-none shadow-xl bg-white">
            <CardHeader>
              <CardTitle className="font-headline text-lg sm:text-xl">2. اختيار الأهداف (SMART)</CardTitle>
              <CardDescription className="font-tajawal text-sm">اختر الأهداف التي تريد تضمينها في المذكرة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiObjectives.map((obj, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex items-start gap-3 p-4 border rounded-xl cursor-pointer transition-all",
                    selectedObjectives.includes(obj) ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20" : "hover:border-primary/50 bg-gray-50/30"
                  )} 
                  onClick={() => {
                    setSelectedObjectives(prev => prev.includes(obj) ? prev.filter(o => o !== obj) : [...prev, obj]);
                  }}
                >
                  <Checkbox checked={selectedObjectives.includes(obj)} className="h-5 w-5 mt-0.5" />
                  <Label className="text-sm sm:text-base cursor-pointer leading-relaxed font-tajawal">{obj}</Label>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
              <Button variant="outline" onClick={() => setStep('curriculum')} className="h-11 sm:h-12 w-full sm:px-8 bg-white">
                <ChevronRight className="h-4 w-4 ms-2" />
                السابق
              </Button>
              <Button 
                onClick={handleDraftPlan} 
                disabled={loading || selectedObjectives.length === 0} 
                className="bg-accent hover:bg-accent/90 w-full sm:flex-1 h-11 sm:h-12 text-base sm:text-lg"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 me-2" /> : <BookOpen className="h-5 w-5 me-2" />}
                صياغة المذكرة الكاملة
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 'review' && lessonPlan && (
          <Card className="border-none shadow-xl overflow-hidden bg-white">
            <CardHeader className="bg-primary/5 border-b py-6">
              <CardTitle className="font-headline text-xl sm:text-2xl text-primary text-center">مراجعة المذكرة النهائية</CardTitle>
              <CardDescription className="text-primary/70 text-center font-tajawal">تأكد من المحتوى قبل الحفظ النهائي</CardDescription>
            </CardHeader>
            <CardContent className="p-4 sm:p-8 space-y-8 text-start">
              {[
                { title: 'المرحلة التحضيرية (10-15 د)', color: 'text-accent', bar: 'bg-accent', content: lessonPlan.introductoryStage },
                { title: 'المرحلة التعلمية الرئيسية (25-30 د)', color: 'text-primary', bar: 'bg-primary', content: lessonPlan.buildingStage },
                { title: 'المرحلة الختامية (5-10 د)', color: 'text-muted-foreground', bar: 'bg-muted-foreground', content: lessonPlan.finalStage }
              ].map((section, idx) => (
                <section key={idx} className="space-y-3">
                  <div className={cn("flex items-center gap-2", section.color)}>
                    <div className={cn("w-1 h-5 sm:h-6 rounded-full", section.bar)} />
                    <h3 className="text-lg sm:text-xl font-bold font-headline">{section.title}</h3>
                  </div>
                  <div className="p-4 sm:p-5 bg-gray-50/50 rounded-xl whitespace-pre-wrap leading-relaxed font-tajawal border border-dashed text-sm sm:text-base">
                    {section.content}
                  </div>
                </section>
              ))}
            </CardContent>
            <CardFooter className="bg-gray-50/50 p-4 sm:p-6 flex flex-col sm:flex-row justify-end gap-3 border-t">
              <Button variant="outline" onClick={() => setStep('objectives')} className="h-11 sm:h-12 w-full sm:px-6 bg-white">
                تعديل الأهداف
              </Button>
              <Button 
                onClick={handleSaveLessonPlan} 
                disabled={loading} 
                className="bg-primary hover:bg-primary/90 w-full sm:h-12 sm:px-10 text-base sm:text-lg shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 me-2" /> : <CheckCircle2 className="h-5 w-5 me-2" />}
                حفظ المذكرة في المكتبة
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>

      {/* Guidance Dialog for Insufficient Credits */}
      <AlertDialog open={showInsufficientCredits} onOpenChange={setShowInsufficientCredits}>
        <AlertDialogContent dir="rtl" className="max-w-[90vw] sm:max-w-lg rounded-2xl">
          <AlertDialogHeader>
            <div className="mx-auto bg-accent/10 p-4 rounded-full w-fit mb-4">
              <CreditCard className="h-8 w-8 text-accent" />
            </div>
            <AlertDialogTitle className="text-center font-headline text-xl sm:text-2xl">عذراً، رصيدك غير كافٍ</AlertDialogTitle>
            <AlertDialogDescription className="text-center font-tajawal text-sm sm:text-base leading-relaxed">
              لقد استهلكت جميع اعتماداتك المتاحة. لإنشاء المزيد من المذكرات الذكية، يرجى ترقية حسابك إلى باقة المحترفين.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
            <AlertDialogAction 
              onClick={() => router.push('/pricing')}
              className="bg-primary hover:bg-primary/90 h-11 sm:h-12 flex-1"
            >
              استعرض باقات الاشتراك
            </AlertDialogAction>
            <AlertDialogCancel className="h-11 sm:h-12 flex-1">إغلاق</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AppLayout>
  );
}
