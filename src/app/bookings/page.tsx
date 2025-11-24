'use client';

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Plane, Train, Hotel, Bus, Ship, Users, Minus, Plus } from "lucide-react"
import * as React from 'react';

const bookingTypes = [
  { value: "flights", label: "Flights", icon: Plane },
  { value: "trains", label: "Trains", icon: Train },
  { value: "hotels", label: "Hotels", icon: Hotel },
  { value: "buses", label: "Buses", icon: Bus },
  { value: "ships", label: "Ships", icon: Ship },
];

function PassengerCounter() {
    const [count, setCount] = React.useState(1);
    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCount(Math.max(1, count - 1))}>
                <Minus className="h-4 w-4" />
            </Button>
            <Input type="text" readOnly value={count} className="w-12 text-center" />
             <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCount(count + 1)}>
                <Plus className="h-4 w-4" />
            </Button>
        </div>
    )
}

function DatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

function BookingForm() {
    return (
        <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div className="grid gap-2">
              <Label htmlFor="from">From</Label>
              <Input id="from" placeholder="New York (JFK)" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="to">To</Label>
              <Input id="to" placeholder="Paris (CDG)" />
            </div>
            <div className="grid gap-2">
              <Label>Departure</Label>
              <DatePicker />
            </div>
             <div className="grid gap-2">
              <Label>Return</Label>
              <DatePicker />
            </div>
            <div className="grid gap-2">
                <Label>Passengers</Label>
                <PassengerCounter />
            </div>
            <div className="grid gap-2">
                <Label>Class</Label>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Economy" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="economy">Economy</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="first">First Class</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="lg:col-span-2">
                 <Button type="submit" className="w-full h-full">Search</Button>
            </div>
        </form>
    );
}

export default function BookingsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Book Your Trip</CardTitle>
          <CardDescription>Find and book flights, hotels, trains, and more.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="flights" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                {bookingTypes.map(({value, label, icon: Icon}) => (
                     <TabsTrigger key={value} value={value}>
                        <Icon className="mr-2 h-4 w-4"/>
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {bookingTypes.map(({value}) => (
                <TabsContent key={value} value={value} className="mt-6">
                    <BookingForm />
                </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
