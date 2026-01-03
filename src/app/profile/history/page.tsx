import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { bookingHistory } from "@/lib/data"

export default function BookingHistoryPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-3xl">Booking History</CardTitle>
                <CardDescription>A record of all your past bookings with Jatra.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Booking ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Destination</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Cost</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookingHistory.map((booking) => (
                         <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.type}</TableCell>
                            <TableCell>{booking.destination}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell>
                                <Badge variant={booking.status === 'Confirmed' ? 'default' : booking.status === 'Cancelled' ? 'destructive' : 'secondary'}>
                                    {booking.status}
                                </Badge>
                            </TableCell>
                            <TableCell className="text-right">${booking.cost.toFixed(2)}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}
