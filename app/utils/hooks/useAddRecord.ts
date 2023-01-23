import { PostgrestError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { browserSupabaseClient } from "utils/supabase/browser";

type Params = {
  sys: number;
  dia: number;
  pulse: number;
};

export const useAddRecord = () => {
  return useMutation<undefined, PostgrestError, Params>(
    async ({ sys, dia, pulse }) => {
      const { error } = await browserSupabaseClient
        .from("records")
        .insert([{ sys, dia, pulse }]);

      if (error !== null) {
        throw error;
      }

      return undefined;
    }
  );
};
