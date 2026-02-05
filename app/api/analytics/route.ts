import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Get sessions with related data
    const sessions = await prisma.session.findMany({
      include: {
        problem: true,
        submissions: true,
        aiInteractions: true,
      },
      orderBy: { startedAt: "desc" },
    });

    // Overall statistics
    const totalSessions = sessions.length;
    const totalSubmissions = sessions.reduce((sum, s) => sum + s.totalSubmissions, 0);
    const totalAIQueries = sessions.reduce((sum, s) => sum + s.aiInteractions.length, 0);
    const avgScore = sessions.length > 0
      ? sessions.reduce((sum, s) => sum + s.bestScore, 0) / sessions.length
      : 0;

    // Performance by difficulty
    const byDifficulty: Record<string, { count: number; avgScore: number; totalScore: number }> = {};
    sessions.forEach((s) => {
      const diff = s.problem.difficulty;
      if (!byDifficulty[diff]) byDifficulty[diff] = { count: 0, avgScore: 0, totalScore: 0 };
      byDifficulty[diff].count++;
      byDifficulty[diff].totalScore += s.bestScore;
    });
    Object.keys(byDifficulty).forEach((key) => {
      byDifficulty[key].avgScore = byDifficulty[key].totalScore / byDifficulty[key].count;
    });

    // Performance by category
    const byCategory: Record<string, { count: number; avgScore: number; totalScore: number }> = {};
    sessions.forEach((s) => {
      const cat = s.problem.category;
      if (!byCategory[cat]) byCategory[cat] = { count: 0, avgScore: 0, totalScore: 0 };
      byCategory[cat].count++;
      byCategory[cat].totalScore += s.bestScore;
    });
    Object.keys(byCategory).forEach((key) => {
      byCategory[key].avgScore = byCategory[key].totalScore / byCategory[key].count;
    });

    // Weak areas (avg score < 50%)
    const weakAreas = Object.entries(byCategory)
      .filter(([_, data]) => data.avgScore < 50)
      .map(([category, data]) => ({ category, avgScore: data.avgScore, attempts: data.count }))
      .sort((a, b) => a.avgScore - b.avgScore);

    // AI usage by model
    const aiByModel: Record<string, number> = {};
    sessions.forEach((s) => {
      s.aiInteractions.forEach((ai) => {
        aiByModel[ai.model] = (aiByModel[ai.model] || 0) + 1;
      });
    });

    return NextResponse.json({
      overview: {
        totalSessions,
        totalSubmissions,
        totalAIQueries,
        avgScore: Math.round(avgScore * 10) / 10,
      },
      byDifficulty,
      byCategory,
      weakAreas,
      aiUsage: aiByModel,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
