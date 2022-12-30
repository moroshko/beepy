import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const browserSupabaseClient = createBrowserSupabaseClient();

export { browserSupabaseClient };
