import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Interview Simulator | AI-Powered Practice",
  description:
    "Practice behavioral, case, and situational interview questions with personalized AI feedback.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-neutral-950 text-neutral-100 antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
