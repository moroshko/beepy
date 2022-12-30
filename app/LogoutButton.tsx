"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLogout } from "./utils/hooks/useLogout";

const LogoutButtonComponent = () => {
  const router = useRouter();
  const logoutMutation = useLogout();
  const onLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return <button onClick={onLogout}>Logout</button>;
};

const LogoutButton = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <LogoutButtonComponent />
    </QueryClientProvider>
  );
};

export { LogoutButton };
