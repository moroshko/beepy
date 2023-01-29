import { PostgrestError } from "@supabase/supabase-js";
import cx from "clsx";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { IconButton } from "components/IconButton";
import { SyntheticEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddRecord } from "utils/hooks/useAddRecord";
import { isCodeAllowed, isDiaValid, isPulseValid, isSysValid } from "./utils";

type FormInputs = {
  sys: string;
  dia: string;
  pulse: string;
};

type Props = {
  onCancel: () => void;
  onSuccess: (id: string) => void;
  onError: (error: PostgrestError) => void;
};

const NewRecordForm = ({ onCancel, onSuccess, onError }: Props) => {
  const {
    register,
    setFocus,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const addButtonRef = useRef<HTMLButtonElement | null>(null);
  const addRecordMutation = useAddRecord();
  const onSubmit: SubmitHandler<FormInputs> = ({ sys, dia, pulse }) => {
    addRecordMutation.mutate(
      {
        sys: Number(sys),
        dia: Number(dia),
        pulse: Number(pulse),
      },
      {
        onSuccess: ({ id }) => {
          onSuccess(id);
        },
        onError,
      }
    );
  };

  return (
    <Form className="flex bg-primary-50 py-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="w-1/6 pl-2">
        <label className="sr-only" htmlFor="new-record-sys">
          Sys
        </label>
        <input
          id="new-record-sys"
          // appearance-none is needed for iOS. See: https://stackoverflow.com/a/15440636/247243
          className={cx(
            "h-10 w-full appearance-none rounded border py-2 pr-2 text-right tabular-nums focus:border-transparent focus:outline-none focus:ring-2 xs:pr-4",
            errors.sys
              ? "border-red-600 focus:ring-red-600"
              : "border-grey-600 focus:ring-primary-500"
          )}
          type="text"
          maxLength={3}
          inputMode="numeric"
          autoFocus
          onKeyDown={(e) => {
            if (!isCodeAllowed(e.code)) {
              e.preventDefault();
            }
          }}
          {...register("sys", {
            validate: (sys) => {
              return isSysValid(sys) ? undefined : "Invalid";
            },
            onChange: (e: SyntheticEvent<HTMLInputElement>) => {
              const newSys = e.currentTarget.value;

              if (isSysValid(newSys)) {
                setFocus("dia", { shouldSelect: true });
              }
            },
          })}
        />
      </div>
      <div className="w-1/6 pl-2">
        <label className="sr-only" htmlFor="new-record-dia">
          Dia
        </label>
        <input
          id="new-record-dia"
          // appearance-none is needed for iOS. See: https://stackoverflow.com/a/15440636/247243
          className={cx(
            "h-10 w-full appearance-none rounded border py-2 pr-2 text-right tabular-nums focus:border-transparent focus:outline-none focus:ring-2 xs:pr-4",
            errors.dia
              ? "border-red-600 focus:ring-red-600"
              : "border-grey-600 focus:ring-primary-500"
          )}
          type="text"
          maxLength={3}
          inputMode="numeric"
          onKeyDown={(e) => {
            if (!isCodeAllowed(e.code)) {
              e.preventDefault();
            }
          }}
          {...register("dia", {
            validate: (dia) => {
              return isDiaValid(dia) ? undefined : "Invalid";
            },
            onChange: (e: SyntheticEvent<HTMLInputElement>) => {
              const newDia = e.currentTarget.value;

              if (isDiaValid(newDia)) {
                setFocus("pulse", { shouldSelect: true });
              }
            },
          })}
        />
      </div>
      <div className="w-1/6 pl-2">
        <label className="sr-only" htmlFor="new-record-pulse">
          Pulse
        </label>
        <input
          id="new-record-pulse"
          // appearance-none is needed for iOS. See: https://stackoverflow.com/a/15440636/247243
          className={cx(
            "h-10 w-full appearance-none rounded border py-2 pr-2 text-right tabular-nums focus:border-transparent focus:outline-none focus:ring-2 xs:pr-4",
            errors.pulse
              ? "border-red-600 focus:ring-red-600"
              : "border-grey-600 focus:ring-primary-500"
          )}
          type="text"
          maxLength={3}
          inputMode="numeric"
          onKeyDown={(e) => {
            if (!isCodeAllowed(e.code)) {
              e.preventDefault();
            }
          }}
          {...register("pulse", {
            validate: (pulse) => {
              return isPulseValid(pulse) ? undefined : "Invalid";
            },
            onChange: (e: SyntheticEvent<HTMLInputElement>) => {
              const newPulse = e.currentTarget.value;

              if (isPulseValid(newPulse)) {
                addButtonRef.current?.focus();
              }
            },
          })}
        />
      </div>
      <div className="flex w-3/6 items-center gap-2 pl-6 xs:pl-4">
        <div className="w-20">
          <Button type="submit" fullWidth ref={addButtonRef}>
            Add
          </Button>
        </div>
        <IconButton icon="XIcon" aria-label="Cancel" onClick={onCancel} />
      </div>
    </Form>
  );
};

export { NewRecordForm };
