"use client";

import { useState } from "react";
import { useInterview } from "@/hooks/useInterview";
import Textarea from "@/components/ui/Textarea";

export default function JobDescriptionInput() {
  const { jobDescription, setJobDescription } = useInterview();
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-lg border border-neutral-800 bg-neutral-900">
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-medium text-neutral-300 hover:bg-neutral-800/50 transition-colors"
      >
        <div className="flex items-center gap-2">
          <svg
            className="h-4 w-4 text-neutral-500"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
            />
          </svg>
          Job Description Mode
          {jobDescription && (
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-400 border border-amber-500/20">
              Active
            </span>
          )}
        </div>
        <svg
          className={`h-4 w-4 text-neutral-500 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      {expanded && (
        <div className="border-t border-neutral-800 px-4 py-3">
          <Textarea
            placeholder="Paste a job description here to get tailored questions..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            rows={4}
          />
          <p className="mt-1.5 text-xs text-neutral-500">
            Optional. Questions will be tailored to the role described above.
          </p>
        </div>
      )}
    </div>
  );
}
