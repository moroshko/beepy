"use client";

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

const ForgotPasswordForm = () => {
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
      <Link
        className="mt-4 inline-block text-sm text-grey-500 underline hover:no-underline"
        href="/login"
      >
        Back to login
      </Link>
    </div>
  );
};

export { ForgotPasswordForm };
