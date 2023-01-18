"use client";

import { User } from "@supabase/supabase-js";
import { createContext, ReactNode, useContext } from "react";

const UserContext = createContext<User | null>(null);

type Props = {
  user: User;
  children: ReactNode;
};

export const UserProvider = ({ user, children }: Props) => {
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const user = useContext(UserContext);

  if (user === null) {
    throw new Error(`useUser must be used inside UserProvider`);
  }

  return user;
};
