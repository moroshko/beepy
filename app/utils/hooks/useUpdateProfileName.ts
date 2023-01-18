import { useUser } from "(authenticated)/UserProvider";
import { PostgrestError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { browserSupabaseClient } from "utils/supabase/browser";

type Params = {
  name: string;
};

export const useUpdateProfileName = () => {
  const user = useUser();

  return useMutation<undefined, PostgrestError, Params>(async ({ name }) => {
    const { error } = await browserSupabaseClient
      .from("profiles")
      .update({ name: name.trim() })
      .eq("id", user.id);

    if (error !== null) {
      throw error;
    }

    return undefined;
  });
};
