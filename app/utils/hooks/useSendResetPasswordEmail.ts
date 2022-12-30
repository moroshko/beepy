import { AuthError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { browserSupabaseClient } from "utils/supabase/browser";

type Params = {
  email: string;
};

type ResponseData = {};

export const useSendResetPasswordEmail = () => {
  return useMutation<ResponseData, AuthError, Params>(async ({ email }) => {
    const { data, error } =
      await browserSupabaseClient.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/choose-password`,
      });

    if (error !== null) {
      throw error;
    }

    return data;
  });
};
