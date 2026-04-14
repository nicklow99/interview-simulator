import { NextRequest, NextResponse } from "next/server";
import anthropic from "@/lib/anthropic";
import { buildChoicesPrompt } from "@/lib/prompts";
import { Category, Difficulty } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { question, category, difficulty } = body;

    if (!question || !category || !difficulty) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const { system, user } = buildChoicesPrompt(
      question,
      category as Category,
      difficulty as Difficulty
    );

    const message = await anthropic.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 800,
      temperature: 0.7,
      system,
      messages: [{ role: "user", content: user }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const choices = JSON.parse(text);

    return NextResponse.json({ choices });
  } catch (error) {
    console.error("Choices generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate choices. Please try again." },
      { status: 500 }
    );
  }
}
