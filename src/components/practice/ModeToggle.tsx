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
    <div className="flex rounded-lg border border-neutral-800 bg-neutral-900 p-1">
      <button
        type="button"
        onClick={() => handleModeChange("freeform")}
        disabled={phase === "generating-choices"}
        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-all ${
          answerMode === "freeform"
            ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 shadow-sm"
            : "text-neutral-400 hover:text-white"
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
            ? "bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-950 shadow-sm"
            : "text-neutral-400 hover:text-white"
        }`}
      >
        Multiple Choice
      </button>
    </div>
  );
}
