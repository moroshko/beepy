import { Button } from "@/components/Button";
import { ModalSheet } from "@/components/ModalSheet";
import { useDeleteRecord } from "@/hooks/useDeleteRecord";
import { useInvalidateRecords } from "@/hooks/useRecords";
import { RecordItem } from "@/lib/types";
import { formatDate } from "@/lib/utils/date";
import { useState } from "react";

type Props = {
  record: RecordItem;
  onSuccess: () => void;
};

const DeleteRecordButton = ({ record, onSuccess }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const invalidateRecords = useInvalidateRecords();
  const deleteRecordMutation = useDeleteRecord();
  const deleteRecord = () => {
    deleteRecordMutation.mutate(
      {
        recordId: record.id,
      },
      {
        onSuccess: () => {
          invalidateRecords();

          setIsOpen(false);

          onSuccess();
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
        <Button className="-mb-2 -ml-4 text-error" variant="link">
          Delete record
        </Button>
      }
      title="Delete record"
      description={formatDate(record.createdAt)}
      dialogClassName="max-w-[360px]"
    >
      <p>Are you sure you want to delete this record?</p>
      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          onClick={() => {
            setIsOpen(false);
          }}
        >
          Back
        </Button>
        <Button
          variant="destructive"
          onClick={deleteRecord}
          loading={deleteRecordMutation.isPending}
        >
          Delete
        </Button>
      </div>
    </ModalSheet>
  );
};

export { DeleteRecordButton };
