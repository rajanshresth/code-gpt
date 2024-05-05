"use client";

import { useState, useRef } from "react";

import ChatInput from "@/components/chat-input";

import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus as dark } from "react-syntax-highlighter/dist/esm/styles/prism";

import { convertFileToBase64 } from "@/lib/utils";
import { Copy } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

export default function ChatContent() {
  const [assisnantResponse, setAssistantResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [copyButtonText, setCopyButtonText] = useState("Copy");
  const { toast } = useToast();

  const handleSubmit = async (value: string, file?: File) => {
    setIsLoading(true);
    setAssistantResponse("");

    let body = "";
    if (file) {
      const imageUrl = await convertFileToBase64(file);
      const content = [
        {
          type: "image_url",
          image_url: {
            url: imageUrl,
          },
        },
        {
          type: "text",
          text: value,
        },
      ];

      body = JSON.stringify({ content });
    } else {
      body = JSON.stringify({ content: value });
    }

    // console.log("submit", value, file);
    try {
      abortControllerRef.current = new AbortController();
      const res = await fetch("/api/message", {
        method: "POST",
        body: body,
        headers: {
          "Content-Type": "application/json",
        },
        signal: abortControllerRef.current.signal,
      });

      if (!res.ok || !res.body) {
        alert("Error sending message");
        return;
      }

      const reader = res.body.getReader();

      const decoder = new TextDecoder();
      while (true) {
        const { value, done } = await reader.read();

        const text = decoder.decode(value);
        setAssistantResponse((currentValue) => currentValue + text);

        if (done) {
          break;
        }
      }
    } catch (error: any) {
      if (error.name !== "AbortError") {
        alert("Error sending message");
      }
    }
    abortControllerRef.current = null;
    setIsLoading(false);
  };

  const handleStop = () => {
    if (!abortControllerRef.current) {
      return;
    }
    abortControllerRef.current.abort();
    abortControllerRef.current = null;
  };
  const copyMarkdownToClipboard = () => {
    try {
      navigator.clipboard.writeText(assisnantResponse);
    } catch (error) {
      console.error("Failed to copy content: ", error);
    }
  };
  const handleCopyClick = async () => {
    await copyMarkdownToClipboard();
    setCopyButtonText("Copied...");
    setTimeout(() => setCopyButtonText("Copy"), 2000); // Reset button text after 2 seconds
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="max-w-4xl w-full max-h-[70vh] mx-auto flex-1 px-10 py-5 overflow-x-hidden overflow-y-scroll custom-scrollbar prose dark:prose-invert">
        {assisnantResponse && !isLoading && (
          <Button
            onClick={() => {
              handleCopyClick();
            }}
            className="mb-2 p-2 text-white rounded"
          >
            {copyButtonText}
            {""} <Copy className="inline-block" />
          </Button>
        )}
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props;
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={dark}
                  wrapLines={true}
                  wrapLongLines={true}
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  <div className="overflow-y-auto">{children}</div>
                </code>
              );
            },
          }}
        >
          {assisnantResponse}
        </Markdown>
      </div>
      <ChatInput
        onSubmit={handleSubmit}
        isStreaming={isLoading}
        onStop={handleStop}
      />
    </div>
  );
}