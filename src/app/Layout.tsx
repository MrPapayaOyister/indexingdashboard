import { Link, Outlet, useLocation } from "react-router";
import { MiniPlayer } from "./components/MiniPlayer";
import {
  Home, BarChart2, Grid, Bookmark,
  UploadCloud, Folder, Settings, Bell, GripVertical,
} from "lucide-react";
import { cn } from "../lib/utils";
import { useState } from "react";

const NAV_ITEMS = [
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
    <div className="flex h-screen w-full overflow-hidden text-primary relative" style={{ backgroundColor: "#1A1A1A" }}>
      {/* Sidebar — neumorphic raised surface, 60px icon-only */}
      <aside
        className="w-[60px] flex-shrink-0 flex flex-col items-center py-5 relative z-20"
        style={{
          backgroundColor: "#1A1A1A",
          boxShadow: "3px 0 12px rgba(0,0,0,0.4)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Logo mark */}
        <Link to="/home" className="mb-8 flex items-center justify-center">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{
              boxShadow: "4px 4px 10px rgba(0,0,0,0.55), -3px -3px 8px rgba(255,255,255,0.03)",
              backgroundColor: "#1A1A1A",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            <span className="text-primary font-bold text-sm leading-none">MV</span>
          </div>
        </Link>

        {/* Nav icons */}
        <nav className="flex-1 flex flex-col gap-1 w-full px-2">
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
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-primary rounded-r-full"
                    style={{ left: "-8px" }}
                  />
                )}
                <Link
                  to={item.path}
                  className={cn(
                    "w-full h-10 flex items-center justify-center rounded-md transition-colors",
                    isActive
                      ? "text-primary"
                      : "text-[#555555] hover:text-primary hover:bg-white/5"
                  )}
                >
                  <item.icon className="w-[22px] h-[22px]" strokeWidth={1.5} />
                </Link>

                {/* Tooltip */}
                {hoveredItem === item.label && (
                  <div
                    className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap pointer-events-none"
                    style={{
                      backgroundColor: "rgba(30,30,30,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "6px",
                      padding: "4px 10px",
                      fontSize: "12px",
                      color: "#FFFFFF",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
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
        <div className="flex flex-col items-center gap-4 mt-auto">
          <div
            className="relative"
            onMouseEnter={() => setHoveredItem("Notifications")}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <button className="w-10 h-10 flex items-center justify-center text-[#555555] hover:text-primary transition-colors rounded-md hover:bg-white/5 relative">
              <Bell className="w-[22px] h-[22px]" strokeWidth={1.5} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
            </button>
            {hoveredItem === "Notifications" && (
              <div
                className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 whitespace-nowrap pointer-events-none"
                style={{
                  backgroundColor: "rgba(30,30,30,0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "6px",
                  padding: "4px 10px",
                  fontSize: "12px",
                  color: "#FFFFFF",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
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
              backgroundColor: "#2a2a2a",
              boxShadow: "3px 3px 8px rgba(0,0,0,0.5), -2px -2px 6px rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.1)",
              fontSize: "11px",
              color: "#FFFFFF",
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
