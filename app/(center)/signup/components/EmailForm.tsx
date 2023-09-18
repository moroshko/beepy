import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { useSignUpEmail } from "@/hooks/useSignUpEmail";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  email: string;
};

type Props = {
  onSuccess: (email: string) => void;
};

const EmailForm = ({ onSuccess }: Props) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const [formError, setFormError] = useState<string | null>(null);
  const signUpEmailMutation = useSignUpEmail();
  const onSubmit = ({ email }: FormInputs) => {
    setFormError(null);

    signUpEmailMutation.mutate(
      { email },
      {
        onSuccess: () => {
          onSuccess(email);
        },
        onError: (error) => {
          if (error.formErrors) {
            error.formErrors.forEach(({ field, error }) => {
              setError(field, {
                message: error,
              });
            });
          } else if (error.type !== "NOT_READY") {
            setFormError(error.message);
          }
        },
      }
    );
  };

  return (
    <Form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        {...register("email", { required: "Required" })}
        label="Email"
        type="email"
        error={errors.email?.message}
      />
      <Button type="submit" fullWidth loading={signUpEmailMutation.isPending}>
        Submit
      </Button>
      {formError && <p className="text-sm text-error">{formError}</p>}
    </Form>
  );
};

export { EmailForm };
