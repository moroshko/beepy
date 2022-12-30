import { AuthError, User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { browserSupabaseClient } from "utils/supabase/browser";

type Params = {
  password: string;
};

type ResponseData = {
  user: User;
};

export const useUpdatePassword = () => {
  return useMutation<ResponseData, AuthError, Params>(async ({ password }) => {
    const { data, error } = await browserSupabaseClient.auth.updateUser({
      password,
    });

    if (error !== null) {
      throw error;
    }

    return data;
  });
};
