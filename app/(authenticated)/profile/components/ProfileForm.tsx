"use client";

import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { useUpdateUser } from "@/hooks/useUpdateUser";
import { User } from "@/lib/types";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
};

type Props = {
  user: User;
};

const ProfileForm = ({ user }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      name: user.name ?? "",
    },
  });
  const updateUserMutation = useUpdateUser();
  const onSubmit: SubmitHandler<FormInputs> = async ({ name }) => {
    updateUserMutation.mutate(
      {
        name,
      },
      {
        onSuccess: () => {
          // TODO: Show success toast
          console.log("success");
        },
        onError: (error) => {
          // TODO: Show error toast
          console.log(error);
        },
      }
    );
  };

  return (
    <div className="divide-gray-300 flex flex-col divide-y">
      <div className="max-w-sm pb-8">
        <Form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <Input
            label="Name"
            {...register("name")}
            error={errors.name?.message}
          />
          <div>
            <Button type="submit" loading={updateUserMutation.isPending}>
              Save
            </Button>
          </div>
        </Form>
      </div>
      {/* <div className="pt-8">
        <Button variant="danger">Delete my profile</Button>
      </div> */}
    </div>
  );
};

export { ProfileForm };
