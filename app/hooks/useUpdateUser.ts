import { ApiError } from "@/lib/utils/errors";
import { useMutation } from "@tanstack/react-query";

type Params = {
  name: string;
};

export const useUpdateUser = () => {
  return useMutation<null, ApiError<"name">, Params>({
    mutationFn: async ({ name }) => {
      await fetch("/api/current-user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      return null;
    },
  });
};