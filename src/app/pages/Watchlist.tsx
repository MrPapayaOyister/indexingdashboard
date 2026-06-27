import { useState } from "react";
import { Play, FileText, Mic, X, GripVertical, Bookmark, ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const WATCHLIST_ITEMS = [
  { id: 1, title: "Platform Vision Keynote 2026", type: "video", progress: 45, resume: "45:12", status: "watching" },
  { id: 2, title: "User Interview — Sarah Chen", type: "audio", progress: 0, resume: "", status: "unread" },
  { id: 3, title: "Architecture Spec v3.pdf", type: "document", progress: 30, resume: "Page 12 of 40", status: "watching" },
  { id: 4, title: "Sales Call — Acme Corp", type: "video", progress: 100, resume: "", status: "complete" },
  { id: 5, title: "Design Brief Q2.pdf", type: "document", progress: 0, resume: "", status: "unread" },
];

const FAVOURITES = [
  { id: 1, title: "Q2 Product Roadmap.mp4", type: "video", time: "45:12", collection: "Product" },
  { id: 2, title: "User Interview — Design.wav", type: "audio", time: "18:30", collection: "Research" },
  { id: 3, title: "Technical Spec v2.pdf", type: "document", time: "14 pages", collection: "Engineering" },
  { id: 4, title: "All Hands Meeting.mp4", type: "video", time: "1:02:18", collection: "Team" },
  { id: 5, title: "Marketing Assets Pack.pdf", type: "document", time: "22 pages", collection: "Marketing" },
  { id: 6, title: "Investor Pitch Deck.pdf", type: "document", time: "30 pages", collection: "Product" },
  { id: 7, title: "Customer Onboarding.mp4", type: "video", time: "28:40", collection: "Team" },
  { id: 8, title: "Sprint Retrospective.mp4", type: "video", time: "1:15:00", collection: "Engineering" },
];

function Toggle({ active, onToggle, label }: { active: boolean; onToggle: () => void; label: string }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 transition-colors"
      style={{ color: active ? "#fff" : "#555", fontSize: "13px" }}
    >
      <div
        className="w-8 h-5 rounded-full p-0.5 transition-colors"
        style={{ backgroundColor: active ? "#fff" : "rgba(255,255,255,0.08)", border: "1px solid " + (active ? "#fff" : "rgba(255,255,255,0.08)") }}
      >
        <div
          className="w-3 h-3 rounded-full transition-transform"
          style={{ backgroundColor: active ? "#000" : "#555", transform: active ? "translateX(12px)" : "translateX(0)" }}
        />
      </div>
      {label}
    </button>
  );
}

