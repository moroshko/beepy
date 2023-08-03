import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Database } from "./types";

const serverComponentSupabaseClient = () => {
  return createServerComponentClient<Database>({ cookies });
};

export type ServerComponentSupabaseClient = ReturnType<
  typeof serverComponentSupabaseClient
>;

export { serverComponentSupabaseClient };
