-- supabase/migrations/0002_allow_search_inserts.sql

-- Enable Row Level Security if it's not already enabled for the table
ALTER TABLE searches ENABLE ROW LEVEL SECURITY;

-- Drop any existing insert policy to avoid conflicts
DROP POLICY IF EXISTS "Allow all users to insert searches" ON searches;

-- Create a new policy that allows any user (authenticated or anonymous) to insert into the searches table
CREATE POLICY "Allow all users to insert searches"
ON searches
FOR INSERT
WITH CHECK (true);
