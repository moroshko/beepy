import { PostgrestError } from "@supabase/supabase-js";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BloodPressureRecord } from "types";
import { browserSupabaseClient } from "utils/supabase/browser";

type SuccessResponse = BloodPressureRecord[];

export const useRecords = (
  userId: string,
  { initialRecords }: { initialRecords?: BloodPressureRecord[] }
) => {
  return useQuery<SuccessResponse, PostgrestError>({
    queryKey: [userId, "records"],
    queryFn: async () => {
      const { data, error } = await browserSupabaseClient
        .from("records")
        .select("id, sys, dia, pulse, created_at")
        .order("created_at", { ascending: false })
        .limit(10)
        .eq("user_id", userId);

      if (error !== null) {
        throw error;
      }

      return data;
    },
    initialData: initialRecords,
  });
};

export const useRefetchRecords = (userId: string) => {
  const queryClient = useQueryClient();
  const refetchRecords = () => {
    queryClient.invalidateQueries({
      queryKey: [userId, "records"],
    });
  };

  return refetchRecords;
};
