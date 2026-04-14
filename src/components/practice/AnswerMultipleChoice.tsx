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
        <p className="text-sm text-slate-500">Generating answer choices...</p>
      </div>
    );
  }

  if (!choices) return null;

  return (
    <div className="space-y-3 animate-fade-in">
      <p className="text-sm font-medium text-slate-700">
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
                ? "border-indigo-600 bg-indigo-50 ring-1 ring-indigo-600"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className="flex gap-3">
              <span
                className={`inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                  selectedChoiceId === choice.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {choice.id}
              </span>
              <span className="text-slate-700">{choice.text}</span>
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
