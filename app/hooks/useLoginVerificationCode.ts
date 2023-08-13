import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";
import { ApiError } from "_utils/errors";

type Params = {
  verificationCode: string;
};

export const useLoginVerificationCode = () => {
  const { isLoaded, signIn, setActive } = useSignIn();

  return useMutation<null, ApiError<"verificationCode">, Params>({
    mutationFn: async ({ verificationCode }) => {
      if (!isLoaded) {
        throw new ApiError({
          type: "NOT_READY",
        });
      }

      try {
        const { status, createdSessionId } = await signIn.attemptFirstFactor({
          strategy: "email_code",
          code: verificationCode,
        });

        if (status !== "complete" || createdSessionId === null) {
          throw new ApiError({
            message: "Failed to login",
          });
        }

        await setActive({ session: createdSessionId });

        return null;
      } catch (error) {
        if (
          isClerkAPIResponseError(error) &&
          /incorrect/.test(error.errors[0].message)
        ) {
          throw new ApiError({
            formErrors: [
              {
                field: "verificationCode",
                error: "Incorrect code",
              },
            ],
          });
        }

        throw new ApiError({
          message: "Failed to login",
        });
      }
    },
  });
};
