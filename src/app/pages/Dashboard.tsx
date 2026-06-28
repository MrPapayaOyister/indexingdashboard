import { Calendar, Download, Eye, FileText, PlayCircle, Monitor, Play } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const velocityData = [
  { date: "01", count: 40 }, { date: "05", count: 30 }, { date: "10", count: 85 },
  { date: "15", count: 50 }, { date: "20", count: 120 }, { date: "25", count: 70 },
  { date: "30", count: 90 },
];

const languages = [
  { lang: "English", pct: 68 },
  { lang: "Spanish", pct: 14 },
  { lang: "French", pct: 8 },
  { lang: "German", pct: 5 },
  { lang: "Japanese", pct: 3 },
];

const keywords = [
  { word: "Architecture", weight: 9 }, { word: "API", weight: 7 },
  { word: "Dashboard", weight: 6 }, { word: "Pipeline", weight: 5 },
  { word: "Upload", weight: 4 }, { word: "Intelligence", weight: 8 },
  { word: "Transcript", weight: 5 }, { word: "Analytics", weight: 6 },
  { word: "Export", weight: 3 }, { word: "Processing", weight: 7 },
  { word: "Q2", weight: 4 }, { word: "Metadata", weight: 3 },
];

const topPeople = [
  { name: "Sarah Chen", count: 42, initials: "SC" },
  { name: "Marcus Webb", count: 38, initials: "MW" },
  { name: "Priya Nair", count: 27, initials: "PN" },
  { name: "Jordan Park", count: 19, initials: "JP" },
  { name: "Alex Torres", count: 14, initials: "AT" },
];

const topObjects = [
  { label: "Laptop", count: 89 },
  { label: "Whiteboard", count: 62 },
  { label: "Screen", count: 54 },
  { label: "Document", count: 41 },
  { label: "Camera", count: 28 },
];

