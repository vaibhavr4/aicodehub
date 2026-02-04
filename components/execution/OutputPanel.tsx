"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TestResult {
  testCaseId: string;
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  stdout?: string;
  stderr?: string;
  executionTime?: number;
}

interface OutputPanelProps {
  results: TestResult[] | null;
  isRunning: boolean;
}

export function OutputPanel({ results, isRunning }: OutputPanelProps) {
  if (isRunning) {
    return (
      <div className="h-full overflow-auto p-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-center">
              <p className="text-muted-foreground">Running tests...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="h-full overflow-auto p-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-muted-foreground text-center">
              Run your code to see results
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const passedCount = results.filter((r) => r.passed).length;
  const totalCount = results.length;
  const allPassed = passedCount === totalCount;

  return (
    <div className="h-full overflow-auto p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-xl font-bold">Test Results</h2>
          <Badge className={allPassed ? "bg-green-500" : "bg-red-500"}>
            {passedCount}/{totalCount} Passed
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="results" className="w-full">
        <TabsList>
          <TabsTrigger value="results">Results</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          {results.map((result, index) => (
            <Card
              key={result.testCaseId}
              className={result.passed ? "border-green-500" : "border-red-500"}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm">Test Case {index + 1}</CardTitle>
                  <Badge className={result.passed ? "bg-green-500" : "bg-red-500"}>
                    {result.passed ? "Passed" : "Failed"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {!result.passed && (
                  <>
                    <div>
                      <p className="text-sm font-semibold mb-1">Input:</p>
                      <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                        {result.input}
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Expected:</p>
                      <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                        {result.expectedOutput}
                      </pre>
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-1">Got:</p>
                      <pre className="bg-muted p-2 rounded text-sm overflow-x-auto">
                        {result.actualOutput}
                      </pre>
                    </div>
                  </>
                )}
                {result.stderr && (
                  <div>
                    <p className="text-sm font-semibold mb-1 text-red-500">
                      Error:
                    </p>
                    <pre className="bg-muted p-2 rounded text-sm overflow-x-auto text-red-500">
                      {result.stderr}
                    </pre>
                  </div>
                )}
                {result.executionTime && (
                  <p className="text-xs text-muted-foreground">
                    Execution time: {result.executionTime}ms
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
