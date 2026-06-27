import { cn } from "../../lib/utils";

interface AvatarProps {
  src?: string;
  initials?: string;
  size?: 24 | 32 | 40 | 56;
  status?: "online" | "offline" | "processing";
  className?: string;
}

export function Avatar({ src, initials, size = 32, status, className }: AvatarProps) {
  const sizes = {
    24: "w-6 h-6 text-[10px]",
    32: "w-8 h-8 text-xs",
    40: "w-10 h-10 text-sm",
    56: "w-14 h-14 text-base"
  };

  const statusColors = {
    online: "bg-success",
    offline: "bg-muted",
    processing: "bg-processing animate-pulse"
  };

  return (
    <div className={cn("relative inline-block", sizes[size], className)}>
      <div className={cn("rounded-full overflow-hidden flex items-center justify-center bg-surface-3 border border-border-default", sizes[size])}>
        {src ? (
          <img src={src} alt="Avatar" className="w-full h-full object-cover" />
        ) : (
          <span className="font-medium text-primary uppercase">{initials?.slice(0, 2) || "MV"}</span>
        )}
      </div>
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 block rounded-full ring-2 ring-base",
            size === 24 ? "w-2 h-2" : size === 32 ? "w-2.5 h-2.5" : size === 40 ? "w-3 h-3" : "w-4 h-4",
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
