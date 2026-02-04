"use client";

import { Editor } from "@monaco-editor/react";
import { Language } from "@prisma/client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeEditorProps {
  code: string;
  onChange: (value: string | undefined) => void;
  language: Language;
  onLanguageChange: (language: Language) => void;
  height?: string;
}

const languageMap: Record<Language, string> = {
  PYTHON: "python",
  JAVASCRIPT: "javascript",
  JAVA: "java",
  CPP: "cpp",
  GO: "go",
};

const languageLabels: Record<Language, string> = {
  PYTHON: "Python",
  JAVASCRIPT: "JavaScript",
  JAVA: "Java",
  CPP: "C++",
  GO: "Go",
};

export function CodeEditor({
  code,
  onChange,
  language,
  onLanguageChange,
  height = "600px",
}: CodeEditorProps) {
  const [theme, setTheme] = useState<"vs-dark" | "light">("vs-dark");

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-muted p-2 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <Select
            value={language}
            onValueChange={(value) => onLanguageChange(value as Language)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(languageLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Select
            value={theme}
            onValueChange={(value) => setTheme(value as "vs-dark" | "light")}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vs-dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <Editor
        height={height}
        language={languageMap[language]}
        value={code}
        onChange={onChange}
        theme={theme}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: "on",
        }}
      />
    </div>
  );
}
