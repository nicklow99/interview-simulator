import { Category, Difficulty } from "./types";

const USER_PROFILE = `The user is an MBA student at Stanford Graduate School of Business with 4 years of private equity experience. They are targeting roles at companies that combine artificial intelligence and investing (e.g., AI-driven hedge funds, PE firms using AI for deal sourcing, fintech/AI startups in the investment space). Tailor all questions and feedback to this specific background.`;

export function buildQuestionGenerationPrompt(
  category: Category,
  difficulty: Difficulty,
  jobDescription?: string
): { system: string; user: string } {
  const categoryInstructions: Record<Category, string> = {
    behavioral: `Ask about past experiences that demonstrate leadership, teamwork, conflict resolution, analytical thinking, or decision-making. Frame them in contexts relevant to PE deals, MBA team projects, or AI/tech initiatives. The question should be answerable using the STAR method (Situation, Task, Action, Result).`,
    case: `Present a brief business scenario involving AI applications in investing, portfolio management, or financial technology. Ask the user to analyze, recommend, or strategize. Include enough context for a thoughtful response.`,
    situational: `Describe a hypothetical workplace dilemma at an AI-investing firm and ask how the user would handle it. The scenario should test judgment, ethics, leadership, or stakeholder management.`,
  };

  const difficultyInstructions: Record<Difficulty, string> = {
    easy: "Straightforward scenario testing a single, common competency. Clear expectations.",
    medium:
      "Multi-faceted situation requiring nuanced thinking and balancing of priorities.",
    hard: "Complex, ambiguous scenario with competing priorities, incomplete information, and no obvious right answer.",
  };

  const jdSection = jobDescription
    ? `\n\nThe user is preparing for a specific role. Tailor the question to the skills, responsibilities, and culture described in this job description:\n\n${jobDescription}`
    : "";

  return {
    system: `You are an expert behavioral interview coach specializing in finance, private equity, and AI/technology roles. ${USER_PROFILE}

Generate a single interview question based on the parameters provided.

Category: ${category}
${categoryInstructions[category]}

Difficulty: ${difficulty}
${difficultyInstructions[difficulty]}${jdSection}

Respond with ONLY a valid JSON object (no markdown, no code fences):
{"question": "the interview question", "context": "brief note on what competency this tests"}`,
    user: `Generate a ${difficulty} ${category} interview question.`,
  };
}

export function buildChoicesPrompt(
  question: string,
  category: Category,
  difficulty: Difficulty
): { system: string; user: string } {
  return {
    system: `You are an expert interview coach. ${USER_PROFILE}

Given an interview question, generate exactly 4 answer options (A through D).

Requirements:
- One option should be clearly strong (demonstrates the competency well)
- One should be clearly weak (common mistake or red flag)
- Two should be plausible but imperfect (partially correct, missing key elements)
- All options should be realistic — things a real candidate might say
- Each option should be 2-4 sentences long
- For behavioral questions, the strong answer should follow STAR structure
- Randomize the position of the strong answer

Respond with ONLY a valid JSON array (no markdown, no code fences):
[{"id": "A", "text": "..."}, {"id": "B", "text": "..."}, {"id": "C", "text": "..."}, {"id": "D", "text": "..."}]`,
    user: `Question (${category}, ${difficulty}): ${question}`,
  };
}

export function buildEvaluationPrompt(
  question: string,
  category: Category,
  difficulty: Difficulty,
  answerMode: "freeform" | "multiple-choice",
  answer: string,
  jobDescription?: string
): { system: string; user: string } {
  const starInstruction =
    category === "behavioral"
      ? `\nFor this behavioral question, evaluate STAR framework adherence — assess each component (Situation, Task, Action, Result) separately. Include the "starBreakdown" field in your response.`
      : `\nDo NOT include a "starBreakdown" field since this is not a behavioral question.`;

  const modeInstruction =
    answerMode === "freeform"
      ? "Evaluate the written response thoroughly."
      : "Evaluate whether the selected option is the strongest choice and explain why or why not. Also explain what makes the best answer strong.";

  const jdSection = jobDescription
    ? `\nThe user is preparing for this specific role:\n${jobDescription}\n`
    : "";

  return {
    system: `You are a senior interview coach with deep expertise in PE, MBA recruiting, and AI/tech roles. ${USER_PROFILE}

Evaluate the candidate's answer to the interview question below.
${modeInstruction}${starInstruction}${jdSection}

Evaluation criteria:
1. Relevance and directness in answering the question
2. Specificity and use of concrete examples
3. Communication clarity and structure
4. Demonstration of competencies relevant to AI + investing roles

Provide personalized advice considering the user's PE background and Stanford MBA context.

Respond with ONLY a valid JSON object (no markdown, no code fences) matching this schema:
{
  "overallAssessment": "2-3 sentence summary of the answer quality",
  "qualityRating": "strong" | "adequate" | "needs-improvement",
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"],
  ${category === "behavioral" ? `"starBreakdown": {
    "situation": {"present": true/false, "feedback": "..."},
    "task": {"present": true/false, "feedback": "..."},
    "action": {"present": true/false, "feedback": "..."},
    "result": {"present": true/false, "feedback": "..."}
  },` : ""}
  "personalizedTip": "One specific actionable tip leveraging their PE/MBA/AI background"
}`,
    user: `Question: ${question}\n\nCandidate's Answer: ${answer}`,
  };
}
