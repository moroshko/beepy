import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const getUserIdOrRedirectToLogin = async (): Promise<string> => {
  const clerkUser = await currentUser();

  if (clerkUser === null) {
    redirect("/login");
  }

  return clerkUser.privateMetadata.neonUserId as string;
};
