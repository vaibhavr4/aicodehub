import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const difficulty = searchParams.get("difficulty");
    const category = searchParams.get("category");

    const problems = await prisma.problem.findMany({
      where: {
        ...(difficulty && { difficulty: difficulty as any }),
        ...(category && { category: category as any }),
      },
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

    return NextResponse.json(problems);
  } catch (error) {
    console.error("Error fetching problems:", error);
    return NextResponse.json(
      { error: "Failed to fetch problems" },
      { status: 500 }
    );
  }
}
