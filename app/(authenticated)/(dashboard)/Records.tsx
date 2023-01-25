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
    <div className="divide-y divide-grey-200 rounded border-grey-200 xs:border">
      <div className="flex text-sm font-medium uppercase text-grey-500">
        <div className="w-14 px-2 py-3 text-right xs:w-20 xs:px-4">Sys</div>
        <div className="w-14 px-2 py-3 text-right xs:w-20 xs:px-4">Dia</div>
        <div className="w-14 px-2 py-3 text-right xs:w-20 xs:px-4">Pulse</div>
        <div className="w-[160px] px-2 py-3 text-left xs:w-[184px] xs:px-4">
          Time
        </div>
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
            className="flex cursor-pointer items-baseline tabular-nums hover:bg-grey-50"
            key={id}
          >
            <div className="w-14 px-2 py-3 text-right xs:w-20 xs:px-4">
              {sys}
            </div>
            <div className="w-14 px-2 py-3 text-right xs:w-20 xs:px-4">
              {dia}
            </div>
            <div className="w-14 px-2 py-3 text-right xs:w-20 xs:px-4">
              {pulse}
            </div>
            <div className="w-[160px] px-2 py-3 text-sm font-light text-grey-600 xs:w-[184px] xs:px-4">
              {formatDate(created_at)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Records };
