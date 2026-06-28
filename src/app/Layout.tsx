import { Link, Outlet, useLocation } from "react-router";
import { MiniPlayer } from "./components/MiniPlayer";
import {
  Home, BarChart2, Grid, Bookmark,
  UploadCloud, Folder, Settings, Bell, Search,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";

const NAV_ITEMS = [
  { icon: Search, path: "/search", label: "Search" },
  { icon: Home, path: "/home", label: "Home" },
  { icon: BarChart2, path: "/dashboard", label: "Dashboard" },
  { icon: Grid, path: "/library", label: "Media Library" },
  { icon: Bookmark, path: "/watchlist", label: "Watchlist" },
  { icon: UploadCloud, path: "/upload", label: "Upload" },
  { icon: Folder, path: "/collections", label: "Collections" },
  { icon: Settings, path: "/settings", label: "Settings" },
];

export function Layout() {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div
      className="flex h-screen w-full overflow-hidden relative"
      style={{ backgroundColor: "var(--color-bg-base)", color: "var(--color-text-primary)" }}
    >
      {/* Sidebar — 60px icon-only */}
      <aside
        className="w-[60px] flex-shrink-0 flex flex-col items-center py-5 relative z-20"
        style={{
          backgroundColor: "var(--color-bg-surface)",
          boxShadow: "3px 0 12px rgba(0,0,0,0.4)",
          borderRight: "1px solid var(--color-border-subtle)",
        }}
      >
        {/* Subtle blue gradient overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(4,51,191,0.04) 0%, transparent 60%)",
          }}
        />

        {/* Logo mark — brand circle */}
        <Link to="/home" className="mb-8 flex items-center justify-center relative z-10">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: "var(--color-brand)",
              boxShadow: "0 0 16px var(--color-brand-glow)",
            }}
          >
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "12px", letterSpacing: "0.5px" }}>
              MV
            </span>
          </div>
        </Link>

        {/* Nav icons */}
        <nav className="flex-1 flex flex-col gap-1 w-full px-2 relative z-10">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname.startsWith(item.path);
            return (
              <div
                key={item.path}
                className="relative"
                onMouseEnter={() => setHoveredItem(item.label)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                {/* Active left-edge indicator */}
                {isActive && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-r-full"
                    style={{ left: "-8px", backgroundColor: "var(--color-brand)" }}
                  />
                )}
                <Link
                  to={item.path}
                  className={cn(
                    "w-full h-10 flex items-center justify-center rounded-md transition-colors"
                  )}
                  style={
                    isActive
                      ? {
                          color: "var(--color-brand)",
                          backgroundColor: "var(--color-brand-glow-sm)",
                        }
                      : undefined
                  }
                >
                  <item.icon
                    className="w-[22px] h-[22px] transition-colors"
                    strokeWidth={1.5}
                    style={{
                      color: isActive
                        ? "var(--color-brand)"
                        : hoveredItem === item.label
                        ? "var(--color-text-muted)"
                        : "var(--color-text-dim)",
                    }}
                  />
                </Link>

                {/* Tooltip — glass-card style */}
                {hoveredItem === item.label && (
                  <div
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap pointer-events-none glass-card"
                    style={{
                      padding: "4px 10px",
                      fontSize: "12px",
                      color: "var(--color-text-primary)",
                      borderRadius: "var(--radius-sm)",
                    }}
                  >
                    {item.label}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Bottom: Bell + Avatar */}
        <div className="flex flex-col items-center gap-4 mt-auto relative z-10">
          <div
            className="relative"
            onMouseEnter={() => setHoveredItem("Notifications")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button
              className="w-10 h-10 flex items-center justify-center rounded-md transition-colors relative hover:bg-white/5"
              style={{ color: "var(--color-text-dim)" }}
            >
              <Bell className="w-[22px] h-[22px]" strokeWidth={1.5} />
              <span
                className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: "var(--color-accent-warn)" }}
              />
            </button>
            {hoveredItem === "Notifications" && (
              <div
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap pointer-events-none glass-card"
                style={{
                  padding: "4px 10px",
                  fontSize: "12px",
                  color: "var(--color-text-primary)",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                Notifications
              </div>
            )}
          </div>

          {/* Avatar */}
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center cursor-pointer"
            style={{
              backgroundColor: "var(--color-bg-card)",
              border: "2px solid var(--color-brand)",
              boxShadow: "0 0 8px var(--color-brand-glow-sm)",
              fontSize: "11px",
              color: "var(--color-text-primary)",
              fontWeight: 600,
            }}
          >
            JD
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>

      <MiniPlayer />
    </div>
  );
}
