import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "./types";

const browserSupabaseClient = createBrowserSupabaseClient<Database>();

export type BrowserSupabaseClient = typeof browserSupabaseClient;

export { browserSupabaseClient };
