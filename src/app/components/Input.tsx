import { InputHTMLAttributes, ReactNode, forwardRef } from "react";
import { cn } from "../../lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  prefixIcon?: ReactNode;
  suffixIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, helperText, error, prefixIcon, suffixIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-[12px] font-medium tracking-[0.04em] uppercase text-secondary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {prefixIcon && (
            <div className="absolute left-3 text-muted pointer-events-none flex items-center justify-center">
              {prefixIcon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              "w-full h-11 bg-surface-1 border border-border-default rounded-md text-primary placeholder:text-muted focus:outline-none focus:border-border-accent focus:shadow-glow-violet transition-all",
              prefixIcon ? "pl-10" : "pl-3",
              suffixIcon ? "pr-10" : "pr-3",
              error && "border-error focus:border-error focus:shadow-none",
              className
            )}
            {...props}
          />
          {suffixIcon && (
            <div className="absolute right-3 text-muted flex items-center justify-center">
              {suffixIcon}
            </div>
          )}
        </div>
        {helperText && (
          <p className={cn("text-[12px] leading-[1.5]", error ? "text-error" : "text-muted")}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
