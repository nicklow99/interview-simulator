"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import React from "react";
import {
  InterviewState,
  Category,
  Difficulty,
  AnswerMode,
  GeneratedQuestion,
  Choice,
  EvaluationResponse,
} from "@/lib/types";

const initialState: InterviewState = {
  category: "behavioral",
  difficulty: "medium",
  jobDescription: "",
  question: null,
  choices: null,
  answerMode: "freeform",
  answer: "",
  selectedChoiceId: null,
  feedback: null,
  phase: "config",
  error: null,
};

interface InterviewContextValue extends InterviewState {
  setCategory: (c: Category) => void;
  setDifficulty: (d: Difficulty) => void;
  setJobDescription: (jd: string) => void;
  setAnswerMode: (mode: AnswerMode) => void;
  setAnswer: (text: string) => void;
  setSelectedChoiceId: (id: string | null) => void;
  generateQuestion: () => Promise<void>;
  generateChoices: () => Promise<void>;
  submitAnswer: () => Promise<void>;
  reset: () => void;
}

const InterviewContext = createContext<InterviewContextValue | null>(null);

export function InterviewProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<InterviewState>(initialState);

  const setCategory = useCallback((category: Category) => {
    setState((s) => ({ ...s, category }));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setState((s) => ({ ...s, difficulty }));
  }, []);

  const setJobDescription = useCallback((jobDescription: string) => {
    setState((s) => ({ ...s, jobDescription }));
  }, []);

  const setAnswerMode = useCallback((answerMode: AnswerMode) => {
    setState((s) => ({ ...s, answerMode, answer: "", selectedChoiceId: null }));
  }, []);

  const setAnswer = useCallback((answer: string) => {
    setState((s) => ({ ...s, answer }));
  }, []);

  const setSelectedChoiceId = useCallback((selectedChoiceId: string | null) => {
    setState((s) => ({ ...s, selectedChoiceId }));
  }, []);

  const generateQuestion = useCallback(async () => {
    setState((s) => ({ ...s, phase: "generating", error: null }));
    try {
      const res = await fetch("/api/generate-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: state.category,
          difficulty: state.difficulty,
          jobDescription: state.jobDescription || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate question");
      }

      const question: GeneratedQuestion = await res.json();
      setState((s) => ({
        ...s,
        question,
        choices: null,
        answer: "",
        selectedChoiceId: null,
        feedback: null,
        phase: "answering",
      }));
    } catch (error) {
      setState((s) => ({
        ...s,
        phase: "config",
        error: error instanceof Error ? error.message : "Something went wrong",
      }));
    }
  }, [state.category, state.difficulty, state.jobDescription]);

  const generateChoices = useCallback(async () => {
    if (!state.question) return;
    setState((s) => ({ ...s, phase: "generating-choices", error: null }));
    try {
      const res = await fetch("/api/generate-choices", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: state.question.question,
          category: state.question.category,
          difficulty: state.question.difficulty,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to generate choices");
      }

      const data = await res.json();
      setState((s) => ({
        ...s,
        choices: data.choices as Choice[],
        phase: "answering",
      }));
    } catch (error) {
      setState((s) => ({
        ...s,
        phase: "answering",
        error: error instanceof Error ? error.message : "Something went wrong",
      }));
    }
  }, [state.question]);

  const submitAnswer = useCallback(async () => {
    if (!state.question) return;

    const answerText =
      state.answerMode === "freeform"
        ? state.answer
        : state.choices?.find((c) => c.id === state.selectedChoiceId)?.text ||
          "";

    if (!answerText.trim()) return;

    setState((s) => ({ ...s, phase: "evaluating", error: null }));
    try {
      const res = await fetch("/api/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: state.question.question,
          category: state.question.category,
          difficulty: state.question.difficulty,
          answerMode: state.answerMode,
          answer: answerText,
          jobDescription: state.jobDescription || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to evaluate answer");
      }

      const feedback: EvaluationResponse = await res.json();

      // Save to sessionStorage for refresh resilience
      sessionStorage.setItem(
        "interview-feedback",
        JSON.stringify({
          feedback,
          question: state.question,
          answerMode: state.answerMode,
          answer: answerText,
        })
      );

      setState((s) => ({ ...s, feedback, phase: "results" }));
    } catch (error) {
      setState((s) => ({
        ...s,
        phase: "answering",
        error: error instanceof Error ? error.message : "Something went wrong",
      }));
    }
  }, [
    state.question,
    state.answer,
    state.answerMode,
    state.choices,
    state.selectedChoiceId,
    state.jobDescription,
  ]);

  const reset = useCallback(() => {
    setState(initialState);
    sessionStorage.removeItem("interview-feedback");
  }, []);

  const value: InterviewContextValue = {
    ...state,
    setCategory,
    setDifficulty,
    setJobDescription,
    setAnswerMode,
    setAnswer,
    setSelectedChoiceId,
    generateQuestion,
    generateChoices,
    submitAnswer,
    reset,
  };

  return React.createElement(
    InterviewContext.Provider,
    { value },
    children
  );
}

export function useInterview() {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within InterviewProvider");
  }
  return context;
}
