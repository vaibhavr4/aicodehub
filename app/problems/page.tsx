import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Difficulty } from "@prisma/client";

function getDifficultyColor(difficulty: Difficulty) {
  switch (difficulty) {
    case "EASY":
      return "bg-green-500 hover:bg-green-600";
    case "MEDIUM":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "HARD":
      return "bg-red-500 hover:bg-red-600";
    default:
      return "bg-gray-500";
  }
}

export default async function ProblemsPage() {
  const problems = await prisma.problem.findMany({
    select: {
      id: true,
      title: true,
      slug: true,
      difficulty: true,
      category: true,
      tags: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Practice Problems</h1>
        <p className="text-muted-foreground">
          Solve coding problems with AI assistance
        </p>
      </div>

      <div className="grid gap-4">
        {problems.map((problem) => (
          <Link key={problem.id} href={`/problems/${problem.id}`}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{problem.title}</CardTitle>
                  <Badge className={getDifficultyColor(problem.difficulty)}>
                    {problem.difficulty}
                  </Badge>
                </div>
                <CardDescription>
                  {problem.category.replace(/_/g, " ")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {problem.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
