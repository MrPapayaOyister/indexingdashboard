import { useState } from "react";
import { useNavigate } from "react-router";
import { Eye, EyeOff } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center relative overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-base)" }}
    >
      {/* Radial brand glow blob behind card */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -10%)",
          background: "radial-gradient(ellipse 600px 400px at 50% 60%, rgba(4,51,191,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />

      {/* Card */}
      <div
        className="glass-card relative z-10 w-full flex flex-col items-center px-8 py-10"
        style={{ maxWidth: "400px" }}
      >
        {/* Logo */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{
            backgroundColor: "var(--color-brand)",
            boxShadow: "0 0 24px var(--color-brand-glow)",
          }}
        >
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "22px", letterSpacing: "1px" }}>
            MV
          </span>
        </div>

        <p
          className="mb-1 text-center"
          style={{ color: "var(--color-text-primary)", fontSize: "20px", fontWeight: 600 }}
        >
          MediaVault
        </p>
        <p className="mb-8 text-center" style={{ color: "var(--color-text-muted)", fontSize: "14px" }}>
          Index everything. Find anything.
        </p>

        {/* Email input */}
        <div className="w-full mb-4">
          <NeuInput
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password input */}
        <div className="w-full mb-6 relative">
          <NeuInput
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword((p) => !p)}
            className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
            style={{ color: "var(--color-text-dim)" }}
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" strokeWidth={1.5} />
            ) : (
              <Eye className="w-4 h-4" strokeWidth={1.5} />
            )}
          </button>
        </div>

        {/* Sign In button */}
        <button
          onClick={() => navigate("/home")}
          className="w-full h-11 rounded-[10px] font-medium text-sm transition-all active:scale-[0.97] hover:brightness-110"
          style={{
            backgroundColor: "var(--color-brand)",
            color: "#fff",
          }}
        >
          Sign In
        </button>

        <button
          className="mt-4 transition-colors hover:text-white"
          style={{ fontSize: "12px", color: "var(--color-text-muted)" }}
        >
          Forgot password?
        </button>

        <p className="mt-8" style={{ fontSize: "11px", color: "var(--color-text-dim)" }}>
          Powered by MediaVault Intelligence Platform
        </p>
      </div>
    </div>
  );
}

function NeuInput({
  type,
  placeholder,
  value,
  onChange,
}: {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="neu-input w-full h-11 px-4 text-sm transition-all outline-none"
      style={{
        border: "1px solid var(--color-border-subtle)",
      }}
      placeholder-style={{ color: "var(--color-text-dim)" }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "var(--color-brand)";
        e.currentTarget.style.boxShadow = "var(--shadow-brand-glow)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "var(--color-border-subtle)";
        e.currentTarget.style.boxShadow = "var(--shadow-neu)";
      }}
    />
  );
}
