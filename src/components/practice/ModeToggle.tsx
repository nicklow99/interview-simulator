"use client";

import { useInterview } from "@/hooks/useInterview";
import { AnswerMode } from "@/lib/types";

export default function ModeToggle() {
  const { answerMode, setAnswerMode, generateChoices, choices, phase } =
    useInterview();

  const handleModeChange = (mode: AnswerMode) => {
    setAnswerMode(mode);
    if (mode === "multiple-choice" && !choices) {
      generateChoices();
    }
  };

  return (
    <div className="flex rounded-lg border border-slate-200 bg-white p-1">
      <button
        type="button"
        onClick={() => handleModeChange("freeform")}
        disabled={phase === "generating-choices"}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
          answerMode === "freeform"
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Write Your Answer
      </button>
      <button
        type="button"
        onClick={() => handleModeChange("multiple-choice")}
        disabled={phase === "generating-choices"}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
          answerMode === "multiple-choice"
            ? "bg-indigo-600 text-white shadow-sm"
            : "text-slate-600 hover:text-slate-900"
        }`}
      >
        Multiple Choice
      </button>
    </div>
  );
}
