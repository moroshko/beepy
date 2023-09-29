import { ReactNode } from "react";
import { Header } from "./components/Header/Header";

type Props = {
  children: ReactNode;
};

const AuthenticatedLayout = async ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-5xl px-4">{children}</main>
    </>
  );
};

export default AuthenticatedLayout;
