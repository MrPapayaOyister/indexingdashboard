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
      className="min-h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: "#1A1A1A" }}
    >
      <div className="flex flex-col items-center w-full max-w-[360px] px-6">
        {/* MV monogram in neumorphic raised circle */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{
            backgroundColor: "#1A1A1A",
            boxShadow: "6px 6px 16px rgba(0,0,0,0.55), -4px -4px 10px rgba(255,255,255,0.03)",
          }}
        >
          <span className="text-white font-bold" style={{ fontSize: "22px", letterSpacing: "1px" }}>
            MV
          </span>
        </div>

        <p className="text-white mb-10" style={{ fontSize: "20px", fontWeight: 500 }}>
          MediaVault
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
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#444] hover:text-white transition-colors"
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
          className="w-full h-11 rounded-[10px] bg-white text-black font-medium text-sm transition-all active:scale-[0.97] hover:bg-white/90"
        >
          Sign In
        </button>

        <button className="mt-4 text-[#888] transition-colors hover:text-white" style={{ fontSize: "12px" }}>
          Forgot password?
        </button>
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
      className="w-full h-11 rounded-[10px] px-4 text-sm text-white placeholder:text-[#555] bg-transparent transition-all outline-none focus:border-white/40"
      style={{
        backgroundColor: "#161616",
        boxShadow: "inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.025)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.4)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
      }}
    />
  );
}
