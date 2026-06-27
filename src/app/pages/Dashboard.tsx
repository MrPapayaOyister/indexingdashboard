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
  { label: "Laptop", count: 89, icon: "💻" },
  { label: "Whiteboard", count: 62, icon: "🖊️" },
  { label: "Screen", count: 54, icon: "🖥️" },
  { label: "Document", count: 41, icon: "📄" },
  { label: "Camera", count: 28, icon: "📷" },
];

export function Dashboard() {
  return (
    <div className="flex-1 overflow-auto p-8 space-y-7 h-full" style={{ backgroundColor: "#1A1A1A" }}>
      {/* Inline page header */}
      <header className="flex justify-between items-center">
        <h1 className="text-white" style={{ fontSize: "24px", fontWeight: 700 }}>Dashboard</h1>
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
            style={{ backgroundColor: "#111", borderColor: "rgba(255,255,255,0.06)" }}
          >
            <button
              className="w-14 h-14 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <Play className="w-6 h-6 text-white ml-1" strokeWidth={1.5} />
            </button>
          </div>
          {/* Content */}
          <div className="flex-1 p-6 flex flex-col justify-center">
            <span
              className="text-[#888] uppercase tracking-widest mb-2"
              style={{ fontSize: "11px" }}
            >
              AI PICK
            </span>
            <h2 className="text-white mb-2" style={{ fontSize: "20px", fontWeight: 700 }}>
              Platform Vision Keynote Analysis
            </h2>
            <p className="text-[#888] text-sm mb-4 line-clamp-2">
              Executive team discussed the shift towards unified intelligence processing and the upcoming
              release. Key topics: Architecture, API, QA.
            </p>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <GlassChip>Architecture (12m)</GlassChip>
                <GlassChip>API Changes (24m)</GlassChip>
              </div>
              <button
                className="h-9 px-4 rounded-[8px] bg-white text-black text-sm font-medium transition-all active:scale-[0.97] hover:bg-white/90"
              >
                Open
              </button>
            </div>
          </div>
        </div>
      </GlassPanel>

      {/* Section 2 — KPI Row */}
      <div className="grid grid-cols-4 gap-5">
        <NeuCard>
          <div className="text-[#888] text-sm mb-2">Total Uploads</div>
          <div className="text-white mb-1" style={{ fontSize: "28px", fontWeight: 600 }}>2,523</div>
          <div className="text-white text-xs">+18% vs last month</div>
        </NeuCard>
        <NeuCard>
          <div className="flex justify-between items-start mb-2">
            <div className="text-[#888] text-sm">Processing Queue</div>
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shrink-0" />
          </div>
          <div className="text-white mb-1" style={{ fontSize: "28px", fontWeight: 600 }}>7 items</div>
          <div className="text-[#888] text-xs">Avg 4 min each</div>
        </NeuCard>
        <NeuCard>
          <div className="text-[#888] text-sm mb-2">AI Summaries</div>
          <div className="text-white mb-1" style={{ fontSize: "28px", fontWeight: 600 }}>2,104</div>
          <div className="text-[#888] text-xs">96.2% confidence avg</div>
        </NeuCard>
        <NeuCard>
          <div className="text-[#888] text-sm mb-2">Unique Topics</div>
          <div className="text-white mb-1" style={{ fontSize: "28px", fontWeight: 600 }}>38</div>
          <div className="text-[#888] text-xs">Extracted across files</div>
        </NeuCard>
      </div>

      {/* Section 3 — Charts Row (60/40) */}
      <div className="grid grid-cols-5 gap-5">
        <GlassPanel className="col-span-3 flex flex-col">
          <h3 className="text-white text-sm font-medium mb-5">Upload Velocity</h3>
          <div className="flex-1 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={velocityData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <XAxis
                  dataKey="date"
                  stroke="#444"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#444" }}
                />
                <YAxis
                  stroke="#444"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "#444" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#111",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "8px",
                    color: "#fff",
                    fontSize: "12px",
                  }}
                  cursor={{ stroke: "rgba(255,255,255,0.1)", strokeWidth: 1 }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#FFFFFF"
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={{ r: 4, fill: "#FFFFFF", stroke: "#111", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassPanel>

        <GlassPanel className="col-span-2">
          <h3 className="text-white text-sm font-medium mb-5">Language Distribution</h3>
          <div className="space-y-4">
            {languages.map((item) => (
              <div key={item.lang} className="flex items-center gap-3">
                <div className="w-16 text-sm text-[#888] shrink-0">{item.lang}</div>
                <div
                  className="flex-1 h-[3px] rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="h-full bg-white rounded-full" style={{ width: `${item.pct}%` }} />
                </div>
                <div className="w-8 text-right text-[#888] shrink-0" style={{ fontSize: "11px" }}>
                  {item.pct}%
                </div>
              </div>
            ))}
          </div>
        </GlassPanel>
      </div>

      {/* Section 4 — Three equal columns */}
      <div className="grid grid-cols-3 gap-5">
        {/* Trending Keywords — word cloud */}
        <GlassPanel>
          <h3 className="text-white text-sm font-medium mb-5">Trending Keywords</h3>
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
                    color: `rgba(255,255,255,${opacity})`,
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
          <h3 className="text-white text-sm font-medium mb-5">Top People</h3>
          <div className="space-y-3">
            {topPeople.map((person, i) => (
              <div key={person.name} className="flex items-center gap-3">
                <span className="text-[#555] w-4 text-right shrink-0" style={{ fontSize: "12px" }}>
                  {i + 1}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "#1A1A1A",
                    boxShadow: "3px 3px 7px rgba(0,0,0,0.5), -2px -2px 5px rgba(255,255,255,0.025)",
                    fontSize: "10px",
                    color: "#888",
                    fontWeight: 600,
                  }}
                >
                  {person.initials}
                </div>
                <span className="text-white text-sm flex-1 truncate">{person.name}</span>
                <span className="text-[#555] shrink-0" style={{ fontSize: "12px" }}>
                  {person.count}
                </span>
              </div>
            ))}
          </div>
        </GlassPanel>

        {/* Top Objects */}
        <GlassPanel>
          <h3 className="text-white text-sm font-medium mb-5">Top Objects</h3>
          <div className="space-y-3">
            {topObjects.map((obj, i) => (
              <div key={obj.label} className="flex items-center gap-3">
                <span className="text-[#555] w-4 text-right shrink-0" style={{ fontSize: "12px" }}>
                  {i + 1}
                </span>
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: "#1A1A1A",
                    boxShadow: "3px 3px 7px rgba(0,0,0,0.5), -2px -2px 5px rgba(255,255,255,0.025)",
                    fontSize: "14px",
                  }}
                >
                  {obj.icon}
                </div>
                <span className="text-white text-sm flex-1 truncate">{obj.label}</span>
                <span className="text-[#555] shrink-0" style={{ fontSize: "12px" }}>
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
          <h3 className="text-white text-sm font-medium">Processing Jobs</h3>
          <button className="text-[#555] hover:text-white transition-colors" style={{ fontSize: "12px" }}>
            View all jobs →
          </button>
        </div>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              {["FILE NAME", "TYPE", "STATUS", "DURATION", "UPLOADED", "ACTIONS"].map((h) => (
                <th
                  key={h}
                  className="pb-3 text-[#444] tracking-widest"
                  style={{ fontSize: "11px", fontWeight: 500 }}
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
      className={`rounded-xl ${padding} ${className}`}
      style={{
        backgroundColor: "rgba(255,255,255,0.04)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
      }}
    >
      {children}
    </div>
  );
}

function NeuCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="rounded-xl p-5"
      style={{
        backgroundColor: "#1A1A1A",
        boxShadow: "6px 6px 16px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.03)",
      }}
    >
      {children}
    </div>
  );
}

function GhostBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button
      className="flex items-center gap-2 px-4 h-9 rounded-[10px] text-white text-sm transition-all hover:bg-white/5 active:scale-[0.97]"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
    >
      <span className="text-[#888]">{icon}</span>
      {label}
    </button>
  );
}

