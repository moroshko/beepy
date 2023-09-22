"use client";

import { useInvalidateRecords, useRecords } from "@/hooks/useRecords";
import { PlusIcon } from "@/icons/PlusIcon";
import { RecordItem } from "@/lib/types";
import { formatDate } from "@/lib/utils/date";
import cx from "clsx";
import { CheckCircle2 } from "lucide-react";
import { useReducer } from "react";
import { NewRecordForm } from "./NewRecordForm";
import { addRecordReducer } from "./utils";

type Props = {
  initialRecords: RecordItem[];
};

const Records = ({ initialRecords }: Props) => {
  const recordsInfo = useRecords(initialRecords);
  const invalidateRecords = useInvalidateRecords();
  const { records } = recordsInfo.data;
  const [addRecordState, dispatch] = useReducer(addRecordReducer, {
    type: "initial",
    highlightedIds: [],
  });

  return (
    <div className="w-full divide-y divide-grey-200 overflow-hidden rounded border-grey-200 xs:w-[420px] xs:border">
      {(addRecordState.type === "adding" ||
        addRecordState.type === "error") && (
        <>
          <NewRecordForm
            onCancel={() => {
              dispatch({ type: "cancel" });
            }}
            onSuccess={(id) => {
              invalidateRecords();

              dispatch({ type: "success", id });

              setTimeout(() => {
                dispatch({ type: "success-timeout", id });
              }, 5000);
            }}
            onError={(error) => {
              dispatch({
                type: "error",
                error: error.message,
              });
            }}
          />
          {addRecordState.type === "error" && (
            <div className="mb-1 px-2 text-sm text-error">
              {addRecordState.error}
            </div>
          )}
        </>
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
        <div className="bg-green-100 flex items-center justify-center gap-2 py-4">
          <CheckCircle2 /> Added
        </div>
      )}
      <div className="flex text-sm font-medium uppercase text-grey-500">
        <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">Sys</div>
        <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">Dia</div>
        <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">Pulse</div>
        <div className="w-3/6 py-3 pl-6 xs:pl-4">Time</div>
      </div>
      {records.map(({ id, sys, dia, pulse, createdAt }) => {
        return (
          <div
            className={cx(
              "flex cursor-pointer items-baseline tabular-nums hover:bg-grey-50",
              addRecordState.highlightedIds.includes(id) && "bg-green-100"
            )}
            key={id}
          >
            <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">{sys}</div>
            <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">{dia}</div>
            <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">{pulse}</div>
            <div className="w-3/6 py-3 pl-6 text-sm font-light text-grey-600 xs:pl-4">
              {formatDate(createdAt)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export { Records };
