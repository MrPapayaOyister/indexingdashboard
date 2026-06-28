import { useState } from "react";
import {
  User, Palette, Bell, Brain, Database, Key,
  Users, Blocks, CreditCard, Shield,
} from "lucide-react";
import { cn } from "../../lib/utils";

const NAV_ITEMS = [
  { icon: User, label: "Profile", id: "profile" },
  { icon: Palette, label: "Appearance", id: "appearance" },
  { icon: Bell, label: "Notifications", id: "notifications" },
  { icon: Brain, label: "AI Preferences", id: "ai" },
  { icon: Database, label: "Storage", id: "storage" },
  { icon: Key, label: "API Access", id: "api" },
  { icon: Users, label: "Team & Sharing", id: "team" },
  { icon: Blocks, label: "Integrations", id: "integrations" },
  { icon: CreditCard, label: "Billing", id: "billing" },
  { icon: Shield, label: "Data & Privacy", id: "privacy" },
];

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-6 rounded-full p-0.5 transition-colors shrink-0"
      style={{
        backgroundColor: active ? "var(--color-brand)" : "rgba(255,255,255,0.1)",
        border: "1px solid " + (active ? "var(--color-brand)" : "var(--color-border-subtle)"),
      }}
    >
      <div
        className="w-4 h-4 rounded-full transition-transform"
        style={{
          backgroundColor: active ? "#fff" : "var(--color-text-dim)",
          transform: active ? "translateX(16px)" : "translateX(0)",
        }}
      />
    </button>
  );
}

function NeuInput({ label, type = "text", value, readOnly, placeholder, badge }: {
  label: string; type?: string; value?: string; readOnly?: boolean; placeholder?: string; badge?: string;
}) {
  return (
    <div>
      <label className="block text-[#888] uppercase tracking-widest mb-1.5" style={{ fontSize: "11px" }}>{label}</label>
      <div className="relative">
        <input
          type={type}
          defaultValue={value}
          readOnly={readOnly}
          placeholder={placeholder}
          className="neu-input w-full rounded-[10px] px-4 py-3 text-sm bg-transparent outline-none"
          style={{
            border: "1px solid var(--color-border-subtle)",
            color: "var(--color-text-primary)",
            opacity: readOnly ? 0.7 : 1,
          }}
        />
        {badge && (
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white px-2 py-0.5 rounded-full"
            style={{ fontSize: "11px", backgroundColor: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            {badge}
          </span>
        )}
      </div>
    </div>
  );
}

function SectionTitle({ title, desc }: { title: string; desc: string }) {
  return (
    <div className="mb-8">
      <h1 className="text-white mb-1.5" style={{ fontSize: "20px", fontWeight: 600 }}>{title}</h1>
      <p className="text-[#888] text-sm">{desc}</p>
    </div>
  );
}

function SaveBtn({ label = "Save Changes" }: { label?: string }) {
  return (
    <div
      className="flex justify-end pt-6"
      style={{ borderTop: "1px solid var(--color-border-subtle)" }}
    >
      <button
        className="h-11 px-6 rounded-[10px] font-medium text-sm transition-all active:scale-[0.97] hover:brightness-110"
        style={{ backgroundColor: "var(--color-brand)", color: "#fff" }}
      >
        {label}
      </button>
    </div>
  );
}

function Divider() {
  return <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} className="my-6" />;
}

function ToggleRow({ label, sub }: { label: string; sub?: string }) {
  const [active, setActive] = useState(false);
  return (
    <div className="flex items-center justify-between py-2">
      <div>
        <p className="text-white text-sm">{label}</p>
        {sub && <p className="text-[#888] mt-0.5" style={{ fontSize: "12px" }}>{sub}</p>}
      </div>
      <Toggle active={active} onToggle={() => setActive((v) => !v)} />
    </div>
  );
}

/* ===== PANES ===== */

function ProfilePane() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Profile" desc="Manage your personal details and preferences." />
      {/* Avatar */}
      <div className="flex items-center gap-5 mb-4">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center text-white cursor-pointer"
          style={{
            boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.025)",
            backgroundColor: "#161616",
            border: "1px solid rgba(255,255,255,0.08)",
            fontSize: "22px",
            fontWeight: 600,
          }}
        >
          JD
        </div>
        <div>
          <p className="text-white text-sm font-medium mb-1">Profile photo</p>
          <button className="text-[#888] hover:text-white transition-colors" style={{ fontSize: "13px" }}>Upload photo</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5">
        <NeuInput label="Full Name" value="Jordan Doe" />
        <NeuInput label="Email" value="jordan@company.com" readOnly badge="Verified" />
      </div>
      <div className="grid grid-cols-2 gap-5">
        <NeuInput label="Timezone" value="UTC-5 (EST)" />
        <NeuInput label="Language" value="English" />
      </div>
      <Divider />
      <p className="text-white text-sm font-medium mb-4">Change Password</p>
      <div className="grid grid-cols-2 gap-5">
        <NeuInput label="Current Password" type="password" placeholder="••••••••" />
        <NeuInput label="New Password" type="password" placeholder="••••••••" />
      </div>
      <SaveBtn />
    </div>
  );
}

