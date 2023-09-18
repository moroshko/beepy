import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { useSignUpVerificationCode } from "@/hooks/useSignUpVerificationCode";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type FormInputs = {
  verificationCode: string;
};

type Props = {
  email: string;
};

const SignUpVerificationCodeForm = ({ email }: Props) => {
  const {
    register,
    setError,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const [formError, setFormError] = useState<string | null>(null);
  const router = useRouter();
  const signUpVerificationCodeMutation = useSignUpVerificationCode();
  const onSubmit = ({ verificationCode }: FormInputs) => {
    setFormError(null);

    signUpVerificationCodeMutation.mutate(
      { verificationCode },
      {
        onSuccess: () => {
          router.push("/");
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
      <p>
        {`Enter the verification code we sent you at `}
        <strong>{email}</strong>
      </p>
      <Input
        {...register("verificationCode", { required: "Required" })}
        label="Verification code"
        inputMode="numeric"
        error={errors.verificationCode?.message}
      />
      <Button
        type="submit"
        fullWidth
        loading={
          signUpVerificationCodeMutation.isPending ||
          signUpVerificationCodeMutation.isSuccess
        }
      >
        Submit
      </Button>
      {formError && <p className="text-sm text-error">{formError}</p>}
    </Form>
  );
};

export { SignUpVerificationCodeForm };
