"use client";

import { useInterview } from "@/hooks/useInterview";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { CATEGORY_LABELS, DIFFICULTY_LABELS, Difficulty } from "@/lib/types";

const difficultyColors: Record<Difficulty, "emerald" | "amber" | "rose"> = {
  easy: "emerald",
  medium: "amber",
  hard: "rose",
};

export default function QuestionDisplay() {
  const { question } = useInterview();

  if (!question) return null;

  return (
    <Card className="p-6 animate-fade-in">
      <div className="flex items-center gap-2 mb-4">
        <Badge variant="indigo">
          {CATEGORY_LABELS[question.category]}
        </Badge>
        <Badge variant={difficultyColors[question.difficulty]}>
          {DIFFICULTY_LABELS[question.difficulty]}
        </Badge>
      </div>
      <p className="text-lg font-medium text-slate-900 leading-relaxed">
        {question.question}
      </p>
      {question.context && (
        <p className="mt-3 text-sm text-slate-500 italic">
          This question tests: {question.context}
        </p>
      )}
    </Card>
  );
}
