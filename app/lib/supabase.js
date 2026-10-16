import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://jvvqzlxeijakbqmwnrqa.supabase.co'
const supabaseKey = 'sb_publishable_6gF4V4l6t_Qa2ywG4HePAg_srLgmW4B'
export const supabase = createClient(supabaseUrl, supabaseKey)
