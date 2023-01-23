import { PostgrestError } from "@supabase/supabase-js";
import { Button } from "components/Button";
import { Form } from "components/Form";
import { SubmitHandler, useForm } from "react-hook-form";
import { useAddRecord } from "utils/hooks/useAddRecord";

type FormInputs = {
  sys: string;
  dia: string;
  pulse: string;
};

type Props = {
  onCancel: () => void;
  onSuccess: () => void;
  onError: (error: PostgrestError) => void;
};

const NewRecordForm = ({ onCancel, onSuccess, onError }: Props) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FormInputs>();
  const addRecordMutation = useAddRecord();
  const onSubmit: SubmitHandler<FormInputs> = ({ sys, dia, pulse }) => {
    addRecordMutation.mutate(
      {
        sys: Number(sys),
        dia: Number(dia),
        pulse: Number(pulse),
      },
      {
        onSuccess,
        onError,
      }
    );
  };

  return (
    <Form className="flex py-2" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label className="sr-only" htmlFor="new-record-sys">
          Sys
        </label>
        <input
          id="new-record-sys"
          className="ml-2 w-[72px] rounded bg-grey-100 py-2 pl-2 pr-4 text-right tabular-nums focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          type="text"
          maxLength={3}
          autoFocus
          {...register("sys")}
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="new-record-dia">
          Dia
        </label>
        <input
          id="new-record-dia"
          className="ml-2 w-[72px] rounded bg-grey-100 py-2 pl-2 pr-4 text-right tabular-nums focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          type="text"
          maxLength={3}
          {...register("dia")}
        />
      </div>
      <div>
        <label className="sr-only" htmlFor="new-record-pulse">
          Pulse
        </label>
        <input
          id="new-record-pulse"
          className="ml-2 w-[72px] rounded bg-grey-100 py-2 pl-2 pr-4 text-right tabular-nums focus:border-transparent focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
          type="text"
          maxLength={3}
          {...register("pulse")}
        />
      </div>
      <div className="ml-4 flex w-[168px] items-center">
        <div className="w-20">
          <Button type="submit" fullWidth>
            Add
          </Button>
        </div>
        <button
          type="button"
          className="ml-4 rounded text-grey-500 hover:text-black focus-visible:relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </Form>
  );
};

export { NewRecordForm };
