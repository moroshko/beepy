import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "../../../supabase/types";

const browserSupabaseClient = createBrowserSupabaseClient<Database>();

export type BrowserSupabaseClient = typeof browserSupabaseClient;

export { browserSupabaseClient };
