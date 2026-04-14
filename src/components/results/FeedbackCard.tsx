import Card from "@/components/ui/Card";
import { QualityRating } from "@/lib/types";

interface FeedbackCardProps {
  overallAssessment: string;
  qualityRating: QualityRating;
  personalizedTip: string;
}

const ratingConfig: Record<
  QualityRating,
  { label: string; color: string; bg: string; border: string }
> = {
  strong: {
    label: "Strong",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
  },
  adequate: {
    label: "Adequate",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
  },
  "needs-improvement": {
    label: "Needs Improvement",
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
  },
};

export default function FeedbackCard({
  overallAssessment,
  qualityRating,
  personalizedTip,
}: FeedbackCardProps) {
  const rating = ratingConfig[qualityRating];

  return (
    <Card className="p-6">
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="text-lg font-semibold text-white">
          Overall Assessment
        </h3>
        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ${rating.bg} ${rating.color} border ${rating.border}`}
        >
          {rating.label}
        </span>
      </div>
      <p className="text-neutral-300 leading-relaxed">{overallAssessment}</p>

      <div className="mt-5 rounded-lg bg-amber-500/10 border border-amber-500/20 p-4">
        <div className="flex items-start gap-2">
          <svg
            className="h-5 w-5 text-amber-400 mt-0.5 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-amber-300">
              Personalized Tip
            </p>
            <p className="mt-1 text-sm text-amber-400/80">{personalizedTip}</p>
          </div>
        </div>
      </div>
    </Card>
  );
}
