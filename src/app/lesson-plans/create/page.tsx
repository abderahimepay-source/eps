"use client";

import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ALGERIAN_CURRICULUM } from '@/lib/curriculum';
import { generateObjectives } from '@/ai/flows/generate-lesson-objectives';
import { draftLessonPlan } from '@/ai/flows/draft-lesson-plan';
import { Sparkles, ChevronLeft, ChevronRight, CheckCircle2, Loader2, AlertCircle, BookOpen } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useFirebase } from '@/firebase';
import { trackAiUsage, incrementLessonPlanCount } from '@/firebase/usage';
import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";

type Step = 'curriculum' | 'objectives' | 'review';

export default function CreateLessonPlan() {
  const { toast } = useToast();
  const router = useRouter();
  const { firestore, user } = useFirebase();
  const [step, setStep] = useState<Step>('curriculum');
  const [loading, setLoading] = useState(false);
  
  // Selection State
  const [studyYear, setStudyYear] = useState('');
  const [learningField, setLearningField] = useState('');
  const [knowledgeResource, setKnowledgeResource] = useState('');
  const [specificResource, setSpecificResource] = useState('');
  
  // AI Results
  const [aiObjectives, setAiObjectives] = useState<string[]>([]);
  const [selectedObjectives, setSelectedObjectives] = useState<string[]>([]);
  const [terminalCompetence, setTerminalCompetence] = useState('');
  const [lessonPlan, setLessonPlan] = useState<{ introductoryStage: string; buildingStage: string; finalStage: string } | null>(null);

  const programs = ALGERIAN_CURRICULUM.Curriculum_subject.Annual_Programs as any;
  const currentYearData = studyYear ? programs[studyYear] : null;
  const fields = currentYearData?.Learning_Field || [];
  const currentFieldData = learningField ? fields.find((f: any) => f.Field_Title === learningField) : null;
  const resourceCategories = currentFieldData?.Knowledge_resources || {};

  const handleGenerateObjectives = async () => {
    if (!user || !firestore) {
      toast({ title: "خطأ", description: "يجب تسجيل الدخول أولاً", variant: "destructive" });
      return;
    }
    
    setLoading(true);
    try {
      const result = await generateObjectives({
        studyYear,
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
      console.error("Generation Error:", error);
      toast({ 
        title: "فشل إنشاء الأهداف", 
        description: error.message || "حدث خطأ غير متوقع", 
        variant: "destructive" 
      });
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
      console.error("Drafting Error:", error);
      toast({ 
        title: "فشل إنشاء المذكرة", 
        description: error.message || "حدث خطأ أثناء صياغة المذكرة", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSaveLessonPlan = async () => {
    if (!user || !firestore || !lessonPlan) return;
    setLoading(true);
    try {
      const planRef = doc(collection(firestore, 'profiles', user.uid, 'lessonPlans'));
      await setDoc(planRef, {
        id: planRef.id,
        userId: user.uid,
        title: `${specificResource} - ${studyYear}`,
        year: studyYear,
        field: learningField,
        objectives: selectedObjectives,
        stages: {
          introductory_stage: lessonPlan.introductoryStage,
          building_stage: lessonPlan.buildingStage,
          final_stage: lessonPlan.finalStage,
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await incrementLessonPlanCount(firestore, user.uid);
      toast({ title: "نجاح", description: "تم حفظ المذكرة بنجاح" });
      router.push('/lesson-plans');
    } catch (error: any) {
      toast({ title: "خطأ", description: "فشل الحفظ", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <div className="bg-primary p-3 rounded-2xl shadow-sm">
            <Sparkles className="h-6 w-6 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold font-headline">إنشاء مذكرة بيداغوجية ذكية</h1>
        </div>
        
        {step === 'curriculum' && (
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl">1. تحديد المورد المعرفي</CardTitle>
              <CardDescription className="font-tajawal">اختر السنة والميدان لتوليد أهداف دقيقة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>المستوى الدراسي</Label>
                  <Select onValueChange={(val) => { setStudyYear(val); setLearningField(''); }} value={studyYear}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="اختر السنة" /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(programs).map(year => <SelectItem key={year} value={year}>{year.replace('_', ' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>ميدان التعلم</Label>
                  <Select onValueChange={(val) => { setLearningField(val); setKnowledgeResource(''); }} value={learningField} disabled={!studyYear}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="اختر الميدان" /></SelectTrigger>
                    <SelectContent>
                      {fields.map((f: any) => <SelectItem key={f.Field_Title} value={f.Field_Title}>{f.Field_Title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>المورد المعرفي</Label>
                  <Select onValueChange={(val) => { setKnowledgeResource(val); setSpecificResource(''); }} value={knowledgeResource} disabled={!learningField}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="اختر المورد" /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(resourceCategories).map(cat => <SelectItem key={cat} value={cat}>{cat.replace('_', ' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>العنصر المحدد</Label>
                  <Select onValueChange={setSpecificResource} value={specificResource} disabled={!knowledgeResource}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="اختر العنصر" /></SelectTrigger>
                    <SelectContent>
                      {(resourceCategories[knowledgeResource] || []).map((res: string) => <SelectItem key={res} value={res}>{res}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                onClick={handleGenerateObjectives} 
                disabled={loading || !specificResource} 
                className="bg-accent hover:bg-accent/90 w-full h-12 text-lg shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 me-2" /> : <Sparkles className="h-5 w-5 me-2" />}
                {loading ? "جاري المعالجة..." : "توليد الأهداف الإجرائية"}
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 'objectives' && (
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl">2. اختيار الأهداف (SMART)</CardTitle>
              <CardDescription className="font-tajawal">اختر الأهداف التي تريد تضمينها في المذكرة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiObjectives.map((obj, i) => (
                <div 
                  key={i} 
                  className={cn(
                    "flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all",
                    selectedObjectives.includes(obj) ? "border-primary bg-primary/5 shadow-sm" : "hover:border-primary/50"
                  )} 
                  onClick={() => {
                    setSelectedObjectives(prev => prev.includes(obj) ? prev.filter(o => o !== obj) : [...prev, obj]);
                  }}
                >
                  <Checkbox checked={selectedObjectives.includes(obj)} className="h-5 w-5" />
                  <Label className="text-base cursor-pointer leading-relaxed">{obj}</Label>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between gap-4">
              <Button variant="outline" onClick={() => setStep('curriculum')} className="h-12 px-8">السابق</Button>
              <Button 
                onClick={handleDraftPlan} 
                disabled={loading || selectedObjectives.length === 0} 
                className="bg-accent hover:bg-accent/90 flex-1 h-12 text-lg"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 me-2" /> : <BookOpen className="h-5 w-5 me-2" />}
                صياغة المذكرة الكاملة
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {step === 'review' && lessonPlan && (
          <Card className="border-none shadow-xl overflow-hidden">
            <CardHeader className="bg-primary/10 border-b">
              <CardTitle className="font-headline text-2xl text-primary">مراجعة المذكرة النهائية</CardTitle>
              <CardDescription className="text-primary/70">تأكد من المحتوى قبل الحفظ النهائي</CardDescription>
            </CardHeader>
            <CardContent className="p-8 space-y-8 text-start">
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-accent">
                  <div className="w-1 h-6 bg-accent rounded-full" />
                  <h3 className="text-xl font-bold font-headline">المرحلة التحضيرية (10-15 د)</h3>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl whitespace-pre-wrap leading-relaxed font-tajawal border border-dashed">
                  {lessonPlan.introductoryStage}
                </div>
              </section>
              
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-primary">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  <h3 className="text-xl font-bold font-headline">المرحلة التعلمية الرئيسية (25-30 د)</h3>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl whitespace-pre-wrap leading-relaxed font-tajawal border border-dashed">
                  {lessonPlan.buildingStage}
                </div>
              </section>
              
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <div className="w-1 h-6 bg-muted-foreground rounded-full" />
                  <h3 className="text-xl font-bold font-headline">المرحلة الختامية (5-10 د)</h3>
                </div>
                <div className="p-4 bg-muted/30 rounded-xl whitespace-pre-wrap leading-relaxed font-tajawal border border-dashed">
                  {lessonPlan.finalStage}
                </div>
              </section>
            </CardContent>
            <CardFooter className="bg-muted/10 p-6 flex justify-end gap-3 border-t">
              <Button variant="outline" onClick={() => setStep('objectives')} className="h-12 px-6">تعديل الأهداف</Button>
              <Button 
                onClick={handleSaveLessonPlan} 
                disabled={loading} 
                className="bg-primary hover:bg-primary/90 h-12 px-10 text-lg shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 me-2" /> : <CheckCircle2 className="h-5 w-5 me-2" />}
                حفظ المذكرة في المكتبة
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}