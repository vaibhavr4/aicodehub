import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { judge0 } from "@/lib/judge0";
import { Language, SubmissionStatus } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const { sessionId, problemId, code, language } = await request.json();

    // Fetch all test cases for the problem
    const testCases = await prisma.testCase.findMany({
      where: { problemId },
      orderBy: { order: "asc" },
    });

    if (testCases.length === 0) {
      return NextResponse.json(
        { error: "No test cases found for this problem" },
        { status: 400 }
      );
    }

    // Execute code against all test cases in parallel
    const testResults = await Promise.all(
      testCases.map(async (testCase) => {
        try {
          // Parse input to get stdin
          const inputData = JSON.parse(testCase.input);
          const stdin = Object.values(inputData).join("\n");

          // Execute code
          const result = await judge0.executeCode(code, language as Language, stdin);

          // Compare output
          const actualOutput = result.stdout?.trim() || "";
          const expectedOutput = testCase.output.replace(/"/g, "").trim();
          const passed = actualOutput === expectedOutput;

          return {
            testCaseId: testCase.id,
            passed,
            input: testCase.input,
            expectedOutput: testCase.output,
            actualOutput,
            stdout: result.stdout,
            stderr: result.stderr,
            executionTime: result.time ? parseFloat(result.time) * 1000 : 0,
            statusId: result.status.id,
            statusDescription: result.status.description,
          };
        } catch (error) {
          console.error(`Error executing test case ${testCase.id}:`, error);
          return {
            testCaseId: testCase.id,
            passed: false,
            input: testCase.input,
            expectedOutput: testCase.output,
            actualOutput: "",
            stdout: null,
            stderr: error instanceof Error ? error.message : "Unknown error",
            executionTime: 0,
            statusId: 0,
            statusDescription: "Error",
          };
        }
      })
    );

    // Calculate score
    const passedTests = testResults.filter((r) => r.passed).length;
    const totalTests = testResults.length;
    const score = (passedTests / totalTests) * 100;

    // Determine overall status
    let status = SubmissionStatus.ACCEPTED;
    if (passedTests === 0) {
      status = SubmissionStatus.WRONG_ANSWER;
    } else if (passedTests < totalTests) {
      status = SubmissionStatus.WRONG_ANSWER;
    }

    // Check for compilation or runtime errors
    const hasErrors = testResults.some((r) => r.stderr && r.stderr.length > 0);
    if (hasErrors) {
      const firstError = testResults.find((r) => r.stderr)?.statusDescription;
      if (firstError?.includes("Compilation")) {
        status = SubmissionStatus.COMPILATION_ERROR;
      } else if (firstError?.includes("Runtime")) {
        status = SubmissionStatus.RUNTIME_ERROR;
      }
    }

    // Store submission in database
    const submission = await prisma.submission.create({
      data: {
        sessionId,
        code,
        language: language as Language,
        status,
        totalTests,
        passedTests,
        score,
        results: testResults,
        executionTime: Math.max(...testResults.map((r) => r.executionTime)),
      },
    });

    // Update session
    await prisma.session.update({
      where: { id: sessionId },
      data: {
        totalSubmissions: { increment: 1 },
        bestScore: { set: Math.max(score, 0) },
        language: language as Language,
      },
    });

    // Record session event
    await prisma.sessionEvent.create({
      data: {
        sessionId,
        eventType: "SUBMIT",
        data: {
          submissionId: submission.id,
          passedTests,
          totalTests,
          score,
        },
      },
    });

    return NextResponse.json({
      submissionId: submission.id,
      status,
      passedTests,
      totalTests,
      score,
      results: testResults,
    });
  } catch (error) {
    console.error("Error processing submission:", error);
    return NextResponse.json(
      { error: "Failed to process submission" },
      { status: 500 }
    );
  }
}
