"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { Input } from "components/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "utils/hooks/useLogin";

type FormInputs = {
  email: string;
  password: string;
};

const LoginFormComponent = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const router = useRouter();
  const loginMutation = useLogin();
  const onSubmit: SubmitHandler<FormInputs> = async ({ email, password }) => {
    loginMutation.mutate(
      {
        email,
        password,
      },
      {
        onSuccess: () => {
          router.push("/");
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
        <div>
          <Input
            label="Password"
            type="password"
            {...register("password", { required: "Required" })}
            error={errors.password?.message}
          />
          <div className="mt-1 flex justify-end">
            <Link
              className="text-sm text-grey-500 underline hover:no-underline"
              href="/forgot-password"
            >
              Forgot password
            </Link>
          </div>
        </div>
        <Button
          type="submit"
          fullWidth
          loading={loginMutation.isLoading || loginMutation.isSuccess}
        >
          Submit
        </Button>
        {loginMutation.isError && (
          <p className="mt-2 text-sm text-error">
            {loginMutation.error.message}
          </p>
        )}
        <p className="text-sm text-grey-500">
          {`Don’t have an account yet? `}
          <Link
            className="text-sm text-grey-500 underline hover:no-underline"
            href="/signup"
          >
            Create new account
          </Link>
        </p>
      </Form>
    </div>
  );
};

const LoginForm = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LoginFormComponent />
    </QueryClientProvider>
  );
};

export { LoginForm };
