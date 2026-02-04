import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { aiService, AIModel } from "@/lib/ai/ai-service";

export async function POST(request: Request) {
  try {
    const { sessionId, message, code, model, problemTitle } =
      await request.json();

    // Build message history from database
    const previousInteractions = await prisma.aIInteraction.findMany({
      where: { sessionId },
      orderBy: { createdAt: "asc" },
      take: 10, // Last 10 messages for context
    });

    const messages = [
      {
        role: "system" as const,
        content: aiService.buildSystemPrompt(problemTitle, code),
      },
      ...previousInteractions.map((interaction) => ({
        role: interaction.role as "user" | "assistant",
        content: interaction.message,
      })),
      {
        role: "user" as const,
        content: message,
      },
    ];

    // Store user message
    await prisma.aIInteraction.create({
      data: {
        sessionId,
        role: "user",
        message,
        model,
        codeSnapshot: code,
      },
    });

    // Create a streaming response
    const encoder = new TextEncoder();
    let fullResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of aiService.streamChat(
            messages,
            model as AIModel
          )) {
            fullResponse += chunk;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: chunk })}\n\n`));
          }

          // Store assistant message
          await prisma.aIInteraction.create({
            data: {
              sessionId,
              role: "assistant",
              message: fullResponse,
              model,
            },
          });

          // Record AI query event
          await prisma.sessionEvent.create({
            data: {
              sessionId,
              eventType: "AI_QUERY",
              data: {
                userMessage: message,
                assistantMessage: fullResponse,
                model,
              },
            },
          });

          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error in AI chat:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
