export type Category = "behavioral" | "case" | "situational";
export type Difficulty = "easy" | "medium" | "hard";
export type AnswerMode = "freeform" | "multiple-choice";
export type QualityRating = "strong" | "adequate" | "needs-improvement";

export type Phase =
  | "config"
  | "generating"
  | "answering"
  | "generating-choices"
  | "evaluating"
  | "results";

export interface Choice {
  id: string;
  text: string;
}

export interface StarComponent {
  present: boolean;
  feedback: string;
}

export interface StarBreakdown {
  situation: StarComponent;
  task: StarComponent;
  action: StarComponent;
  result: StarComponent;
}

export interface EvaluationResponse {
  overallAssessment: string;
  qualityRating: QualityRating;
  strengths: string[];
  improvements: string[];
  starBreakdown?: StarBreakdown;
  personalizedTip: string;
}

export interface GeneratedQuestion {
  question: string;
  context: string;
  category: Category;
  difficulty: Difficulty;
}

export interface InterviewState {
  category: Category;
  difficulty: Difficulty;
  jobDescription: string;
  question: GeneratedQuestion | null;
  choices: Choice[] | null;
  answerMode: AnswerMode;
  answer: string;
  selectedChoiceId: string | null;
  feedback: EvaluationResponse | null;
  phase: Phase;
  error: string | null;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  behavioral: "Behavioral (STAR)",
  case: "Case Question",
  situational: "Situational Judgment",
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};
