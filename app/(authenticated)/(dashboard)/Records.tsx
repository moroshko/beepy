"use client";

import { useUser } from "(authenticated)/UserProvider";
import { PlusIcon } from "icons";
import { useState } from "react";
import { BloodPressureRecord } from "types";
import { formatDate } from "utils/date";
import { useRecords } from "utils/hooks/useRecords";
import { NewRecordForm } from "./NewRecordForm";

type Props = {
  initialRecords: BloodPressureRecord[];
};

const Records = ({ initialRecords }: Props) => {
  const user = useUser();
  const { data: records } = useRecords(user.id, { initialRecords });
  const [isAddingRecord, setIsAddingRecord] = useState(false);

  return (
    <div className="divide-y divide-grey-200 rounded border border-grey-200">
      <div className="flex text-sm font-medium uppercase text-grey-500">
        <div className="w-20 px-4 py-3 text-right">Sys</div>
        <div className="w-20 px-4 py-3 text-right">Dia</div>
        <div className="w-20 px-4 py-3 text-right">Pulse</div>
        <div className="w-[184px] px-4 py-3 text-left">Time</div>
      </div>
      {isAddingRecord ? (
        <NewRecordForm
          onCancel={() => {
            setIsAddingRecord(false);
          }}
        />
      ) : (
        <button
          className="grid w-full place-items-center py-4 text-primary-600 hover:bg-primary-50 focus:bg-primary-50 focus-visible:rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          type="button"
          onClick={() => {
            setIsAddingRecord(true);
          }}
        >
          <span className="flex items-center gap-1">
            <PlusIcon size={20} />
            Add record
          </span>
        </button>
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
