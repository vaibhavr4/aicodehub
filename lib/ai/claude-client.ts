import Anthropic from "@anthropic-ai/sdk";

export class ClaudeClient {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  async *streamChat(
    messages: Array<{ role: string; content: string }>,
    model: string = "claude-3-5-sonnet-20241022"
  ): AsyncGenerator<string> {
    const stream = await this.client.messages.stream({
      model,
      max_tokens: 4096,
      messages: messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })) as any,
    });

    for await (const chunk of stream) {
      if (
        chunk.type === "content_block_delta" &&
        chunk.delta.type === "text_delta"
      ) {
        yield chunk.delta.text;
      }
    }
  }

  async chat(
    messages: Array<{ role: string; content: string }>,
    model: string = "claude-3-5-sonnet-20241022"
  ): Promise<string> {
    const response = await this.client.messages.create({
      model,
      max_tokens: 4096,
      messages: messages.map((m) => ({
        role: m.role === "user" ? "user" : "assistant",
        content: m.content,
      })) as any,
    });

    const content = response.content[0];
    return content.type === "text" ? content.text : "";
  }
}

export const claudeClient = new ClaudeClient();
