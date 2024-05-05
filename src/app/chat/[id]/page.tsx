import { auth } from "@/auth";
import ChatContent from "@/components/chat-content";
import { db } from "@/db";
import { usersMessages } from "@/db/schema";
import { eq } from "drizzle-orm";
import React from "react";

const ChatListPage = async ({ params }: { params: { id: string } }) => {
  const session = await auth();
  if (!session) {
    return (
      <div className="font-bold dark:text-white text-black">Not logged in</div>
    );
  }
  const chat = await db
    .select()
    .from(usersMessages)
    .where(eq(usersMessages.id, params.id));

  return (
    <div>
      {chat.map((chat) => {
        return (
          <div className="flex flex-col gap-1" key={chat.id}>
            <ChatContent session={session} content={chat.message} />
          </div>
        );
      })}
    </div>
  );
};

export default ChatListPage;
