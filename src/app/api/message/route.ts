import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message } = body;
  console.log("content", { message });

  return new Response(JSON.stringify({ message }), {
    status: 200,
  });
}
