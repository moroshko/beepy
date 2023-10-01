import { ApiError } from "@/lib/utils/errors";
import { handleApiResponse } from "@/lib/utils/response";
import { useMutation } from "@tanstack/react-query";

type Params = {
  recordId: string;
};

export const useDeleteRecord = () => {
  return useMutation<void, ApiError, Params>({
    mutationFn: async ({ recordId }) => {
      const response = await fetch(`/api/records/${recordId}`, {
        method: "DELETE",
      });

      return handleApiResponse({ response });
    },
  });
};
