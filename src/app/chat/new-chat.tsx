"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const NewChat = () => {
  const router = useRouter();
  return <Button onClick={() => router.push("/")}>New Chat</Button>;
};

export default NewChat;
