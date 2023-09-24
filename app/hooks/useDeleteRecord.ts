import { ApiError } from "@/lib/utils/errors";
import { useMutation } from "@tanstack/react-query";

type Params = {
  recordId: string;
};

export const useDeleteRecord = () => {
  return useMutation<void, ApiError, Params>({
    mutationFn: async ({ recordId }) => {
      await fetch(`/api/records/${recordId}`, {
        method: "DELETE",
      });
    },
  });
};
