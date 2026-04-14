interface BadgeProps {
  children: React.ReactNode;
  variant?: "indigo" | "emerald" | "amber" | "rose" | "slate";
}

export default function Badge({ children, variant = "indigo" }: BadgeProps) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
    emerald: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
    amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
    rose: "bg-rose-50 text-rose-700 ring-rose-600/20",
    slate: "bg-slate-50 text-slate-700 ring-slate-600/20",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${colors[variant]}`}
    >
      {children}
    </span>
  );
}
