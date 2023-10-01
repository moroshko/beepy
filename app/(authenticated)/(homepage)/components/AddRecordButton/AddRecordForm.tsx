import { Button } from "@/components/Button";
import { Form } from "@/components/Form";
import { Input } from "@/components/Input";
import { useAddRecord } from "@/hooks/useAddRecord";
import { useInvalidateRecords } from "@/hooks/useRecords";
import {
  isDiaValid,
  isPulseValid,
  isSysValid,
  preventDefaultIfCodeNotAllowed,
} from "@/lib/utils/records";
import { SyntheticEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  sys: string;
  dia: string;
  pulse: string;
};

type Props = {
  closeModal: () => void;
};

const AddRecordForm = ({ closeModal }: Props) => {
  const { register, setFocus, handleSubmit } = useForm<FormInputs>({
    defaultValues: {
      sys: "",
      dia: "",
      pulse: "",
    },
  });
  const invalidateRecords = useInvalidateRecords();
  const addRecordMutation = useAddRecord();
  const onSubmit: SubmitHandler<FormInputs> = ({ sys, dia, pulse }) => {
    addRecordMutation.mutate(
      {
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
        })}
      />
      <Button
        className="w-20 shrink-0"
        type="submit"
        loading={addRecordMutation.isPending}
      >
        Add
      </Button>
    </Form>
  );
};

export { AddRecordForm };
