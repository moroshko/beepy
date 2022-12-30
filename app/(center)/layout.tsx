import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CenterLayout = async ({ children }: Props) => {
  return (
    <div className="mx-auto my-10 max-w-sm rounded-lg p-8 text-center shadow-xl">
      {children}
    </div>
  );
};

export default CenterLayout;
