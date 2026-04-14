interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`bg-neutral-900 rounded-xl border border-neutral-800 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}
