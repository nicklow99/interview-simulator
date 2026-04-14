import { NextRequest, NextResponse } from "next/server";
import anthropic from "@/lib/anthropic";
import { buildEvaluationPrompt } from "@/lib/prompts";
import { Category, Difficulty, AnswerMode } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, category, difficulty, answerMode, answer, jobDescription } =
      body;

    if (!question || !category || !difficulty || !answerMode || !answer) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { system, user } = buildEvaluationPrompt(
      question,
      category as Category,
      difficulty as Difficulty,
      answerMode as AnswerMode,
      answer,
      jobDescription || undefined
    );

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1200,
      temperature: 0.4,
      system,
      messages: [{ role: "user", content: user }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const feedback = JSON.parse(text);

    return NextResponse.json(feedback);
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json(
      { error: "Failed to evaluate answer. Please try again." },
      { status: 500 }
    );
  }
}
