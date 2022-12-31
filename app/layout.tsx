import "./globals.css";
// This line needs to be empty to keep `globals.css` first!
import { Inter } from "@next/font/google";
import { Providers } from "components/Providers";
import { ReactNode } from "react";
import "server-only";
import { SupabaseListener } from "./components/SupabaseListener";
import { serverComponentSupabaseClient } from "./utils/supabase/server";

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

const RootLayout = async ({ children }: Props) => {
  const supabase = serverComponentSupabaseClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent head.tsx. 
        Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className={inter.className}>
        <SupabaseListener accessToken={session?.access_token} />
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
};

export const revalidate = 0;

export default RootLayout;
