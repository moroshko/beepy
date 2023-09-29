import { db } from "@/api/utils";
import { usersTable } from "@/db/schema";
import { User } from "@/lib/types";
import { eq } from "drizzle-orm";

export const getUser = async (clerkUserId: string): Promise<User | null> => {
  const result = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.clerkUserId, clerkUserId));

  if (result.length !== 1) {
    return null;
  }

  const user = result[0];

  return {
    name: user.name,
  };
};
