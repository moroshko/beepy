import { PostgrestError } from "@supabase/supabase-js";

export const transformSupabaseError = (error: PostgrestError): Error => {
  if (error.hint) {
    return new Error(`${error.message} (${error.hint})`);
  }

  return new Error(error.message);
};
