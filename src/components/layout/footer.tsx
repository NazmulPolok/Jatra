import Link from 'next/link';
import { TripoLogo } from '@/components/icons/logo';

export default function Footer() {
  return (
    <footer className="border-t bg-background/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block">
              <TripoLogo />
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Your personalized travel guide.
            </p>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Explore</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="/destinations" className="text-muted-foreground hover:text-primary">Destinations</Link></li>
              <li><Link href="/bookings" className="text-muted-foreground hover:text-primary">Bookings</Link></li>
              <li><Link href="/personalized-itinerary" className="text-muted-foreground hover:text-primary">AI Itinerary</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline font-semibold">Connect</h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Facebook</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Twitter</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Instagram</Link></li>
            </ul>
          </div>
        </div>
        <div className="py-6 text-center text-sm text-muted-foreground border-t">
          &copy; {new Date().getFullYear()} Tripo, Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
