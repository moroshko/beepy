"use client";

import { useUser } from "(authenticated)/UserProvider";
import { PlusIcon } from "icons";
import { useReducer } from "react";
import { BloodPressureRecord } from "types";
import { formatDate } from "utils/date";
import { useRecords, useRefetchRecords } from "utils/hooks/useRecords";
import { transformSupabaseError } from "utils/supabase/error";
import { NewRecordForm } from "./NewRecordForm";
import { addRecordReducer } from "./utils";

type Props = {
  initialRecords: BloodPressureRecord[];
};

const Records = ({ initialRecords }: Props) => {
  const user = useUser();
  const refetchRecords = useRefetchRecords(user.id);
  const { data: records } = useRecords(user.id, { initialRecords });
  const [addRecordState, dispatch] = useReducer(addRecordReducer, {
    type: "initial",
  });

  return (
    <div className="divide-y divide-grey-200 rounded border border-grey-200">
      <div className="flex text-sm font-medium uppercase text-grey-500">
        <div className="w-20 px-4 py-3 text-right">Sys</div>
        <div className="w-20 px-4 py-3 text-right">Dia</div>
        <div className="w-20 px-4 py-3 text-right">Pulse</div>
        <div className="w-[184px] px-4 py-3 text-left">Time</div>
      </div>
      {(addRecordState.type === "adding" ||
        addRecordState.type === "error") && (
        <div>
          <NewRecordForm
            onCancel={() => {
              dispatch({ type: "cancel" });
            }}
            onSuccess={() => {
              refetchRecords();

              dispatch({ type: "success" });

              setTimeout(() => {
                dispatch({ type: "success-timeout" });
              }, 3000);
            }}
            onError={(error) => {
              dispatch({
                type: "error",
                error: transformSupabaseError(error).message,
              });
            }}
          />
          {addRecordState.type === "error" && (
            <div className="mb-1 px-2 text-sm text-error">
              {addRecordState.error}
            </div>
          )}
        </div>
      )}
      {addRecordState.type === "initial" && (
        <button
          className="grid w-full place-items-center py-4 text-primary-600 hover:bg-primary-50 focus:bg-primary-50 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          type="button"
          onClick={() => {
            dispatch({ type: "add" });
          }}
        >
          <span className="flex items-center gap-1">
            <PlusIcon size={20} />
            Add record
          </span>
        </button>
      )}
      {addRecordState.type === "added" && (
        <div className="py-4 text-center text-success">Added!</div>
      )}
      {(records ?? []).map(({ id, sys, dia, pulse, created_at }) => {
        return (
          <div
            className="flex cursor-pointer tabular-nums hover:bg-grey-50"
            key={id}
          >
            <div className="w-20 px-4 py-3 text-right">{sys}</div>
            <div className="w-20 px-4 py-3 text-right">{dia}</div>
            <div className="w-20 px-4 py-3 text-right">{pulse}</div>
            <div className="w-[184px] px-4 py-3 font-light text-grey-600">
              {formatDate(created_at)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Records };