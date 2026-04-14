"use client";

import { InterviewProvider } from "@/hooks/useInterview";

export default function PracticeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <InterviewProvider>{children}</InterviewProvider>;
}
