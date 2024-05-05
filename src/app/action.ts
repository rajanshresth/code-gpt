"use server";

import { db } from "@/db";
import { users, usersMessages } from "@/db/schema";
import { eq } from "drizzle-orm";

// store the message to the database
export async function storeMessage(user_id: string, content: string) {
  const User = await db
    .select({ users })
    .from(users)
    .where(eq(users.id, user_id));
  if (!User) return;
  try {
    await db.insert(usersMessages).values({
      userId: `${user_id}`,
      message: content,
      createdAt: new Date(),
      id: crypto.randomUUID(),
    });
  } catch (error) {
    console.error("Failed to store message: ", error);
    throw new Error("Failed to store message");
  }
}

export async function Chatlist(user_id: string) {
  const chat = await db
    .select()
    .from(usersMessages)
    .where(eq(usersMessages.userId, user_id));

  return chat;
}