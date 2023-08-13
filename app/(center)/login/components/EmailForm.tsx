import { Button } from "components/Button";
import { Form } from "components/Form";
import { Input } from "components/Input";
import { useLoginEmail } from "hooks/useLoginEmail";
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
  const loginEmailMutation = useLoginEmail();
  const onSubmit = ({ email }: FormInputs) => {
    setFormError(null);

    loginEmailMutation.mutate(
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
      <Button type="submit" fullWidth loading={loginEmailMutation.isPending}>
        Submit
      </Button>
      {formError && <p className="text-sm text-error">{formError}</p>}
    </Form>
  );
};

export { EmailForm };
