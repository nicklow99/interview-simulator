interface BadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "emerald" | "amber" | "rose" | "slate";
}

export default function Badge({ children, variant = "gold" }: BadgeProps) {
  const colors = {
    gold: "bg-amber-500/10 text-amber-400 ring-amber-500/30",
    emerald: "bg-emerald-500/10 text-emerald-400 ring-emerald-500/30",
    amber: "bg-yellow-500/10 text-yellow-400 ring-yellow-500/30",
    rose: "bg-rose-500/10 text-rose-400 ring-rose-500/30",
    slate: "bg-neutral-700/50 text-neutral-300 ring-neutral-600/30",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[variant]}`}
    >
      {children}
    </span>
  );
}
