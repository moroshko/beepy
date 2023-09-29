import { db, getUserId } from "@/api/utils";
import { recordsTable } from "@/db/schema";
import { NextResponse } from "next/server";
import { getRecords } from "./utils";

export const runtime = "edge";

export async function GET() {
  const userId = await getUserId();

  if (userId === null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
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
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
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
