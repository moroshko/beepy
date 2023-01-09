"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isPublicPage } from "utils/page_";
import { browserSupabaseClient } from "utils/supabase/browser";

type Props = {
  accessToken?: string;
};

const SupabaseListener = ({ accessToken }: Props) => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    browserSupabaseClient.auth.onAuthStateChange((event, session) => {
      console.log({ event, session });

      if (event === "PASSWORD_RECOVERY") {
        router.push("/choose-password");
      } else if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
  }, [router, accessToken]);

  useEffect(() => {
    const redirectToLoginIfLoggedOut = async () => {
      const {
        data: { user },
      } = await browserSupabaseClient.auth.getUser();

      if (user === null && isPublicPage(pathname) === false) {
        router.push("/login");
      }
    };

    redirectToLoginIfLoggedOut();
  }, [pathname, router]);

  return null;
};

export { SupabaseListener };
