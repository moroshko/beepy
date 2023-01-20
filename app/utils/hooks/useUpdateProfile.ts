import { useUser } from "(authenticated)/UserProvider";
import { StorageError } from "@supabase/storage-js";
import { PostgrestError } from "@supabase/supabase-js";
import { useMutation } from "@tanstack/react-query";
import { browserSupabaseClient } from "utils/supabase/browser";

type Params = {
  name: string;
  avatar?: File;
};

export const useUpdateProfile = () => {
  const user = useUser();

  return useMutation<undefined, PostgrestError | StorageError, Params>(
    async ({ name, avatar }) => {
      const { error } = await browserSupabaseClient
        .from("profiles")
        .update({ name: name.trim() })
        .eq("id", user.id);

      if (error !== null) {
        throw error;
      }

      if (avatar) {
        const { data, error: uploadError } = await browserSupabaseClient.storage
          .from("profiles")
          /*
            We generate a new file name here to avoid caching issues.
            If we saved the avatar into the exact same pathname all the time,
            the user would see the old avatar after updaing the image and refreshing the page.
            This is because the default caching time is 1 hour. See: https://supabase.com/docs/reference/javascript/storage-from-upload
            TODO: Delete the old avatars from the storage bucket.
          */
          .upload(`${user.id}/avatar_${Date.now()}`, avatar, {
            upsert: true,
          });

        if (uploadError !== null) {
          throw uploadError;
        }

        const avatarPath = data.path;
        const { error } = await browserSupabaseClient
          .from("profiles")
          .update({ avatar: avatarPath })
          .eq("id", user.id);

        if (error !== null) {
          throw error;
        }
      }

      return undefined;
    }
  );
};
