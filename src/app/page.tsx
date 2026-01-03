import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { destinations } from '@/lib/data';
import { ArrowRight } from 'lucide-react';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero');
  const popularDestinations = destinations.slice(0, 3);

  return (
    <div className="flex flex-col min-h-[100dvh]">
      <section className="relative w-full h-[60vh] md:h-[80vh]">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-center justify-center text-center text-white">
          <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-6xl xl:text-7xl/none">
            Discover Your Next Adventure
          </h1>
          <p className="max-w-[600px] text-gray-200 md:text-xl mt-4">
            Jatra helps you find the perfect destinations and create personalized itineraries. Your journey begins here.
          </p>
          <div className="mt-6">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/destinations">Explore Destinations</Link>
            </Button>
          </div>
        </div>
      </section>

      <section id="destinations" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">Popular Destinations</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore some of the most sought-after travel spots in the world. From iconic cities to breathtaking landscapes.
              </p>
            </div>
          </div>
          <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {popularDestinations.map((dest) => {
              const destImage = PlaceHolderImages.find((img) => img.id === dest.imageId);
              return (
                <Card key={dest.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
                  <CardHeader className="p-0">
                    {destImage && (
                       <Image
                        alt={dest.name}
                        className="aspect-[4/3] w-full object-cover"
                        height={300}
                        src={destImage.imageUrl}
                        width={400}
                        data-ai-hint={destImage.imageHint}
                      />
                    )}
                  </CardHeader>
                  <CardContent className="p-6 flex-grow">
                    <CardTitle className="font-headline text-2xl">{dest.name}</CardTitle>
                    <CardDescription className="mt-2 text-base">{dest.country}</CardDescription>
                    <p className="mt-4 text-muted-foreground line-clamp-3">{dest.description}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                     <Button asChild variant="link" className="p-0 h-auto">
                        <Link href={`/destinations/${dest.slug}`}>
                            Explore More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
           <div className="text-center mt-12">
             <Button asChild size="lg" variant="outline">
                <Link href="/destinations">View All Destinations</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
