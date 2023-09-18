import { RecordItem } from "@/lib/types";
import { ApiError } from "@/lib/utils/errors";
import { useQuery } from "@tanstack/react-query";

type SuccessResponse = {
  records: RecordItem[];
};

export const useRecords = (initialRecords: RecordItem[]) => {
  return useQuery<SuccessResponse, ApiError>({
    queryKey: ["records"],
    queryFn: async () => {
      const response = await fetch("/api/records");

      return await response.json();
    },
    initialData: {
      records: initialRecords,
    },
  });
};
