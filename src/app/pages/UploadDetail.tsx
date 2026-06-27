import { useState, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { UploadCloud, X, ChevronLeft, Info } from "lucide-react";

const LANGUAGES = ["Auto-detect", "English", "Spanish", "French", "German", "Japanese", "Mandarin", "Portuguese"];

function Toggle({ active, onToggle }: { active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="w-10 h-6 rounded-full p-0.5 transition-colors shrink-0"
      style={{
        backgroundColor: active ? "#FFFFFF" : "rgba(255,255,255,0.1)",
        border: "1px solid " + (active ? "#FFFFFF" : "rgba(255,255,255,0.08)"),
      }}
    >
      <div
        className="w-4 h-4 rounded-full transition-transform"
        style={{
          backgroundColor: active ? "#000" : "#555",
          transform: active ? "translateX(16px)" : "translateX(0)",
        }}
      />
    </button>
  );
}

function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block text-[#888] uppercase tracking-widest mb-1.5" style={{ fontSize: "11px" }}>
      {children}{required && <span className="text-white ml-1">*</span>}
    </label>
  );
}

function NeuInput({
  as = "input",
  rows = 3,
  placeholder,
  value,
  onChange,
}: {
  as?: "input" | "textarea";
  rows?: number;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const shared = {
    placeholder,
    value,
    onChange,
    className: "w-full rounded-[10px] px-4 py-3 text-sm text-white placeholder:text-[#444] bg-transparent transition-all outline-none",
    style: {
      backgroundColor: "#161616",
      boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.025)",
      border: "1px solid rgba(255,255,255,0.06)",
    } as React.CSSProperties,
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
    },
  };
  if (as === "textarea") {
    return <textarea rows={rows} {...(shared as any)} />;
  }
  return <input type="text" {...(shared as any)} />;
}

