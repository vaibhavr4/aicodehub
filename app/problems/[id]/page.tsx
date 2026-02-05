"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Language } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "@/components/editor/CodeEditor";
import { ProblemDescription } from "@/components/problem/ProblemDescription";
import { OutputPanel } from "@/components/execution/OutputPanel";
import { SessionRecorder } from "@/components/session/SessionRecorder";
import { ChatInterface } from "@/components/ai/ChatInterface";
import { AgentHQ } from "@/components/AgentHQ";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProblemDetail } from "@/types";

export default function ProblemPage() {
  const params = useParams();
  const problemId = params.id as string;

  const [problem, setProblem] = useState<ProblemDetail | null>(null);
  const [language, setLanguage] = useState<Language>(Language.PYTHON);
  const [code, setCode] = useState("");
  const [results, setResults] = useState<any>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    // Fetch problem details
    fetch(`/api/problems/${problemId}`)
      .then((res) => res.json())
      .then((data) => {
        setProblem(data);
        setCode(data.starterCode[language.toLowerCase()]);
      });

    // Create session
    fetch("/api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId }),
    })
      .then((res) => res.json())
      .then((data) => setSessionId(data.id));
  }, [problemId, language]);

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (problem) {
      setCode(problem.starterCode[newLanguage.toLowerCase()]);
    }
  };

  const handleSubmit = async () => {
    if (!sessionId) return;

    setIsRunning(true);
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          problemId,
          code,
          language,
        }),
      });

      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsRunning(false);
    }
  };

  if (!problem) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-64px)] flex">
      <SessionRecorder sessionId={sessionId} code={code} language={language} />

      {/* Left Side: Problem Description */}
      <div className="w-1/3 border-r overflow-hidden">
        <ProblemDescription problem={problem} />
      </div>

      {/* Middle: Editor and Output */}
      <div className="w-1/3 flex flex-col border-r">
        <div className="flex-1 overflow-hidden p-4">
          <CodeEditor
            code={code}
            onChange={(value) => setCode(value || "")}
            language={language}
            onLanguageChange={handleLanguageChange}
            height="calc(100vh - 200px)"
          />
          <div className="flex gap-2 mt-4">
            <Button onClick={handleSubmit} disabled={isRunning}>
              {isRunning ? "Running..." : "Submit"}
            </Button>
          </div>
        </div>
        <div className="h-64 border-t">
          <OutputPanel results={results} isRunning={isRunning} />
        </div>
      </div>

      {/* Right Side: AI Assistance */}
      <div className="w-1/3 overflow-hidden flex flex-col">
        <Tabs defaultValue="agents" className="flex-1 flex flex-col p-4">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="agents">Agent HQ</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
          </TabsList>
          <TabsContent value="agents" className="flex-1 overflow-auto">
            <AgentHQ
              sessionId={sessionId || ""}
              code={code}
              problemTitle={problem.title}
            />
          </TabsContent>
          <TabsContent value="chat" className="flex-1 overflow-auto">
            <ChatInterface
              sessionId={sessionId}
              code={code}
              problemTitle={problem.title}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
