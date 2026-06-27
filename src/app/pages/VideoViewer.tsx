import {
  Play, Pause, SkipBack, SkipForward, Maximize, PictureInPicture,
  Volume2, Globe, Scissors, Search, Download, Share2, RefreshCw,
  Clock, ChevronLeft, ChevronRight, BookOpen, Users, Box, Zap,
  BookMarked, List, Hash, AlignLeft,
} from "lucide-react";
import { cn } from "../../lib/utils";
import { useState } from "react";

const TABS = [
  { id: "Transcript", icon: AlignLeft },
  { id: "Summary", icon: BookOpen },
  { id: "Keywords", icon: Hash },
  { id: "Key Moments", icon: Zap },
  { id: "People", icon: Users },
  { id: "Objects", icon: Box },
  { id: "Events", icon: Zap },
  { id: "Notes", icon: BookMarked },
  { id: "Chapters", icon: List },
];

const TRANSCRIPT = [
  { time: "14:28", text: "Welcome everyone to the Q2 product demonstration." },
  { time: "14:30", text: "So as we look at the new dashboard layout, you'll notice we've prioritized the" },
  { time: "14:32", text: "processing queue and the overall upload velocity metrics.", active: true },
  { time: "14:35", text: "This was a direct result of the feedback from the Q1 beta program where users felt they didn't have enough visibility." },
  { time: "14:41", text: "Let's move on to the media library view and see how the new bulk actions work." },
  { time: "14:45", text: "You can now select multiple items across different media types and apply tags simultaneously." },
  { time: "14:52", text: "The AI processing pipeline has also been improved significantly." },
  { time: "15:02", text: "Transcript accuracy is now at 96% confidence on average across all supported languages." },
];

const KEYWORDS = [
  { word: "Dashboard", count: 14, first: "02:15" },
  { word: "Upload Velocity", count: 11, first: "14:30" },
  { word: "Processing Queue", count: 9, first: "14:32" },
  { word: "Bulk Actions", count: 7, first: "14:41" },
  { word: "Transcript", count: 6, first: "01:10" },
  { word: "API", count: 5, first: "22:40" },
  { word: "Architecture", count: 5, first: "18:05" },
  { word: "Intelligence", count: 4, first: "05:22" },
];

const KEY_MOMENTS = [
  { time: "02:15", quote: "The new dashboard redesign is built around the insight that teams need real-time upload visibility." },
  { time: "14:32", quote: "Processing queue and upload velocity metrics are now front-and-center." },
  { time: "22:40", quote: "Our new API supports batch operations, cutting integration time by 70%." },
  { time: "38:10", quote: "Face detection is opt-in and consent-gated per jurisdiction." },
  { time: "51:05", quote: "Export to PDF, Markdown, and structured JSON — all from a single summary." },
];

const PEOPLE = [
  { name: "Sarah Chen", count: 12, first: "01:40", initials: "SC" },
  { name: "Marcus Webb", count: 8, first: "05:20", initials: "MW" },
  { name: "Jordan Park", count: 5, first: "14:30", initials: "JP" },
];

const OBJECTS = [
  { label: "Laptop", count: 24, first: "00:10" },
  { label: "Whiteboard", count: 18, first: "02:30" },
  { label: "Screen", count: 15, first: "00:45" },
  { label: "Camera", count: 6, first: "12:00" },
];

const CHAPTERS = [
  { num: 1, title: "Opening Remarks", ts: "00:00", dur: "3:40" },
  { num: 2, title: "Dashboard Overview", ts: "03:40", dur: "12:20" },
  { num: 3, title: "Media Library Deep Dive", ts: "16:00", dur: "10:00" },
  { num: 4, title: "AI Processing Pipeline", ts: "26:00", dur: "15:45" },
  { num: 5, title: "API & Integrations", ts: "41:45", dur: "8:30" },
  { num: 6, title: "Q&A", ts: "50:15", dur: "12:03" },
];

