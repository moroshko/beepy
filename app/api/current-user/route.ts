import { db } from "@/api/utils";
import { usersTable } from "@/db/schema";
import { User } from "@/lib/types";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

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

export async function GET() {
  const { userId } = auth();

  if (userId === null) {
    return new Response("Unauthorized", { status: 401 });
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
    return new Response("Unauthorized", { status: 401 });
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
