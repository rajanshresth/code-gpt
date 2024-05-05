import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
export const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY!);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { content } = body;
  const prompt = `As a professional programming instructor with extensive knowledge in various programming languages, your task is to generate code responses exclusively. If presented with a question not related to coding, respond with a text file containing the message: 'Please ask a coding-related question.'`;

  try {
    const modelInstance = genAI.getGenerativeModel({
      model: "gemini-pro",
    });
    const chatCompletion = await modelInstance.generateContent([
      prompt + content,
    ]);
    const responseStream = new ReadableStream({
      start(controller) {
        controller.enqueue(chatCompletion.response.text());
        controller.close();
      },
    });
    // console.log(chatCompletion.response.text());
    return new StreamingTextResponse(responseStream);
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { error: error || "An error occurred" },
      {
        status: 500,
      }
    );
  }
}
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import { GoogleGenerativeAIStream, Message, StreamingTextResponse } from "ai";

// const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY!);

// const buildGoogleGenAIPrompt = (content: Message[]) => ({
//   contents: content
//     .filter(
//       (message) => message.role === "user" || message.role === "assistant"
//     )
//     .map((message) => ({
//       role: message.role === "user" ? "user" : "model",
//       parts: [{ text: message.content }],
//     })),
// });

// export async function POST(req: Request) {
//   const body = await req.json();

//   // Check if `body.content` is a string and format it as an array of `Message` objects
//   let messages: Message[];
//   if (typeof body.content === "string") {
//     messages = [
//       {
//         role: "system",
//         content:
//           "As an expert in software development, you excel in utilizing the latest technologies and methodologies across all programming languages and frameworks. Your expertise extends to creating visually appealing and functionally robust UI designs. Your responses are exclusively in code form, focusing on delivering comprehensive, executable solutions without explanatory text. Your approach emphasizes code clarity, adherence to best practices, and the use of cutting-edge tools. You meticulously follow specified requirements regarding libraries and languages, ensuring your code contributions are fully integrated and operational within the given context. Your primary objective is to communicate solely through code, providing complete and self-sufficient code responses that align with the user's directives.",
//         id: "system",
//       },
//       {
//         id: "user",
//         role: "user",
//         content:
//           "I am in the process of enhancing a pre-existing application with new functionalities and improvements. Your assistance is sought for introducing new features and refining the current codebase to elevate its readability and adherence to contemporary best practices. The expectation is for the solutions to embody the latest advancements in software development, tailored to the specified technologies and frameworks. Your contributions should be comprehensive, avoiding partial or differential code snippets, and should be ready to run or compile as provided. It is imperative that your code aligns with the project's existing language, style, and libraries, unless a conversion or transformation is requested. Your responses should be purely code-based, fulfilling the requirement to communicate exclusively through well-structured and complete code examples." +
//           body.content,
//       },
//     ];
//   } else if (Array.isArray(body.content)) {
//     messages = body.content;
//   } else {
//     // Handle unexpected `body.content` format
//     console.error("Unexpected format of `body.content`");
//     return new Response("Invalid request format", { status: 400 });
//   }

//   try {
//     const geminiStream = await genAI
//       .getGenerativeModel({ model: "gemini-pro" })
//       .generateContentStream(buildGoogleGenAIPrompt(messages));
//     // console.log("geminiStream", geminiStream);

//     // Convert the response into a friendly text-stream
//     const stream = GoogleGenerativeAIStream(geminiStream);

//     // Respond with the stream
//     return new StreamingTextResponse(stream);
//   } catch (error) {
//     console.error("Error generating content stream:", error);
//     // Handle error appropriately, e.g., return an error response
//     return new Response("Error generating content", { status: 500 });
//   }
// }
