'use server';

import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

type SearchData = {
    search_type: string;
    from_location?: string;
    to_location?: string;
    departure_date?: Date;
    return_date?: Date;
    adults?: number;
    children?: number;
    class?: string;
    company_name?: string;
    rooms?: number;
};


export async function saveSearch(searchData: SearchData) {
  const cookieStore = cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  const dataToInsert = {
    ...searchData,
    user_id: user?.id,
  };

  const { data, error } = await supabase
    .from('searches')
    .insert([dataToInsert]);
    
  if (error) {
    console.error('Error inserting search data:', error);
    return { error: error.message };
  }

  return { data };
}
