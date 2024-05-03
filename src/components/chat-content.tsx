"use client";

import ChatInput from "@/components/chat-input";

export default function ChatContent() {
  const handleSubmit = (value: string, file?: File) => {
    console.log("submit", value, file);
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
