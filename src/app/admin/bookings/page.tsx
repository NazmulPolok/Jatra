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

export default async function AdminBookingsPage() {
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

  const { data: searches, error } = await supabase
    .from('searches')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching searches:', error);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bookings</CardTitle>
        <CardDescription>
          View recent searches made by users. This shows raw data from your
          `searches` table.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User ID</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>From</TableHead>
              <TableHead>To</TableHead>
              <TableHead>Search Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {(searches || []).map((search: any) => (
              <TableRow key={search.id}>
                <TableCell className="font-medium truncate max-w-xs">
                  {search.user_id || 'Anonymous'}
                </TableCell>
                <TableCell>{search.search_type}</TableCell>
                <TableCell>{search.from_location}</TableCell>
                <TableCell>{search.to_location}</TableCell>
                <TableCell>
                  {format(new Date(search.created_at), 'PPP')}
                </TableCell>
              </TableRow>
            ))}
            {(!searches || searches.length === 0) && (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No searches found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
