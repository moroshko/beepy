"use client";

import { useProfile } from "(authenticated)/ProfileProvider";
import cx from "clsx";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { Input } from "components/Input";
import { SelectFiles } from "components/SelectFiles";
import Image from "next/image";
import { SubmitHandler, useForm } from "react-hook-form";
import { toBase64 } from "utils/file";
import { useFormMessage } from "utils/hooks/useFormMessage";
import { useUpdateProfile } from "utils/hooks/useUpdateProfile";

type FormInputs = {
  name: string;
  avatar: { file: File; base64: string } | null;
};

const ProfileSections = () => {
  const profile = useProfile();
  const {
    register,
    watch,
    setValue,
    reset: resetForm,
    formState: { isDirty: isFormDirty, errors },
    handleSubmit,
  } = useForm<FormInputs>({
    defaultValues: {
      name: profile.name ?? "",
      avatar: null,
    },
  });
  const avatar = watch("avatar");
  const avatarSrc = avatar
    ? avatar.base64
    : profile.avatarUrl
    ? profile.avatarUrl
    : null;
  const [formMessage, dispatch] = useFormMessage({ isFormDirty });
  const updateProfileMutation = useUpdateProfile();
  const onSubmit: SubmitHandler<FormInputs> = async ({ name, avatar }) => {
    dispatch({
      type: "form-submitted",
    });

    updateProfileMutation.mutate(
      {
        name,
        avatar: avatar === null ? undefined : avatar.file,
      },
      {
        onSuccess: () => {
          resetForm(undefined, { keepValues: true });

          dispatch({
            type: "success",
            message: "Profile updated!",
          });

          setTimeout(() => {
            dispatch({
              type: "success-timeout",
            });
          }, 3000);
        },
        onError: (error) => {
          dispatch({
            type: "error",
            message: error.message,
          });
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
            {...register("name")}
            error={errors.name?.message}
          />
          <div>
            <label
              className="mb-1 block text-sm font-semibold"
              htmlFor="avatar"
            >
              Avatar
            </label>
            <SelectFiles
              className="grid h-28 w-28 cursor-pointer place-items-center overflow-hidden rounded-full border border-grey-200 bg-grey-50 text-sm hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              inputId="avatar"
              onSelect={async (files: File[]) => {
                const file = files[0];

                try {
                  const base64 = await toBase64(file);

                  setValue(
                    "avatar",
                    {
                      file,
                      base64,
                    },
                    {
                      shouldDirty: true,
                    }
                  );
                } catch (error) {
                  // TODO: handle upload errors
                }
              }}
            >
              {avatarSrc ? (
                <Image
                  className="h-full w-full object-cover hover:brightness-95"
                  width={112}
                  height={112}
                  src={avatarSrc}
                  alt="Avatar"
                  priority
                />
              ) : (
                "Upload"
              )}
            </SelectFiles>
          </div>
          <div className="flex items-center gap-6">
            <Button type="submit" loading={updateProfileMutation.isLoading}>
              Save
            </Button>
            {formMessage && (
              <p
                className={cx(
                  formMessage.type === "success" && "text-success",
                  formMessage.type === "warning" && "text-warning",
                  formMessage.type === "error" && "text-error"
                )}
              >
                {formMessage.message}
              </p>
            )}
          </div>
        </Form>
      </div>
      <div className="pt-8">
        <Button variant="danger">Delete my profile</Button>
      </div>
    </div>
  );
};

// data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=
// data:[<mediatype>][;base64],<data>

export { ProfileSections };
