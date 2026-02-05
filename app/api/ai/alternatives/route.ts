import { NextResponse } from "next/server";
import { aiService } from "@/lib/ai/ai-service";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { sessionId, problemTitle, problemDescription, currentCode, language } =
      await request.json();

    const systemPrompt = `You are an expert coding interview coach showing alternative solutions.

Problem: ${problemTitle}

${problemDescription}

User's current solution:
\`\`\`${language}
${currentCode}
\`\`\`

Provide 2-3 alternative approaches to solve this problem:

For each alternative:
1. **Approach Name**: Brief descriptive name
2. **Key Idea**: Core concept in 1-2 sentences
3. **Complexity**: Time and space complexity
4. **Pros**: When this approach is better
5. **Cons**: Trade-offs or limitations
6. **Code Skeleton**: High-level pseudocode or code structure (not full implementation)

Focus on teaching different problem-solving strategies.`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      {
        role: "user" as const,
        content: "Show me alternative ways to solve this problem.",
      },
    ];

    const alternatives = await aiService.chat(
      messages,
      "claude-sonnet-4-20250514"
    );

    // Store the alternatives
    await prisma.aIInteraction.create({
      data: {
        sessionId,
        role: "assistant",
        message: `Alternative Solutions:\n\n${alternatives}`,
        model: "claude-sonnet-4-20250514",
        codeSnapshot: currentCode,
      },
    });

    return NextResponse.json({ alternatives });
  } catch (error) {
    console.error("Error generating alternatives:", error);
    return NextResponse.json(
      { error: "Failed to generate alternatives" },
      { status: 500 }
    );
  }
}
