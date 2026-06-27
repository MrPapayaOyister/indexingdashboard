import { cn } from "../../lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  color?: "success" | "warning" | "error" | "info" | "processing" | "default";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({ children, color = "default", size = "md", className }: BadgeProps) {
  const sizeStyles = {
    sm: "px-2 h-5 text-[11px]",
    md: "px-2.5 h-6 text-[12px]"
  };

  const colorStyles = {
    success: "bg-surface-2 text-primary border-border-default",
    warning: "bg-surface-2 text-primary border-border-default",
    error: "bg-surface-2 text-primary border-border-default",
    info: "bg-surface-2 text-primary border-border-default",
    processing: "bg-surface-2 text-primary border-border-default",
    default: "bg-surface-2 text-primary border-border-default"
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-pill font-medium border whitespace-nowrap backdrop-blur-sm",
        sizeStyles[size],
        colorStyles[color],
        className
      )}
    >
      {children}
    </span>
  );
}
