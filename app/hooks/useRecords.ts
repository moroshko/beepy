import { RecordItem } from "@/lib/types";
import { ApiError } from "@/lib/utils/errors";
import { handleApiResponse } from "@/lib/utils/response";
import { useQuery, useQueryClient } from "@tanstack/react-query";

type SuccessResponse = {
  records: RecordItem[];
};

export const useRecords = (initialRecords: RecordItem[]) => {
  return useQuery<SuccessResponse, ApiError>({
    queryKey: ["records"],
    queryFn: async () => {
      const response = await fetch("/api/records");

      return handleApiResponse({ response });
    },
    initialData: {
      records: initialRecords,
    },
  });
};

export const useInvalidateRecords = () => {
  const queryClient = useQueryClient();
  const invalidateRecords = () => {
    queryClient.invalidateQueries({
      queryKey: ["records"],
      exact: true,
    });
  };

  return invalidateRecords;
};
