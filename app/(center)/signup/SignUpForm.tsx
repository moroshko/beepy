"use client";

import { Button } from "components/Button";
import { Form } from "components/Form";
import { Input } from "components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSignUp } from "utils/hooks/useSignUp";

type FormInputs = {
  email: string;
  password: string;
};

const SignUpForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const router = useRouter();
  const signUpMutation = useSignUp();
  const onSubmit: SubmitHandler<FormInputs> = async ({ email, password }) => {
    signUpMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push(`/confirm-email?email=${encodeURIComponent(email)}`);
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
        <Input
          label="Password"
          type="password"
          {...register("password", { required: "Required" })}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          loading={signUpMutation.isLoading || signUpMutation.isSuccess}
        >
          Submit
        </Button>
        {signUpMutation.isError && (
          <p className="mt-2 text-sm text-error">
            {signUpMutation.error.message}
          </p>
        )}
        <p className="text-sm text-grey-500">
          {`Already have an account? `}
          <Link
            className="whitespace-nowrap text-sm text-grey-500 underline hover:no-underline"
            href="/login"
          >
            Login
          </Link>
        </p>
      </Form>
    </div>
  );
};

export { SignUpForm };
