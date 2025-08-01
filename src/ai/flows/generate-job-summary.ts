'use server';

/**
 * @fileOverview Generates a summary for a job position based on the role and responsibilities provided.
 *
 * - generateJobSummary - A function that generates the job summary.
 * - GenerateJobSummaryInput - The input type for the generateJobSummary function.
 * - GenerateJobSummaryOutput - The return type for the generateJobSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateJobSummaryInputSchema = z.object({
  role: z.string().describe('The job role.'),
  responsibilities: z.string().describe('The responsibilities of the job.'),
});
export type GenerateJobSummaryInput = z.infer<typeof GenerateJobSummaryInputSchema>;

const GenerateJobSummaryOutputSchema = z.object({
  summary: z.string().describe('A summary of the job position.'),
});
export type GenerateJobSummaryOutput = z.infer<typeof GenerateJobSummaryOutputSchema>;

export async function generateJobSummary(input: GenerateJobSummaryInput): Promise<GenerateJobSummaryOutput> {
  return generateJobSummaryFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateJobSummaryPrompt',
  input: {schema: GenerateJobSummaryInputSchema},
  output: {schema: GenerateJobSummaryOutputSchema},
  prompt: `You are an expert resume writer.

  Given the following role and responsibilities, generate a compelling summary for a resume.

  Role: {{{role}}}
  Responsibilities: {{{responsibilities}}}

  Summary: `,
});

const generateJobSummaryFlow = ai.defineFlow(
  {
    name: 'generateJobSummaryFlow',
    inputSchema: GenerateJobSummaryInputSchema,
    outputSchema: GenerateJobSummaryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
