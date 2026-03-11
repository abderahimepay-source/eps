'use server';
/**
 * @fileOverview A Genkit flow for generating 5 SMART lesson objectives in Arabic based on
 * curriculum details provided by the user.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateObjectivesInputSchema = z.object({
  studyYear: z.string().describe('The study year (e.g., "السنة الأولى ابتدائي").'),
  learningField: z.string().describe('The learning field title (e.g., "الوضعيّات والتنقلات").'),
  knowledgeResource: z.string().describe('The specific knowledge resource category (e.g., "وضعيات_الوقوف").'),
  specificResource: z.string().describe('A specific item within the knowledge resource (e.g., "الوقوف العادي").'),
});

export type GenerateObjectivesInput = z.infer<typeof GenerateObjectivesInputSchema>;

const InternalPromptInputSchema = GenerateObjectivesInputSchema.extend({
  finalCompetencyForField: z.string(),
});

const GenerateObjectivesOutputSchema = z.object({
  objectives: z.array(z.string()).min(5).max(5).describe('An array of 5 SMART lesson objectives in Arabic.'),
  terminalCompetence: z.string().describe('The final competency related to the selected study year and learning field.'),
  usage: z.object({
    inputTokens: z.number().optional(),
    outputTokens: z.number().optional(),
    totalTokens: z.number().optional(),
  }).optional(),
});

export type GenerateObjectivesOutput = z.infer<typeof GenerateObjectivesOutputSchema>;

export async function generateObjectives(
  input: GenerateObjectivesInput
): Promise<GenerateObjectivesOutput> {
  const { CURRICULUM_DATA } = await import('@/lib/curriculum');
  const gradeData = CURRICULUM_DATA.curriculum_data.find(g => g.grade_name === input.studyYear);
  
  if (!gradeData) throw new Error(`Study year "${input.studyYear}" not found.`);
  const fieldData = gradeData.fields.find(f => f.field_name === input.learningField);
  if (!fieldData) throw new Error(`Learning field "${input.learningField}" not found.`);

  const promptInput = { 
    ...input, 
    finalCompetencyForField: fieldData.final_competence 
  };
  
  try {
    const response = await generateObjectivesPrompt(promptInput);
    const output = response.output;

    if (!output) {
      throw new Error('لم يتمكن الذكاء الاصطناعي من توليد الأهداف. يرجى المحاولة مرة أخرى.');
    }

    return {
      objectives: output.objectives,
      terminalCompetence: fieldData.final_competence,
      usage: {
        inputTokens: response.usage?.inputTokens,
        outputTokens: response.usage?.outputTokens,
        totalTokens: response.usage?.totalTokens,
      }
    };
  } catch (error: any) {
    console.error("Genkit generateObjectives Error:", error);
    throw new Error(error.message || 'فشل الاتصال بخدمة الذكاء الاصطناعي');
  }
}

const generateObjectivesPrompt = ai.definePrompt({
  name: 'generateObjectivesPrompt',
  input: { schema: InternalPromptInputSchema },
  output: { schema: GenerateObjectivesOutputSchema },
  prompt: `أنت خبير في المناهج التربوية الجزائرية (2023). مهمتك هي استقبال [المستوى]، [الكفاءة الختامية]، و[المورد المعرفي]. يجب عليك توليد 5 هدفاً تعلمياً تتبع قاعدة (SMART) وتصاغ وفق الهيكل التالي: (أن + فعل إجرائي قابل للقياس + المتعلم + المورد + معيار الأداء أو شرطه). تجنب الأفعال الغامضة مثل (يفهم، يعرف، يدرك). ركز على الأفعال الحركية مثل (يؤدي، ينجز، يرمي، يربط، يحافظ)
مع التركيز على مادة التربية البدنية و الرياضية للطور الابتدائي اي على المنهاج التربوي الجزائري الخاص بمادة التربية البدنية و الرياضية للطور الابتدائي
مهمتك هي صياغة 5 هدفاً إجرائياً دقيقاً وقابلاً للقياس والتحقيق (SMART objectives) بناءً على المعلومات التالية المستخرجة من المنهج.
\tالسنة الدراسية: {{{studyYear}}}
\tميدان التعلم: {{{learningField}}}
\tالكفاءة الختامية للميدان: {{{finalCompetencyForField}}}
\tالمورد المعرفي المحدد: {{{knowledgeResource}}}
\tعناصر المورد المعرفي: {{{specificResource}}}
بالنظر إلى المعلومات أعلاه، قم بإنشاء 5 هدفاً إجرائياً للدرس، بحيث تكون هذه الأهداف:
\tقابلة للقياس والملاحظة.
\tمرتبطة مباشرة بالكفاءات والموارد المعرفية المقدمة.
\tمتنوعة لتغطية جوانب مختلفة من المورد المعرفي.
\tصياغتها باللغة العربية الفصحى.`,
});
