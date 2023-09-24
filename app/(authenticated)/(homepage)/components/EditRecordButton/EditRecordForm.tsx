import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { useInvalidateRecords } from "@/hooks/useRecords";
import { useUpdateRecord } from "@/hooks/useUpdateRecord";
import { RecordItem } from "@/lib/types";
import {
  isDiaValid,
  isPulseValid,
  isSysValid,
  preventDefaultIfCodeNotAllowed,
} from "@/lib/utils/records";
import { SyntheticEvent, useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  sys: string;
  dia: string;
  pulse: string;
};

type Props = {
  record: RecordItem;
  closeModal: () => void;
};

const EditRecordForm = ({ record, closeModal }: Props) => {
  const { register, setFocus, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      sys: String(record.sys),
      dia: String(record.dia),
      pulse: String(record.pulse),
    },
  });
  const updateButtonRef = useRef<HTMLButtonElement | null>(null);
  const invalidateRecords = useInvalidateRecords();
  const updateRecordMutation = useUpdateRecord();
  const onSubmit: SubmitHandler<FormInputs> = ({ sys, dia, pulse }) => {
    updateRecordMutation.mutate(
      {
        recordId: record.id,
        sys: Number(sys),
        dia: Number(dia),
        pulse: Number(pulse),
      },
      {
        onSuccess: () => {
          invalidateRecords();

          closeModal();
        },
        onError: (error) => {
          // TODO: show error toast
          console.log(error);
        },
      }
    );
  };

  return (
    <Form
      className="item flex items-end gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        className="tabular-nums"
        label="SYS"
        maxLength={3}
        inputMode="numeric"
        autoFocus
        onKeyDown={preventDefaultIfCodeNotAllowed}
        {...register("sys", {
          validate: (sys) => {
            return isSysValid(sys) ? undefined : "Invalid";
          },
          onChange: (event: SyntheticEvent<HTMLInputElement>) => {
            const newSys = event.currentTarget.value;

            if (isSysValid(newSys)) {
              setFocus("dia", { shouldSelect: true });
            }
          },
        })}
      />
      <Input
        className="tabular-nums"
        label="DIA"
        maxLength={3}
        inputMode="numeric"
        onKeyDown={preventDefaultIfCodeNotAllowed}
        {...register("dia", {
          validate: (dia) => {
            return isDiaValid(dia) ? undefined : "Invalid";
          },
          onChange: (event: SyntheticEvent<HTMLInputElement>) => {
            const newDia = event.currentTarget.value;

            if (isDiaValid(newDia)) {
              setFocus("pulse", { shouldSelect: true });
            }
          },
        })}
      />
      <Input
        className="tabular-nums"
        label="PULSE"
        maxLength={3}
        inputMode="numeric"
        onKeyDown={preventDefaultIfCodeNotAllowed}
        {...register("pulse", {
          validate: (pulse) => {
            return isPulseValid(pulse) ? undefined : "Invalid";
          },
          onChange: (event: SyntheticEvent<HTMLInputElement>) => {
            const newPulse = event.currentTarget.value;

            if (isPulseValid(newPulse)) {
              updateButtonRef.current?.focus();
            }
          },
        })}
      />
      <Button
        className="w-20 shrink-0"
        type="submit"
        ref={updateButtonRef}
        loading={updateRecordMutation.isPending}
      >
        Update
      </Button>
    </Form>
  );
};

export { EditRecordForm };
