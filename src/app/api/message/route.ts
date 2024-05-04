import { GoogleGenerativeAI } from "@google/generative-ai";
import { StreamingTextResponse, streamText } from "ai";
import { NextRequest, NextResponse } from "next/server";
const genAI = new GoogleGenerativeAI(process.env.GENERATIVE_AI_API_KEY!);

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