export function Dashboard() {
  return (
    <div
      className="flex-1 overflow-auto p-8 space-y-7 h-full"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
      {/* Inline page header */}
      <header className="flex justify-between items-center">
        <h1 style={{ fontSize: "24px", fontWeight: 700, color: "var(--color-text-primary)" }}>
          Dashboard
        </h1>
        <div className="flex gap-3">
          <GhostBtn icon={<Calendar className="w-4 h-4" strokeWidth={1.5} />} label="Last 30 Days" />
          <GhostBtn icon={<Download className="w-4 h-4" strokeWidth={1.5} />} label="Export" />
        </div>
      </header>

      {/* Section 1 — AI Spotlight */}
      <GlassPanel padding="p-0" className="overflow-hidden">
        <div className="flex h-[170px]">
          {/* Thumbnail */}
          <div
            className="w-[280px] shrink-0 flex items-center justify-center border-r"
            style={{
              backgroundColor: "var(--color-bg-surface)",
              borderColor: "var(--color-border-subtle)",
            }}
          >
            <button
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                backgroundColor: "var(--color-brand-glow-sm)",
                border: "1px solid var(--color-border-glass)",
              }}
            >
              <Play className="w-6 h-6 ml-1" strokeWidth={1.5} style={{ color: "var(--color-brand)" }} />
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <span
              className="uppercase tracking-widest mb-2"
              style={{ fontSize: "11px", color: "var(--color-text-muted)" }}
            >
              AI PICK
            </span>
            <h2
              className="mb-2"
              style={{ fontSize: "20px", fontWeight: 700, color: "var(--color-text-primary)" }}
            >
              Platform Vision Keynote Analysis
            </h2>
            <p className="text-sm mb-4 line-clamp-2" style={{ color: "var(--color-text-muted)" }}>
              Executive team discussed the shift towards unified intelligence processing and the upcoming
              release. Key topics: Architecture, API, QA.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <GlassChip>Architecture (12m)</GlassChip>
                <GlassChip>API Changes (24m)</GlassChip>
              </div>
              <button
                className="h-9 px-4 rounded-[8px] text-sm font-medium transition-all active:scale-[0.97] hover:brightness-110"
                style={{ backgroundColor: "var(--color-brand)", color: "#fff" }}
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Section 2 — KPI Row */}
      <div className="grid grid-cols-4 gap-5">
        <GlassPanel>
          <div className="text-sm mb-2" style={{ color: "var(--color-text-muted)" }}>Total Uploads</div>
          <div className="mb-1" style={{ fontSize: "28px", fontWeight: 600, color: "var(--color-text-primary)" }}>2,523</div>
          <div className="text-xs" style={{ color: "var(--color-accent-ok)" }}>+18% vs last month</div>
        </GlassPanel>
        <GlassPanel>
          <div className="flex justify-between items-start mb-2">
            <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>Processing Queue</div>
            <span
              className="w-2.5 h-2.5 rounded-full animate-pulse shrink-0"
              style={{ backgroundColor: "var(--color-accent-warn)" }}
            />
          </div>
          <div className="mb-1" style={{ fontSize: "28px", fontWeight: 600, color: "var(--color-text-primary)" }}>7 items</div>
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Avg 4 min each</div>
        </GlassPanel>
        <GlassPanel>
          <div className="text-sm mb-2" style={{ color: "var(--color-text-muted)" }}>AI Summaries</div>
          <div className="mb-1" style={{ fontSize: "28px", fontWeight: 600, color: "var(--color-text-primary)" }}>2,104</div>
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>96.2% confidence avg</div>
        </GlassPanel>
        <GlassPanel>
          <div className="text-sm mb-2" style={{ color: "var(--color-text-muted)" }}>Unique Topics</div>
          <div className="mb-1" style={{ fontSize: "28px", fontWeight: 600, color: "var(--color-text-primary)" }}>38</div>
          <div className="text-xs" style={{ color: "var(--color-text-muted)" }}>Extracted across files</div>
        </GlassPanel>
      </div>

      {/* Section 3 — Charts Row (60/40) */}
      <div className="grid grid-cols-5 gap-5">
        <GlassPanel className="col-span-3 flex flex-col">
          <h3 className="text-sm font-medium mb-5" style={{ color: "var(--color-text-primary)" }}>
            Upload Velocity
          </h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velocityData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-text-dim)" }}
                />
                <YAxis
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-text-dim)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--color-bg-surface)",
                    border: "1px solid var(--color-border-glass)",
                    borderRadius: "8px",
                    color: "var(--color-text-primary)",
                    fontSize: "12px",
                  }}
                  cursor={{ stroke: "var(--color-border-subtle)", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="var(--color-brand)"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={{ r: 4, fill: "var(--color-brand)", stroke: "var(--color-bg-base)", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-2">
          <h3 className="text-sm font-medium mb-5" style={{ color: "var(--color-text-primary)" }}>
            Language Distribution
          </h3>
          <div className="space-y-4">
            {languages.map((item) => (
              <div key={item.lang} className="flex items-center gap-3">
                <div className="w-16 text-sm shrink-0" style={{ color: "var(--color-text-muted)" }}>
                  {item.lang}
                </div>
                <div
                  className="flex-1 h-[3px] rounded-full overflow-hidden"
                  style={{ backgroundColor: "var(--color-border-subtle)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${item.pct}%`, backgroundColor: "var(--color-brand)" }}
                  />
                </div>
                <div
                  className="w-8 text-right shrink-0"
                  style={{ fontSize: "11px", color: "var(--color-text-muted)" }}
                >
                  {item.pct}%
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Section 4 — Three equal columns */}
      <div className="grid grid-cols-3 gap-5">
        {/* Trending Keywords */}
        <GlassPanel>
          <h3 className="text-sm font-medium mb-5" style={{ color: "var(--color-text-primary)" }}>
            Trending Keywords
          </h3>
          <div className="flex flex-wrap gap-2 items-center min-h-[160px]">
            {keywords.map((kw) => {
              const opacity = 0.3 + (kw.weight / 9) * 0.7;
              const size = 11 + Math.round((kw.weight / 9) * 8);
              return (
                <span
                  key={kw.word}
                  className="cursor-pointer hover:text-white transition-colors"
                  style={{
                    fontSize: `${size}px`,
                    color: `rgba(232, 236, 244, ${opacity})`,
                    fontWeight: kw.weight > 6 ? 600 : 400,
                  }}
                >
                  {kw.word}
                </span>
              );
            })}
          </div>
        </GlassPanel>

        {/* Top People */}
        <GlassPanel>
          <h3 className="text-sm font-medium mb-5" style={{ color: "var(--color-text-primary)" }}>
            Top People
          </h3>
          <div className="space-y-3">
            {topPeople.map((person, i) => (
              <div key={person.name} className="flex items-center gap-3">
                <span
                  className="w-4 text-right shrink-0"
                  style={{ fontSize: "12px", color: "var(--color-text-dim)" }}
                >
                  {i + 1}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "var(--color-bg-surface)",
                    border: "1px solid var(--color-border-glass)",
                    fontSize: "10px",
                    color: "var(--color-text-muted)",
                    fontWeight: 600,
                  }}
                >
                  {person.initials}
                </div>
                <span className="text-sm flex-1 truncate" style={{ color: "var(--color-text-primary)" }}>
                  {person.name}
                </span>
                <span className="shrink-0" style={{ fontSize: "12px", color: "var(--color-text-dim)" }}>
                  {person.count}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Top Objects */}
        <GlassPanel>
          <h3 className="text-sm font-medium mb-5" style={{ color: "var(--color-text-primary)" }}>
            Top Objects
          </h3>
          <div className="space-y-3">
            {topObjects.map((obj, i) => (
              <div key={obj.label} className="flex items-center gap-3">
                <span
                  className="w-4 text-right shrink-0"
                  style={{ fontSize: "12px", color: "var(--color-text-dim)" }}
                >
                  {i + 1}
                </span>
                <span className="text-sm flex-1 truncate" style={{ color: "var(--color-text-primary)" }}>
                  {obj.label}
                </span>
                <span className="shrink-0" style={{ fontSize: "12px", color: "var(--color-text-dim)" }}>
                  {obj.count}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Section 5 — Processing Jobs Table */}
      <GlassPanel>
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
            Processing Jobs
          </h3>
          <button
            className="transition-colors hover:text-white"
            style={{ fontSize: "12px", color: "var(--color-text-dim)" }}
          >
            View all jobs →
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr style={{ borderBottom: "1px solid var(--color-border-subtle)" }}>
              {["FILE NAME", "TYPE", "STATUS", "DURATION", "UPLOADED", "ACTIONS"].map((h) => (
                <th
                  key={h}
                  className="pb-3 tracking-widest"
                  style={{ fontSize: "11px", fontWeight: 500, color: "var(--color-text-dim)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <JobRow name="Q2_All_Hands.mp4" icon={PlayCircle} type="Video" dur="45:12" status="ready" uploaded="10 min ago" />
            <JobRow name="User_Interview_04.wav" icon={Monitor} type="Audio" dur="18:30" status="processing" uploaded="2 min ago" />
            <JobRow name="Architecture_Spec.pdf" icon={FileText} type="Document" dur="14 pages" status="failed" uploaded="1 hour ago" />
            <JobRow name="Sales_Call_Acme.mp4" icon={PlayCircle} type="Video" dur="32:05" status="ready" uploaded="1 hour ago" />
            <JobRow name="Design_Brief_v3.pdf" icon={FileText} type="Document" dur="6 pages" status="ready" uploaded="3 hours ago" />
          </tbody>
        </table>
      </GlassPanel>
    </div>
  );
}

/* ---- Sub-components ---- */

function GlassPanel({ children, className = "", padding = "p-6" }: {
  children: React.ReactNode;
  className?: string;
  padding?: string;
}) {
  return (
    <div
      className={`glass-card ${padding} ${className}`}
    >
      {children}
    </div>
  );
}

function GhostBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="flex items-center gap-2 px-4 h-9 rounded-[10px] text-sm transition-all active:scale-[0.97] hover:bg-white/5"
      style={{
        border: "1px solid var(--color-border-subtle)",
        color: "var(--color-text-primary)",
      }}
    >
      <span style={{ color: "var(--color-text-muted)" }}>{icon}</span>
      {label}
    </button>
  );
}

function GlassChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-3 py-1 rounded-full"
      style={{
        backgroundColor: "var(--color-brand-glow-sm)",
        border: "1px solid var(--color-border-glass)",
        fontSize: "12px",
        color: "var(--color-text-muted)",
      }}
    >
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: "ready" | "processing" | "failed" }) {
  if (status === "ready") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
        style={{
          border: "1px solid rgba(0, 212, 160, 0.3)",
          backgroundColor: "rgba(0, 212, 160, 0.08)",
          fontSize: "11px",
          color: "var(--color-accent-ok)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent-ok)" }} />
        READY
      </span>
    );
  }
  if (status === "processing") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
        style={{
          border: "1px solid rgba(245, 166, 35, 0.3)",
          backgroundColor: "rgba(245, 166, 35, 0.08)",
          fontSize: "11px",
          color: "var(--color-accent-warn)",
        }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: "var(--color-accent-warn)" }}
        />
        PROCESSING
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full"
      style={{
        border: "1px solid rgba(255, 77, 106, 0.3)",
        backgroundColor: "rgba(255, 77, 106, 0.08)",
        fontSize: "11px",
        color: "var(--color-accent-err)",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--color-accent-err)" }} />
      FAILED
    </span>
  );
}

function JobRow({
  name, icon: Icon, type, dur, status, uploaded,
}: {
  name: string;
  icon: React.ElementType;
  type: string;
  dur: string;
  status: "ready" | "processing" | "failed";
  uploaded: string;
}) {
  return (
    <tr
      className="group transition-colors"
      style={{ borderBottom: "1px solid var(--color-border-subtle)" }}
    >
      <td className="py-3.5">
        <div className="flex items-center gap-2">
          <Icon
            className="w-4 h-4 transition-colors"
            strokeWidth={1.5}
            style={{ color: "var(--color-text-dim)" }}
          />
          <span className="text-sm" style={{ color: "var(--color-text-primary)" }}>{name}</span>
        </div>
      </td>
      <td className="py-3.5 text-sm" style={{ color: "var(--color-text-muted)" }}>{type}</td>
      <td className="py-3.5">
        <StatusPill status={status} />
      </td>
      <td className="py-3.5 text-sm font-mono" style={{ color: "var(--color-text-muted)" }}>{dur}</td>
      <td className="py-3.5 text-sm" style={{ color: "var(--color-text-dim)" }}>{uploaded}</td>
      <td className="py-3.5">
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors hover:bg-white/5"
            style={{ color: "var(--color-text-dim)" }}
          >
            <Eye className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-md transition-colors hover:bg-white/5"
            style={{ color: "var(--color-text-dim)" }}
          >
            <Download className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </td>
    </tr>
  );
}
