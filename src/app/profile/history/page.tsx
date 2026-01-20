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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

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

  let query = supabase.from('searches').select('*');

  if (!isAdmin) {
    query = query.eq('user_id', user.id);
  }

  const { data: searches, error } = await query.order('created_at', {
    ascending: false,
  });


  if (error) {
    console.error('Error fetching booking history:', error);
  }

  const noSearches = !searches || searches.length === 0;

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-3xl">
            Booking History
          </CardTitle>
          <CardDescription>
            {isAdmin
              ? 'A record of all user searches on the platform.'
              : 'A record of all your past searches with Jatra.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isAdmin && noSearches && (
            <Alert variant="destructive" className="mb-6">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Admin Notice: No Data Found</AlertTitle>
              <AlertDescription>
                <p>
                  No search history is appearing. This is likely because your
                  database's Row Level Security (RLS) is preventing access.
                </p>
                <p className="mt-2">
                  To fix this, please run the following command in your Supabase
                  SQL Editor to allow admins to view all searches:
                </p>
                <pre className="mt-2 rounded-md bg-muted p-4 text-xs font-mono">
                  <code>
                    {`-- Ensure RLS is enabled on the 'searches' table first.\n` +
                     `-- Then, drop any old restrictive SELECT policies.\n\n` +
                     `CREATE POLICY "Allow authenticated users to view all searches"\n` +
                     `ON public.searches\n` +
                     `FOR SELECT\n` +
                     `TO authenticated\n` +
                     `USING (true);`}
                  </code>
                </pre>
              </AlertDescription>
            </Alert>
          )}

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
              {(searches && searches.length > 0) ? (
                searches.map((search: any) => (
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
              ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                     {isAdmin
                      ? 'No searches found in the database.'
                      : 'You have no search history yet.'}
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
