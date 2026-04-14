"use client";

import Link from "next/link";
import { useInterview } from "@/hooks/useInterview";
import QuestionConfig from "@/components/practice/QuestionConfig";
import JobDescriptionInput from "@/components/practice/JobDescriptionInput";
import QuestionDisplay from "@/components/practice/QuestionDisplay";
import ModeToggle from "@/components/practice/ModeToggle";
import AnswerFreeform from "@/components/practice/AnswerFreeform";
import AnswerMultipleChoice from "@/components/practice/AnswerMultipleChoice";
import Spinner from "@/components/ui/Spinner";
import FeedbackCard from "@/components/results/FeedbackCard";
import StarBreakdown from "@/components/results/StarBreakdown";
import StrengthsAndImprovements from "@/components/results/StrengthsAndImprovements";
import Button from "@/components/ui/Button";

export default function PracticePage() {
  const { phase, error, question, answerMode, feedback, reset } =
    useInterview();

  return (
    <div className="min-h-screen bg-neutral-950">
      <header className="border-b border-neutral-800 bg-neutral-900">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold text-white hover:text-amber-400 transition-colors"
          >
            Interview Simulator
          </Link>
          {phase !== "config" && (
            <button
              onClick={reset}
              className="text-sm text-neutral-500 hover:text-amber-400 transition-colors"
            >
              Start Over
            </button>
          )}
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-8">
        <div className="space-y-6">
          {/* Error display */}
          {error && (
            <div className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-400 animate-fade-in">
              {error}
            </div>
          )}

          {/* Config phase */}
          {(phase === "config" || phase === "generating") && (
            <div className="space-y-4 animate-fade-in">
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Practice Interview
                </h1>
                <p className="mt-1 text-neutral-400">
                  Choose your question type and difficulty, then generate a
                  question to practice.
                </p>
              </div>
              <JobDescriptionInput />
              <QuestionConfig />
            </div>
          )}

          {/* Generating spinner */}
          {phase === "generating" && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Spinner />
              <p className="text-sm text-neutral-500">
                Generating your question...
              </p>
            </div>
          )}

          {/* Answering phase */}
          {(phase === "answering" || phase === "generating-choices" || phase === "evaluating") &&
            question && (
              <div className="space-y-6 animate-fade-in">
                <QuestionDisplay />
                <ModeToggle />
                {answerMode === "freeform" ? (
                  <AnswerFreeform />
                ) : (
                  <AnswerMultipleChoice />
                )}
              </div>
            )}

          {/* Evaluating spinner */}
          {phase === "evaluating" && (
            <div className="flex flex-col items-center justify-center py-8 gap-3">
              <Spinner />
              <p className="text-sm text-neutral-500">
                Analyzing your answer...
              </p>
            </div>
          )}

          {/* Results phase */}
          {phase === "results" && feedback && question && (
            <div className="space-y-6 animate-fade-in">
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Your Feedback
                </h2>
                <p className="mt-1 text-sm text-neutral-500">
                  Here&apos;s how you did on this question.
                </p>
              </div>

              {/* Show the question for reference */}
              <QuestionDisplay />

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
                <Button onClick={reset} size="lg" className="flex-1">
                  Try Another Question
                </Button>
                <Link href="/">
                  <Button variant="secondary" size="lg">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
