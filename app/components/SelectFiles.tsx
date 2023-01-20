import { ReactNode } from "react";
import { Accept, DropzoneOptions, useDropzone } from "react-dropzone";

const defaultAccept = {
  "image/jpg": [".jpg", ".jpeg"],
  "image/png": [".png"],
};

type Props = {
  className?: string;
  inputId?: string;
  onSelect: DropzoneOptions["onDrop"];
  multiple?: boolean;
  accept?: Accept;
  children: ReactNode;
};

const SelectFiles = ({
  className,
  inputId,
  onSelect,
  multiple = false,
  accept = defaultAccept,
  children,
}: Props) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple,
    accept,
    onDrop: onSelect,
  });

  return (
    <div {...getRootProps({ className, role: "button" })}>
      <input {...getInputProps({ id: inputId })} />
      {children}
    </div>
  );
};

export { SelectFiles };
