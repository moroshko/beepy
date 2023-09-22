import { db, getUserId } from "@/api/utils";
import { recordsTable } from "@/db/schema";
import { RecordItem } from "@/lib/types";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

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

export async function POST(request: Request) {
  const userId = await getUserId();

  if (userId === null) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const { sys, dia, pulse } = (await request.json()) as {
      sys: number;
      dia: number;
      pulse: number;
    };
    const result = await db
      .insert(recordsTable)
      .values({ userId, sys, dia, pulse })
      .returning({ createdRecordId: recordsTable.id });

    if (result.length === 1) {
      const { createdRecordId } = result[0];

      return NextResponse.json({ id: createdRecordId });
    }

    return NextResponse.json(
      { error: "Failed to add a record" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
