import ItineraryGenerator from '@/components/itinerary-generator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Wand2 } from 'lucide-react';

export default function PersonalizedItineraryPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="max-w-4xl mx-auto shadow-lg">
        <CardHeader className="text-center">
            <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                <Wand2 className="h-8 w-8 text-primary"/>
            </div>
          <CardTitle className="font-headline text-3xl md:text-4xl">Create Your Dream Trip</CardTitle>
          <CardDescription className="text-lg text-muted-foreground mt-2">
            Let our AI craft a personalized itinerary just for you. Describe your ideal vacation,
            and we&apos;ll handle the planning.
          </CardDescription>
        </CardHeader>
        <CardContent>
            <ItineraryGenerator />
        </CardContent>
      </Card>
    </div>
  );
}
