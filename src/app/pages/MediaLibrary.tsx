import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Play, Grid as GridIcon, List, ChevronDown, Check, Bookmark,
  MoreHorizontal, X, FileText, Mic, Filter,
} from "lucide-react";
import { cn } from "../../lib/utils";

const TABS = ["All", "Videos", "Audio", "Documents"];

const ITEMS = [
  { id: 1, title: "Q2 Product Roadmap.mp4", type: "video", time: "45:12", size: "1.2 GB", uploaded: "2h ago", status: "ready", lang: "EN", topic: "Product" },
  { id: 2, title: "User Interview — Design.wav", type: "audio", time: "18:30", size: "240 MB", uploaded: "5h ago", status: "ready", lang: "EN", topic: "Research" },
  { id: 3, title: "Technical Spec v2.pdf", type: "document", time: "14 pages", size: "12 MB", uploaded: "1d ago", status: "ready", lang: "EN", topic: "Engineering" },
  { id: 4, title: "All Hands Meeting.mp4", type: "video", time: "1:02:18", size: "3.4 GB", uploaded: "2d ago", status: "processing", lang: "EN", topic: "Team" },
  { id: 5, title: "Marketing Assets.pdf", type: "document", time: "22 pages", size: "8 MB", uploaded: "3d ago", status: "ready", lang: "EN", topic: "Marketing" },
  { id: 6, title: "Platform Keynote 2026.mp4", type: "video", time: "1:30:00", size: "5.2 GB", uploaded: "1w ago", status: "ready", lang: "EN", topic: "Product" },
  { id: 7, title: "Sales Call — Acme Corp.mp4", type: "video", time: "32:05", size: "980 MB", uploaded: "1w ago", status: "failed", lang: "EN", topic: "Sales" },
  { id: 8, title: "Design Brief Q2.pdf", type: "document", time: "6 pages", size: "3 MB", uploaded: "2w ago", status: "ready", lang: "FR", topic: "Design" },
];

