import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "_utils/errors";

type Params = {
  email: string;
};

export const useLoginEmail = () => {
  const { isLoaded, signIn } = useSignIn();

  return useMutation<null, ApiError<"email">, Params>({
    mutationFn: async ({ email }) => {
      if (!isLoaded) {
        throw new ApiError({
          type: "NOT_READY",
        });
      }

      try {
        await signIn.create({
          strategy: "email_code",
          identifier: email,
        });

        return null;
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          const errorCode = error.errors[0].code;

          if (/invalid/.test(errorCode)) {
            throw new ApiError({
              formErrors: [
                {
                  field: "email",
                  error: "Invalid email",
                },
              ],
            });
          } else if (/not_found/.test(errorCode)) {
            throw new ApiError({
              message: "Account not found",
            });
          }
        }

        throw new ApiError({
          message: "Failed to login",
        });
      }
    },
  });
};
