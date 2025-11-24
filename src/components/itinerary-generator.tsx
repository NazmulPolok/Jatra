'use client';

import { useState } from 'react';
import { personalizedItineraryFromPrompt, PersonalizedItineraryOutput } from '@/ai/flows/personalized-itinerary-from-prompt';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Skeleton } from './ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Terminal } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from './ui/scroll-area';

export default function ItineraryGenerator() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PersonalizedItineraryOutput | null>(null);
  const [description, setDescription] = useState('');
  const { toast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!description.trim()) {
        toast({
            title: "Description is empty",
            description: "Please describe your ideal vacation.",
            variant: "destructive",
        });
        return;
    }
    setLoading(true);
    setResult(null);

    try {
      const response = await personalizedItineraryFromPrompt({ description });
      setResult(response);
    } catch (e) {
        toast({
            title: "Error Generating Itinerary",
            description: "Something went wrong. Please try again later.",
            variant: "destructive",
        });
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          placeholder="e.g., A relaxing 5-day beach vacation in Southeast Asia with a mix of cultural experiences and good food. Budget is around $2000."
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="text-base"
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Generating...' : 'Generate Itinerary'}
        </Button>
      </form>

      {loading && (
        <div className="mt-8 space-y-4">
            <Skeleton className="h-8 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
        </div>
      )}

      {result && (
        <Alert className="mt-8">
          <Terminal className="h-4 w-4" />
          <AlertTitle className="font-headline text-xl">Your Personalized Itinerary!</AlertTitle>
          <AlertDescription>
            <ScrollArea className="h-72 w-full mt-4">
                <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap">
                    {result.itinerary}
                </div>
            </ScrollArea>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
