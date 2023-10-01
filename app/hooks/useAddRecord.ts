import { ApiError } from "@/lib/utils/errors";
import { handleApiResponse } from "@/lib/utils/response";
import { useMutation } from "@tanstack/react-query";

type Params = {
  sys: number;
  dia: number;
  pulse: number;
};

type SuccessResponse = {
  id: string;
};

export const useAddRecord = () => {
  return useMutation<
    SuccessResponse,
    ApiError<"sys" | "dia" | "pulse">,
    Params
  >({
    mutationFn: async ({ sys, dia, pulse }) => {
      const response = await fetch("/api/records", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ sys, dia, pulse }),
      });

      return handleApiResponse({ response });
    },
  });
};