function AppearancePane() {
  const [selected, setSelected] = useState("Dark");
  const [fontSize, setFontSize] = useState("Medium");

  return (
    <div className="space-y-8">
      <SectionTitle title="Appearance" desc="Customize how MediaVault looks for you." />
      {/* Theme */}
      <div>
        <p className="text-white text-sm font-medium mb-4">Theme</p>
        <div className="flex gap-4">
          {["Dark", "Light", "System"].map((name) => (
            <button
              key={name}
              onClick={() => setSelected(name)}
              className="flex flex-col items-center gap-2"
            >
              <div
                className="w-[140px] h-[90px] rounded-lg overflow-hidden transition-all"
                style={{
                  backgroundColor: name === "Light" ? "#e5e5e5" : "#1a1a1a",
                  boxShadow: selected === name
                    ? "6px 6px 16px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.03)"
                    : "3px 3px 8px rgba(0,0,0,0.4), -2px -2px 6px rgba(255,255,255,0.02)",
                  border: selected === name ? "2px solid #fff" : "2px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="p-2 flex flex-col gap-1.5">
                  <div className="h-1.5 rounded w-1/3" style={{ backgroundColor: name === "Light" ? "#ccc" : "rgba(255,255,255,0.15)" }} />
                  <div className="h-1.5 rounded w-2/3" style={{ backgroundColor: name === "Light" ? "#ccc" : "rgba(255,255,255,0.08)" }} />
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className="w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ border: selected === name ? "2px solid #fff" : "2px solid #444" }}
                >
                  {selected === name && <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <span className="text-white text-sm">{name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Font size */}
      <div>
        <p className="text-white text-sm font-medium mb-3">Interface Font Size</p>
        <div
          className="inline-flex rounded-lg p-1"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          {["Small", "Medium", "Large", "X-Large"].map((s) => (
            <button
              key={s}
              onClick={() => setFontSize(s)}
              className="px-4 py-1.5 rounded-md text-sm transition-all"
              style={{
                color: fontSize === s ? "#fff" : "#555",
                backgroundColor: fontSize === s ? "rgba(255,255,255,0.1)" : "transparent",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <ToggleRow label="Reduce Motion" sub="Disables animations and transitions" />
        <Divider />
        <ToggleRow label="Keep sidebar expanded by default" />
      </div>
      <SaveBtn />
    </div>
  );
}

function NotificationRow({ label }: { label: string }) {
  const [email, setEmail] = useState(true);
  const [inApp, setInApp] = useState(true);
  return (
    <div
      className="grid grid-cols-3 gap-4 items-center py-3"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
    >
      <span className="text-white text-sm">{label}</span>
      <div className="flex justify-center">
        <Toggle active={email} onToggle={() => setEmail((v) => !v)} />
      </div>
      <div className="flex justify-center">
        <Toggle active={inApp} onToggle={() => setInApp((v) => !v)} />
      </div>
    </div>
  );
}

function NotificationsPane() {
  const events = [
    "Upload complete",
    "Processing done",
    "Share received",
    "Failed processing",
  ];

  return (
    <div>
      <SectionTitle title="Notifications" desc="Choose which events trigger notifications." />
      <div>
        <div className="grid grid-cols-3 gap-4 mb-3 text-[#555] uppercase tracking-widest" style={{ fontSize: "11px" }}>
          <div>Event</div>
          <div className="text-center">Email</div>
          <div className="text-center">In-App</div>
        </div>
        <div className="space-y-0">
          {events.map((ev) => <NotificationRow key={ev} label={ev} />)}
        </div>
      </div>
      <SaveBtn />
    </div>
  );
}

function AIPreferencesPane() {
  const [summaryLength, setSummaryLength] = useState("Medium");
  const [autoRun, setAutoRun] = useState(true);
  const [modules, setModules] = useState({
    Transcription: true, Summary: true, Keywords: true,
    "Object Detection": false, "Face Detection": false, "Event Detection": false,
  });

  return (
    <div className="space-y-6">
      <SectionTitle title="AI Preferences" desc="Configure how AI processes your media." />
      <div>
        <label className="block text-[#888] uppercase tracking-widest mb-2" style={{ fontSize: "11px" }}>Default Transcript Language</label>
        <select
          className="neu-input w-full rounded-[10px] px-4 py-3 text-sm appearance-none outline-none"
          style={{ border: "1px solid var(--color-border-subtle)", color: "var(--color-text-primary)" }}
        >
          {["Auto-detect", "English", "Spanish", "French", "German"].map((l) => (
            <option key={l} value={l} style={{ backgroundColor: "#1a1a1a" }}>{l}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="block text-[#888] uppercase tracking-widest mb-2" style={{ fontSize: "11px" }}>Default Summary Length</label>
        <div className="flex gap-3">
          {["Short", "Medium", "Detailed"].map((s) => (
            <button
              key={s}
              onClick={() => setSummaryLength(s)}
              className="flex-1 h-10 rounded-[10px] text-sm font-medium transition-all"
              style={{
                backgroundColor: summaryLength === s ? "var(--color-brand)" : "transparent",
                color: summaryLength === s ? "#fff" : "var(--color-text-muted)",
                border: summaryLength === s
                  ? "1px solid var(--color-brand)"
                  : "1px solid var(--color-border-subtle)",
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between py-2">
        <div>
          <p className="text-white text-sm">Auto-run on new uploads</p>
          <p className="text-[#888] mt-0.5" style={{ fontSize: "12px" }}>Automatically process files when uploaded</p>
        </div>
        <Toggle active={autoRun} onToggle={() => setAutoRun((v) => !v)} />
      </div>
      <Divider />
      <p className="text-[#888] uppercase tracking-widest mb-3" style={{ fontSize: "11px" }}>Per-Module Defaults</p>
      <div className="space-y-3">
        {Object.entries(modules).map(([key, val]) => (
          <div key={key} className="flex items-center justify-between py-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
            <span className="text-white text-sm">{key}</span>
            <Toggle active={val} onToggle={() => setModules((m) => ({ ...m, [key]: !m[key as keyof typeof m] }))} />
          </div>
        ))}
      </div>
      <SaveBtn />
    </div>
  );
}

function StoragePane() {
  const segments = [
    { label: "Video", pct: 62 },
    { label: "Audio", pct: 8 },
    { label: "Documents", pct: 30 },
  ];

  return (
    <div className="space-y-6">
      <SectionTitle title="Storage" desc="Monitor and manage your storage usage." />
      <div>
        <div className="flex items-end gap-3 mb-3">
          <span className="text-white" style={{ fontSize: "32px", fontWeight: 600 }}>2.4 TB</span>
          <span className="text-[#555] mb-1.5 text-sm">/ 5 TB used</span>
        </div>
        {/* Segmented bar */}
        <div
          className="w-full h-3 rounded-full overflow-hidden flex"
          style={{
            backgroundColor: "rgba(255,255,255,0.06)",
            boxShadow: "inset 3px 3px 7px rgba(0,0,0,0.4), inset -2px -2px 5px rgba(255,255,255,0.02)",
          }}
        >
          <div className="h-full" style={{ width: "30%", backgroundColor: "var(--color-brand)" }} />
          <div className="h-full" style={{ width: "4%", backgroundColor: "var(--color-accent-ok)" }} />
          <div className="h-full" style={{ width: "14%", backgroundColor: "rgba(4,51,191,0.3)" }} />
        </div>
        <div className="flex gap-5 mt-2">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center gap-1.5" style={{ fontSize: "12px" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-white" />
              <span className="text-[#888]">{s.label} {s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <Divider />
      <p className="text-white text-sm font-medium mb-3">Connected Cloud Drives</p>
      {[
        { name: "Google Drive", connected: true },
        { name: "Dropbox", connected: false },
        { name: "OneDrive", connected: false },
      ].map((drive) => (
        <div key={drive.name} className="flex items-center justify-between py-3" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <span className="text-white text-sm">{drive.name}</span>
          <button
            className="h-8 px-4 rounded-[8px] text-sm transition-all hover:bg-white/5 active:scale-[0.97]"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: drive.connected ? "#888" : "#fff" }}
          >
            {drive.connected ? "Disconnect" : "Connect"}
          </button>
        </div>
      ))}
      <div className="pt-4">
        <button
          className="h-9 px-4 rounded-[8px] text-[#888] hover:text-white text-sm transition-all hover:bg-white/5"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          Clear processed cache
        </button>
      </div>
    </div>
  );
}

function APIAccessPane() {
  return (
    <div className="space-y-6">
      <SectionTitle title="API Access" desc="Manage API keys for programmatic access." />
      {[
        { name: "Production Key", usage: "4,201 requests" },
        { name: "Staging Key", usage: "812 requests" },
      ].map((key) => (
        <div
          key={key.name}
          className="p-4 rounded-xl"
          style={{ backgroundColor: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm font-medium">{key.name}</span>
            <button className="text-[#555] hover:text-white transition-colors" style={{ fontSize: "12px" }}>Revoke</button>
          </div>
          <div className="flex items-center gap-2 mb-3">
            <code className="text-[#555] font-mono flex-1 truncate" style={{ fontSize: "12px" }}>
              mv_••••••••••••••••••••••••••••••
            </code>
            <button className="text-[#888] hover:text-white transition-colors" style={{ fontSize: "12px" }}>Copy</button>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(255,255,255,0.08)" }}>
              <div className="h-full bg-white" style={{ width: "42%" }} />
            </div>
            <span className="text-[#555] shrink-0" style={{ fontSize: "11px" }}>{key.usage}</span>
          </div>
        </div>
      ))}
      <button
        className="h-9 px-4 rounded-[8px] text-white text-sm transition-all hover:bg-white/5 active:scale-[0.97]"
        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
      >
        Generate new key
      </button>
    </div>
  );
}

function TeamPane() {
  return (
    <div className="space-y-6">
      <SectionTitle title="Team & Sharing" desc="Manage team members and access levels." />
      <div className="space-y-1">
        {[
          { name: "Jordan Doe", email: "jordan@company.com", role: "Owner", initials: "JD" },
          { name: "Sarah Chen", email: "sarah@company.com", role: "Editor", initials: "SC" },
          { name: "Marcus Webb", email: "marcus@company.com", role: "Viewer", initials: "MW" },
        ].map((member) => (
          <div
            key={member.email}
            className="flex items-center gap-3 py-3"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
          >
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
              {member.initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm">{member.name}</p>
              <p className="text-[#555]" style={{ fontSize: "12px" }}>{member.email}</p>
            </div>
            <select
              defaultValue={member.role}
              className="text-sm text-white rounded-lg px-2 py-1.5 appearance-none outline-none"
              style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
              disabled={member.role === "Owner"}
            >
              {["Owner", "Editor", "Viewer"].map((r) => (
                <option key={r} value={r} style={{ backgroundColor: "#1a1a1a" }}>{r}</option>
              ))}
            </select>
            {member.role !== "Owner" && (
              <button className="text-[#444] hover:text-white transition-colors ml-2" style={{ fontSize: "12px" }}>Remove</button>
            )}
          </div>
        ))}
      </div>
      <Divider />
      <p className="text-white text-sm font-medium mb-3">Invite Member</p>
      <div className="flex gap-3">
        <input
          type="email"
          placeholder="colleague@company.com"
          className="neu-input flex-1 rounded-[10px] px-4 py-3 text-sm bg-transparent outline-none"
          style={{
            border: "1px solid var(--color-border-subtle)",
            color: "var(--color-text-primary)",
          }}
        />
        <button
          className="h-11 px-5 rounded-[10px] font-medium text-sm transition-all active:scale-[0.97] hover:brightness-110"
          style={{ backgroundColor: "var(--color-brand)", color: "#fff" }}
        >
          Send Invite
        </button>
      </div>
    </div>
  );
}

function PlaceholderPane({ title, desc }: { title: string; desc: string }) {
  return (
    <div>
      <SectionTitle title={title} desc={desc} />
      <div
        className="glass-card flex flex-col items-center justify-center rounded-xl py-16"
      >
        <p className="text-sm" style={{ color: "var(--color-text-dim)" }}>Content coming soon</p>
      </div>
    </div>
  );
}

export function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  const PANES: Record<string, React.ReactNode> = {
    profile: <ProfilePane />,
    appearance: <AppearancePane />,
    notifications: <NotificationsPane />,
    ai: <AIPreferencesPane />,
    storage: <StoragePane />,
    api: <APIAccessPane />,
    team: <TeamPane />,
    integrations: <PlaceholderPane title="Integrations" desc="Connect MediaVault with external tools and services." />,
    billing: <PlaceholderPane title="Billing" desc="Manage your subscription and payment methods." />,
    privacy: <PlaceholderPane title="Data & Privacy" desc="Control your data, exports, and deletion options." />,
  };

  return (
    <div className="flex h-full" style={{ backgroundColor: "var(--color-bg-base)" }}>
      {/* Left nav */}
      <aside
        className="w-[220px] shrink-0 py-6"
        style={{
          backgroundColor: "var(--color-bg-surface)",
          boxShadow: "3px 0 12px rgba(0,0,0,0.3)",
          borderRight: "1px solid var(--color-border-subtle)",
        }}
      >
        <nav className="flex flex-col gap-0.5 px-3">
          {NAV_ITEMS.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className="flex items-center gap-3 px-3 h-11 rounded-md text-sm font-medium transition-all text-left"
                style={{
                  color: isActive ? "var(--color-brand)" : "var(--color-text-dim)",
                  backgroundColor: isActive ? "var(--color-brand-glow-sm)" : "transparent",
                  borderLeft: isActive ? "2px solid var(--color-brand)" : "2px solid transparent",
                  paddingLeft: isActive ? "10px" : undefined,
                }}
              >
                <item.icon className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Content pane */}
      <main className="flex-1 overflow-auto py-10 px-10">
        <div className="max-w-2xl">
          {PANES[activeTab]}
        </div>
      </main>
    </div>
  );
}
