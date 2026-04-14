"use client";

import { useInterview } from "@/hooks/useInterview";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";

export default function AnswerFreeform() {
  const { answer, setAnswer, submitAnswer, phase } = useInterview();

  return (
    <div className="space-y-3 animate-fade-in">
      <Textarea
        label="Your Answer"
        placeholder="Write your response here. For behavioral questions, use the STAR method: describe the Situation, Task, Action, and Result..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        rows={8}
      />
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">
          {answer.length} characters
        </span>
        <Button
          onClick={submitAnswer}
          loading={phase === "evaluating"}
          disabled={!answer.trim()}
        >
          Submit Answer
        </Button>
      </div>
    </div>
  );
}
