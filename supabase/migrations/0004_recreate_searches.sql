-- Drop existing searches table if it exists
DROP TABLE IF EXISTS searches;

-- Recreate searches table without foreign key to auth.users
CREATE TABLE searches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    user_id UUID, -- Removed foreign key constraint
    search_type TEXT NOT NULL,
    from_location TEXT,
    to_location TEXT,
    departure_date DATE,
    return_date DATE,
    adults INT,
    children INT,
    class TEXT,
    company_name TEXT,
    rooms INT
);

-- Enable RLS
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts for any user (logged in or anonymous)
CREATE POLICY "Allow all users to insert searches" ON searches
FOR INSERT
WITH CHECK (true);

-- Policy to allow admin (checked via middleware) to read all searches
CREATE POLICY "Allow authenticated users to read searches" ON searches
FOR SELECT
USING ( auth.role() = 'authenticated' );
