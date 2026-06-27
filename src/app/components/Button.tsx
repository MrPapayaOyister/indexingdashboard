import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost" | "danger" | "icon";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all focus:outline-none disabled:opacity-40 disabled:pointer-events-none active:scale-[0.97]";

    const variants = {
      primary: "bg-primary text-inverse rounded-[10px] hover:bg-white/90",
      ghost:
        "bg-transparent text-primary border border-border-strong hover:border-border-accent hover:bg-surface-2 rounded-[10px]",
      danger:
        "bg-transparent text-secondary border border-muted hover:border-secondary hover:text-primary rounded-[10px]",
      icon: "rounded-full bg-transparent hover:bg-surface-3 text-secondary hover:text-primary border border-transparent",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-11 px-5 text-sm",
      lg: "h-12 px-6 text-sm",
      icon: "h-9 w-9 p-0",
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseStyles,
          variants[variant],
          variant === "icon" ? sizes.icon : sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
