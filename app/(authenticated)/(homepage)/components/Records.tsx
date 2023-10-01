"use client";

import { useRecords } from "@/hooks/useRecords";
import { RecordItem } from "@/lib/types";
import { useRef, useState } from "react";
import { AddRecordButton } from "./AddRecordButton/AddRecordButton";
import { EditRecordButton } from "./EditRecordButton/EditRecordButton";

type Props = {
  initialRecords: RecordItem[];
};

const Records = ({ initialRecords }: Props) => {
  const recordsInfo = useRecords(initialRecords);
  const scrollableContainerRef = useRef<HTMLDivElement | null>(null);
  const [highlightedRecordId, setHighlightedRecordId] = useState<string | null>(
    null
  );

  return (
    <div className="-mt-4 flex w-screen flex-col gap-6 [--add-record-padding-bottom:40px] xs:mt-0 xs:w-[420px]">
      <div className="fixed bottom-[--add-record-padding-bottom] w-full px-4 xs:static xs:px-0">
        <AddRecordButton
          onSuccess={(id) => {
            setHighlightedRecordId(id);

            setTimeout(() => {
              setHighlightedRecordId(null);
            }, 5000);

            scrollableContainerRef.current?.scrollTo(0, 0);
          }}
        />
      </div>
      {recordsInfo.error ? (
        <p className="p-4 text-error">{recordsInfo.error.message}</p>
      ) : recordsInfo.data.records.length > 0 ? (
        <div className="overflow-hidden rounded-md border-gray-200 xs:border">
          <div className="flex border-b bg-white text-sm font-medium uppercase text-gray-500">
            <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">Sys</div>
            <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">Dia</div>
            <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">Pulse</div>
            <div className="w-3/6 py-3 pl-6 xs:pl-4">Time</div>
          </div>
          <div
            className="max-h-[calc(100dvh-var(--header-height)-96px-var(--add-record-padding-bottom))] divide-y divide-gray-200 overflow-y-auto xs:max-h-none"
            ref={scrollableContainerRef}
          >
            {recordsInfo.data.records.map((record) => {
              return (
                <EditRecordButton
                  record={record}
                  isHighlighted={record.id === highlightedRecordId}
                  key={record.id}
                />
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { Records };