export function MediaLibrary() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All");
  const [selected, setSelected] = useState<number[]>([]);
  const [bulkMode, setBulkMode] = useState(false);
  const [filters, setFilters] = useState({ video: true, audio: true, document: true });

  const toggleSelect = (id: number) => {
    setSelected((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const filtered = ITEMS.filter((item) => {
    if (activeTab !== "All") {
      const map: Record<string, string> = { Videos: "video", Audio: "audio", Documents: "document" };
      if (item.type !== map[activeTab]) return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col h-full relative" style={{ backgroundColor: "#1A1A1A" }}>
      {/* Inline page header */}
      <div
        className="flex items-center justify-between px-6 h-14 shrink-0"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
      >
        {/* Tab row */}
        <div className="flex gap-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="px-4 py-1.5 text-sm font-medium transition-all"
              style={{
                color: activeTab === tab ? "#fff" : "#555",
                borderBottom: activeTab === tab ? "2px solid #fff" : "2px solid transparent",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <div
            className="flex rounded-lg p-1"
            style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            <button className="p-1.5 rounded-md text-white" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              <GridIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
            <button className="p-1.5 rounded-md text-[#555] hover:text-white transition-colors">
              <List className="w-3.5 h-3.5" strokeWidth={1.5} />
            </button>
          </div>
          <button
            className="flex items-center gap-2 h-8 px-3 rounded-lg text-sm text-white transition-all hover:bg-white/5"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            Date Added <ChevronDown className="w-3.5 h-3.5 text-[#555]" strokeWidth={1.5} />
          </button>
          <button
            onClick={() => setBulkMode((v) => !v)}
            className="flex items-center gap-2 h-8 px-3 rounded-lg text-sm transition-all hover:bg-white/5"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              color: bulkMode ? "#fff" : "#888",
              backgroundColor: bulkMode ? "rgba(255,255,255,0.08)" : "transparent",
            }}
          >
            <Filter className="w-3.5 h-3.5" strokeWidth={1.5} /> Bulk Select
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Filter Panel */}
        <aside
          className="w-[220px] shrink-0 overflow-y-auto p-5"
          style={{
            borderRight: "1px solid rgba(255,255,255,0.06)",
            backgroundColor: "rgba(255,255,255,0.015)",
          }}
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-white" style={{ fontSize: "13px", fontWeight: 500 }}>Filters</h3>
            <button className="text-[#555] hover:text-white transition-colors" style={{ fontSize: "12px" }}>Clear all</button>
          </div>

          <FilterSection title="Media Type">
            {["Video", "Audio", "Document"].map((t) => (
              <label key={t} className="flex items-center gap-2 cursor-pointer py-1">
                <div
                  className="w-4 h-4 rounded flex items-center justify-center transition-all"
                  style={{
                    backgroundColor: filters[t.toLowerCase() as keyof typeof filters] ? "#fff" : "transparent",
                    border: "1px solid " + (filters[t.toLowerCase() as keyof typeof filters] ? "#fff" : "rgba(255,255,255,0.15)"),
                  }}
                  onClick={() => setFilters((f) => ({ ...f, [t.toLowerCase()]: !f[t.toLowerCase() as keyof typeof f] }))}
                >
                  {filters[t.toLowerCase() as keyof typeof filters] && <Check className="w-3 h-3 text-black" />}
                </div>
                <span className="text-sm text-[#888]">{t}</span>
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Status">
            {[
              { label: "Ready", dot: "bg-white" },
              { label: "Processing", dot: "bg-white animate-pulse" },
              { label: "Failed", dot: "bg-[#444]" },
            ].map(({ label, dot }) => (
              <label key={label} className="flex items-center gap-2 cursor-pointer py-1">
                <div className={cn("w-2 h-2 rounded-full shrink-0", dot)} />
                <span className="text-sm text-[#888]">{label}</span>
              </label>
            ))}
          </FilterSection>

          <FilterSection title="Has">
            {["Transcript", "Summary", "Keywords", "Notes"].map((f) => (
              <div key={f} className="flex items-center justify-between py-1">
                <span className="text-sm text-[#888]">{f}</span>
                <MiniToggle />
              </div>
            ))}
          </FilterSection>

          <FilterSection title="Date Added">
            <input
              type="date"
              className="w-full rounded-lg px-2 py-1.5 text-sm text-[#888] mb-2 outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            />
            <input
              type="date"
              className="w-full rounded-lg px-2 py-1.5 text-sm text-[#888] outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
            />
          </FilterSection>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="flex items-center gap-3 mb-5">
            <span className="text-[#888]" style={{ fontSize: "13px" }}>Showing {filtered.length} items</span>
            <div className="flex gap-2">
              {["Product", "Engineering"].map((chip) => (
                <span
                  key={chip}
                  className="flex items-center gap-1 px-2 py-0.5 rounded-full cursor-pointer"
                  style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", fontSize: "12px", color: "#888" }}
                >
                  {chip} <X className="w-3 h-3 hover:text-white" />
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4">
            {filtered.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                bulkMode={bulkMode}
                selected={selected.includes(item.id)}
                onSelect={() => toggleSelect(item.id)}
                onClick={() => navigate("/viewer")}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-10 pb-4">
            <button className="text-[#555] hover:text-white transition-colors px-2" style={{ fontSize: "13px" }}>←</button>
            {[1, 2, 3, 4, 5].map((p) => (
              <button
                key={p}
                className="w-7 h-7 rounded transition-all"
                style={{
                  color: p === 1 ? "#fff" : "#555",
                  backgroundColor: p === 1 ? "rgba(255,255,255,0.1)" : "transparent",
                  fontSize: "13px",
                }}
              >
                {p}
              </button>
            ))}
            <button className="text-[#555] hover:text-white transition-colors px-2" style={{ fontSize: "13px" }}>→</button>
          </div>
        </main>
      </div>

      {/* Bulk action bar */}
      {selected.length > 0 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div
            className="flex items-center gap-4 py-2.5 px-6 rounded-full"
            style={{
              backgroundColor: "rgba(20,20,20,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.15)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
            }}
          >
            <span className="text-white text-sm font-medium">{selected.length} selected</span>
            <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(255,255,255,0.15)" }} />
            {["Download", "Add to Collection", "Add to Watchlist"].map((a) => (
              <button key={a} className="text-white text-sm hover:text-white/70 transition-colors">{a}</button>
            ))}
            <button className="text-[#555] text-sm hover:text-white transition-colors">Delete</button>
            <div style={{ width: "1px", height: "16px", backgroundColor: "rgba(255,255,255,0.15)" }} />
            <button
              onClick={() => setSelected([])}
              className="text-[#555] hover:text-white transition-colors"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function MiniToggle() {
  const [on, setOn] = useState(false);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className="w-7 h-4 rounded-full p-0.5 transition-colors shrink-0"
      style={{ backgroundColor: on ? "#fff" : "rgba(255,255,255,0.1)" }}
    >
      <div
        className="w-3 h-3 rounded-full transition-transform"
        style={{ backgroundColor: on ? "#000" : "#555", transform: on ? "translateX(11px)" : "translateX(0)" }}
      />
    </button>
  );
}

function FilterSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="pb-4 mb-4" style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <button
        className="flex items-center justify-between w-full mb-3"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-[#444] uppercase tracking-widest" style={{ fontSize: "11px" }}>{title}</span>
        <ChevronDown
          className="w-3 h-3 text-[#444] transition-transform"
          style={{ transform: open ? "rotate(0deg)" : "rotate(-90deg)" }}
          strokeWidth={1.5}
        />
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

function MediaCard({
  item, bulkMode, selected, onSelect, onClick,
}: {
  item: typeof ITEMS[0];
  bulkMode: boolean;
  selected: boolean;
  onSelect: () => void;
  onClick: () => void;
}) {
  return (
    <div
      className="group rounded-xl overflow-hidden cursor-pointer transition-all"
      onClick={bulkMode ? onSelect : onClick}
      style={{
        backgroundColor: "#1A1A1A",
        boxShadow: selected
          ? "0 0 0 2px #fff, 6px 6px 16px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.03)"
          : "6px 6px 16px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.03)",
        border: "1px solid " + (selected ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.06)"),
      }}
    >
      {/* Thumbnail */}
      <div
        className="relative flex items-center justify-center"
        style={{ aspectRatio: "16/9", backgroundColor: "#0d0d0d" }}
      >
        {item.type === "video" ? (
          <Play className="w-8 h-8 text-white/20 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
        ) : item.type === "audio" ? (
          <Mic className="w-8 h-8 text-white/20 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
        ) : (
          <FileText className="w-8 h-8 text-white/20 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
        )}

        {/* Type badge top-left */}
        <span
          className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-white"
          style={{ fontSize: "10px", backgroundColor: "rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {item.type === "video" ? "MP4" : item.type === "audio" ? "WAV" : "PDF"}
        </span>

        {/* Bookmark top-right — hover only */}
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white/60 hover:text-white">
          <Bookmark className="w-4 h-4" strokeWidth={1.5} />
        </button>

        {/* Duration bottom-right */}
        <span
          className="absolute bottom-2 right-2 font-mono text-white"
          style={{ fontSize: "10px", backgroundColor: "rgba(0,0,0,0.7)", padding: "2px 6px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {item.time}
        </span>

        {/* Bulk select checkbox */}
        {bulkMode && (
          <div
            className="absolute top-2 left-2 w-5 h-5 rounded flex items-center justify-center z-10"
            style={{
              backgroundColor: selected ? "#fff" : "rgba(0,0,0,0.6)",
              border: "1px solid " + (selected ? "#fff" : "rgba(255,255,255,0.3)"),
            }}
          >
            {selected && <Check className="w-3 h-3 text-black" />}
          </div>
        )}

        {/* Hover overlay actions */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
          <button
            className="p-1 rounded text-white/80 hover:text-white transition-colors hover:bg-black/40"
            onClick={(e) => { e.stopPropagation(); }}
          >
            <MoreHorizontal className="w-4 h-4" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Card body */}
      <div className="p-3">
        <h4 className="text-white text-sm font-medium line-clamp-2 mb-2">{item.title}</h4>
        <div className="flex gap-1.5 mb-2">
          <span
            className="px-1.5 py-0.5 rounded text-[#888]"
            style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {item.lang}
          </span>
          <span
            className="px-1.5 py-0.5 rounded text-[#888]"
            style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
          >
            {item.topic}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#555] font-mono" style={{ fontSize: "11px" }}>{item.size} · {item.uploaded}</span>
          {item.status === "processing" && (
            <span className="text-[#888] animate-pulse" style={{ fontSize: "11px" }}>Processing…</span>
          )}
          {item.status === "failed" && (
            <span className="text-[#555]" style={{ fontSize: "11px" }}>Failed</span>
          )}
        </div>
      </div>
    </div>
  );
}
