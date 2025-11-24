import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusCircle } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminTransportPage() {
  return (
     <div>
        <div className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-headline font-bold">Transport</h1>
                <p className="text-muted-foreground">Manage transport schedules and availability.</p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Schedule
            </Button>
        </div>
        <Card>
            <CardContent className="pt-6">
                 <Tabs defaultValue="flights">
                    <TabsList>
                        <TabsTrigger value="flights">Flights</TabsTrigger>
                        <TabsTrigger value="trains">Trains</TabsTrigger>
                        <TabsTrigger value="buses">Buses</TabsTrigger>
                    </TabsList>
                    <TabsContent value="flights" className="mt-4">
                        <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Flight No.</TableHead>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Departure</TableHead>
                                <TableHead>Availability</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell>UA234</TableCell>
                                <TableCell>JFK</TableCell>
                                <TableCell>CDG</TableCell>
                                <TableCell>2024-08-15 10:00</TableCell>
                                <TableCell>150 seats</TableCell>
                            </TableRow>
                        </TableBody>
                        </Table>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    </div>
  )
}
