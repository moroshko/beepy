import { db, getUserId } from "@/api/utils";
import { recordsTable } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
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
      .update(recordsTable)
      .set({ sys, dia, pulse })
      .where(and(eq(recordsTable.userId, userId), eq(recordsTable.id, id)));

    if (result.rowCount === 1) {
      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const userId = await getUserId();

  if (userId === null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const result = await db
      .delete(recordsTable)
      .where(and(eq(recordsTable.userId, userId), eq(recordsTable.id, id)));

    if (result.rowCount === 1) {
      return NextResponse.json({}, { status: 200 });
    }

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
