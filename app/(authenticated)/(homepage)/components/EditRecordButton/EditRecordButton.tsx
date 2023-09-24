import { Button } from "@/components/Button";
import { ModalSheet } from "@/components/ModalSheet";
import { useDeleteRecord } from "@/hooks/useDeleteRecord";
import { useInvalidateRecords } from "@/hooks/useRecords";
import { RecordItem } from "@/lib/types";
import { formatDate } from "@/lib/utils/date";
import { useState } from "react";
import { EditRecordForm } from "./EditRecordForm";

type Props = {
  record: RecordItem;
};

const EditRecordButton = ({ record }: Props) => {
  const { sys, dia, pulse, createdAt } = record;
  const [isOpen, setIsOpen] = useState(false);
  const invalidateRecords = useInvalidateRecords();
  const deleteRecordMutation = useDeleteRecord();
  const onDeleteRecord = () => {
    deleteRecordMutation.mutate(
      {
        recordId: record.id,
      },
      {
        onSuccess: () => {
          invalidateRecords();

          setIsOpen(false);
        },
        onError: (error) => {
          // TODO: show error toast
          console.log(error);
        },
      }
    );
  };

  return (
    <ModalSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <div className="flex cursor-pointer items-baseline tabular-nums hover:bg-gray-100">
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
          <Button
            className="-mb-2 -ml-4 text-error"
            variant="link"
            onClick={onDeleteRecord}
          >
            Delete record
          </Button>
        </div>
      </div>
    </ModalSheet>
  );
};

export { EditRecordButton };
