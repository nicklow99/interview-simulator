"use client";

import { useInterview } from "@/hooks/useInterview";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";

export default function AnswerMultipleChoice() {
  const {
    choices,
    selectedChoiceId,
    setSelectedChoiceId,
    submitAnswer,
    phase,
  } = useInterview();

  if (phase === "generating-choices") {
    return (
      <div className="flex flex-col items-center justify-center py-12 gap-3">
        <Spinner />
        <p className="text-sm text-neutral-500">Generating answer choices...</p>
      </div>
    );
  }

  if (!choices) return null;

  return (
    <div className="space-y-3 animate-fade-in">
      <p className="text-sm font-medium text-neutral-300">
        Select the best answer:
      </p>
      <div className="space-y-2">
        {choices.map((choice) => (
          <button
            key={choice.id}
            type="button"
            onClick={() => setSelectedChoiceId(choice.id)}
            className={`w-full rounded-lg border-2 p-4 text-left text-sm transition-all ${
              selectedChoiceId === choice.id
                ? "border-amber-500 bg-amber-500/10 ring-1 ring-amber-500/50"
                : "border-neutral-800 bg-neutral-900 hover:border-neutral-700 hover:bg-neutral-800/50"
            }`}
          >
            <div className="flex gap-3">
              <span
                className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  selectedChoiceId === choice.id
                    ? "bg-amber-500 text-neutral-950"
                    : "bg-neutral-800 text-neutral-400"
                }`}
              >
                {choice.id}
              </span>
              <span className="text-neutral-300">{choice.text}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="flex justify-end pt-2">
        <Button
          onClick={submitAnswer}
          loading={phase === "evaluating"}
          disabled={!selectedChoiceId}
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
}
