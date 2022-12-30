import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";

const serverComponentSupabaseClient = () => {
  return createServerComponentSupabaseClient({ headers, cookies });
};

export { serverComponentSupabaseClient };
