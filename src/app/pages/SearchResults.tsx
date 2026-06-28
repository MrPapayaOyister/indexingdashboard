import { useState } from "react";
import { useNavigate } from "react-router";
import { Search, Play, FileText, Mic, X, RotateCcw } from "lucide-react";

type ResultType = "video" | "audio" | "document";
type FilterType = "All" | "Video" | "Audio" | "Document";

interface SearchResult {
  id: number;
  type: ResultType;
  filename: string;
  project: string;
  snippet: string;
  keyword: string;
  duration: string;
  confidence: number;
  timestamp?: string;
}

const RESULTS: SearchResult[] = [
  {
    id: 1,
    type: "video",
    filename: "Cabinet_Meeting_Mar2024.mp4",
    project: "Projects / Government Records / Q1 2024",
    snippet: "The minister outlined the new infrastructure roadmap and discussed budget allocations for the",
    keyword: "infrastructure",
    duration: "1:42:18",
    confidence: 97,
    timestamp: "00:32:14",
  },
  {
    id: 2,
    type: "document",
    filename: "Infrastructure_Tender_Doc_v3.pdf",
    project: "Projects / Procurement / Active Tenders",
    snippet: "Section 4.2 outlines the requirements for infrastructure delivery across all designated zones with",
    keyword: "infrastructure",
    duration: "48 pages",
    confidence: 94,
  },
  {
    id: 3,
    type: "audio",
    filename: "Site_Inspection_Audio_Gate7.mp3",
    project: "Projects / Site Operations / Gate 7",
    snippet: "Engineer confirms the infrastructure corridor meets specification. Secondary inspection scheduled.",
    keyword: "infrastructure",
    duration: "12:45",
    confidence: 89,
    timestamp: "00:03:52",
  },
  {
    id: 4,
    type: "video",
    filename: "Security_Briefing_Nov2024.mp4",
    project: "Projects / Security / Classified Briefings",
    snippet: "Revised infrastructure protocols were confirmed by all department heads during the session.",
    keyword: "infrastructure",
    duration: "58:30",
    confidence: 92,
    timestamp: "00:14:09",
  },
  {
    id: 5,
    type: "document",
    filename: "Annual_Intelligence_Report_2024.pdf",
    project: "Projects / Intelligence / Annual Reports",
    snippet: "Cross-agency infrastructure assessments confirm alignment with national security objectives.",
    keyword: "infrastructure",
    duration: "112 pages",
    confidence: 88,
  },
  {
    id: 6,
    type: "audio",
    filename: "Emergency_Response_Drill_Audio.mp3",
    project: "Projects / Emergency Response / Drills",
    snippet: "Drill scenario involved a critical infrastructure failure — response time targets were met.",
    keyword: "infrastructure",
    duration: "34:10",
    confidence: 85,
    timestamp: "00:08:44",
  },
];

const SUGGESTED = ["budget allocations", "Q1 2024 review", "site inspection gate 7"];

