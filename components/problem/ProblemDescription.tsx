"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProblemDetail } from "@/types";
import { Difficulty } from "@prisma/client";

interface ProblemDescriptionProps {
  problem: ProblemDetail;
}

function getDifficultyColor(difficulty: Difficulty) {
  switch (difficulty) {
    case "EASY":
      return "bg-green-500";
    case "MEDIUM":
      return "bg-yellow-500";
    case "HARD":
      return "bg-red-500";
    default:
      return "bg-gray-500";
  }
}

export function ProblemDescription({ problem }: ProblemDescriptionProps) {
  return (
    <div className="h-full overflow-auto p-4">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-2">
          <h1 className="text-2xl font-bold">{problem.title}</h1>
          <Badge className={getDifficultyColor(problem.difficulty)}>
            {problem.difficulty}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline">{problem.category.replace(/_/g, " ")}</Badge>
          {problem.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Tabs defaultValue="description" className="w-full">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="examples">Examples</TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="space-y-4">
          <Card>
            <CardContent className="pt-6">
              <div
                className="prose prose-sm max-w-none dark:prose-invert"
                dangerouslySetInnerHTML={{
                  __html: problem.description.replace(/\n/g, "<br />"),
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="examples" className="space-y-4">
          {problem.testCases
            .filter((tc) => tc.isPublic)
            .map((testCase, index) => {
              let input, output;
              try {
                input = JSON.parse(testCase.input);
                output = JSON.parse(testCase.output);
              } catch {
                input = testCase.input;
                output = testCase.output;
              }

              return (
                <Card key={testCase.id}>
                  <CardHeader>
                    <CardTitle className="text-sm">
                      Example {index + 1}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div>
                      <p className="text-sm font-semibold mb-1">Input:</p>
                      <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                        {typeof input === "object"
                          ? JSON.stringify(input, null, 2)
                          : input}
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Output:</p>
                      <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                        {typeof output === "object"
                          ? JSON.stringify(output, null, 2)
                          : output}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
        </TabsContent>
      </Tabs>
    </div>
  );
}
