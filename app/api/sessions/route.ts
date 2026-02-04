import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Language } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { problemId } = await request.json();

    const session = await prisma.session.create({
      data: {
        problemId,
        language: Language.PYTHON,
      },
    });

    return NextResponse.json(session);
  } catch (error) {
    console.error("Error creating session:", error);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 }
    );
  }
}
