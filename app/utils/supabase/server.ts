import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "../../../supabase/types";

const serverComponentSupabaseClient = () => {
  return createServerComponentSupabaseClient<Database>({ headers, cookies });
};

export type ServerComponentSupabaseClient = ReturnType<
  typeof serverComponentSupabaseClient
>;

export { serverComponentSupabaseClient };
