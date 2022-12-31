"use client";

import { Button } from "components/Button";
import { Form } from "components/Form";
import { Input } from "components/Input";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdatePassword } from "utils/hooks/useUpdatePassword";

type FormInputs = {
  password: string;
};

const ChoosePasswordForm = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const router = useRouter();
  const updatePasswordMutation = useUpdatePassword();
  const onSubmit: SubmitHandler<FormInputs> = ({ password }) => {
    updatePasswordMutation.mutate(
      {
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
          label="Password"
          type="password"
          {...register("password", { required: "Required" })}
          error={errors.password?.message}
        />
        <Button
          type="submit"
          fullWidth
          loading={
            updatePasswordMutation.isLoading || updatePasswordMutation.isSuccess
          }
        >
          Submit
        </Button>
        {updatePasswordMutation.isError && (
          <p className="mt-2 text-sm text-error">
            {updatePasswordMutation.error.message}
          </p>
        )}
      </Form>
    </div>
  );
};

export { ChoosePasswordForm };
