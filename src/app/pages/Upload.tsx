import { useNavigate } from "react-router";
import { Video, Mic, FileText } from "lucide-react";
import { useState } from "react";

const UPLOAD_TYPES = [
  {
    icon: Video,
    label: "Video",
    formats: "MP4, MOV, AVI, MKV",
    type: "video",
  },
  {
    icon: Mic,
    label: "Audio",
    formats: "MP3, WAV, AAC, FLAC",
    type: "audio",
  },
  {
    icon: FileText,
    label: "Document",
    formats: "PDF, DOCX, TXT, PPTX",
    type: "document",
  },
];

export function Upload() {
  const navigate = useNavigate();
  const [pressing, setPressing] = useState<string | null>(null);

  const handleSelect = (type: string) => {
    navigate(`/upload/detail?type=${type}`);
  };

  return (
    <div
      className="flex flex-col h-full items-center justify-center"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <h1 className="text-white mb-2" style={{ fontSize: "26px", fontWeight: 700 }}>
        What are you uploading?
      </h1>
      <p className="text-[#888] mb-10" style={{ fontSize: "14px" }}>
        Details can be added on the next step.
      </p>

      <div className="flex gap-6">
        {UPLOAD_TYPES.map(({ icon: Icon, label, formats, type }) => (
          <button
            key={type}
            onClick={() => handleSelect(type)}
            onMouseDown={() => setPressing(type)}
            onMouseUp={() => setPressing(null)}
            onMouseLeave={() => setPressing(null)}
            className="flex flex-col items-center justify-center gap-4 rounded-xl transition-all"
            style={{
              width: "240px",
              height: "180px",
              backgroundColor: "#1A1A1A",
              boxShadow:
                pressing === type
                  ? "inset 3px 3px 8px rgba(0,0,0,0.5), inset -2px -2px 6px rgba(255,255,255,0.02)"
                  : "6px 6px 16px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.07)",
              transform: pressing === type ? "scale(0.98)" : "scale(1)",
            }}
          >
            <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
            <div>
              <p className="text-white text-center mb-1" style={{ fontSize: "17px", fontWeight: 500 }}>
                {label}
              </p>
              <p className="text-[#555] text-center" style={{ fontSize: "12px" }}>
                {formats}
              </p>
            </div>
          </button>
        ))}
      </div>

      <button className="mt-8 text-[#888] hover:text-white transition-colors underline underline-offset-2" style={{ fontSize: "13px" }}>
        Or import from a URL
      </button>
    </div>
  );
}
