import { ApiError } from "@/lib/utils/errors";
import {
  isClerkAPIResponseError,
  useSignUp as useClerkSignUp,
} from "@clerk/nextjs";
import { useMutation } from "@tanstack/react-query";

type Params = {
  email: string;
};

export const useSignUpEmail = () => {
  const { isLoaded, signUp } = useClerkSignUp();

  return useMutation<null, ApiError<"email">, Params>({
    mutationFn: async ({ email }) => {
      if (!isLoaded) {
        throw new ApiError({
          type: "NOT_READY",
        });
      }

      try {
        await signUp.create({
          emailAddress: email,
        });
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        return null;
      } catch (error) {
        if (isClerkAPIResponseError(error)) {
          const errorCode = error.errors[0].code;

          console.log({ errorCode });

          if (/invalid/.test(errorCode)) {
            throw new ApiError({
              formErrors: [
                {
                  field: "email",
                  error: "Invalid email",
                },
              ],
            });
          }

          if (/exists/.test(errorCode)) {
            throw new ApiError({
              formErrors: [
                {
                  field: "email",
                  error: "Email address is taken",
                },
              ],
            });
          }
        }

        throw new ApiError({
          message: "Failed to sign up",
        });
      }
    },
  });
};
