import { PostgrestError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { browserSupabaseClient } from "utils/supabase/browser";

type Params = {
  sys: number;
  dia: number;
  pulse: number;
};

type SuccessResponse = {
  id: string;
};

export const useAddRecord = () => {
  return useMutation<SuccessResponse, PostgrestError, Params>(
    async ({ sys, dia, pulse }) => {
      const { data, error } = await browserSupabaseClient
        .from("records")
        .insert([{ sys, dia, pulse }])
        .select()
        .single();

      if (error !== null) {
        throw error;
      }

      return {
        id: data.id,
      };
    }
  );
};
