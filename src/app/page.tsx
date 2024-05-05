import { ModeToggle } from "@/components/mode-toggle";
import ChatContent from "../components/chat-content";
import ChatList from "../components/chat-list";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronsRight } from "lucide-react";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default async function Page() {
  const session = await auth();

  if (!session) {
    return (
      <main className="flex flex-col gap-8 items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-center">
          You need to be logged in to view this page
        </h1>
        <Link href={"api/auth/signin"}>
          <Button className=" text-center font-bold">Log in</Button>
        </Link>
      </main>
    );
  }
  return (
    <main className="max-h-screen">
      <div className="flex items-center justify-between m-4">
        <Sheet>
          <SheetTrigger asChild>
            <ChevronsRight size={24} />
          </SheetTrigger>
          <SheetContent side={"left"}>
            <SheetHeader>
              <SheetTitle>Chat List</SheetTitle>
            </SheetHeader>
            <div className="w-80 border-r-2 border-neutral-300 dark:border-neutral-700 overflow-auto">
              <ChatList />
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-xl lg:text-3xl font-extrabold text-center">
          CodeGPT
        </h1>
        <div className="flex gap-4">
          <ModeToggle />
          {session.user && (
            <Link href="/api/auth/signout">
              <Avatar>
                <AvatarImage
                  src={`${session.user.image}`}
                  alt={`${session.user}`}
                />
                <AvatarFallback>{session.user.name}</AvatarFallback>
              </Avatar>
            </Link>
          )}
        </div>
      </div>
      <ChatContent session={session} />
    </main>
  );
}