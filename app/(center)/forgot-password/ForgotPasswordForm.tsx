"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { Input } from "components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSendResetPasswordEmail } from "utils/hooks/useSendResetPasswordEmail";

type FormInputs = {
  email: string;
};

const ForgotPasswordFormComponent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const router = useRouter();
  const sendResetPasswordEmailMutation = useSendResetPasswordEmail();
  const onSubmit: SubmitHandler<FormInputs> = async ({ email }) => {
    sendResetPasswordEmailMutation.mutate(
      {
        email,
      },
      {
        onSuccess: () => {
          router.push(`/check-your-email?email=${encodeURIComponent(email)}`);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="mt-6">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Email"
          type="email"
          {...register("email", { required: "Required" })}
          error={errors.email?.message}
        />
        <Button
          type="submit"
          fullWidth
          loading={
            sendResetPasswordEmailMutation.isLoading ||
            sendResetPasswordEmailMutation.isSuccess
          }
        >
          Submit
        </Button>
        {sendResetPasswordEmailMutation.isError && (
          <p className="mt-2 text-sm text-error">
            {sendResetPasswordEmailMutation.error.message}
          </p>
        )}
      </Form>
      <div className="mt-4">
        <Link
          className="text-sm text-grey-500 underline hover:no-underline"
          href="/login"
        >
          Back to login
        </Link>
      </div>
    </div>
  );
};

const ForgotPasswordForm = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ForgotPasswordFormComponent />
    </QueryClientProvider>
  );
};

export { ForgotPasswordForm };
