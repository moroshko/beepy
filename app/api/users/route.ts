import { db } from "@/api/utils";
import { usersTable } from "@/db/schema";
import { users } from "@clerk/clerk-sdk-node";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST() {
  const { userId } = auth();

  if (userId === null) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const result = await db
      .insert(usersTable)
      .values({ clerkUserId: userId })
      .returning({ createdUserId: usersTable.id });

    if (result.length === 1) {
      const { createdUserId } = result[0];

      await users.updateUserMetadata(userId, {
        privateMetadata: {
          neonUserId: createdUserId,
        },
      });

      return new Response(null, { status: 200 });
    }

    return NextResponse.json(
      { error: "Failed to create a user" },
      { status: 500 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
