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
    <main className="max-h-screen flex ">
      <div className="m-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant={"outline"}>
              <ChevronsRight size={24} />
            </Button>
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
      </div>
      <div className="flex-1">
        <div className="flex justify-between m-4">
          <h1 className="text-3xl font-bold text-center">CodeGPT</h1>
          <ModeToggle />
        </div>
        <ChatContent />
      </div>
    </main>
  );
}
