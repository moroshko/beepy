import { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { browserSupabaseClient } from "utils/supabase/browser";

export const useLogout = () => {
  return useMutation<undefined, AuthError>(async () => {
    const { error } = await browserSupabaseClient.auth.signOut();

    if (error !== null) {
      throw error;
    }

    return undefined;
  });
};
