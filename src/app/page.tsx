import ChatContent from "../components/chat-content";
import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const session = await auth();

  if (!session) {
    return (
      <main className="flex flex-col gap-6 items-center justify-center h-screen">
        <div className="flex flex-col gap-4 items-center justify-center overflow-x-auto w-[80vh] text-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
            Streamline Your Coding Experience with CodeGPT
          </h1>
          <p className="text-sm font-light">
            CodeGPT is the ultimate solution for developers looking to simplify
            their coding workflow. Our AI-powered web app generates code
            snippets instantly based on your natural language descriptions. With
            CodeGPT, coding has never been easier.
          </p>
          <p className="text-md font-bold underline">Get Started Today!</p>
        </div>
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
