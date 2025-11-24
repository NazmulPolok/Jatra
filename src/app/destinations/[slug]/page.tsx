import { notFound } from 'next/navigation';
import Image from 'next/image';
import { destinations } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, Clock, Check } from 'lucide-react';
import Link from 'next/link';

export function generateStaticParams() {
    return destinations.map((destination) => ({
        slug: destination.slug,
    }));
}

export default function DestinationDetailPage({ params }: { params: { slug: string } }) {
    const destination = destinations.find((d) => d.slug === params.slug);

    if (!destination) {
        notFound();
    }

    const heroImage = PlaceHolderImages.find((img) => img.id === destination.imageId);

    return (
        <div>
            <section className="relative w-full h-[50vh]">
                {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={destination.name}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint={heroImage.imageHint}
                />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
                <div className="relative container mx-auto px-4 md:px-6 h-full flex flex-col items-start justify-end pb-12 text-white">
                    <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-6xl">
                        {destination.name}
                    </h1>
                    <p className="flex items-center gap-2 text-xl mt-2">
                        <MapPin className="h-5 w-5" />
                        {destination.country}
                    </p>
                </div>
            </section>

            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
                    <div className="md:col-span-2 space-y-8">
                        <div>
                            <h2 className="text-3xl font-headline font-bold">About {destination.name}</h2>
                            <p className="mt-4 text-lg text-muted-foreground">{destination.longDescription}</p>
                        </div>
                        
                        <Accordion type="single" collapsible defaultValue="item-0">
                            <h2 className="text-3xl font-headline font-bold mb-4">Attractions & Itinerary</h2>
                            <AccordionItem value="item-0">
                                <AccordionTrigger className="text-xl font-bold">Top Attractions</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-4 pt-4">
                                        {destination.attractions.map(attraction => (
                                            <li key={attraction.name} className="flex gap-4">
                                                <Check className="h-6 w-6 text-primary mt-1 flex-shrink-0"/>
                                                <div>
                                                    <h4 className="font-bold">{attraction.name}</h4>
                                                    <p className="text-muted-foreground">{attraction.description}</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="text-xl font-bold">Suggested Itinerary</AccordionTrigger>
                                <AccordionContent>
                                     <div className="space-y-6 pt-4">
                                        {destination.suggestedItinerary.map(item => (
                                            <div key={item.day} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                                                        {item.day}
                                                    </div>
                                                    {destination.suggestedItinerary.length > item.day && <div className="w-px h-full bg-border"></div>}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg">{item.title}</h4>
                                                    <p className="text-muted-foreground">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>

                    </div>
                    <div className="md:col-span-1">
                        <Card className="sticky top-24 shadow-lg">
                            <CardHeader>
                                <CardTitle className="font-headline text-2xl">Trip Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-2 text-lg">
                                    <DollarSign className="h-5 w-5 text-muted-foreground" />
                                    <span>Estimated Cost: <span className="font-bold">${destination.estimatedCost}</span></span>
                                </div>
                                <div className="flex items-center gap-2 text-lg">
                                    <Clock className="h-5 w-5 text-muted-foreground" />
                                    <span>Duration: <span className="font-bold">{destination.suggestedItinerary.length} Days</span></span>
                                </div>
                                <Button asChild size="lg" className="w-full mt-4">
                                    <Link href="/bookings">Book This Trip</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
