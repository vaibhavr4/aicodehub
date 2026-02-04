import { Language } from "@prisma/client";

// Judge0 language IDs
const LANGUAGE_IDS: Record<Language, number> = {
  PYTHON: 71, // Python 3
  JAVASCRIPT: 63, // JavaScript (Node.js)
  JAVA: 62, // Java
  CPP: 54, // C++ (GCC)
  GO: 60, // Go
};

interface Judge0Submission {
  source_code: string;
  language_id: number;
  stdin?: string;
  expected_output?: string;
}

interface Judge0Result {
  stdout: string | null;
  stderr: string | null;
  status: {
    id: number;
    description: string;
  };
  time: string | null;
  memory: number | null;
}

export class Judge0Client {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = process.env.JUDGE0_RAPID_API_KEY || "";
    this.baseUrl = "https://judge0-ce.p.rapidapi.com";
  }

  async submitCode(
    code: string,
    language: Language,
    stdin?: string
  ): Promise<string> {
    const submission: Judge0Submission = {
      source_code: Buffer.from(code).toString("base64"),
      language_id: LANGUAGE_IDS[language],
      ...(stdin && { stdin: Buffer.from(stdin).toString("base64") }),
    };

    const response = await fetch(`${this.baseUrl}/submissions?base64_encoded=true&wait=false`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-RapidAPI-Key": this.apiKey,
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
      body: JSON.stringify(submission),
    });

    if (!response.ok) {
      throw new Error(`Judge0 submission failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.token;
  }

  async getSubmission(token: string, maxRetries = 10): Promise<Judge0Result> {
    for (let i = 0; i < maxRetries; i++) {
      const response = await fetch(
        `${this.baseUrl}/submissions/${token}?base64_encoded=true`,
        {
          headers: {
            "X-RapidAPI-Key": this.apiKey,
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Judge0 get submission failed: ${response.statusText}`);
      }

      const data = await response.json();

      // Status ID 1 = In Queue, 2 = Processing
      if (data.status.id > 2) {
        // Decode base64 fields
        return {
          stdout: data.stdout ? Buffer.from(data.stdout, "base64").toString() : null,
          stderr: data.stderr ? Buffer.from(data.stderr, "base64").toString() : null,
          status: data.status,
          time: data.time,
          memory: data.memory,
        };
      }

      // Wait 1 second before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    throw new Error("Judge0 submission timeout");
  }

  async executeCode(
    code: string,
    language: Language,
    stdin?: string
  ): Promise<Judge0Result> {
    const token = await this.submitCode(code, language, stdin);
    return this.getSubmission(token);
  }
}

export const judge0 = new Judge0Client();
