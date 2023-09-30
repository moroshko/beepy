import { currentUser } from "@clerk/nextjs";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";

console.log("====>", process.env.DATABASE_URL);

const client = new Pool({ connectionString: process.env.DATABASE_URL });

export const db = drizzle(client);

export const getUserId = async () => {
  const clerkUser = await currentUser();

  return clerkUser === null
    ? null
    : (clerkUser.privateMetadata.neonUserId as string);
};
