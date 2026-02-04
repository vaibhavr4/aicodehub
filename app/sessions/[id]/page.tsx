"use client";

import { useParams } from "next/navigation";
import { SessionPlayback } from "@/components/session/SessionPlayback";

export default function SessionPage() {
  const params = useParams();
  const sessionId = params.id as string;

  return <SessionPlayback sessionId={sessionId} />;
}
