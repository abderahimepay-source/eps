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
import { cn } from "@/lib/utils";

type Step = 'curriculum' | 'objectives' | 'review';

export default function CreateLessonPlan() {
  const { toast } = useToast();
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
    if (!user || !firestore) return;
    if (!studyYear || !learningField || !knowledgeResource || !specificResource) {
      toast({ title: "خطأ", description: "يرجى ملء جميع الحقول المطلوبة", variant: "destructive" });
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

      // Track usage
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
      toast({ 
        title: "فشل إنشاء الأهداف", 
        description: error.message || "حدث خطأ أثناء الاتصال بالذكاء الاصطناعي", 
        variant: "destructive" 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDraftPlan = async () => {
    if (!user || !firestore) return;
    if (selectedObjectives.length === 0) {
      toast({ title: "تنبيه", description: "يرجى اختيار هدف واحد على الأقل", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const result = await draftLessonPlan({
        selectedObjective: selectedObjectives,
        terminalCompetence
      });

      // Track usage
      if (result.usage?.totalTokens) {
        await trackAiUsage(firestore, user.uid, {
          totalTokens: result.usage.totalTokens,
          feature: 'Lesson Plan Drafting'
        });
      }

      setLessonPlan(result);
      setStep('review');
    } catch (error: any) {
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
      const planRef = doc(collection(firestore, 'users', user.uid, 'lessonPlans'));
      await setDoc(planRef, {
        id: planRef.id,
        userId: user.uid,
        title: `${specificResource} - ${studyYear.replace('_', ' ')}`,
        studyYear,
        learningField,
        knowledgeResource,
        specificResource,
        objectives: selectedObjectives,
        introductoryStage: lessonPlan.introductoryStage,
        buildingStage: lessonPlan.buildingStage,
        finalStage: lessonPlan.finalStage,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      await incrementLessonPlanCount(firestore, user.uid);
      
      toast({ title: "نجاح", description: "تم حفظ المذكرة في ملفك الشخصي" });
    } catch (error: any) {
      toast({ title: "خطأ", description: "لم يتم حفظ المذكرة", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-headline mb-2">إنشاء مذكرة بيداغوجية</h1>
            <p className="text-muted-foreground font-tajawal">اتبع الخطوات الموجهة لإنشاء مذكرة احترافية.</p>
          </div>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold font-rajdhani transition-all",
                  (s === 1 && step === 'curriculum') || (s === 2 && step === 'objectives') || (s === 3 && step === 'review') 
                    ? "bg-primary text-white scale-110 shadow-lg" 
                    : "bg-muted text-muted-foreground"
                )}
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        {step === 'curriculum' && (
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle className="font-headline text-xl flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                1. تحديد المورد البيداغوجي
              </CardTitle>
              <CardDescription>اختر المستوى والمجال من المنهاج الرسمي</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>السنة الدراسية</Label>
                  <Select onValueChange={setStudyYear} value={studyYear}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="اختر السنة" /></SelectTrigger>
                    <SelectContent>
                      {Object.keys(programs).map(year => <SelectItem key={year} value={year}>{year.replace('_', ' ')}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>ميدان التعلم</Label>
                  <Select onValueChange={setLearningField} value={learningField} disabled={!studyYear}>
                    <SelectTrigger className="h-12"><SelectValue placeholder="اختر الميدان" /></SelectTrigger>
                    <SelectContent>
                      {fields.map((f: any) => <SelectItem key={f.Field_Title} value={f.Field_Title}>{f.Field_Title}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>المورد المعرفي</Label>
                  <Select onValueChange={setKnowledgeResource} value={knowledgeResource} disabled={!learningField}>
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
            <CardFooter className="bg-muted/30 flex justify-end">
              <Button 
                onClick={handleGenerateObjectives} 
                className="bg-accent hover:bg-accent/90 h-12 px-8"
                disabled={loading || !specificResource}
              >
                {loading ? <Loader2 className="animate-spin h-5 w-5 me-2" /> : <Sparkles className="h-5 w-5 me-2" />}
                إنشاء الأهداف الذكية
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 'objectives' && (
          <Card className="border-none shadow-xl animate-in slide-in-from-left">
            <CardHeader>
              <CardTitle className="font-headline text-xl">2. اختيار الأهداف الإجرائية</CardTitle>
              <CardDescription>اختر الأهداف التي تود تضمينها في المذكرة</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 mb-6">
                <span className="text-xs font-bold text-primary block mb-1">الكفاءة الختامية:</span>
                <p className="text-sm font-tajawal">{terminalCompetence}</p>
              </div>
              
              <div className="space-y-3">
                {aiObjectives.map((obj, i) => (
                  <div key={i} className="flex items-start space-x-3 space-x-reverse p-4 rounded-xl border hover:border-primary/50 transition-colors cursor-pointer" onClick={() => {
                    if (selectedObjectives.includes(obj)) {
                      setSelectedObjectives(selectedObjectives.filter(o => o !== obj));
                    } else {
                      setSelectedObjectives([...selectedObjectives, obj]);
                    }
                  }}>
                    <Checkbox checked={selectedObjectives.includes(obj)} className="mt-1" />
                    <Label className="text-base font-tajawal leading-relaxed cursor-pointer">{obj}</Label>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('curriculum')}>السابق</Button>
              <Button 
                onClick={handleDraftPlan} 
                className="bg-accent hover:bg-accent/90"
                disabled={loading || selectedObjectives.length === 0}
              >
                {loading ? <Loader2 className="animate-spin h-4 w-4 me-2" /> : <Sparkles className="h-4 w-4 me-2" />}
                صياغة المذكرة الكاملة
              </Button>
            </CardFooter>
          </Card>
        )}

        {step === 'review' && lessonPlan && (
          <div className="space-y-6 animate-in zoom-in-95">
            <div className="bg-green-100 border border-green-200 p-4 rounded-xl flex items-center gap-3 text-green-800">
              <CheckCircle2 className="h-6 w-6" />
              <span className="font-bold font-tajawal">تم إنشاء المذكرة بنجاح! راجع المحتوى أدناه.</span>
            </div>

            <Card className="border-none shadow-xl overflow-hidden">
              <div className="bg-primary p-6 text-white">
                <h2 className="text-2xl font-bold font-headline mb-1">مذكرة حصة التربية البدنية</h2>
                <p className="opacity-90 text-sm font-tajawal">{studyYear.replace('_', ' ')} - {learningField}</p>
              </div>
              <CardContent className="p-6 space-y-8 text-start">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-4 md:col-span-1">
                    <div className="bg-muted p-4 rounded-xl">
                      <h4 className="font-bold text-sm mb-2 text-primary">المورد المعرفي</h4>
                      <p className="text-sm font-tajawal">{specificResource}</p>
                    </div>
                    <div className="bg-muted p-4 rounded-xl">
                      <h4 className="font-bold text-sm mb-2 text-primary">الأهداف المختارة</h4>
                      <ul className="list-disc list-inside text-xs space-y-1 font-tajawal opacity-80">
                        {selectedObjectives.map((o, i) => <li key={i}>{o}</li>)}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-8">
                    <section>
                      <h3 className="font-bold text-lg border-s-4 border-accent ps-3 mb-4 font-headline">المرحلة التحضيرية (10-15 د)</h3>
                      <div className="prose prose-sm max-w-none font-tajawal leading-relaxed whitespace-pre-wrap">{lessonPlan.introductoryStage}</div>
                    </section>
                    <section>
                      <h3 className="font-bold text-lg border-s-4 border-primary ps-3 mb-4 font-headline">المرحلة التعلمية (25-30 د)</h3>
                      <div className="prose prose-sm max-w-none font-tajawal leading-relaxed whitespace-pre-wrap">{lessonPlan.buildingStage}</div>
                    </section>
                    <section>
                      <h3 className="font-bold text-lg border-s-4 border-muted-foreground ps-3 mb-4 font-headline">المرحلة الختامية (5-10 د)</h3>
                      <div className="prose prose-sm max-w-none font-tajawal leading-relaxed whitespace-pre-wrap">{lessonPlan.finalStage}</div>
                    </section>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="bg-muted/30 flex justify-end gap-3 p-6">
                <Button variant="outline" className="h-11">تعديل</Button>
                <Button 
                  onClick={handleSaveLessonPlan}
                  className="bg-primary hover:bg-primary/90 h-11 px-8"
                  disabled={loading}
                >
                  {loading ? <Loader2 className="animate-spin h-4 w-4 me-2" /> : null}
                  حفظ المذكرة
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
