"use client";

import { createContext, ReactNode, useContext } from "react";
import { Database } from "../../supabase/types";

type Profile = Pick<
  Database["public"]["Tables"]["profiles"]["Row"],
  "name" | "avatar"
> & {
  avatarUrl: string | null;
};

const ProfileContext = createContext<Profile | null>(null);

type Props = {
  profile: Profile;
  children: ReactNode;
};

export const ProfileProvider = ({ profile, children }: Props) => {
  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const profile = useContext(ProfileContext);

  if (profile === null) {
    throw new Error(`useProfile must be used inside ProfileProvider`);
  }

  return profile;
};