function WatchlistTab() {
  const [items, setItems] = useState(WATCHLIST_ITEMS);
  const [autoRemove, setAutoRemove] = useState(false);

  const remove = (id: number) => setItems((prev) => prev.filter((i) => i.id !== id));

  const getTypeIcon = (type: string) => {
    if (type === "video") return <Play className="w-4 h-4 text-[#555]" strokeWidth={1.5} />;
    if (type === "audio") return <Mic className="w-4 h-4 text-[#555]" strokeWidth={1.5} />;
    return <FileText className="w-4 h-4 text-[#555]" strokeWidth={1.5} />;
  };

  const getStatusPill = (item: typeof WATCHLIST_ITEMS[0]) => {
    if (item.status === "complete") {
      return (
        <span
          className="px-2 py-0.5 rounded-full text-[#555]"
          style={{ fontSize: "11px", backgroundColor: "transparent", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          Complete
        </span>
      );
    }
    if (item.status === "unread") {
      return (
        <span
          className="px-2 py-0.5 rounded-full text-white"
          style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)" }}
        >
          Unread
        </span>
      );
    }
    return (
      <span
        className="px-2 py-0.5 rounded-full text-white"
        style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {item.resume}
      </span>
    );
  };

  return (
    <div className="flex-1 px-8 py-6">
      {/* Top controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            className="h-9 px-4 rounded-[8px] text-white text-sm transition-all hover:bg-white/5 active:scale-[0.97]"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            ▶ Play All
          </button>
          <button
            className="h-9 px-4 rounded-[8px] text-white text-sm transition-all hover:bg-white/5 flex items-center gap-2"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Date Added <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-[#555] hover:text-white transition-colors" style={{ fontSize: "13px" }}>
            Clear Completed
          </button>
          <Toggle active={autoRemove} onToggle={() => setAutoRemove((v) => !v)} label="Auto-remove on complete" />
        </div>
      </div>

      {/* List */}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 h-16 rounded-xl px-3 transition-all hover:bg-white/[0.02] group"
            style={{
              backgroundColor: "rgba(255,255,255,0.03)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.06)",
              opacity: item.status === "complete" ? 0.6 : 1,
            }}
          >
            {/* Drag handle */}
            <GripVertical className="w-4 h-4 text-[#333] group-hover:text-[#555] transition-colors cursor-grab shrink-0" strokeWidth={1.5} />

            {/* Thumbnail */}
            <div
              className="w-20 rounded shrink-0 flex items-center justify-center"
              style={{
                height: "45px",
                backgroundColor: "#111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "6px",
              }}
            >
              {getTypeIcon(item.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-white text-sm font-medium truncate">{item.title}</span>
                <span
                  className="px-1.5 py-0.5 rounded shrink-0 text-[#888]"
                  style={{ fontSize: "10px", backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  {item.type.toUpperCase()}
                </span>
              </div>
              {getStatusPill(item)}
            </div>

            {/* Resume timestamp */}
            {item.resume && item.status === "watching" && (
              <span className="text-[#555] font-mono shrink-0" style={{ fontSize: "12px" }}>
                {item.resume}
              </span>
            )}

            {/* Remove */}
            <button
              onClick={() => remove(item.id)}
              className="opacity-0 group-hover:opacity-100 transition-opacity text-[#444] hover:text-white w-8 h-8 flex items-center justify-center rounded-md hover:bg-white/5 shrink-0"
            >
              <X className="w-4 h-4" strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20">
          <Bookmark className="w-10 h-10 text-[#333] mb-3" strokeWidth={1.5} />
          <p className="text-white text-sm font-medium mb-1">Watchlist is empty</p>
          <p className="text-[#555] text-sm mb-5">Add media from the library to start watching</p>
          <button className="h-9 px-4 rounded-[8px] text-white text-sm hover:bg-white/5 transition-all" style={{ border: "1px solid rgba(255,255,255,0.1)" }}>
            Browse Library
          </button>
        </div>
      )}
    </div>
  );
}

function FavouritesTab() {
  const [groupByCollection, setGroupByCollection] = useState(false);

  const collections = [...new Set(FAVOURITES.map((f) => f.collection))];

  const FavCard = ({ item }: { item: typeof FAVOURITES[0] }) => (
    <div
      className="group rounded-xl overflow-hidden cursor-pointer transition-all"
      style={{
        backgroundColor: "#1A1A1A",
        boxShadow: "6px 6px 16px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div
        className="relative flex items-center justify-center"
        style={{ aspectRatio: "16/9", backgroundColor: "#111" }}
      >
        {item.type === "video" ? (
          <Play className="w-8 h-8 text-white/20 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
        ) : item.type === "audio" ? (
          <Mic className="w-8 h-8 text-white/20 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
        ) : (
          <FileText className="w-8 h-8 text-white/20 group-hover:text-white/60 transition-colors" strokeWidth={1.5} />
        )}
        <span
          className="absolute top-2 left-2 px-1.5 py-0.5 rounded text-white"
          style={{ fontSize: "10px", backgroundColor: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          {item.type === "video" ? "MP4" : item.type === "audio" ? "WAV" : "PDF"}
        </span>
        <span
          className="absolute bottom-2 right-2 font-mono text-white"
          style={{ fontSize: "10px", backgroundColor: "rgba(0,0,0,0.6)", padding: "2px 6px", borderRadius: "4px" }}
        >
          {item.time}
        </span>
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-white/70 hover:text-white">
          <Bookmark className="w-4 h-4 fill-white" strokeWidth={1.5} />
        </button>
      </div>
      <div className="p-3">
        <p className="text-white text-sm font-medium line-clamp-2">{item.title}</p>
      </div>
    </div>
  );

  return (
    <div className="flex-1 px-8 py-6">
      {/* Controls */}
      <div className="flex items-center justify-between mb-6">
        <button
          className="h-9 px-4 rounded-[8px] text-white text-sm flex items-center gap-2 hover:bg-white/5 transition-all"
          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
        >
          Date Added <ChevronDown className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <Toggle active={groupByCollection} onToggle={() => setGroupByCollection((v) => !v)} label="Group by Collection" />
      </div>

      {groupByCollection ? (
        <div className="space-y-8">
          {collections.map((col) => (
            <div key={col}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-sm font-medium">{col}</h3>
                <button
                  className="h-8 px-3 rounded-[8px] text-[#888] hover:text-white text-sm transition-all hover:bg-white/5"
                  style={{ border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  Share Collection
                </button>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {FAVOURITES.filter((f) => f.collection === col).map((item) => (
                  <FavCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {FAVOURITES.map((item) => (
            <FavCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export function Watchlist() {
  const [activeTab, setActiveTab] = useState<"watchlist" | "favourites">("watchlist");

  return (
    <div className="flex flex-col h-full" style={{ backgroundColor: "#1A1A1A" }}>
      {/* Inline header with sub-tabs */}
      <div className="flex items-center gap-6 px-8 pt-8 pb-0 shrink-0">
        {(["watchlist", "favourites"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="pb-3 text-sm font-medium capitalize transition-colors"
            style={{
              color: activeTab === tab ? "#fff" : "#555",
              borderBottom: activeTab === tab ? "2px solid #fff" : "2px solid transparent",
            }}
          >
            {tab === "watchlist" ? "Watchlist" : "Favourites"}
          </button>
        ))}
      </div>
      <div style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }} />

      {activeTab === "watchlist" ? <WatchlistTab /> : <FavouritesTab />}
    </div>
  );
}
