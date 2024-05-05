import { CopilotRuntime, LangChainAdapter } from "@copilotkit/backend";
import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY!);
export const runtime = "edge";

export async function POST(req: Request) {
  const copilotKit = new CopilotRuntime();
  const body = await req.json();
  const { content } = body;
  return copilotKit.response(
    req,
    new LangChainAdapter(async (forwardedProps) => {
      const modelInstance = genAI.getGenerativeModel({
        model: "gemini-pro",
      });
      const chatCompletion = await modelInstance.generateContent([
        prompt + content,
      ]);
      return chatCompletion.response.text();
    })
  );
}
