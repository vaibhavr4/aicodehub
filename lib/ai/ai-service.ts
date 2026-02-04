import { openaiClient } from "./openai-client";
import { claudeClient } from "./claude-client";

export type AIModel = "gpt-4" | "gpt-3.5-turbo" | "claude-3.5-sonnet";

export interface AIMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export class AIService {
  async *streamChat(
    messages: AIMessage[],
    model: AIModel
  ): AsyncGenerator<string> {
    if (model.startsWith("gpt")) {
      yield* openaiClient.streamChat(messages, model);
    } else if (model.startsWith("claude")) {
      // Filter out system messages for Claude
      const filteredMessages = messages.filter((m) => m.role !== "system");
      yield* claudeClient.streamChat(
        filteredMessages,
        "claude-3-5-sonnet-20241022"
      );
    }
  }

  async chat(messages: AIMessage[], model: AIModel): Promise<string> {
    if (model.startsWith("gpt")) {
      return openaiClient.chat(messages, model);
    } else if (model.startsWith("claude")) {
      const filteredMessages = messages.filter((m) => m.role !== "system");
      return claudeClient.chat(
        filteredMessages,
        "claude-3-5-sonnet-20241022"
      );
    }
    throw new Error(`Unsupported model: ${model}`);
  }

  buildSystemPrompt(problemTitle: string, code: string): string {
    return `You are a coding interview assistant helping a candidate solve: "${problemTitle}"

Current Code:
\`\`\`
${code}
\`\`\`

Guidelines:
- Provide hints and guidance, not complete solutions
- Help debug errors and explain concepts clearly
- Encourage good practices and efficient algorithms
- Ask clarifying questions when needed

DO NOT write complete solutions unless explicitly asked.`;
  }
}

export const aiService = new AIService();