function GlassChip({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="px-3 py-1 rounded-full text-white"
      style={{
        backgroundColor: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.1)",
        fontSize: "12px",
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
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-white"
        style={{
          border: "1px solid rgba(255,255,255,0.2)",
          backgroundColor: "rgba(255,255,255,0.04)",
          fontSize: "11px",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white" />
        READY
      </span>
    );
  }
  if (status === "processing") {
    return (
      <span
        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-white"
        style={{
          border: "1px solid rgba(255,255,255,0.15)",
          backgroundColor: "rgba(255,255,255,0.04)",
          fontSize: "11px",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        PROCESSING
      </span>
    );
  }
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[#888]"
      style={{
        border: "1px solid rgba(255,255,255,0.06)",
        backgroundColor: "transparent",
        fontSize: "11px",
      }}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-[#555]" />
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
      style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
    >
      <td className="py-3.5">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-[#555] group-hover:text-white transition-colors" strokeWidth={1.5} />
          <span className="text-white text-sm">{name}</span>
        </div>
      </td>
      <td className="py-3.5 text-[#888] text-sm">{type}</td>
      <td className="py-3.5">
        <StatusPill status={status} />
      </td>
      <td className="py-3.5 text-[#888] text-sm font-mono">{dur}</td>
      <td className="py-3.5 text-[#555] text-sm">{uploaded}</td>
      <td className="py-3.5">
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#555] hover:text-white transition-colors hover:bg-white/5">
            <Eye className="w-4 h-4" strokeWidth={1.5} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-md text-[#555] hover:text-white transition-colors hover:bg-white/5">
            <Download className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </td>
    </tr>
  );
}
