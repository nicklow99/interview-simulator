import Card from "@/components/ui/Card";
import { StarBreakdown as StarBreakdownType } from "@/lib/types";

interface StarBreakdownProps {
  breakdown: StarBreakdownType;
}

const components = [
  { key: "situation" as const, label: "Situation", description: "Set the scene" },
  { key: "task" as const, label: "Task", description: "Define the challenge" },
  { key: "action" as const, label: "Action", description: "What you did" },
  { key: "result" as const, label: "Result", description: "The outcome" },
];

export default function StarBreakdown({ breakdown }: StarBreakdownProps) {
  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-white mb-4">
        STAR Framework Analysis
      </h3>
      <div className="space-y-4">
        {components.map(({ key, label, description }) => {
          const component = breakdown[key];
          return (
            <div
              key={key}
              className={`rounded-lg border p-4 ${
                component.present
                  ? "border-emerald-500/30 bg-emerald-500/5"
                  : "border-rose-500/30 bg-rose-500/5"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                {component.present ? (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20">
                    <svg
                      className="h-4 w-4 text-emerald-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20">
                    <svg
                      className="h-4 w-4 text-rose-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                )}
                <div>
                  <span className="font-semibold text-white">{label}</span>
                  <span className="ml-2 text-xs text-neutral-500">
                    {description}
                  </span>
                </div>
              </div>
              <p className="text-sm text-neutral-400 ml-9">
                {component.feedback}
              </p>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
