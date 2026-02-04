import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { EventType } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { sessionId, eventType, data } = await request.json();

    const event = await prisma.sessionEvent.create({
      data: {
        sessionId,
        eventType: eventType as EventType,
        data,
      },
    });

    return NextResponse.json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
