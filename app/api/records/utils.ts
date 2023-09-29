import { db } from "@/api/utils";
import { recordsTable } from "@/db/schema";
import { RecordItem } from "@/lib/types";
import { desc, eq } from "drizzle-orm";

export const getRecords = async (userId: string): Promise<RecordItem[]> => {
  const result = await db
    .select()
    .from(recordsTable)
    .where(eq(recordsTable.userId, userId))
    .orderBy(desc(recordsTable.createdAt));

  return result.map((record) => ({
    id: record.id,
    createdAt: record.createdAt,
    sys: record.sys,
    dia: record.dia,
    pulse: record.pulse,
  }));
};
