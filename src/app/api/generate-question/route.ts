import { NextRequest, NextResponse } from "next/server";
import anthropic from "@/lib/anthropic";
import { buildQuestionGenerationPrompt } from "@/lib/prompts";
import { Category, Difficulty } from "@/lib/types";

const VALID_CATEGORIES: Category[] = ["behavioral", "case", "situational"];
const VALID_DIFFICULTIES: Difficulty[] = ["easy", "medium", "hard"];

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { category, difficulty, jobDescription } = body;

    if (!VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }
    if (!VALID_DIFFICULTIES.includes(difficulty)) {
      return NextResponse.json(
        { error: "Invalid difficulty" },
        { status: 400 }
      );
    }

    const { system, user } = buildQuestionGenerationPrompt(
      category,
      difficulty,
      jobDescription || undefined
    );

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      temperature: 0.85,
      system,
      messages: [{ role: "user", content: user }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(text);

    return NextResponse.json({
      question: parsed.question,
      context: parsed.context || "",
      category,
      difficulty,
    });
  } catch (error) {
    console.error("Question generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate question. Please try again." },
      { status: 500 }
    );
  }
}
