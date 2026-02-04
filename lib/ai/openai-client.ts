import OpenAI from "openai";

export class OpenAIClient {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async *streamChat(
    messages: Array<{ role: string; content: string }>,
    model: string = "gpt-4"
  ): AsyncGenerator<string> {
    const stream = await this.client.chat.completions.create({
      model,
      messages: messages as any,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        yield content;
      }
    }
  }

  async chat(
    messages: Array<{ role: string; content: string }>,
    model: string = "gpt-4"
  ): Promise<string> {
    const response = await this.client.chat.completions.create({
      model,
      messages: messages as any,
    });

    return response.choices[0]?.message?.content || "";
  }
}

export const openaiClient = new OpenAIClient();
