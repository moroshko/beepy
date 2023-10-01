import { ModalSheet } from "@/components/ModalSheet";
import { RecordItem } from "@/lib/types";
import { formatDate } from "@/lib/utils/date";
import cx from "clsx";
import { useState } from "react";
import { DeleteRecordButton } from "./DeleteRecordButton/DeleteRecordButton";
import { EditRecordForm } from "./EditRecordForm";

type Props = {
  record: RecordItem;
  isHighlighted: boolean;
};

const EditRecordButton = ({ record, isHighlighted }: Props) => {
  const { sys, dia, pulse, createdAt } = record;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <div
          className={cx(
            "flex cursor-pointer items-baseline tabular-nums",
            !isHighlighted && "hover:bg-gray-100",
            isHighlighted && "bg-yellow-200"
          )}
        >
          <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">{sys}</div>
          <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">{dia}</div>
          <div className="w-1/6 py-3 pr-2 text-right xs:pr-4">{pulse}</div>
          <div className="w-3/6 py-3 pl-6 text-sm font-light text-gray-600 xs:pl-4">
            {formatDate(createdAt)}
          </div>
        </div>
      }
      title="Edit record"
      description={formatDate(record.createdAt)}
      dialogClassName="max-w-[360px]"
    >
      <div className="space-y-4">
        <EditRecordForm
          record={record}
          closeModal={() => {
            setIsOpen(false);
          }}
        />
        <div>
          <DeleteRecordButton
            record={record}
            onSuccess={() => {
              setIsOpen(false);
            }}
          />
        </div>
      </div>
    </ModalSheet>
  );
};

export { EditRecordButton };
