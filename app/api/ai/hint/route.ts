import { NextResponse } from "next/server";
import { aiService } from "@/lib/ai/ai-service";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { sessionId, problemTitle, problemDescription, code, hintLevel } =
      await request.json();

    const hintLevels = {
      1: "Provide a gentle nudge about the approach without revealing the solution. Ask guiding questions.",
      2: "Explain the optimal approach and data structures to use, but don't write code.",
      3: "Provide pseudocode for the solution without language-specific implementation.",
      4: "Provide detailed step-by-step guidance with code snippets for key parts.",
    };

    const systemPrompt = `You are a coding interview coach providing hints.

Problem: ${problemTitle}

${problemDescription}

Current code (if any):
\`\`\`
${code || "No code written yet"}
\`\`\`

Hint Level ${hintLevel}: ${hintLevels[hintLevel as keyof typeof hintLevels]}

Provide a hint that helps the candidate progress without solving the problem for them.`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: `Give me hint level ${hintLevel}` },
    ];

    const hint = await aiService.chat(messages, "claude-sonnet-4-20250514");

    // Store the hint interaction
    await prisma.aIInteraction.create({
      data: {
        sessionId,
        role: "assistant",
        message: `Hint Level ${hintLevel}: ${hint}`,
        model: "claude-sonnet-4-20250514",
        codeSnapshot: code,
      },
    });

    return NextResponse.json({ hint, level: hintLevel });
  } catch (error) {
    console.error("Error generating hint:", error);
    return NextResponse.json(
      { error: "Failed to generate hint" },
      { status: 500 }
    );
  }
}
