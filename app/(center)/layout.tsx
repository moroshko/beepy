import { Logo } from "@/components/Logo";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const CenterLayout = ({ children }: Props) => {
  return (
    <main className="xs:bg-gray-50 min-h-screen w-screen xs:py-10">
      <div className="mx-auto max-w-sm rounded-lg bg-white p-8 text-center xs:shadow-xl">
        <div className="mb-6 flex justify-center">
          <Logo size={40} />
        </div>
        {children}
      </div>
    </main>
  );
};

export default CenterLayout;
