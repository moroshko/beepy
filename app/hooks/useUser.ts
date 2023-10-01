import { User } from "@/lib/types";
import { ApiError } from "@/lib/utils/errors";
import { handleApiResponse } from "@/lib/utils/response";
import { useQuery } from "@tanstack/react-query";

type SuccessResponse = {
  user: User;
};

export const useUser = () => {
  return useQuery<SuccessResponse, ApiError>({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await fetch("/api/current-user");

      return handleApiResponse({ response });
    },
  });
};
