import { ReactNode } from "react";
import { Header } from "./components/Header/Header";

type Props = {
  children: ReactNode;
};

const AuthenticatedLayout = async ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-4 xs:py-8">{children}</main>
    </>
  );
};

export default AuthenticatedLayout;
