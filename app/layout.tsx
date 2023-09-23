import "./globals.css";
// This line needs to be empty to keep `globals.css` first!
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ReactNode } from "react";
import { ReactQueryProvider } from "./components/ReactQueryProvider";

export const metadata: Metadata = {
  title: "Beepy",
  description: "Easily track your blood pressure",
};

const inter = Inter({ subsets: ["latin"] });

type Props = {
  children: ReactNode;
};

const RootLayout = async ({ children }: Props) => {
  return (
    <html lang="en" className={inter.className}>
      <body className="[--header-height:56px]">
        <ClerkProvider>
          <ReactQueryProvider>{children}</ReactQueryProvider>
        </ClerkProvider>
      </body>
    </html>
  );
};

export default RootLayout;
