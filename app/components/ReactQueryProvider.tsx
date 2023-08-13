"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const ReactQueryProvider = ({ children }: Props) => {
  // If we created the QueryClient outside of ReactQueryProvider, it would be shared across server side requests,
  // which is something we don't want.
  // See: https://twitter.com/moroshko/status/1618197278946381826
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export { ReactQueryProvider };
