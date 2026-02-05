import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, Brain, Target, TrendingUp, Zap, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25" />
        <div className="relative container mx-auto px-4 py-24 sm:py-32">
          <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Powered by Claude Sonnet 4</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
              Master Coding Interviews with AI
            </h1>

            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl">
              Practice with intelligent AI coaching, real-time feedback, and comprehensive analytics.
              Transform from good to exceptional with our AI-powered learning platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/problems">
                <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                  Start Practicing
                  <Zap className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-2">
                  Learn AI Techniques
                  <BookOpen className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span>5 Languages Supported</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                <span>Real-time Code Execution</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                <span>AI-Powered Insights</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose Our Platform?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We combine cutting-edge AI with proven interview preparation techniques
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-2 hover:border-blue-500 transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Code Review</h3>
                <p className="text-muted-foreground">
                  Get instant, detailed feedback on your code quality, efficiency, and best practices from Claude Sonnet 4.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-2 hover:border-indigo-500 transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Progressive Hints</h3>
                <p className="text-muted-foreground">
                  4-level hint system that guides you to the solution without spoiling the learning experience.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-2 hover:border-purple-500 transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Smart Analytics</h3>
                <p className="text-muted-foreground">
                  Track your progress, identify weak areas, and get personalized recommendations for improvement.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-2 hover:border-green-500 transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Real-time Execution</h3>
                <p className="text-muted-foreground">
                  Run your code against test cases instantly with Judge0 integration. Support for 5 languages.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-2 hover:border-yellow-500 transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-yellow-100 dark:bg-yellow-900 rounded-lg flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Alternative Solutions</h3>
                <p className="text-muted-foreground">
                  Learn multiple approaches to solve each problem. Understand trade-offs and optimization strategies.
                </p>
              </CardContent>
            </Card>

            {/* Feature 6 */}
            <Card className="border-2 hover:border-pink-500 transition-all duration-300 hover:shadow-xl">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-pink-600 dark:text-pink-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">AI Learning Center</h3>
                <p className="text-muted-foreground">
                  Comprehensive guides on AI tools, agents, MCP, and generative UI to master modern development.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Ace Your Next Interview?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are mastering coding interviews with AI-powered coaching
          </p>
          <Link href="/problems">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-6">
              Get Started Free
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
