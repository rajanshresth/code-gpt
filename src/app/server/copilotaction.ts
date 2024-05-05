import { CopilotRuntime } from "@copilotkit/backend";
import { Message } from "ai";

const buildGoogleGenAIPrompt = (
  p0: string[],
  p1: string[],
  content: Message[]
) => ({
  contents: content
    .filter(
      (message) => message.role === "user" || message.role === "assistant"
    )
    .map((message) => ({
      role: message.role === "user" ? "user" : "model",
      parts: [{ text: message.content }],
    })),
});
export const copilotKit = new CopilotRuntime({
  actions: [
    {
      name: "sayHello",
      description: "Says hello to someone.",
      argumentAnnotations: [
        {
          name: "name",
          type: "string",
          description: "The name of the person to say hello to.",
          required: true,
        },
      ],
      implementation: async (name) => {
        const prompt = buildGoogleGenAIPrompt(["Hello!"], ["Hello!"], []);
        const chain = prompt.contents.map((content) => content.parts[0].text);
        return chain;
      },
    },
  ],
});
