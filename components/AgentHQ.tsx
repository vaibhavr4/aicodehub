"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bot,
  Sparkles,
  Bug,
  Zap,
  BookOpen,
  TestTube,
  Code2,
  Brain,
  Target,
  Lightbulb,
} from "lucide-react";

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  capabilities: string[];
  bestFor: string[];
}

const agents: Agent[] = [
  {
    id: "code-generator",
    name: "Code Generator",
    description: "Generates complete, production-ready code solutions",
    icon: <Code2 className="w-5 h-5" />,
    color: "blue",
    capabilities: [
      "Full solution generation",
      "Multiple approaches",
      "Optimized algorithms",
      "Clean, readable code",
    ],
    bestFor: [
      "Starting from scratch",
      "Learning new patterns",
      "Quick prototyping",
    ],
  },
  {
    id: "debugger",
    name: "Debug Assistant",
    description: "Identifies and fixes bugs in your code",
    icon: <Bug className="w-5 h-5" />,
    color: "red",
    capabilities: [
      "Bug detection",
      "Root cause analysis",
      "Fix suggestions",
      "Edge case identification",
    ],
    bestFor: [
      "Code not working",
      "Failing test cases",
      "Runtime errors",
    ],
  },
  {
    id: "optimizer",
    name: "Code Optimizer",
    description: "Improves performance and efficiency",
    icon: <Zap className="w-5 h-5" />,
    color: "yellow",
    capabilities: [
      "Time complexity reduction",
      "Space optimization",
      "Algorithm improvements",
      "Performance profiling",
    ],
    bestFor: [
      "Slow solutions",
      "TLE errors",
      "Memory issues",
    ],
  },
  {
    id: "explainer",
    name: "Code Explainer",
    description: "Explains code logic and concepts clearly",
    icon: <BookOpen className="w-5 h-5" />,
    color: "green",
    capabilities: [
      "Line-by-line breakdown",
      "Concept explanation",
      "Visual diagrams",
      "Alternative approaches",
    ],
    bestFor: [
      "Understanding solutions",
      "Learning concepts",
      "Interview prep",
    ],
  },
  {
    id: "test-writer",
    name: "Test Generator",
    description: "Creates comprehensive test cases",
    icon: <TestTube className="w-5 h-5" />,
    color: "purple",
    capabilities: [
      "Edge case discovery",
      "Test case generation",
      "Coverage analysis",
      "Input validation",
    ],
    bestFor: [
      "Ensuring correctness",
      "Finding edge cases",
      "Before submission",
    ],
  },
  {
    id: "coach",
    name: "AI Coach",
    description: "Provides hints and guidance without spoiling",
    icon: <Target className="w-5 h-5" />,
    color: "indigo",
    capabilities: [
      "Progressive hints",
      "Strategic guidance",
      "Pattern recognition",
      "Learning path",
    ],
    bestFor: [
      "Learning independently",
      "Building intuition",
      "Interview practice",
    ],
  },
];

interface AgentHQProps {
  problemTitle: string;
  code: string;
  sessionId: string;
  onAgentResponse?: (response: string) => void;
}

export function AgentHQ({ problemTitle, code, sessionId, onAgentResponse }: AgentHQProps) {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string>("");

  const handleAgentSelect = async (agentId: string) => {
    setSelectedAgent(agentId);
    setLoading(true);
    setResponse("");

    try {
      const agent = agents.find((a) => a.id === agentId);
      let endpoint = "";
      let payload: any = { sessionId, code, problemTitle };

      switch (agentId) {
        case "code-generator":
          endpoint = "/api/ai/alternatives";
          payload.currentCode = code;
          payload.problemDescription = problemTitle;
          break;
        case "debugger":
          endpoint = "/api/ai/review";
          payload.language = "javascript";
          break;
        case "optimizer":
          endpoint = "/api/ai/complexity";
          payload.language = "javascript";
          break;
        case "explainer":
          endpoint = "/api/ai/chat";
          payload.message = "Explain this code step by step";
          payload.model = "claude-3.5-sonnet";
          break;
        case "test-writer":
          endpoint = "/api/ai/chat";
          payload.message = "Generate comprehensive test cases for this code, including edge cases";
          payload.model = "claude-3.5-sonnet";
          break;
        case "coach":
          endpoint = "/api/ai/hint";
          payload.problemDescription = problemTitle;
          payload.hintLevel = 1;
          break;
      }

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      const result =
        data.review ||
        data.alternatives ||
        data.analysis ||
        data.hint ||
        "Agent response received";

      setResponse(result);
      onAgentResponse?.(result);
    } catch (error) {
      console.error("Agent error:", error);
      setResponse("Agent failed to respond. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: "border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
      red: "border-red-500 hover:bg-red-50 dark:hover:bg-red-950",
      yellow: "border-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-950",
      green: "border-green-500 hover:bg-green-50 dark:hover:bg-green-950",
      purple: "border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-950",
      indigo: "border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-950",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
          <Brain className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Agent HQ</h2>
          <p className="text-sm text-muted-foreground">
            Specialized AI agents optimized for different coding tasks
          </p>
        </div>
      </div>

      {/* Agent Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {agents.map((agent) => (
          <Card
            key={agent.id}
            className={`cursor-pointer transition-all border-2 ${
              selectedAgent === agent.id
                ? `${getColorClasses(agent.color)} border-2`
                : "hover:shadow-lg"
            }`}
            onClick={() => handleAgentSelect(agent.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className={`p-2 rounded-lg bg-${agent.color}-100 dark:bg-${agent.color}-950`}>
                  {agent.icon}
                </div>
                {selectedAgent === agent.id && (
                  <Badge variant="default" className="bg-primary">
                    Active
                  </Badge>
                )}
              </div>
              <CardTitle className="text-lg mt-3">{agent.name}</CardTitle>
              <CardDescription className="text-xs">
                {agent.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-xs font-semibold mb-2 text-muted-foreground">
                  CAPABILITIES
                </p>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.slice(0, 2).map((cap, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {cap}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold mb-1 text-muted-foreground">
                  BEST FOR
                </p>
                <ul className="text-xs space-y-1">
                  {agent.bestFor.map((item, i) => (
                    <li key={i} className="flex items-center gap-1">
                      <span className="w-1 h-1 bg-primary rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Agent Response */}
      {(loading || response) && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {selectedAgent && (
                <>
                  {agents.find((a) => a.id === selectedAgent)?.icon}
                  {agents.find((a) => a.id === selectedAgent)?.name} Response
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary" />
                <span className="text-sm text-muted-foreground">
                  Agent analyzing your code...
                </span>
              </div>
            ) : (
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <pre className="whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  {response}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Smart Recommendations */}
      {!code && (
        <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-1" />
              <div>
                <p className="font-semibold text-blue-900 dark:text-blue-100">
                  Start with AI Coach or Code Generator
                </p>
                <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
                  Get hints to learn independently, or generate a solution to study
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