export function SearchResults() {
  const navigate = useNavigate();
  const [query] = useState("infrastructure");
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [confidence, setConfidence] = useState(70);
  const [sortBy, setSortBy] = useState<"Relevance" | "Date" | "Duration">("Relevance");

  const filtered = RESULTS.filter((r) => {
    if (activeFilter !== "All" && r.type !== activeFilter.toLowerCase()) return false;
    if (r.confidence < confidence) return false;
    return true;
  });

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
      {/* LEFT — Filter panel */}
      <aside
        className="w-[280px] shrink-0 flex flex-col overflow-y-auto"
        style={{
          background: "var(--color-bg-card)",
          backdropFilter: "var(--backdrop)",
          WebkitBackdropFilter: "var(--backdrop)",
          borderRight: "1px solid var(--color-border-glass)",
        }}
      >
        <div className="p-5 flex flex-col gap-6 flex-1">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h3
              className="text-sm font-medium"
              style={{ color: "var(--color-text-primary)" }}
            >
              Filters
            </h3>
            <button
              className="flex items-center gap-1 transition-colors hover:text-white"
              style={{ fontSize: "12px", color: "var(--color-text-dim)" }}
            >
              <RotateCcw className="w-3 h-3" strokeWidth={1.5} />
              Reset
            </button>
          </div>

          {/* Type filter pills */}
          <div>
            <p
              className="uppercase tracking-widest mb-3"
              style={{ fontSize: "11px", color: "var(--color-text-dim)" }}
            >
              Type
            </p>
            <div className="flex flex-wrap gap-2">
              {(["All", "Video", "Audio", "Document"] as FilterType[]).map((t) => (
                <button
                  key={t}
                  onClick={() => setActiveFilter(t)}
                  className="px-3 py-1 rounded-full text-sm transition-all"
                  style={{
                    backgroundColor:
                      activeFilter === t
                        ? "var(--color-brand)"
                        : "var(--color-bg-card)",
                    color:
                      activeFilter === t
                        ? "#fff"
                        : "var(--color-text-muted)",
                    border:
                      activeFilter === t
                        ? "1px solid var(--color-brand)"
                        : "1px solid var(--color-border-glass)",
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div>
            <p
              className="uppercase tracking-widest mb-3"
              style={{ fontSize: "11px", color: "var(--color-text-dim)" }}
            >
              Date Range
            </p>
            <div className="flex flex-col gap-2">
              <input
                type="date"
                className="neu-input w-full px-3 py-2 text-sm outline-none"
                style={{
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-muted)",
                }}
              />
              <input
                type="date"
                className="neu-input w-full px-3 py-2 text-sm outline-none"
                style={{
                  border: "1px solid var(--color-border-subtle)",
                  color: "var(--color-text-muted)",
                }}
              />
            </div>
          </div>

          {/* Confidence slider */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <p
                className="uppercase tracking-widest"
                style={{ fontSize: "11px", color: "var(--color-text-dim)" }}
              >
                Min Confidence
              </p>
              <span
                className="font-mono"
                style={{ fontSize: "12px", color: "var(--color-brand)" }}
              >
                {confidence}%
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={confidence}
              onChange={(e) => setConfidence(Number(e.target.value))}
              className="w-full"
              style={{
                accentColor: "var(--color-brand)",
              }}
            />
          </div>

          {/* Project / folder */}
          <div>
            <p
              className="uppercase tracking-widest mb-3"
              style={{ fontSize: "11px", color: "var(--color-text-dim)" }}
            >
              Project
            </p>
            <select
              className="neu-input w-full px-3 py-2 text-sm outline-none appearance-none"
              style={{
                border: "1px solid var(--color-border-subtle)",
                color: "var(--color-text-muted)",
              }}
            >
              <option value="">All projects</option>
              <option value="government">Government Records</option>
              <option value="procurement">Procurement</option>
              <option value="security">Security</option>
              <option value="intelligence">Intelligence</option>
            </select>
          </div>

          {/* Apply button */}
          <button
            className="w-full h-10 rounded-[10px] text-sm font-medium transition-all hover:brightness-110 active:scale-[0.98] mt-auto"
            style={{ backgroundColor: "var(--color-brand)", color: "#fff" }}
          >
            Apply Filters
          </button>
        </div>
      </aside>

      {/* RIGHT — Results */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 h-14 shrink-0"
          style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
        >
          <div className="flex items-center gap-2">
            <span style={{ fontSize: "14px", color: "var(--color-text-muted)" }}>
              Showing results for:
            </span>
            <span
              className="font-semibold"
              style={{ fontSize: "14px", color: "var(--color-text-primary)" }}
            >
              &ldquo;{query}&rdquo;
            </span>
            <span
              className="px-2 py-0.5 rounded-full font-mono"
              style={{
                fontSize: "12px",
                backgroundColor: "rgba(0,212,160,0.1)",
                border: "1px solid rgba(0,212,160,0.25)",
                color: "var(--color-accent-ok)",
              }}
            >
              {filtered.length} results
            </span>
          </div>

          {/* Sort toggle */}
          <div className="flex items-center gap-1">
            <span style={{ fontSize: "12px", color: "var(--color-text-dim)", marginRight: "8px" }}>
              Sort:
            </span>
            {(["Relevance", "Date", "Duration"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className="px-3 py-1 rounded-md text-sm transition-all"
                style={{
                  color: sortBy === s ? "var(--color-brand)" : "var(--color-text-dim)",
                  backgroundColor:
                    sortBy === s ? "var(--color-brand-glow-sm)" : "transparent",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Results list */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-3">
          {filtered.length === 0 ? (
            <EmptyState />
          ) : (
            filtered.map((result) => (
              <ResultCard
                key={result.id}
                result={result}
                onPlay={() => navigate("/viewer")}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

function ResultCard({
  result,
  onPlay,
}: {
  result: SearchResult;
  onPlay: () => void;
}) {
  const parts = result.snippet.split(
    new RegExp(`(${result.keyword})`, "i")
  );

  return (
    <div
      className="glass-card p-4 flex gap-4"
      style={{ borderRadius: "var(--radius-md)" }}
    >
      {/* Left — thumbnail/waveform */}
      <div className="shrink-0">
        {result.type === "video" && (
          <div
            className="relative flex items-center justify-center rounded-lg overflow-hidden group cursor-pointer"
            style={{
              width: "160px",
              height: "90px",
              backgroundColor: "var(--color-bg-surface)",
              border: "1px solid var(--color-border-subtle)",
            }}
            onClick={onPlay}
          >
            <Play
              className="w-7 h-7 opacity-30 group-hover:opacity-80 transition-opacity"
              style={{ color: "var(--color-brand)" }}
              strokeWidth={1.5}
            />
            {result.timestamp && (
              <span
                className="absolute bottom-1.5 right-1.5 font-mono"
                style={{
                  fontSize: "10px",
                  backgroundColor: "rgba(0,0,0,0.75)",
                  color: "var(--color-text-muted)",
                  padding: "1px 5px",
                  borderRadius: "3px",
                }}
              >
                {result.timestamp}
              </span>
            )}
          </div>
        )}
        {result.type === "audio" && (
          <div
            className="flex items-center justify-center rounded-lg gap-0.5 px-3"
            style={{
              width: "160px",
              height: "90px",
              backgroundColor: "var(--color-bg-surface)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            {Array.from({ length: 14 }).map((_, i) => {
              const heights = [18, 28, 36, 22, 40, 30, 16, 38, 24, 32, 20, 34, 26, 18];
              return (
                <div
                  key={i}
                  className="w-1.5 rounded-full animate-pulse"
                  style={{
                    height: `${heights[i]}px`,
                    backgroundColor: "var(--color-brand)",
                    opacity: 0.6,
                    animationDelay: `${i * 100}ms`,
                  }}
                />
              );
            })}
          </div>
        )}
        {result.type === "document" && (
          <div
            className="relative flex items-center justify-center rounded-lg"
            style={{
              width: "160px",
              height: "90px",
              backgroundColor: "var(--color-bg-surface)",
              border: "1px solid var(--color-border-subtle)",
            }}
          >
            <FileText
              className="w-8 h-8"
              style={{ color: "var(--color-text-dim)" }}
              strokeWidth={1}
            />
            <span
              className="absolute bottom-1.5 right-1.5 font-mono"
              style={{
                fontSize: "10px",
                backgroundColor: "rgba(0,0,0,0.75)",
                color: "var(--color-text-muted)",
                padding: "1px 5px",
                borderRadius: "3px",
              }}
            >
              pg 1
            </span>
          </div>
        )}
      </div>

      {/* Right — content */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <p
            className="font-medium text-sm mb-0.5 truncate"
            style={{ color: "var(--color-text-primary)" }}
          >
            {result.filename}
          </p>
          <p
            className="text-xs mb-3 truncate"
            style={{ color: "var(--color-text-muted)" }}
          >
            {result.project}
          </p>
          <p className="text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
            {parts.map((part, i) =>
              part.toLowerCase() === result.keyword.toLowerCase() ? (
                <mark
                  key={i}
                  style={{
                    backgroundColor: "var(--color-brand-glow)",
                    color: "var(--color-brand-mid)",
                    borderRadius: "3px",
                    padding: "0 4px",
                    fontWeight: 500,
                  }}
                >
                  {part}
                </mark>
              ) : (
                <span key={i}>{part}</span>
              )
            )}
          </p>
        </div>

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span
              className="px-2 py-0.5 rounded font-mono"
              style={{
                fontSize: "11px",
                backgroundColor: "var(--color-brand-glow-sm)",
                border: "1px solid var(--color-border-glass)",
                color: "var(--color-text-muted)",
              }}
            >
              {result.duration}
            </span>
            <span
              className="px-2 py-0.5 rounded font-mono"
              style={{
                fontSize: "11px",
                backgroundColor: "rgba(0,212,160,0.08)",
                border: "1px solid rgba(0,212,160,0.2)",
                color: "var(--color-accent-ok)",
              }}
            >
              {result.confidence}% conf.
            </span>
          </div>
          <div className="flex items-center gap-2">
            {result.type === "video" && (
              <>
                <button
                  onClick={onPlay}
                  className="h-7 px-3 rounded-[6px] text-xs font-medium transition-all hover:brightness-110"
                  style={{
                    border: "1px solid var(--color-brand)",
                    color: "var(--color-brand)",
                    backgroundColor: "var(--color-brand-glow-sm)",
                  }}
                >
                  Play from here
                </button>
                <button
                  className="h-7 px-3 rounded-[6px] text-xs font-medium transition-all hover:brightness-110"
                  style={{ backgroundColor: "var(--color-brand)", color: "#fff" }}
                >
                  Extract Clip
                </button>
              </>
            )}
            {result.type === "audio" && (
              <>
                <button
                  className="h-7 px-3 rounded-[6px] text-xs font-medium transition-all hover:brightness-110"
                  style={{
                    border: "1px solid var(--color-brand)",
                    color: "var(--color-brand)",
                    backgroundColor: "var(--color-brand-glow-sm)",
                  }}
                >
                  Play Segment
                </button>
                <button
                  className="h-7 px-3 rounded-[6px] text-xs font-medium transition-all hover:brightness-110"
                  style={{ backgroundColor: "var(--color-brand)", color: "#fff" }}
                >
                  Export
                </button>
              </>
            )}
            {result.type === "document" && (
              <>
                <button
                  className="h-7 px-3 rounded-[6px] text-xs font-medium transition-all hover:brightness-110"
                  style={{
                    border: "1px solid var(--color-brand)",
                    color: "var(--color-brand)",
                    backgroundColor: "var(--color-brand-glow-sm)",
                  }}
                >
                  Open Page
                </button>
                <button
                  className="h-7 px-3 rounded-[6px] text-xs font-medium transition-all hover:brightness-110"
                  style={{ backgroundColor: "var(--color-brand)", color: "#fff" }}
                >
                  Download Section
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full py-24">
      <Search
        className="w-16 h-16 mb-4"
        style={{ color: "var(--color-text-dim)" }}
        strokeWidth={1}
      />
      <p
        className="mb-6 text-sm"
        style={{ color: "var(--color-text-muted)" }}
      >
        No results found
      </p>
      <div className="flex flex-wrap gap-2 justify-center">
        {["cabinet meeting 2024", "procurement Q2", "infrastructure audit"].map((s) => (
          <button
            key={s}
            className="px-3 py-1 rounded-full text-sm transition-all hover:brightness-110"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "1px solid var(--color-border-glass)",
              color: "var(--color-text-muted)",
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
