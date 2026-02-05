"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Bot, Wrench, Network, Sparkles, Code } from "lucide-react";

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            AI Learning Center
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Master modern AI development techniques, tools, and best practices for coding interviews and beyond
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="agents">Agents</TabsTrigger>
            <TabsTrigger value="tools">Tools</TabsTrigger>
            <TabsTrigger value="mcp">MCP</TabsTrigger>
            <TabsTrigger value="genui">Gen UI</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-6 h-6" />
                  Welcome to AI-Powered Development
                </CardTitle>
                <CardDescription>
                  Understanding the modern AI development landscape
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <h3 className="text-xl font-semibold">The AI Revolution in Coding</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We're in the midst of a fundamental shift in how software is built. AI isn't just a tool—it's becoming a collaborative partner in the development process. Understanding how to effectively leverage AI capabilities is now as crucial as knowing your programming language syntax.
                </p>

                <h3 className="text-xl font-semibold mt-6">What You'll Learn</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                    <h4 className="font-semibold mb-2">📚 Skills</h4>
                    <p className="text-sm text-muted-foreground">
                      Reusable AI capabilities that can be invoked on-demand to enhance your workflow
                    </p>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                    <h4 className="font-semibold mb-2">🤖 Agents</h4>
                    <p className="text-sm text-muted-foreground">
                      Autonomous AI assistants that can reason, plan, and execute complex tasks
                    </p>
                  </div>
                  <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                    <h4 className="font-semibold mb-2">🔧 Tools</h4>
                    <p className="text-sm text-muted-foreground">
                      Functions and APIs that AI can call to interact with external systems
                    </p>
                  </div>
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-950 rounded-lg">
                    <h4 className="font-semibold mb-2">🌐 MCP</h4>
                    <p className="text-sm text-muted-foreground">
                      Model Context Protocol for standardized AI-application integration
                    </p>
                  </div>
                </div>

                <h3 className="text-xl font-semibold mt-6">Best Practices</h3>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Start with clear, specific prompts</li>
                  <li>Iterate and refine based on AI responses</li>
                  <li>Understand AI limitations and verify outputs</li>
                  <li>Combine AI assistance with human expertise</li>
                  <li>Use AI for learning, not just solutions</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6" />
                  AI Skills: Reusable Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">What are AI Skills?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Skills are pre-defined, reusable AI capabilities that can be invoked with simple commands. Think of them as specialized functions that the AI can execute on your behalf, similar to slash commands in modern applications.
                  </p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4 py-2 bg-blue-50 dark:bg-blue-950">
                  <p className="font-semibold">Example: Code Review Skill</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    A skill that analyzes your code for bugs, style issues, performance problems, and suggests improvements with specific line-by-line feedback.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Common AI Skills in Our Platform</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">1. Code Review</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Comprehensive analysis of code quality, correctness, efficiency, and adherence to best practices
                      </p>
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 block">
                        POST /api/ai/review
                      </code>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">2. Progressive Hints</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        4-level hint system: gentle nudge → approach → pseudocode → detailed guidance
                      </p>
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 block">
                        POST /api/ai/hint
                      </code>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">3. Complexity Analysis</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Detailed time and space complexity breakdown with optimization suggestions
                      </p>
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 block">
                        POST /api/ai/complexity
                      </code>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold">4. Alternative Solutions</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Multiple approaches with trade-offs and use case recommendations
                      </p>
                      <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded mt-2 block">
                        POST /api/ai/alternatives
                      </code>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Best Practices for Using Skills</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Use skills iteratively - start with hints, escalate to review if needed</li>
                    <li>Combine multiple skills for comprehensive learning</li>
                    <li>Review AI feedback critically and understand the reasoning</li>
                    <li>Use complexity analysis before and after optimization</li>
                    <li>Compare your solution with alternatives to learn different approaches</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-6 h-6" />
                  AI Agents: Autonomous Assistants
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Understanding AI Agents</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    AI Agents are autonomous systems that can perceive their environment, make decisions, and take actions to achieve specific goals. Unlike simple skills, agents can chain multiple actions together, maintain context, and adapt their strategy based on results.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Agent Characteristics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-medium">🎯 Goal-Oriented</p>
                      <p className="text-sm text-muted-foreground">Work towards specific objectives</p>
                    </div>
                    <div>
                      <p className="font-medium">🧠 Reasoning</p>
                      <p className="text-sm text-muted-foreground">Can plan and strategize</p>
                    </div>
                    <div>
                      <p className="font-medium">🔄 Iterative</p>
                      <p className="text-sm text-muted-foreground">Learn from each action</p>
                    </div>
                    <div>
                      <p className="font-medium">🤝 Collaborative</p>
                      <p className="text-sm text-muted-foreground">Work with humans and other agents</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Agent Architecture</h3>
                  <div className="space-y-4">
                    <div className="p-4 border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-950">
                      <h4 className="font-semibold">1. Perception</h4>
                      <p className="text-sm text-muted-foreground">
                        Agent receives input (problem, code, context) and understands the current state
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-purple-500 bg-purple-50 dark:bg-purple-950">
                      <h4 className="font-semibold">2. Reasoning & Planning</h4>
                      <p className="text-sm text-muted-foreground">
                        Agent analyzes the situation and creates a plan of action
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-green-500 bg-green-50 dark:bg-green-950">
                      <h4 className="font-semibold">3. Action Execution</h4>
                      <p className="text-sm text-muted-foreground">
                        Agent executes the plan using available tools and skills
                      </p>
                    </div>
                    <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-950">
                      <h4 className="font-semibold">4. Learning & Adaptation</h4>
                      <p className="text-sm text-muted-foreground">
                        Agent evaluates results and adjusts future behavior
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Example: Code Review Agent</h3>
                  <p className="text-muted-foreground mb-4">
                    A sophisticated agent that doesn't just analyze code, but:
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>Reads and understands the problem requirements</li>
                    <li>Analyzes the code structure and logic</li>
                    <li>Identifies potential issues and edge cases</li>
                    <li>Suggests specific improvements with examples</li>
                    <li>Proposes alternative approaches if beneficial</li>
                    <li>Provides educational context for learning</li>
                  </ol>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <p className="font-semibold mb-2">💡 Pro Tip</p>
                  <p className="text-sm text-muted-foreground">
                    When working with agents, provide clear goals and context. The more information you give, the better the agent can help you achieve your objectives.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tools Tab */}
          <TabsContent value="tools" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Wrench className="w-6 h-6" />
                  AI Tools: Extending Capabilities
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">What are AI Tools?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tools are functions or APIs that AI models can call to interact with external systems, retrieve information, or perform actions beyond text generation. They extend the AI's capabilities into the real world.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Tool Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🔍 Information Retrieval</h4>
                      <p className="text-sm text-muted-foreground">
                        Database queries, web search, documentation lookup
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">⚡ Code Execution</h4>
                      <p className="text-sm text-muted-foreground">
                        Running code, testing, compilation, debugging
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">📊 Data Processing</h4>
                      <p className="text-sm text-muted-foreground">
                        Analysis, transformation, visualization
                      </p>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">🔗 Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        External API calls, service connections
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Tools in Our Platform</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                      <h4 className="font-semibold">Judge0 Code Execution</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        Allows AI to run code against test cases and provide feedback based on actual execution results
                      </p>
                      <div className="mt-3 text-xs font-mono bg-white dark:bg-gray-900 p-2 rounded">
                        Tool: execute_code(language, code, test_cases) → results
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 dark:bg-purple-950 rounded-lg">
                      <h4 className="font-semibold">Problem Database</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        Access problem details, test cases, and solutions for contextual assistance
                      </p>
                      <div className="mt-3 text-xs font-mono bg-white dark:bg-gray-900 p-2 rounded">
                        Tool: get_problem(id) → {'{'}title, description, tests{'}'}
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <h4 className="font-semibold">Session Analytics</h4>
                      <p className="text-sm text-muted-foreground mt-2">
                        Retrieve user progress, performance metrics, and historical data for personalized guidance
                      </p>
                      <div className="mt-3 text-xs font-mono bg-white dark:bg-gray-900 p-2 rounded">
                        Tool: get_analytics(session_id) → {'{'}scores, weak_areas{'}'}
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Tool Design Principles</h3>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>Clear, descriptive function names and parameters</li>
                    <li>Comprehensive documentation for AI understanding</li>
                    <li>Error handling and graceful degradation</li>
                    <li>Rate limiting and security considerations</li>
                    <li>Atomic operations that compose well</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MCP Tab */}
          <TabsContent value="mcp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Network className="w-6 h-6" />
                  MCP: Model Context Protocol
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">What is MCP?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Model Context Protocol (MCP) is an open standard for connecting AI models with external data sources and tools. It provides a standardized way for AI applications to access context from various sources like databases, APIs, files, and services.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Why MCP Matters</h4>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">🔌 Standardization:</span> Universal protocol for AI-context integration</p>
                    <p><span className="font-medium">🔒 Security:</span> Controlled, auditable access to resources</p>
                    <p><span className="font-medium">🎯 Efficiency:</span> Optimized context retrieval and caching</p>
                    <p><span className="font-medium">🔄 Interoperability:</span> Works across different AI models and platforms</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">MCP Architecture</h3>
                  <div className="space-y-4">
                    <div className="border-l-4 border-blue-500 pl-4">
                      <h4 className="font-semibold">MCP Servers</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Expose resources and tools that AI can access (databases, filesystems, APIs)
                      </p>
                    </div>
                    <div className="border-l-4 border-purple-500 pl-4">
                      <h4 className="font-semibold">MCP Clients</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        AI applications (like Claude Code) that connect to MCP servers to access context
                      </p>
                    </div>
                    <div className="border-l-4 border-green-500 pl-4">
                      <h4 className="font-semibold">Protocol</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Standardized messages for discovery, authentication, and data exchange
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">MCP in Practice</h3>
                  <p className="text-muted-foreground mb-4">Example: Our platform could use MCP to:</p>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <p className="text-sm"><span className="font-mono text-blue-600">mcp://database/problems</span></p>
                      <p className="text-xs text-muted-foreground mt-1">Access problem library with standardized queries</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <p className="text-sm"><span className="font-mono text-purple-600">mcp://execution/judge0</span></p>
                      <p className="text-xs text-muted-foreground mt-1">Execute code through MCP-compatible Judge0 server</p>
                    </div>
                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded">
                      <p className="text-sm"><span className="font-mono text-green-600">mcp://analytics/sessions</span></p>
                      <p className="text-xs text-muted-foreground mt-1">Retrieve user performance data for personalized guidance</p>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="font-semibold mb-2">🚀 Future of MCP</p>
                  <p className="text-sm text-muted-foreground">
                    As MCP adoption grows, AI applications will seamlessly connect to any data source or service, making context-aware AI assistance ubiquitous across all tools and platforms.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Generative UI Tab */}
          <TabsContent value="genui" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="w-6 h-6" />
                  Generative UI: Dynamic Interfaces
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">What is Generative UI?</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Generative UI is an approach where AI doesn't just generate text responses, but creates interactive, dynamic user interface components based on context and user needs. Instead of static templates, the AI composes UI elements in real-time.
                  </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg">
                  <h4 className="font-semibold mb-3">Key Concepts</h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">🎨 Component Generation</p>
                      <p className="text-sm text-muted-foreground">AI creates React components, cards, charts based on data</p>
                    </div>
                    <div>
                      <p className="font-medium">🔄 Dynamic Adaptation</p>
                      <p className="text-sm text-muted-foreground">UI adjusts based on user interaction and context</p>
                    </div>
                    <div>
                      <p className="font-medium">📊 Data Visualization</p>
                      <p className="text-sm text-muted-foreground">Automatic chart and graph generation from analytics</p>
                    </div>
                    <div>
                      <p className="font-medium">🎯 Contextual Actions</p>
                      <p className="text-sm text-muted-foreground">Action buttons and workflows tailored to current task</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Generative UI in Our Platform</h3>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Problem Recommendations</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        AI generates personalized problem cards based on your weak areas
                      </p>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs">
                        User struggles with Dynamic Programming →<br/>
                        AI generates: "Try these 3 DP problems" with difficulty badges
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Code Visualization</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        AI creates visual representations of algorithms and data structures
                      </p>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs">
                        Binary tree code → AI generates interactive tree diagram<br/>
                        Graph algorithm → AI shows step-by-step visualization
                      </div>
                    </div>

                    <div className="p-4 border rounded-lg">
                      <h4 className="font-semibold mb-2">Adaptive Hints</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Hint UI adapts based on your progress and hint level
                      </p>
                      <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded text-xs">
                        Level 1 → Simple text hint<br/>
                        Level 3 → Interactive pseudocode with expandable sections<br/>
                        Level 4 → Split-screen code comparison
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Building Generative UI</h3>
                  <p className="text-muted-foreground mb-4">Key technologies and patterns:</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>React Server Components for dynamic rendering</li>
                    <li>AI models with tool calling capabilities</li>
                    <li>Component libraries (shadcn/ui, Radix UI)</li>
                    <li>Streaming responses for progressive rendering</li>
                    <li>Type-safe component schemas</li>
                  </ul>
                </div>

                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                  <p className="font-semibold mb-2">💡 The Future</p>
                  <p className="text-sm text-muted-foreground">
                    Generative UI represents a shift from "AI that writes code" to "AI that builds interfaces". As this technology matures, applications will dynamically adapt their entire interface to each user's needs, goals, and context.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
