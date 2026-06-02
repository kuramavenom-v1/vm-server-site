import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://xenlpecmweogrkdtvbjg.supabase.co";

const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhlbmxwZWNtd2VvZ3JrZHR2YmpnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzNDcxMjcsImV4cCI6MjA5NTkyMzEyN30.pMa_3vBWQmbcmaoruAafYsm-6qxX_jfVXyl9wUcBPwU";

export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);