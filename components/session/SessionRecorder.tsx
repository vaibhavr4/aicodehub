"use client";

import { useEffect, useRef } from "react";

interface SessionRecorderProps {
  sessionId: string | null;
  code: string;
  language: string;
}

export function SessionRecorder({
  sessionId,
  code,
  language,
}: SessionRecorderProps) {
  const previousCode = useRef(code);
  const previousLanguage = useRef(language);

  useEffect(() => {
    if (!sessionId) return;

    // Record code changes (debounced)
    const timer = setTimeout(() => {
      if (code !== previousCode.current) {
        fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            eventType: "CODE_CHANGE",
            data: { code },
          }),
        });
        previousCode.current = code;
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [sessionId, code]);

  useEffect(() => {
    if (!sessionId) return;

    // Record language changes
    if (language !== previousLanguage.current) {
      fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          eventType: "LANGUAGE_CHANGE",
          data: { language },
        }),
      });
      previousLanguage.current = language;
    }
  }, [sessionId, language]);

  useEffect(() => {
    if (!sessionId) return;

    // Record paste events
    const handlePaste = (e: ClipboardEvent) => {
      const pastedText = e.clipboardData?.getData("text");
      if (pastedText) {
        fetch("/api/events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            sessionId,
            eventType: "PASTE",
            data: { content: pastedText.substring(0, 500) }, // Limit size
          }),
        });
      }
    };

    document.addEventListener("paste", handlePaste);
    return () => document.removeEventListener("paste", handlePaste);
  }, [sessionId]);

  return null; // This component doesn't render anything
}
