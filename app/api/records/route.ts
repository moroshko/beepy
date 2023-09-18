import { db, getUserId } from "@/api/utils";
import { recordsTable } from "@/db/schema";
import { RecordItem } from "@/lib/types";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

export const getRecords = async (userId: string): Promise<RecordItem[]> => {
  const result = await db
    .select()
    .from(recordsTable)
    .where(eq(recordsTable.userId, userId));

  return result.map((record) => ({
    id: record.id,
    createdAt: record.createdAt,
    sys: record.sys,
    dia: record.dia,
    pulse: record.pulse,
  }));
};

export async function GET() {
  const userId = await getUserId();

  if (userId === null) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const records = await getRecords(userId);

    return NextResponse.json({ records });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
