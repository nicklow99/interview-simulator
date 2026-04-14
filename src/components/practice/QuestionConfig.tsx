"use client";

import { useInterview } from "@/hooks/useInterview";
import { CATEGORY_LABELS, DIFFICULTY_LABELS, Category, Difficulty } from "@/lib/types";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function QuestionConfig() {
  const {
    category,
    difficulty,
    setCategory,
    setDifficulty,
    generateQuestion,
    phase,
  } = useInterview();

  const categoryOptions = Object.entries(CATEGORY_LABELS).map(([value, label]) => ({
    value,
    label,
  }));

  const difficultyOptions = Object.entries(DIFFICULTY_LABELS).map(
    ([value, label]) => ({ value, label })
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Select
          label="Question Type"
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value as Category)}
        />
        <Select
          label="Difficulty"
          options={difficultyOptions}
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value as Difficulty)}
        />
      </div>
      <Button
        onClick={generateQuestion}
        loading={phase === "generating"}
        size="lg"
        className="w-full"
      >
        Generate Question
      </Button>
    </div>
  );
}
