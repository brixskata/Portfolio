import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  color?: "blue" | "zinc" | "green";
}

/**
 * Badge — small rounded tag used for tech stack labels.
 */
export default function Badge({ children, color = "zinc" }: BadgeProps) {
  const colors = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    zinc: "bg-zinc-800 text-zinc-400 border-zinc-700",
    green: "bg-green-500/10 text-green-400 border-green-500/20",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium border ${colors[color]}`}
    >
      {children}
    </span>
  );
}
