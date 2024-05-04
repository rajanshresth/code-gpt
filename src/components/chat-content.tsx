"use client";

import ChatInput from "@/components/chat-input";
import { useChat } from "ai/react";

export default function ChatContent() {
  const { messages, input, handleInputChange } = useChat();
  const handleSubmit = async (value: string, file?: File) => {
    const data = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content: value }),
    });
    const res = await data.json();

    if (!res.ok || !res.body) {
      alert("Error sending message");
      return;
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let finalResult = "";
    while (true) {
      const { value, done } = await reader.read();
      const text = decoder.decode(value);
      finalResult += text;
      console.log("finalResult", finalResult);
      if (done) {
        break;
      }
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="max-w-4xl w-full h-[70vh] mx-auto px-10 py-5 overflow-x-hidden overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className="flex flex-col space-y-2">
            <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p>{message.content}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: "15vh" }}>
        <ChatInput onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
