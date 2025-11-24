import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { destinations } from '@/lib/data';
import { ArrowRight, Filter } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function DestinationsPage() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
        <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold tracking-tighter sm:text-5xl">All Destinations</h1>
            <p className="text-muted-foreground md:text-xl/relaxed">
                Find your next dream vacation from our curated list of world-class destinations.
            </p>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value="popularity">
                    <DropdownMenuRadioItem value="popularity">Popularity</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="cost-low-high">Cost: Low to High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="cost-high-low">Cost: High to Low</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {destinations.map((dest) => {
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
                <p className="mt-4 text-muted-foreground line-clamp-3 text-sm">{dest.description}</p>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                 <Button asChild variant="link" className="p-0 h-auto text-sm">
                    <Link href={`/destinations/${dest.slug}`}>
                        Explore More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
