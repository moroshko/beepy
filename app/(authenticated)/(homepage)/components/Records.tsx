"use client";

import { useRecords } from "@/hooks/useRecords";
import { RecordItem } from "@/lib/types";
import { AddRecordButton } from "./AddRecordButton/AddRecordButton";
import { EditRecordButton } from "./EditRecordButton/EditRecordButton";

type Props = {
  initialRecords: RecordItem[];
};

const Records = ({ initialRecords }: Props) => {
  const recordsInfo = useRecords(initialRecords);
  const { records } = recordsInfo.data;

  return (
    <div className="-mt-4 flex w-screen flex-col gap-6 xs:mt-0 xs:w-[420px]">
      <div className="fixed bottom-4 w-full px-4 xs:static xs:px-0">
        <AddRecordButton />
      </div>
      {records.length > 0 && (
        <div className="divide-y divide-gray-200 overflow-hidden rounded border-gray-200 xs:border">
          <div className="flex text-sm font-medium uppercase text-gray-500">
            <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">Sys</div>
            <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">Dia</div>
            <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">Pulse</div>
            <div className="w-3/6 py-3 pl-6 xs:pl-4">Time</div>
          </div>
          {records.map((record) => {
            return <EditRecordButton record={record} key={record.id} />;
          })}
        </div>
      )}
    </div>
  );
};

export { Records };
