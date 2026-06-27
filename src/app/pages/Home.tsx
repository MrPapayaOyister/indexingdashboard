import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { Search, Mic, Paperclip, SlidersHorizontal, X } from "lucide-react";
import { cn } from "../../lib/utils";

const RECENT_SEARCHES = [
  "Q2 product demo",
  "user interviews",
  "architecture spec",
  "all hands meeting",
];

const STAT_CARDS = [
  {
    value: "2,523",
    label: "Total Files",
    path: "/library",
  },
  {
    value: "7",
    label: "Processing",
    pulse: true,
    path: "/dashboard",
  },
  {
    value: "2.4 TB",
    label: "Storage Used",
    progress: 48,
    path: "/settings",
  },
  {
    value: "38",
    label: "Topics Indexed",
    path: "/library",
  },
];

export function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [chips, setChips] = useState(RECENT_SEARCHES);
  const [isListening, setIsListening] = useState(false);
  const [attachedFile, setAttachedFile] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const removeChip = (idx: number) => setChips((c) => c.filter((_, i) => i !== idx));

  const handleMic = () => setIsListening((v) => !v);

  const handleAttach = () => fileRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setAttachedFile(file.name);
    e.target.value = "";
  };

  return (
    <div
      className="flex flex-col h-full items-center overflow-hidden"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* Upper half — vertically centered search area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full px-6">
        {/* Label */}
        <p
          className="text-[#888] mb-4 tracking-[0.2em] uppercase"
          style={{ fontSize: "11px" }}
        >
          MEDIAVAULT
        </p>

        {/* Search bar — frosted glass, 640px, 56px tall */}
        <div className="w-full max-w-[640px] relative">
          <div
            className={cn(
              "w-full h-14 rounded-[14px] flex items-center gap-2 px-4 transition-all",
              isListening && "shadow-[0_0_0_2px_rgba(255,255,255,0.5)]"
            )}
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: isListening
                ? "1px solid rgba(255,255,255,0.5)"
                : "1px solid rgba(255,255,255,0.08)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
            }}
          >
            <Search className="w-5 h-5 text-[#555] shrink-0" strokeWidth={1.5} />

            {/* Attached file chip */}
            {attachedFile && (
              <div
                className="flex items-center gap-1.5 px-2 py-1 rounded-full shrink-0"
                style={{
                  backgroundColor: "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  fontSize: "12px",
                  color: "#ccc",
                }}
              >
                <Paperclip className="w-3 h-3" strokeWidth={1.5} />
                <span className="max-w-[120px] truncate">{attachedFile}</span>
                <button
                  onClick={() => setAttachedFile(null)}
                  className="text-[#888] hover:text-white ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={
                isListening
                  ? "Listening…"
                  : attachedFile
                  ? "Ask about this file…"
                  : "Ask anything about your media…"
              }
              className="flex-1 bg-transparent outline-none text-white placeholder:text-[#555] text-sm min-w-0"
            />

            {/* Waveform when listening */}
            {isListening && (
              <div className="flex items-center gap-0.5 shrink-0 mr-1">
                {[3, 5, 8, 5, 3, 7, 4, 6, 3, 5].map((h, i) => (
                  <div
                    key={i}
                    className="w-0.5 rounded-full bg-white/60 animate-pulse"
                    style={{
                      height: `${h * 2}px`,
                      animationDelay: `${i * 80}ms`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Right icons */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleMic}
                className={cn(
                  "p-1.5 rounded-md transition-colors",
                  isListening ? "text-white" : "text-[#555] hover:text-white"
                )}
              >
                <Mic className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={handleAttach}
                className="p-1.5 rounded-md text-[#555] hover:text-white transition-colors"
              >
                <Paperclip className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button className="p-1.5 rounded-md text-[#555] hover:text-white transition-colors">
                <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Recent search chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4 max-w-[640px] justify-center">
            {chips.map((chip, idx) => (
              <div
                key={idx}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full cursor-pointer transition-colors hover:border-white/20"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontSize: "12px",
                  color: "#888",
                }}
                onClick={() => setQuery(chip)}
              >
                {chip}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeChip(idx);
                  }}
                  className="text-[#555] hover:text-white transition-colors ml-0.5"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Hint */}
        <p className="mt-3 text-[#333]" style={{ fontSize: "11px" }}>
          ⌘K from anywhere
        </p>
      </div>

      {/* Lower half — stat cards */}
      <div className="w-full pb-10 flex flex-col items-center">
        <div className="flex gap-4 justify-center flex-wrap px-6">
          {STAT_CARDS.map((card, i) => (
            <StatCard
              key={i}
              value={card.value}
              label={card.label}
              pulse={card.pulse}
              progress={card.progress}
              onClick={() => navigate(card.path)}
            />
          ))}
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="mt-4 text-[#555] hover:text-white transition-colors"
          style={{ fontSize: "12px" }}
        >
          Dashboard →
        </button>
      </div>
    </div>
  );
}

function StatCard({
  value,
  label,
  pulse,
  progress,
  onClick,
}: {
  value: string;
  label: string;
  pulse?: boolean;
  progress?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-[220px] rounded-xl p-5 text-left transition-all active:scale-[0.98] hover:brightness-110 flex flex-col relative overflow-hidden"
      style={{
        backgroundColor: "#1A1A1A",
        boxShadow:
          "6px 6px 16px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.03)",
      }}
    >
      <div className="flex items-center gap-2 mb-1">
        <span
          className="text-white"
          style={{ fontSize: "28px", fontWeight: 600, lineHeight: 1.1 }}
        >
          {value}
        </span>
        {pulse && (
          <span className="w-2 h-2 rounded-full bg-white animate-pulse shrink-0" />
        )}
      </div>
      <span className="text-[#888]" style={{ fontSize: "13px" }}>
        {label}
      </span>

      {/* Progress bar for storage card */}
      {typeof progress === "number" && (
        <div
          className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-xl"
          style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
        >
          <div
            className="h-full rounded-b-xl bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </button>
  );
}
