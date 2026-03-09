
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
      toast({ title: "فشل إنشاء الأهداف", description: error.message, variant: "destructive" });
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
      toast({ title: "فشل إنشاء المذكرة", description: error.message, variant: "destructive" });
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
    } catch (error: any) {
      toast({ title: "خطأ", description: "فشل الحفظ", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold font-headline">إنشاء مذكرة</h1>
        {step === 'curriculum' && (
          <Card className="border-none shadow-xl">
            <CardHeader>
              <CardTitle>1. تحديد المورد</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={setStudyYear} value={studyYear}>
                <SelectTrigger><SelectValue placeholder="اختر السنة" /></SelectTrigger>
                <SelectContent>
                  {Object.keys(programs).map(year => <SelectItem key={year} value={year}>{year}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select onValueChange={setLearningField} value={learningField} disabled={!studyYear}>
                <SelectTrigger><SelectValue placeholder="اختر الميدان" /></SelectTrigger>
                <SelectContent>
                  {fields.map((f: any) => <SelectItem key={f.Field_Title} value={f.Field_Title}>{f.Field_Title}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select onValueChange={setKnowledgeResource} value={knowledgeResource} disabled={!learningField}>
                <SelectTrigger><SelectValue placeholder="اختر المورد" /></SelectTrigger>
                <SelectContent>
                  {Object.keys(resourceCategories).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                </SelectContent>
              </Select>
              <Select onValueChange={setSpecificResource} value={specificResource} disabled={!knowledgeResource}>
                <SelectTrigger><SelectValue placeholder="اختر العنصر" /></SelectTrigger>
                <SelectContent>
                  {(resourceCategories[knowledgeResource] || []).map((res: string) => <SelectItem key={res} value={res}>{res}</SelectItem>)}
                </SelectContent>
              </Select>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateObjectives} disabled={loading || !specificResource} className="bg-accent w-full">
                {loading ? <Loader2 className="animate-spin h-5 w-5" /> : "إنشاء الأهداف"}
              </Button>
            </CardFooter>
          </Card>
        )}
        {step === 'objectives' && (
          <Card className="border-none shadow-xl">
            <CardHeader><CardTitle>2. اختيار الأهداف</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {aiObjectives.map((obj, i) => (
                <div key={i} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer" onClick={() => {
                  setSelectedObjectives(prev => prev.includes(obj) ? prev.filter(o => o !== obj) : [...prev, obj]);
                }}>
                  <Checkbox checked={selectedObjectives.includes(obj)} />
                  <Label>{obj}</Label>
                </div>
              ))}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setStep('curriculum')}>السابق</Button>
              <Button onClick={handleDraftPlan} disabled={loading || selectedObjectives.length === 0} className="bg-accent">صياغة المذكرة</Button>
            </CardFooter>
          </Card>
        )}
        {step === 'review' && lessonPlan && (
          <Card className="border-none shadow-xl">
            <CardHeader><CardTitle>مراجعة المذكرة</CardTitle></CardHeader>
            <CardContent className="space-y-6 text-start">
              <section>
                <h3 className="font-bold border-s-4 border-accent ps-2 mb-2">المرحلة التحضيرية</h3>
                <p className="whitespace-pre-wrap">{lessonPlan.introductoryStage}</p>
              </section>
              <section>
                <h3 className="font-bold border-s-4 border-primary ps-2 mb-2">المرحلة التعلمية</h3>
                <p className="whitespace-pre-wrap">{lessonPlan.buildingStage}</p>
              </section>
              <section>
                <h3 className="font-bold border-s-4 border-muted ps-2 mb-2">المرحلة الختامية</h3>
                <p className="whitespace-pre-wrap">{lessonPlan.finalStage}</p>
              </section>
            </CardContent>
            <CardFooter className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setStep('objectives')}>السابق</Button>
              <Button onClick={handleSaveLessonPlan} disabled={loading} className="bg-primary">حفظ المذكرة</Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
