import { NextResponse } from "next/server";
import { aiService } from "@/lib/ai/ai-service";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { sessionId, code, language, problemTitle } = await request.json();

    const systemPrompt = `You are an expert in algorithm complexity analysis.

Problem: ${problemTitle}
Language: ${language}

Code to analyze:
\`\`\`${language}
${code}
\`\`\`

Provide a detailed complexity analysis:

1. **Time Complexity**:
   - Explain the time complexity (Big O notation)
   - Walk through the analysis step by step
   - Identify which operations contribute to the complexity

2. **Space Complexity**:
   - Explain the space complexity (Big O notation)
   - Include auxiliary space and call stack (for recursion)
   - Explain what data structures contribute to space usage

3. **Optimization Opportunities**:
   - Can the time or space complexity be improved?
   - Suggest alternative approaches if applicable

Be clear, educational, and specific.`;

    const messages = [
      { role: "system" as const, content: systemPrompt },
      { role: "user" as const, content: "Analyze the complexity of my code." },
    ];

    const analysis = await aiService.chat(messages, "claude-sonnet-4-20250514");

    // Store the analysis
    await prisma.aIInteraction.create({
      data: {
        sessionId,
        role: "assistant",
        message: `Complexity Analysis:\n\n${analysis}`,
        model: "claude-sonnet-4-20250514",
        codeSnapshot: code,
      },
    });

    return NextResponse.json({ analysis });
  } catch (error) {
    console.error("Error in complexity analysis:", error);
    return NextResponse.json(
      { error: "Failed to analyze complexity" },
      { status: 500 }
    );
  }
}
