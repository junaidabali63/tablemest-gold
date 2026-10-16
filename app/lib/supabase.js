import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zqdfhtjoqlmnwrsryfmy.supabase.co';
const supabaseAnonKey = 'sb_publishable_6gF4V4l6t_Qa2ywG4HePAg_srLgmW4B';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
