import { db } from "@/api/utils";
import { usersTable } from "@/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getUser } from "./utils";

export async function GET() {
  const { userId } = auth();

  if (userId === null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const user = await getUser(userId);

    if (user !== null) {
      return NextResponse.json({ user });
    }

    return NextResponse.json(
      { error: "Failed to get the profile" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const { userId } = auth();

  if (userId === null) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { name } = (await request.json()) as {
      name: string;
    };
    const result = await db
      .update(usersTable)
      .set({
        name: name.trim(),
      })
      .where(eq(usersTable.clerkUserId, userId));

    if (result.rowCount === 1) {
      return NextResponse.json({});
    }

    return NextResponse.json(
      { error: "Failed to update the profile" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
