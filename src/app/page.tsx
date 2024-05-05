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
import { Button } from "@/components/ui/button";
import { ChevronsRight } from "lucide-react";

export default function Page() {
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
        <ModeToggle />
      </div>

      <ChatContent />
    </main>
  );
}