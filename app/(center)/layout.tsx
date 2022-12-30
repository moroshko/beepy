import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CenterLayout = async ({ children }: Props) => {
  return (
    <div className="h-screen w-screen bg-grey-50 py-10">
      <div className="mx-auto max-w-sm rounded-lg bg-white p-8 text-center shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default CenterLayout;
