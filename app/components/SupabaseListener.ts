"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { browserSupabaseClient } from "utils/supabase/browser";

type Props = {
  accessToken?: string;
};
const SupabaseListener = ({ accessToken }: Props) => {
  const router = useRouter();

  useEffect(() => {
    browserSupabaseClient.auth.onAuthStateChange((event, session) => {
      console.log({ event, session });

      if (session?.access_token !== accessToken) {
        router.refresh();
      }
    });
  }, [router, accessToken]);

  return null;
};

export { SupabaseListener };
