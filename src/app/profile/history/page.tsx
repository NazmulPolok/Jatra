import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { format } from 'date-fns';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function BookingHistoryPage() {
  const cookieStore = cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login?next=/profile/history');
  }

  const isAdmin = user.email === process.env.ADMIN_EMAIL;

  const { data: searches, error } = await supabase
    .from('searches')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });


  if (error) {
    console.error('Error fetching booking history:', error);
  }

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            Booking History
          </CardTitle>
          <CardDescription>
            {isAdmin 
              ? <>A record of your personal searches. To view all platform searches, please visit the <Link href="/admin/bookings" className="underline">Admin Panel</Link>.</>
              : "A record of all your past searches with Jatra."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Search Date</TableHead>
                <TableHead>Passengers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(searches || []).map((search: any) => (
                <TableRow key={search.id}>
                  <TableCell className="font-medium capitalize">
                    {search.search_type}
                  </TableCell>
                  <TableCell>{search.from_location}</TableCell>
                  <TableCell>{search.to_location}</TableCell>
                  <TableCell>
                    {format(new Date(search.created_at), 'PPP')}
                  </TableCell>
                  <TableCell>
                    {(search.adults || 0) + (search.children || 0)}
                  </TableCell>
                </TableRow>
              ))}
              {(!searches || searches.length === 0) && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    You have no search history yet.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
