'use server';
/**
 * @fileOverview A personalized itinerary suggestion AI agent.
 *
 * - personalizedItineraryFromPrompt - A function that generates personalized itinerary suggestions.
 * - PersonalizedItineraryInput - The input type for the personalizedItineraryFromPrompt function.
 * - PersonalizedItineraryOutput - The return type for the personalizedItineraryFromPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedItineraryInputSchema = z.object({
  description: z
    .string()
    .describe(
      'A description of the ideal vacation, including preferences for location, activities, and pace.'
    ),
});
export type PersonalizedItineraryInput = z.infer<
  typeof PersonalizedItineraryInputSchema
>;

const PersonalizedItineraryOutputSchema = z.object({
  itinerary: z
    .string()
    .describe(
      'A detailed itinerary suggestion, including specific locations, activities, and estimated costs.'
    ),
});
export type PersonalizedItineraryOutput = z.infer<
  typeof PersonalizedItineraryOutputSchema
>;

export async function personalizedItineraryFromPrompt(
  input: PersonalizedItineraryInput
): Promise<PersonalizedItineraryOutput> {
  return personalizedItineraryFromPromptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedItineraryPrompt',
  input: {schema: PersonalizedItineraryInputSchema},
  output: {schema: PersonalizedItineraryOutputSchema},
  prompt: `You are an expert travel assistant who excels at creating detailed and personalized travel itineraries based on user descriptions.

  Based on the following description, generate a detailed itinerary suggestion, including specific locations, activities, and estimated costs.

  Description: {{{description}}}
  `,
});

const personalizedItineraryFromPromptFlow = ai.defineFlow(
  {
    name: 'personalizedItineraryFromPromptFlow',
    inputSchema: PersonalizedItineraryInputSchema,
    outputSchema: PersonalizedItineraryOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
