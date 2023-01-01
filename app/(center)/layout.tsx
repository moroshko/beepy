import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CenterLayout = async ({ children }: Props) => {
  return (
    <div className="h-screen w-screen xs:bg-grey-50 xs:py-10">
      <div className="mx-auto max-w-sm rounded-lg bg-white p-8 text-center xs:shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default CenterLayout;