export function VideoViewer() {
  const [activeTab, setActiveTab] = useState("Transcript");
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      {/* LEFT COLUMN — 65% */}
      <div className="flex flex-col overflow-y-auto" style={{ width: "65%" }}>
        <div className="p-7 pb-4">
          {/* Breadcrumb */}
          <p className="text-[#555] mb-5" style={{ fontSize: "12px" }}>
            <span className="hover:text-white cursor-pointer transition-colors">Library</span>
            <span className="mx-2">/</span>
            <span className="text-white">Product Demo Q2 2026</span>
          </p>

          {/* Video container — 16:9, black bg */}
          <div
            className="w-full rounded-xl overflow-hidden relative flex items-center justify-center"
            style={{ aspectRatio: "16/9", backgroundColor: "#000", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <button
              onClick={() => setIsPlaying((p) => !p)}
              className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110"
              style={{
                backgroundColor: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.2)",
              }}
            >
              {isPlaying ? (
                <Pause className="w-7 h-7 text-white fill-white" />
              ) : (
                <Play className="w-7 h-7 text-white fill-white ml-1" />
              )}
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-3 mb-2 relative">
            <div
              className="w-full h-1.5 rounded-full cursor-pointer group relative"
              style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            >
              <div className="absolute left-0 top-0 h-full bg-white rounded-full w-[23%]" />
              {/* Chapter markers */}
              {[15, 26, 42, 68, 81].map((pct) => (
                <div
                  key={pct}
                  className="absolute -top-1 w-0 h-0"
                  style={{
                    left: `${pct}%`,
                    borderLeft: "4px solid transparent",
                    borderRight: "4px solid transparent",
                    borderTop: "6px solid rgba(255,255,255,0.5)",
                  }}
                />
              ))}
              <div className="absolute top-1/2 left-[23%] -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Controls bar */}
          <div
            className="rounded-xl px-4 py-3 flex items-center justify-between"
            style={{
              backgroundColor: "rgba(255,255,255,0.04)",
              backdropFilter: "blur(16px)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Left cluster */}
            <div className="flex items-center gap-2">
              <CtrlBtn><ChevronLeft className="w-4 h-4" strokeWidth={1.5} /></CtrlBtn>
              <CtrlBtn><span className="text-xs font-mono">-10s</span></CtrlBtn>
              <button
                onClick={() => setIsPlaying((p) => !p)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-white transition-all hover:bg-white/10"
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>
              <CtrlBtn><span className="text-xs font-mono">+10s</span></CtrlBtn>
              <CtrlBtn><ChevronRight className="w-4 h-4" strokeWidth={1.5} /></CtrlBtn>
              <span className="text-[#555] font-mono ml-2" style={{ fontSize: "11px" }}>14:32 / 1:02:18</span>
            </div>

            {/* Right cluster */}
            <div className="flex items-center gap-3 text-[#555]">
              <CtrlBtn><Volume2 className="w-4 h-4" strokeWidth={1.5} /></CtrlBtn>
              <span
                className="px-2 py-0.5 rounded-full text-white cursor-pointer hover:bg-white/10"
                style={{
                  fontSize: "12px",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                1x
              </span>
              <CtrlBtn><span className="text-xs">CC</span></CtrlBtn>
              <CtrlBtn><Globe className="w-4 h-4" strokeWidth={1.5} /></CtrlBtn>
              <CtrlBtn><Scissors className="w-4 h-4" strokeWidth={1.5} /></CtrlBtn>
              <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(255,255,255,0.12)" }} />
              <CtrlBtn><PictureInPicture className="w-4 h-4" strokeWidth={1.5} /></CtrlBtn>
              <CtrlBtn><Maximize className="w-4 h-4" strokeWidth={1.5} /></CtrlBtn>
            </div>
          </div>

          {/* Waveform strip */}
          <div className="mt-3 flex items-center gap-0.5 h-6">
            {Array.from({ length: 80 }).map((_, i) => {
              const h = 3 + Math.round(Math.sin(i * 0.4) * 6 + Math.random() * 5);
              return (
                <div
                  key={i}
                  className="w-0.5 rounded-full"
                  style={{ height: `${h}px`, backgroundColor: "rgba(255,255,255,0.15)" }}
                />
              );
            })}
          </div>

          {/* Related */}
          <h3 className="text-[#888] mt-7 mb-4" style={{ fontSize: "13px" }}>Related</h3>
          <div className="grid grid-cols-3 gap-4 pb-6">
            {[
              { title: "Q1 Demo Recording", time: "58:20" },
              { title: "Feature Spec Draft", type: "document", time: "4 pages" },
              { title: "Interview with PM", type: "audio", time: "24:15" },
            ].map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <div
                  className="w-full rounded-lg mb-2 relative flex items-center justify-center overflow-hidden transition-all group-hover:border-white/20"
                  style={{
                    aspectRatio: "16/9",
                    backgroundColor: "#111",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                >
                  <Play className="w-6 h-6 text-white/20 group-hover:text-white/60 transition-colors" />
                </div>
                <p className="text-white text-xs font-medium truncate">{item.title}</p>
                <p className="text-[#555] mt-0.5 font-mono" style={{ fontSize: "11px" }}>{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN — 35% */}
      <div
        className="flex flex-col"
        style={{
          width: "35%",
          borderLeft: "1px solid rgba(255,255,255,0.06)",
          backgroundColor: "rgba(255,255,255,0.02)",
        }}
      >
        {/* Scrollable tab bar */}
        <div
          className="flex overflow-x-auto shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {TABS.map(({ id }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className="px-4 py-3 text-sm whitespace-nowrap transition-all shrink-0"
              style={{
                color: activeTab === id ? "#fff" : "#555",
                borderBottom: activeTab === id ? "2px solid #fff" : "2px solid transparent",
                fontWeight: activeTab === id ? 500 : 400,
              }}
            >
              {id}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col">
          {activeTab === "Transcript" && (
            <>
              <div className="relative mb-4 shrink-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#444]" strokeWidth={1.5} />
                <input
                  className="w-full h-9 rounded-lg pl-9 pr-3 text-sm text-white placeholder:text-[#444] outline-none"
                  placeholder="Search transcript…"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                />
              </div>
              <div className="flex-1 space-y-3">
                {TRANSCRIPT.map((line) => (
                  <div
                    key={line.time}
                    className="flex gap-3 p-2 rounded-md transition-all"
                    style={
                      line.active
                        ? {
                            borderLeft: "2px solid #fff",
                            backgroundColor: "rgba(255,255,255,0.04)",
                            paddingLeft: "10px",
                          }
                        : { borderLeft: "2px solid transparent" }
                    }
                  >
                    <button
                      className="text-white rounded px-1.5 py-0.5 shrink-0 font-mono hover:bg-white/10 transition-colors"
                      style={{
                        fontSize: "11px",
                        backgroundColor: "rgba(255,255,255,0.07)",
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {line.time}
                    </button>
                    <p
                      className={cn("text-sm leading-relaxed", line.active ? "text-white" : "text-[#888]")}
                    >
                      {line.text}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Summary" && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-28 h-1 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
                  >
                    <div className="h-full bg-white w-[96%]" />
                  </div>
                  <span className="text-[#555]" style={{ fontSize: "12px" }}>96% confidence</span>
                </div>
                <button className="flex items-center gap-1.5 text-[#888] hover:text-white transition-colors" style={{ fontSize: "12px" }}>
                  <RefreshCw className="w-3.5 h-3.5" strokeWidth={1.5} /> Regenerate
                </button>
              </div>
              <div className="text-sm text-white leading-[1.7] space-y-4">
                <p>The Q2 product demonstration focuses primarily on the new user interface updates and improvements to the media processing pipeline.</p>
                <p>Key highlights include the revamped dashboard which now surfaces upload velocity and processing queue status more prominently. The presenter notes these changes address direct feedback from the Q1 beta group.</p>
                <p>Additionally, the media library introduces cross-format bulk actions, allowing users to apply tags and move files regardless of media type.</p>
              </div>
              <div className="flex gap-3 pt-4">
                <GhostBtn>Copy</GhostBtn>
                <GhostBtn>Export .txt</GhostBtn>
              </div>
            </div>
          )}

          {activeTab === "Keywords" && (
            <div className="space-y-5">
              <div className="flex flex-wrap gap-2 min-h-[100px]">
                {KEYWORDS.map((kw) => {
                  const opacity = 0.4 + (kw.count / 14) * 0.6;
                  const size = 12 + Math.round((kw.count / 14) * 8);
                  return (
                    <span
                      key={kw.word}
                      className="cursor-pointer hover:text-white transition-colors"
                      style={{ fontSize: `${size}px`, color: `rgba(255,255,255,${opacity})`, fontWeight: kw.count > 8 ? 600 : 400 }}
                    >
                      {kw.word}
                    </span>
                  );
                })}
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="pt-4 space-y-2">
                {KEYWORDS.map((kw) => (
                  <div key={kw.word} className="flex items-center gap-3 text-sm">
                    <span className="text-white flex-1">{kw.word}</span>
                    <span className="text-[#555] font-mono w-6 text-right" style={{ fontSize: "12px" }}>{kw.count}</span>
                    <span className="text-[#444] font-mono w-12 text-right" style={{ fontSize: "11px" }}>{kw.first}</span>
                    <button className="text-[#555] hover:text-white transition-colors" style={{ fontSize: "11px" }}>
                      Find
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "Key Moments" && (
            <div className="space-y-3">
              {KEY_MOMENTS.map((m, i) => (
                <div
                  key={i}
                  className="rounded-lg p-3 flex gap-3"
                  style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
                >
                  <button
                    className="text-white rounded px-1.5 py-0.5 shrink-0 font-mono hover:bg-white/10 transition-colors self-start mt-0.5"
                    style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    {m.time}
                  </button>
                  <div className="flex-1">
                    <p className="text-white text-sm leading-relaxed">&ldquo;{m.quote}&rdquo;</p>
                    <button className="text-[#555] hover:text-white transition-colors mt-2" style={{ fontSize: "12px" }}>Jump To</button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "People" && (
            <div className="space-y-3">
              {PEOPLE.map((p) => (
                <div key={p.name} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "#1A1A1A",
                      boxShadow: "3px 3px 7px rgba(0,0,0,0.5), -2px -2px 5px rgba(255,255,255,0.025)",
                      fontSize: "11px",
                      color: "#888",
                      fontWeight: 600,
                    }}
                  >
                    {p.initials}
                  </div>
                  <span className="text-white text-sm flex-1">{p.name}</span>
                  <span className="text-[#555] font-mono" style={{ fontSize: "12px" }}>{p.count}×</span>
                  <span className="text-[#444] font-mono" style={{ fontSize: "11px" }}>{p.first}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Objects" && (
            <div className="space-y-3">
              {OBJECTS.map((obj) => (
                <div key={obj.label} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <span className="text-white text-sm flex-1">{obj.label}</span>
                  <span className="text-[#555] font-mono" style={{ fontSize: "12px" }}>{obj.count}×</span>
                  <span className="text-[#444] font-mono" style={{ fontSize: "11px" }}>{obj.first}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Events" && (
            <div className="space-y-3">
              {[
                { label: "Screen Share", count: 6, first: "00:45" },
                { label: "Applause", count: 3, first: "03:20" },
                { label: "Laughter", count: 8, first: "05:10" },
                { label: "Q&A Start", count: 1, first: "50:15" },
              ].map((ev) => (
                <div key={ev.label} className="flex items-center gap-3 p-2 rounded-md hover:bg-white/[0.03] transition-colors cursor-pointer">
                  <span className="text-white text-sm flex-1">{ev.label}</span>
                  <span className="text-[#555] font-mono" style={{ fontSize: "12px" }}>{ev.count}×</span>
                  <span className="text-[#444] font-mono" style={{ fontSize: "11px" }}>{ev.first}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "Notes" && (
            <div className="flex flex-col h-full">
              {/* Formatting toolbar */}
              <div
                className="flex items-center gap-1 p-2 rounded-t-lg shrink-0"
                style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                {["B", "I", "U"].map((f) => (
                  <button key={f} className="w-7 h-7 flex items-center justify-center text-white rounded hover:bg-white/10 transition-colors text-xs font-serif">{f}</button>
                ))}
                <div style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.12)", margin: "0 4px" }} />
                {["H1", "H2"].map((h) => (
                  <button key={h} className="w-8 h-7 flex items-center justify-center text-[#888] hover:text-white rounded hover:bg-white/10 transition-colors" style={{ fontSize: "11px" }}>{h}</button>
                ))}
                <div style={{ width: "1px", height: "14px", backgroundColor: "rgba(255,255,255,0.12)", margin: "0 4px" }} />
                <button className="w-7 h-7 flex items-center justify-center text-[#888] hover:text-white rounded hover:bg-white/10 transition-colors">
                  <Clock className="w-3.5 h-3.5" strokeWidth={1.5} />
                </button>
              </div>
              <textarea
                className="flex-1 w-full p-4 text-sm text-white resize-none outline-none rounded-b-lg"
                placeholder="Type your notes here…"
                style={{
                  backgroundColor: "#161616",
                  boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.4), inset -3px -3px 8px rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderTop: "none",
                  lineHeight: 1.7,
                }}
                defaultValue={"Great overview of the dashboard.\n\nFollow-up items:\n- Is the 10GB limit final for Enterprise?\n- Can we customize the KPI cards?\n\n[14:41] Bulk actions — exactly what marketing asked for."}
              />
              <div className="flex gap-3 pt-4 shrink-0">
                <GhostBtn>Export PDF</GhostBtn>
                <GhostBtn>Export Markdown</GhostBtn>
              </div>
            </div>
          )}

          {activeTab === "Chapters" && (
            <div className="space-y-2">
              {CHAPTERS.map((ch) => (
                <div
                  key={ch.num}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/[0.03] transition-colors cursor-pointer"
                  style={{ border: "1px solid rgba(255,255,255,0.05)" }}
                >
                  <span className="text-[#444] w-5 text-right shrink-0 font-mono" style={{ fontSize: "12px" }}>{ch.num}</span>
                  <span className="text-white text-sm flex-1">{ch.title}</span>
                  <span className="text-[#444] font-mono shrink-0" style={{ fontSize: "11px" }}>{ch.ts}</span>
                  <span className="text-[#333] font-mono shrink-0" style={{ fontSize: "11px" }}>{ch.dur}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom bar */}
        <div
          className="h-12 flex items-center justify-between px-4 shrink-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <GhostBtn icon={<Download className="w-3.5 h-3.5" strokeWidth={1.5} />}>Download</GhostBtn>
          <GhostBtn icon={<Share2 className="w-3.5 h-3.5" strokeWidth={1.5} />}>Share</GhostBtn>
          <button className="text-[#444] hover:text-white transition-colors" style={{ fontSize: "12px" }}>
            Report AI Error
          </button>
        </div>
      </div>
    </div>
  );
}

function CtrlBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="flex items-center justify-center text-[#555] hover:text-white transition-colors p-1.5 rounded-md hover:bg-white/5">
      {children}
    </button>
  );
}

function GhostBtn({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <button
      className="flex items-center gap-1.5 px-3 h-8 rounded-[8px] text-white text-xs transition-all hover:bg-white/5 active:scale-[0.97]"
      style={{ border: "1px solid rgba(255,255,255,0.1)" }}
    >
      {icon}
      {children}
    </button>
  );
}