export function UploadDetail() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "video";
  const fileRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("Auto-detect");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [visibility, setVisibility] = useState<"Private" | "Team" | "Public">("Private");

  const [aiModules, setAiModules] = useState({
    Transcription: true,
    Summary: true,
    Keywords: true,
    "Object Detection": false,
    "Face Detection": false,
    "Event Detection": false,
  });

  const toggleModule = (key: string) => {
    setAiModules((prev) => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleTagKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags((t) => [...t, tagInput.trim()]);
      setTagInput("");
    }
  };

  return (
    <div className="min-h-full p-8 overflow-auto" style={{ backgroundColor: "#1A1A1A" }}>
      {/* Back link */}
      <button
        onClick={() => navigate("/upload")}
        className="flex items-center gap-1 text-[#888] hover:text-white transition-colors mb-8"
        style={{ fontSize: "13px" }}
      >
        <ChevronLeft className="w-4 h-4" strokeWidth={1.5} />
        Back
      </button>

      <div className="grid gap-8 max-w-5xl mx-auto" style={{ gridTemplateColumns: "55% 45%" }}>
        {/* LEFT — Drop Zone */}
        <div
          className="rounded-xl p-6 flex flex-col"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <input ref={fileRef} type="file" className="hidden" onChange={handleFileChange} />

          {!file ? (
            <div
              className="flex-1 flex flex-col items-center justify-center rounded-xl cursor-pointer min-h-[300px] transition-colors hover:bg-white/[0.02]"
              style={{
                border: "2px dashed rgba(255,255,255,0.15)",
                borderRadius: "16px",
              }}
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const f = e.dataTransfer.files?.[0];
                if (f) setFile(f);
              }}
            >
              <UploadCloud className="w-12 h-12 text-white mb-4" strokeWidth={1.5} />
              <p className="text-white mb-2" style={{ fontSize: "18px" }}>Drop your file here</p>
              <p className="text-[#555] mb-3" style={{ fontSize: "14px" }}>or</p>
              <button
                className="text-white underline underline-offset-2 hover:text-white/80 transition-colors"
                style={{ fontSize: "14px" }}
              >
                Browse files
              </button>
            </div>
          ) : (
            <div
              className="flex-1 flex flex-col items-center justify-center rounded-xl min-h-[300px] relative px-8"
              style={{
                border: "2px dashed rgba(255,255,255,0.15)",
                borderRadius: "16px",
              }}
            >
              <button
                onClick={() => setFile(null)}
                className="absolute top-4 right-4 text-[#555] hover:text-white transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <UploadCloud className="w-10 h-10 text-white mb-3" strokeWidth={1.5} />
              <p className="text-white text-sm font-medium mb-1">{file.name}</p>
              <p className="text-[#888] mb-5" style={{ fontSize: "12px" }}>
                {(file.size / (1024 * 1024)).toFixed(1)} MB
              </p>
              <div className="w-full max-w-xs">
                <div
                  className="w-full h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                >
                  <div className="h-full bg-white rounded-full w-[60%]" />
                </div>
              </div>
            </div>
          )}

          {file && (
            <button className="mt-4 text-[#888] hover:text-white transition-colors text-center" style={{ fontSize: "13px" }}>
              + Add another file
            </button>
          )}
        </div>

        {/* RIGHT — Config Form */}
        <div
          className="rounded-xl p-6 flex flex-col gap-5"
          style={{
            backgroundColor: "rgba(255,255,255,0.04)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          {/* Title */}
          <div>
            <Label required>Title</Label>
            <NeuInput placeholder="Enter a title…" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <NeuInput as="textarea" rows={3} placeholder="Optional description…" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>

          {/* Language */}
          <div>
            <Label>Language</Label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-[10px] px-4 py-3 text-sm text-white appearance-none outline-none transition-all"
              style={{
                backgroundColor: "#161616",
                boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {LANGUAGES.map((l) => (
                <option key={l} value={l} style={{ backgroundColor: "#1a1a1a" }}>{l}</option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <Label>Tags</Label>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKey}
              placeholder="Type and press Enter…"
              className="w-full rounded-[10px] px-4 py-3 text-sm text-white placeholder:text-[#444] bg-transparent outline-none"
              style={{
                backgroundColor: "#161616",
                boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            />
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 px-2 py-1 rounded-full text-white"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      fontSize: "12px",
                    }}
                  >
                    {tag}
                    <button onClick={() => setTags((t) => t.filter((_, j) => j !== i))} className="text-[#555] hover:text-white ml-0.5">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

          {/* AI Processing */}
          <div>
            <p className="text-[#555] uppercase tracking-widest mb-3" style={{ fontSize: "11px" }}>
              AI PROCESSING
            </p>
            <div className="space-y-3">
              {Object.entries(aiModules).map(([key, val]) => (
                <div key={key} className="flex items-center justify-between">
                  <span className="text-sm text-white flex items-center gap-2">
                    {key}
                    {key === "Face Detection" && (
                      <span title="Face detection requires subject consent per applicable laws">
                        <Info className="w-3.5 h-3.5 text-[#555]" strokeWidth={1.5} />
                      </span>
                    )}
                  </span>
                  <Toggle active={val} onToggle={() => toggleModule(key)} />
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }} />

          {/* Visibility */}
          <div>
            <Label>Visibility</Label>
            <div className="flex gap-2">
              {(["Private", "Team", "Public"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setVisibility(v)}
                  className="flex-1 h-9 rounded-full text-sm font-medium transition-all"
                  style={{
                    backgroundColor: visibility === v ? "#FFFFFF" : "transparent",
                    color: visibility === v ? "#000" : "#888",
                    border: visibility === v ? "1px solid #fff" : "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {/* Start Upload */}
          <button
            className="w-full h-11 rounded-[10px] bg-white text-black font-medium text-sm transition-all active:scale-[0.97] hover:bg-white/90 mt-2"
          >
            Start Upload
          </button>
          <p className="text-[#333] text-center" style={{ fontSize: "11px" }}>
            Files are encrypted in transit and at rest.
          </p>
        </div>
      </div>
    </div>
  );
}
