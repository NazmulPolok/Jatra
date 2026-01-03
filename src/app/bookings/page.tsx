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
import { CalendarIcon, Plane, Train, Hotel, Bus, Ship, Users, Minus, Plus, Bed, User } from "lucide-react"
import * as React from 'react';
import { DateRange } from "react-day-picker"

const bookingTypes = [
  { value: "flights", label: "Flights", icon: Plane },
  { value: "trains", label: "Trains", icon: Train },
  { value: "hotels", label: "Hotels", icon: Hotel },
  { value: "buses", label: "Buses", icon: Bus },
  { value: "ships", label: "Ships", icon: Ship },
];

function PassengerCounter({
  count,
  setCount,
  min = 0
}: {
  count: number;
  setCount: (value: number) => void;
  min?: number;
}) {
    return (
        <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => setCount(Math.max(min, count - 1))}>
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

function HotelDatePicker({ className }: React.HTMLAttributes<HTMLDivElement>) {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2025, 0, 3),
    to: new Date(2025, 0, 4),
  })

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal h-12",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}


function BookingForm() {
    const [passengers, setPassengers] = React.useState(1);
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
                <PassengerCounter count={passengers} setCount={setPassengers} min={1}/>
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

function HotelBookingForm() {
    const [adults, setAdults] = React.useState(2);
    const [children, setChildren] = React.useState(0);
    const [rooms, setRooms] = React.useState(1);
    const [childrenAges, setChildrenAges] = React.useState<number[]>([]);

    React.useEffect(() => {
        setChildrenAges(currentAges => {
            const newAges = new Array(children).fill(6);
            for(let i=0; i < Math.min(children, currentAges.length); i++) {
                newAges[i] = currentAges[i];
            }
            return newAges;
        });
    }, [children]);

    const handleAgeChange = (index: number, age: string) => {
        const newAges = [...childrenAges];
        newAges[index] = parseInt(age, 10);
        setChildrenAges(newAges);
    }
    
    return (
        <div className="bg-white p-2 rounded-lg shadow-lg border-2 border-primary">
            <form className="grid grid-cols-1 lg:grid-cols-12 gap-px">
                <div className="relative lg:col-span-5">
                    <Bed className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input id="destination" placeholder="Dhaka, Bangladesh" className="h-12 pl-10 border-0 focus-visible:ring-0" />
                </div>
                <div className="lg:col-span-3">
                    <HotelDatePicker />
                </div>
                <div className="relative lg:col-span-4">
                     <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="w-full justify-start text-left font-normal h-12 border-0"
                            >
                                <User className="mr-2 h-4 w-4" />
                                {adults} adults · {children} children · {rooms} room
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-96">
                            <div className="grid gap-4">
                                <div className="space-y-2">
                                    <h4 className="font-medium leading-none">Guests & Rooms</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Select number of guests and rooms.
                                    </p>
                                </div>
                                <div className="grid gap-4">
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="adults">Adults</Label>
                                        <PassengerCounter count={adults} setCount={setAdults} min={1} />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <Label htmlFor="children">Children</Label>
                                        <PassengerCounter count={children} setCount={setChildren} min={0}/>
                                    </div>
                                     <div className="flex items-center justify-between">
                                        <Label htmlFor="rooms">Rooms</Label>
                                        <PassengerCounter count={rooms} setCount={setRooms} min={1}/>
                                    </div>

                                    {children > 0 && (
                                        <div className="space-y-4">
                                            <div className="grid grid-cols-2 gap-4">
                                            {
                                                Array.from({length: children}).map((_, index) => (
                                                     <div key={index} className="grid gap-2">
                                                        <Select value={childrenAges[index]?.toString()} onValueChange={(value) => handleAgeChange(index, value)}>
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Age" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {Array.from({length: 18}).map((_, age) => (
                                                                    <SelectItem key={age} value={age.toString()}>{age} years old</SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                     </div>
                                                ))
                                            }
                                            </div>

                                            <p className="text-sm text-muted-foreground">
                                                To find a place to stay that fits your entire group along with correct prices, we need to know how old your children will be at check-out
                                            </p>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </form>
        </div>
    )
}

export default function BookingsPage() {
  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-5xl mx-auto bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Book Your Trip</CardTitle>
          <CardDescription>Find and book flights, hotels, trains, and more.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="hotels" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                {bookingTypes.map(({value, label, icon: Icon}) => (
                     <TabsTrigger key={value} value={value}>
                        <Icon className="mr-2 h-4 w-4"/>
                        {label}
                    </TabsTrigger>
                ))}
            </TabsList>
            
            <TabsContent value="flights" className="mt-6">
                <BookingForm />
            </TabsContent>
            <TabsContent value="trains" className="mt-6">
                <BookingForm />
            </TabsContent>
            <TabsContent value="hotels" className="mt-6">
                <HotelBookingForm />
            </TabsContent>
            <TabsContent value="buses" className="mt-6">
                <BookingForm />
            </TabsContent>
            <TabsContent value="ships" className="mt-6">
                <BookingForm />
            </TabsContent>

          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
