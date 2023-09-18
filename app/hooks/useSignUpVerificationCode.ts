import { ApiError } from "@/lib/utils/errors";
import {
  isClerkAPIResponseError,
  useSignUp as useClerkSignUp,
} from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

type Params = {
  verificationCode: string;
};

export const useSignUpVerificationCode = () => {
  const { isLoaded, signUp, setActive } = useClerkSignUp();

  return useMutation<null, ApiError<"verificationCode">, Params>({
    mutationFn: async ({ verificationCode }) => {
      if (!isLoaded) {
        throw new ApiError({
          type: "NOT_READY",
        });
      }

      try {
        const { status, createdUserId, createdSessionId } =
          await signUp.attemptEmailAddressVerification({
            code: verificationCode,
          });

        if (
          status !== "complete" ||
          createdUserId === null ||
          createdSessionId === null
        ) {
          throw new ApiError({
            message: "Failed to verify email address",
          });
        }

        await setActive({ session: createdSessionId });

        await fetch("/api/users", { method: "POST" });

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
          message: "Failed to sign up",
        });
      }
    },
  });
};
