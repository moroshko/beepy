import { ModalSheet } from "@/components/ModalSheet";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { AddRecordForm } from "./AddRecordForm";

type Props = {
  onSuccess: (id: string) => void;
};

const AddRecordButton = ({ onSuccess }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalSheet
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      trigger={
        <Button className="w-full" size="lg">
          <PlusCircle strokeWidth={1.5} className="mr-2 h-5 w-5" />
          Add record
        </Button>
      }
      title="New record"
      dialogClassName="max-w-[360px]"
    >
      <AddRecordForm
        closeModal={() => {
          setIsOpen(false);
        }}
        onSuccess={onSuccess}
      />
    </ModalSheet>
  );
};

export { AddRecordButton };
