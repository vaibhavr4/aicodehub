"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

interface SessionEvent {
  id: string;
  eventType: string;
  data: any;
  timestamp: string;
}

interface AIInteraction {
  role: string;
  message: string;
  createdAt: string;
}

interface Submission {
  code: string;
  status: string;
  score: number;
  createdAt: string;
}

interface SessionData {
  id: string;
  problem: {
    title: string;
  };
  events: SessionEvent[];
  aiInteractions: AIInteraction[];
  submissions: Submission[];
  startedAt: string;
  endedAt: string | null;
}

interface SessionPlaybackProps {
  sessionId: string;
}

export function SessionPlayback({ sessionId }: SessionPlaybackProps) {
  const [session, setSession] = useState<SessionData | null>(null);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    fetch(`/api/sessions/${sessionId}`)
      .then((res) => res.json())
      .then(setSession);
  }, [sessionId]);

  useEffect(() => {
    if (!isPlaying || !session) return;

    const timer = setInterval(() => {
      setCurrentEventIndex((prev) => {
        if (prev >= session.events.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 2000); // 2 seconds per event

    return () => clearInterval(timer);
  }, [isPlaying, session]);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading session...</p>
      </div>
    );
  }

  const currentEvent = session.events[currentEventIndex];

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Session Playback</h1>
        <p className="text-muted-foreground">
          Problem: {session.problem.title}
        </p>
        <p className="text-sm text-muted-foreground">
          Started: {new Date(session.startedAt).toLocaleString()}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Timeline */}
        <Card>
          <CardHeader>
            <CardTitle>Event Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {session.events.map((event, index) => (
                <div
                  key={event.id}
                  className={`p-3 rounded border cursor-pointer ${
                    index === currentEventIndex
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setCurrentEventIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{event.eventType}</Badge>
                    <span className="text-xs">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">
                    {event.eventType === "CODE_CHANGE" &&
                      "Code modified"}
                    {event.eventType === "LANGUAGE_CHANGE" &&
                      `Changed to ${event.data.language}`}
                    {event.eventType === "SUBMIT" &&
                      `Submission: ${event.data.passedTests}/${event.data.totalTests} passed`}
                    {event.eventType === "AI_QUERY" &&
                      "AI assistant query"}
                  </p>
                </div>
              ))}
            </div>

            {/* Playback Controls */}
            <div className="flex items-center justify-center gap-4 mt-4 pt-4 border-t">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentEventIndex(Math.max(0, currentEventIndex - 1))
                }
                disabled={currentEventIndex === 0}
              >
                <SkipBack className="h-4 w-4" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-4 w-4" />
                ) : (
                  <Play className="h-4 w-4" />
                )}
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentEventIndex(
                    Math.min(session.events.length - 1, currentEventIndex + 1)
                  )
                }
                disabled={currentEventIndex === session.events.length - 1}
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Event Details */}
        <Card>
          <CardHeader>
            <CardTitle>Event Details</CardTitle>
          </CardHeader>
          <CardContent>
            {currentEvent && (
              <div className="space-y-4">
                <div>
                  <p className="font-semibold mb-2">Type: {currentEvent.eventType}</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(currentEvent.timestamp).toLocaleString()}
                  </p>
                </div>

                {currentEvent.eventType === "CODE_CHANGE" && (
                  <div>
                    <p className="font-semibold mb-2">Code Snapshot:</p>
                    <pre className="bg-muted p-4 rounded text-sm overflow-x-auto max-h-[300px] overflow-y-auto">
                      {currentEvent.data.code}
                    </pre>
                  </div>
                )}

                {currentEvent.eventType === "AI_QUERY" && (
                  <div className="space-y-2">
                    <div>
                      <p className="font-semibold mb-1">User Query:</p>
                      <p className="text-sm bg-muted p-2 rounded">
                        {currentEvent.data.userMessage}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold mb-1">AI Response:</p>
                      <p className="text-sm bg-muted p-2 rounded max-h-[200px] overflow-y-auto">
                        {currentEvent.data.assistantMessage}
                      </p>
                    </div>
                  </div>
                )}

                {currentEvent.eventType === "SUBMIT" && (
                  <div>
                    <p className="font-semibold mb-2">Submission Results:</p>
                    <div className="space-y-1">
                      <p className="text-sm">
                        Passed: {currentEvent.data.passedTests} /{" "}
                        {currentEvent.data.totalTests}
                      </p>
                      <p className="text-sm">
                        Score: {currentEvent.data.score.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{session.submissions.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">AI Interactions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">
              {session.aiInteractions.filter((i) => i.role === "user").length}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{session.events.length}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
