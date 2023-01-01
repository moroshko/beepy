import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = req.nextUrl;
  const supabase = createMiddlewareSupabaseClient({ req, res });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  console.log("\n--- middleware ---", new Date());
  console.log({ pathname, session });
  console.log("");

  // This redirect is not possible at the moment because when user confirms their email
  // and gets redirected here, the `session` will be null during the first middleware hit.
  // See: https://github.com/supabase/auth-helpers/issues/341#issuecomment-1319502599
  // if (pathname === "/" && session === null) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  return res;
}

// Any Server Component route that uses a Supabase client must be added to this middleware's matcher array.
// Without this, the Server Component may try to make a request to Supabase with an expired access_token.
// See: https://supabase.com/docs/guides/auth/auth-helpers/nextjs-server-components#middleware
export const config = {
  matcher: ["/", "/choose-password"],
};