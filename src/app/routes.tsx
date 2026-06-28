import { createBrowserRouter } from "react-router";
import { Layout } from "./Layout";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { MediaLibrary } from "./pages/MediaLibrary";
import { Upload } from "./pages/Upload";
import { UploadDetail } from "./pages/UploadDetail";
import { Settings } from "./pages/Settings";
import { VideoViewer } from "./pages/VideoViewer";
import { Watchlist } from "./pages/Watchlist";
import { SearchResults } from "./pages/SearchResults";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/",
    Component: Layout,
    children: [
      { path: "search", Component: SearchResults },
      { path: "home", Component: Home },
      { path: "dashboard", Component: Dashboard },
      { path: "library", Component: MediaLibrary },
      { path: "upload", Component: Upload },
      { path: "upload/detail", Component: UploadDetail },
      { path: "watchlist", Component: Watchlist },
      { path: "settings", Component: Settings },
      { path: "viewer", Component: VideoViewer },
      { path: "collections", Component: () => (
        <div
          className="flex flex-col items-center justify-center h-full"
          style={{ backgroundColor: "var(--color-bg-base)", color: "var(--color-text-dim)", fontSize: "14px" }}
        >
          Collections — coming soon
        </div>
      )},
      { path: "*", Component: () => (
        <div
          className="flex flex-col items-center justify-center h-full"
          style={{ backgroundColor: "var(--color-bg-base)", color: "var(--color-text-dim)", fontSize: "14px" }}
        >
          Page not found
        </div>
      )},
    ],
  },
]);
