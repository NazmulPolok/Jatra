
-- Enable RLS on the 'searches' table if it's not already enabled
ALTER TABLE public.searches ENABLE ROW LEVEL SECURITY;

-- Drop the old policy if it exists
DROP POLICY IF EXISTS "Allow public insert for all users" ON public.searches;
DROP POLICY IF EXISTS "Allow insert for all users" ON public.searches;


-- Create a new policy that allows inserts for everyone
-- This will allow anonymous users to save searches (user_id will be NULL)
-- And will allow authenticated users to save searches with their user_id
CREATE POLICY "Allow insert for all users" ON "public"."searches"
AS PERMISSIVE FOR INSERT
TO public
WITH CHECK (true);
