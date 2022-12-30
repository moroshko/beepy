import { AuthError, Session, User } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { browserSupabaseClient } from "utils/supabase/browser";

type Params = {
  email: string;
  password: string;
};

type ResponseData = {
  user: User | null;
  session: Session | null;
};

export const useSignUp = () => {
  return useMutation<ResponseData, AuthError, Params>(
    async ({ email, password }) => {
      const { data, error } = await browserSupabaseClient.auth.signUp({
        email,
        password,
      });

      if (error !== null) {
        throw error;
      }

      return data;
    }
  );
};
