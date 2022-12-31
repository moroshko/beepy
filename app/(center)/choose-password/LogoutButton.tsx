"use client";

import { useRouter } from "next/navigation";
import { useLogout } from "utils/hooks/useLogout";

const LogoutButton = () => {
  const router = useRouter();
  const logoutMutation = useLogout();
  const onLogout = async () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        router.push("/login");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  };

  return (
    <button className="underline hover:no-underline" onClick={onLogout}>
      Logout
    </button>
  );
};

export { LogoutButton };
