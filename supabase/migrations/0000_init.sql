-- Create the destinations table
CREATE TABLE destinations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT,
    long_description TEXT,
    estimated_cost NUMERIC,
    image_id TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the attractions table
CREATE TABLE attractions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create the itinerary_items table
CREATE TABLE itinerary_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    destination_id UUID REFERENCES destinations(id) ON DELETE CASCADE,
    day INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create a custom type for booking types
CREATE TYPE booking_type AS ENUM ('Flight', 'Hotel', 'Train', 'Bus', 'Ship');

-- Create a custom type for booking status
CREATE TYPE booking_status AS ENUM ('Confirmed', 'Pending', 'Cancelled');

-- Create the bookings table
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    destination_id UUID REFERENCES destinations(id) ON DELETE SET NULL,
    booking_date DATE NOT NULL,
    type booking_type NOT NULL,
    status booking_status NOT NULL DEFAULT 'Pending',
    cost NUMERIC,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for foreign keys to improve query performance
CREATE INDEX ON attractions (destination_id);
CREATE INDEX ON itinerary_items (destination_id);
CREATE INDEX ON bookings (user_id);
CREATE INDEX ON bookings (destination_id);

-- Enable Row Level Security (RLS) for all tables
ALTER TABLE destinations ENABLE ROW LEVEL SECURITY;
ALTER TABLE attractions ENABLE ROW LEVEL SECURITY;
ALTER TABLE itinerary_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to destinations data
CREATE POLICY "Allow public read access to destinations" ON destinations FOR SELECT USING (true);
CREATE POLICY "Allow public read access to attractions" ON attractions FOR SELECT USING (true);
CREATE POLICY "Allow public read access to itinerary items" ON itinerary_items FOR SELECT USING (true);

-- Create policies for user-specific access to bookings
CREATE POLICY "Allow users to view their own bookings" ON bookings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Allow users to create their own bookings" ON bookings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Allow users to update their own bookings" ON bookings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Allow users to delete their own bookings" ON bookings FOR DELETE USING (auth.uid() = user_id);
