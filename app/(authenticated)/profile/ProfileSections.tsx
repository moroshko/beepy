"use client";

import { useUser } from "(authenticated)/UserProvider";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { Input } from "components/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUpdateProfileName } from "utils/hooks/useUpdateProfileName";

type FormInputs = {
  name: string;
};

type Props = {
  name: string;
};

const ProfileSections = ({ name }: Props) => {
  const user = useUser();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      name,
    },
  });
  const updateProfileNameMutation = useUpdateProfileName();
  const onSubmit: SubmitHandler<FormInputs> = async ({ name }) => {
    updateProfileNameMutation.mutate(
      { name },
      {
        onSuccess: () => {
          console.log("TODO: success toast");
        },
        onError: (error) => {
          console.log("TODO: error toast");
        },
      }
    );
  };

  return (
    <div className="flex flex-col divide-y divide-grey-300">
      <div className="max-w-sm pb-8">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            placeholder="How should we call you?"
            {...register("name")}
            error={errors.name?.message}
          />
          <Button type="submit" loading={updateProfileNameMutation.isLoading}>
            Save
          </Button>
        </Form>
      </div>
      <div className="pt-8">
        <Button variant="danger">Delete my account</Button>
      </div>
    </div>
  );
};

export { ProfileSections };
