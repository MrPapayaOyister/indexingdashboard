import { Play, Pause, SkipBack, SkipForward, X } from "lucide-react";
import { useState } from "react";

export function MiniPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        className="flex rounded-xl overflow-hidden"
        style={{
          width: "320px",
          height: "72px",
          backgroundColor: "rgba(20,20,20,0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.7)",
        }}
      >
        {/* Thumbnail */}
        <div
          className="shrink-0 flex items-center justify-center relative"
          style={{
            width: "72px",
            height: "72px",
            backgroundColor: "#111",
            borderRight: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <Play className="w-6 h-6 text-white/30" strokeWidth={1.5} />
          <span
            className="absolute bottom-1.5 left-1.5 text-white font-mono"
            style={{
              fontSize: "8px",
              backgroundColor: "rgba(0,0,0,0.7)",
              padding: "1px 4px",
              borderRadius: "3px",
            }}
          >
            MP4
          </span>
        </div>

        {/* Info + Controls */}
        <div className="flex-1 flex flex-col justify-center px-3 relative">
          {/* Progress bar at very bottom */}
          <div
            className="absolute bottom-0 left-0 right-0 h-0.5"
            style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          >
            <div className="h-full bg-white" style={{ width: "30%" }} />
          </div>

          <div className="flex items-center justify-between mb-1.5">
            <div className="flex-1 min-w-0 pr-2">
              <p className="text-white text-sm font-medium truncate leading-tight" style={{ fontSize: "13px" }}>
                Product Demo Q2 2026
              </p>
              <p className="text-[#555] font-mono" style={{ fontSize: "10px" }}>14:32 / 1:02:18</p>
            </div>
            <button
              onClick={() => setVisible(false)}
              className="text-[#444] hover:text-white transition-colors shrink-0"
            >
              <X className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1 text-[#888] hover:text-white transition-colors rounded">
              <SkipBack className="w-3.5 h-3.5 fill-current" />
            </button>
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="p-1 text-white hover:text-white/70 transition-colors rounded"
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 fill-white" />
              ) : (
                <Play className="w-4 h-4 fill-white ml-0.5" />
              )}
            </button>
            <button className="p-1 text-[#888] hover:text-white transition-colors rounded">
              <SkipForward className="w-3.5 h-3.5 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
