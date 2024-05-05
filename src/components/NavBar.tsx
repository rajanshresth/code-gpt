import { auth } from "@/auth";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { ChevronsRight } from "lucide-react";
import ChatList from "./chat-list";
import { ModeToggle } from "./mode-toggle";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import NewChat from "@/app/chat/new-chat";

const NavBar = async () => {
  const session = await auth();

  if (!session) return null;
  return (
    <div className="flex items-center justify-between m-4">
      <Sheet>
        <SheetTrigger asChild>
          <ChevronsRight size={24} />
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className="flex flex-col">
            <SheetTitle>Chat List</SheetTitle>
            <NewChat />
          </SheetHeader>
          <div className="w-100 border-r-1 border-neutral-300 dark:border-neutral-700 overflow-auto">
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
  );
};

export default NavBar;
