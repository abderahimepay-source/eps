'use server';
/**
 * @fileOverview This file implements a Genkit flow for drafting a comprehensive
 * Physical Education lesson plan in Arabic, structured according to Algerian
 * pedagogical stages.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DraftLessonPlanInputSchema = z.object({
  selectedObjective: z
    .array(z.string())
    .describe('An array of selected SMART objectives for the lesson plan.'),
  terminalCompetence: z
    .string()
    .describe(
      'The terminal competence related to the study year and learning field.'
    ),
});
export type DraftLessonPlanInput = z.infer<typeof DraftLessonPlanInputSchema>;

const DraftLessonPlanOutputSchema = z.object({
  introductoryStage: z
    .string()
    .describe('Detailed content for the introductory stage of the lesson plan.'),
  buildingStage: z
    .string()
    .describe('Detailed content for the main learning (building) stage of the lesson plan.'),
  finalStage: z
    .string()
    .describe('Detailed content for the final stage of the lesson plan.'),
  usage: z.object({
    inputTokens: z.number().optional(),
    outputTokens: z.number().optional(),
    totalTokens: z.number().optional(),
  }).optional(),
});
export type DraftLessonPlanOutput = z.infer<typeof DraftLessonPlanOutputSchema>;

export async function draftLessonPlan(
  input: DraftLessonPlanInput
): Promise<DraftLessonPlanOutput> {
  const response = await draftLessonPlanPrompt(input);
  const output = response.output;
  if (!output) throw new Error('Failed to draft lesson plan.');

  return {
    ...output,
    usage: {
      inputTokens: response.usage?.inputTokens,
      outputTokens: response.usage?.outputTokens,
      totalTokens: response.usage?.totalTokens,
    }
  };
}

const draftLessonPlanPrompt = ai.definePrompt({
  name: 'draftLessonPlanPrompt',
  input: {schema: DraftLessonPlanInputSchema},
  output: {schema: DraftLessonPlanOutputSchema},
  prompt: `أنت أستاذ خبير في التربية البدنية الجزائرية ولديك معرفة عميقة بالمناهج والمصطلحات البيداغوجية الرسمية.
وبصفتك خبيرًا في الأنشطة والألعاب البدنية وشبه الرياضية الخاصة بالفئة العمرية للطور الابتدائي، مهمتك هي تصميم مذكرة بيداغوجية كاملة وفق "المقاربة بالكفاءات".

الكفاءة الختامية:
{{{terminalCompetence}}}

الأهداف الإجرائية المختارة:
{{#each selectedObjective}}
- {{{this}}}
{{/each}}

يجب أن تتضمن المذكرة العناصر التالية بالتفصيل:

1.  المرحلة التحضيرية (10-15 د): تشمل الجانب التنظيمي، التسخين العام والخاص، ولعبة تمهيدية.
2.  المرحلة التعلمية (الرئيسية) (25-30 د): تشمل مواقف تعلمية على شكل ألعاب شبه رياضية أو ورشات أو مسالك فنية تخدم الهدف من الحصة.
3.  المرحلة الختامية (5-10 د): تشمل لعبة هادئة أو تمرين استرخاء، وجمع الأدوات.

تأكد من أن المحتوى يستخدم المصطلحات البيداغوجية الجزائرية الرسمية والهيكل التربوي المناسب لدرس التربية البدنية في الجزائر.
ركز على تصميم محتوى المرحلة التعلمية الرئيسة بشكل سليم ويخدم الأهداف المحددة.`
});
