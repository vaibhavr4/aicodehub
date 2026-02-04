import { Difficulty, Category, Language } from "@prisma/client";

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  category: Category;
  tags: string[];
}

export interface ProblemDetail extends Problem {
  description: string;
  starterCode: Record<string, string>;
  functionName: string;
  testCases: TestCase[];
}

export interface TestCase {
  id: string;
  input: string;
  output: string;
  isPublic: boolean;
}

export { Difficulty, Category, Language };
