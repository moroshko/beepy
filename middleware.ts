import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { Database } from "./supabase/types";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>({ req, res });
  /*const {
    data: { session },
  } =*/ await supabase.auth.getSession();

  // This redirect is not possible here because when the user confirms their email
  // and gets redirected here, the `session` will be null during the first middleware hit.
  // See: https://github.com/supabase/auth-helpers/issues/341#issuecomment-1319502599
  // if (req.nextUrl.pathname === "/" && session === null) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return res;
}

// Any Server Component route that uses a Supabase client must be added to this middleware's matcher array.
// Without this, the Server Component may try to make a request to Supabase with an expired access_token.
// See: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-server-components#middleware
export const config = {
  matcher: ["/", "/history", "/profile", "/choose-password"],
};
