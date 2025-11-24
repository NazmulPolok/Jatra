import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from "lucide-react"

export default function AdminHotelsPage() {
  return (
     <div>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-headline font-bold">Hotels</h1>
                <p className="text-muted-foreground">Manage hotel listings and room allocations.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Hotel
            </Button>
        </div>
        <Card>
        <CardContent>
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead>Hotel Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Rooms</TableHead>
                <TableHead>Provider</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">Grand Hyatt</TableCell>
                    <TableCell>New York, USA</TableCell>
                    <TableCell>250</TableCell>
                    <TableCell>Hyatt Group</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className="font-medium">The Ritz</TableCell>
                    <TableCell>Paris, France</TableCell>
                    <TableCell>120</TableCell>
                    <TableCell>Marriott</TableCell>
                </TableRow>
            </TableBody>
            </Table>
        </CardContent>
        </Card>
    </div>
  )
}
