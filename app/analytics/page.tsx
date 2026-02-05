"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface AnalyticsData {
  overview: {
    totalSessions: number;
    totalSubmissions: number;
    totalAIQueries: number;
    avgScore: number;
  };
  byDifficulty: Record<string, { count: number; avgScore: number }>;
  byCategory: Record<string, { count: number; avgScore: number }>;
  weakAreas: Array<{ category: string; avgScore: number; attempts: number }>;
  aiUsage: Record<string, number>;
}

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/analytics")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load analytics:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        <p>Loading analytics...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>
        <p>Failed to load analytics data.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Sessions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.overview.totalSessions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Submissions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.overview.totalSubmissions}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              AI Queries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.overview.totalAIQueries}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{data.overview.avgScore}%</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Performance by Difficulty */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Difficulty</CardTitle>
            <CardDescription>Average scores across difficulty levels</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(data.byDifficulty).map(([difficulty, stats]) => (
                <div key={difficulty} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{difficulty}</span>
                      <span className="text-sm text-muted-foreground">
                        {stats.count} attempts
                      </span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all"
                        style={{ width: `${stats.avgScore}%` }}
                      />
                    </div>
                  </div>
                  <span className="ml-4 font-semibold w-12 text-right">
                    {Math.round(stats.avgScore)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Category</CardTitle>
            <CardDescription>Average scores across problem categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {Object.entries(data.byCategory)
                .sort(([, a], [, b]) => b.avgScore - a.avgScore)
                .map(([category, stats]) => (
                  <div key={category} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">
                          {category.replace(/_/g, " ")}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {stats.count}
                        </span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all ${
                            stats.avgScore >= 70
                              ? "bg-green-500"
                              : stats.avgScore >= 40
                              ? "bg-yellow-500"
                              : "bg-red-500"
                          }`}
                          style={{ width: `${stats.avgScore}%` }}
                        />
                      </div>
                    </div>
                    <span className="ml-3 text-sm font-semibold w-10 text-right">
                      {Math.round(stats.avgScore)}%
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weak Areas */}
        <Card>
          <CardHeader>
            <CardTitle>Areas for Improvement</CardTitle>
            <CardDescription>Categories with scores below 50%</CardDescription>
          </CardHeader>
          <CardContent>
            {data.weakAreas.length === 0 ? (
              <p className="text-muted-foreground">Great job! No weak areas identified.</p>
            ) : (
              <div className="space-y-3">
                {data.weakAreas.map((area) => (
                  <div key={area.category} className="p-3 bg-red-50 dark:bg-red-950 rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium text-red-900 dark:text-red-100">
                        {area.category.replace(/_/g, " ")}
                      </span>
                      <span className="text-sm text-red-600 dark:text-red-400">
                        {Math.round(area.avgScore)}%
                      </span>
                    </div>
                    <p className="text-xs text-red-600 dark:text-red-400">
                      {area.attempts} attempts - needs more practice
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* AI Usage */}
        <Card>
          <CardHeader>
            <CardTitle>AI Assistant Usage</CardTitle>
            <CardDescription>Queries by AI model</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(data.aiUsage).map(([model, count]) => (
                <div key={model} className="flex items-center justify-between">
                  <span className="text-sm font-medium">{model}</span>
                  <span className="text-2xl font-bold">{count}</span>
                </div>
              ))}
              {Object.keys(data.aiUsage).length === 0 && (
                <p className="text-muted-foreground">No AI queries yet. Try asking for help!</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
