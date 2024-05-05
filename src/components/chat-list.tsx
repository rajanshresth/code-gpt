import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "./ui/button";
import { db } from "@/db";
import { usersMessages } from "@/db/schema";
import { eq } from "drizzle-orm";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "./ui/separator";

export default async function ChatList() {
  const session = await auth();
  if (!session) {
    return (
      <div className="flex flex-col gap-4 text-center">
        <p className="font-bold">Not logged in</p>
        <Link href="/api/auth/signin">
          <Button>Login</Button>
        </Link>
      </div>
    );
  }
  const chat = await db
    .select()
    .from(usersMessages)
    .where(eq(usersMessages.userId, session.user?.id!));

  return (
    <ScrollArea className="h-[90vh] max-w-full rounded-md ">
      <div className="p-4">
        {chat.map((c) => (
          <>
            <Link href={`/chat/${c.id}`} className="flex flex-col gap-1">
              <span className="text-sm overflow-hidden">{c.id}</span>
              <span>{c.createdAt.toDateString()}</span>
            </Link>
            <Separator className="my-2" />
          </>
        ))}
      </div>
    </ScrollArea>
  );
}
