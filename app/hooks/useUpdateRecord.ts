import { ApiError } from "@/lib/utils/errors";
import { useMutation } from "@tanstack/react-query";

type Params = {
  recordId: string;
  sys: number;
  dia: number;
  pulse: number;
};

export const useUpdateRecord = () => {
  return useMutation<void, ApiError<"sys" | "dia" | "pulse">, Params>({
    mutationFn: async ({ recordId, sys, dia, pulse }) => {
      await fetch(`/api/records/${recordId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sys, dia, pulse }),
      });
    },
  });
};
