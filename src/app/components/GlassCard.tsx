import { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  padding?: "compact" | "default" | "spacious" | "none";
  state?: "default" | "hover" | "selected";
  onClick?: () => void;
}

export function GlassCard({ children, className, padding = "default", state = "default", onClick }: GlassCardProps) {
  const paddingStyles = {
    compact: "p-4",
    default: "p-6",
    spacious: "p-8",
    none: "p-0",
  };

  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-xl border transition-all duration-200",
        paddingStyles[padding],
        className
      )}
      style={{
        backgroundColor: state === "selected"
          ? "rgba(255,255,255,0.07)"
          : state === "hover"
          ? "rgba(255,255,255,0.06)"
          : "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderColor: state === "selected"
          ? "rgba(255,255,255,0.25)"
          : "rgba(255,255,255,0.08)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.04)",
      }}
    >
      {children}
    </div>
  );
}
