import { NextResponse } from "next/server";
import { aiService } from "@/lib/ai/ai-service";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { sessionId, code, language, problemTitle } = await request.json();

    const systemPrompt = `You are an expert code reviewer for coding interviews. Analyze this code and provide constructive feedback.

Problem: ${problemTitle}
Language: ${language}

Code to review:
\`\`\`${language}
${code}
\`\`\`

Provide feedback on:
1. **Correctness**: Are there any bugs or edge cases missed?
2. **Code Quality**: Is the code clean, readable, and well-structured?
3. **Efficiency**: What's the time and space complexity? Can it be optimized?
4. **Best Practices**: Are language-specific best practices followed?

Format your response with clear sections and be specific with suggestions.`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: "Please review my code." },
    ];

    const review = await aiService.chat(messages, "claude-sonnet-4-20250514");

    // Store the review
    await prisma.aIInteraction.create({
      data: {
        sessionId,
        role: "assistant",
        message: review,
        model: "claude-sonnet-4-20250514",
        codeSnapshot: code,
      },
    });

    return NextResponse.json({ review });
  } catch (error) {
    console.error("Error in code review:", error);
    return NextResponse.json(
      { error: "Failed to review code" },
      { status: 500 }
    );
  }
}
