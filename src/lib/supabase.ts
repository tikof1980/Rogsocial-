import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zikowpdsjhtmtyjkagpb.supabase.co';
const supabaseKey = 'sb_publishable_coyzh3s6sCoMg4OKK-Y0_A_eShX9UWq';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface Profile {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
}
