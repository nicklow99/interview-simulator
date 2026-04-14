"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import FeedbackCard from "@/components/results/FeedbackCard";
import StarBreakdown from "@/components/results/StarBreakdown";
import StrengthsAndImprovements from "@/components/results/StrengthsAndImprovements";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { EvaluationResponse, GeneratedQuestion, CATEGORY_LABELS, DIFFICULTY_LABELS } from "@/lib/types";

interface SavedFeedback {
  feedback: EvaluationResponse;
  question: GeneratedQuestion;
  answerMode: string;
  answer: string;
}

export default function ResultsPage() {
  const [data, setData] = useState<SavedFeedback | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("interview-feedback");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-900 mb-2">
            No feedback available
          </h2>
          <p className="text-slate-500 mb-6">
            Complete a practice question to see your feedback here.
          </p>
          <Link href="/practice">
            <Button>Start Practice</Button>
          </Link>
        </div>
      </div>
    );
  }

  const { feedback, question } = data;

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold text-slate-900 hover:text-indigo-600 transition-colors"
          >
            Interview Simulator
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Your Feedback</h2>
            <p className="mt-1 text-sm text-slate-500">
              Here&apos;s how you did on this question.
            </p>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="indigo">
                {CATEGORY_LABELS[question.category]}
              </Badge>
              <Badge variant="slate">
                {DIFFICULTY_LABELS[question.difficulty]}
              </Badge>
            </div>
            <p className="text-lg font-medium text-slate-900 leading-relaxed">
              {question.question}
            </p>
          </Card>

          <FeedbackCard
            overallAssessment={feedback.overallAssessment}
            qualityRating={feedback.qualityRating}
            personalizedTip={feedback.personalizedTip}
          />

          {feedback.starBreakdown && (
            <StarBreakdown breakdown={feedback.starBreakdown} />
          )}

          <StrengthsAndImprovements
            strengths={feedback.strengths}
            improvements={feedback.improvements}
          />

          <div className="flex gap-3 pt-4">
            <Link href="/practice" className="flex-1">
              <Button size="lg" className="w-full">
                Try Another Question
              </Button>
            </Link>
            <Link href="/">
              <Button variant="secondary" size="lg">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
