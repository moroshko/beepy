import { ApiError } from "./errors";

type HandleApiResponseParams = {
  response: Response;
};

export const handleApiResponse = async ({
  response,
}: HandleApiResponseParams) => {
  if (response.status === 401) {
    throw new ApiError({
      message: "Unauthorized",
    });
  }

  const data = await response.json();

  return data;
};
