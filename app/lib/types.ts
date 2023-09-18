import { recordsTable, usersTable } from "@/db/schema";

export type User = Pick<typeof usersTable.$inferSelect, "name">;

export type RecordItem = Omit<typeof recordsTable.$inferSelect, "userId">;
