import ChatContent from "../components/chat-content";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      <ChatContent session={session} />
    </main>
  );
}
