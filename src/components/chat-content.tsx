"use client";

import ChatInput from "@/components/chat-input";

export default function ChatContent() {
  const handleSubmit = async (value: string, file?: File) => {
    const res = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: value }),
    });
    const data = await res.json();
    return data;
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="max-w-4xl w-full h-[70vh] mx-auto px-10 py-5 overflow-x-hidden overflow-y-auto">
        AI Content goes here
      </div>
      <div style={{ height: "15vh" }}>
        <ChatInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
