"use client";
import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) { setError(error.message); setLoading(false); return; }
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex items-center gap-3 justify-center mb-10">
          <div className="w-9 h-9 rounded-full border-2 border-[#00d4b8] relative">
            <div className="w-2.5 h-2.5 rounded-full bg-[#00d4b8] absolute -top-1 -right-1" />
          </div>
          <span className="font-bold text-xl">Tasti</span>
        </div>

        <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-8">
          <h1 className="text-xl font-bold mb-1">Welcome back</h1>
          <p className="text-sm text-[#737373] mb-7">Sign in to your restaurant dashboard</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs text-[#a3a3a3] font-medium block mb-1.5">Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@restaurant.com" required
                className="w-full bg-[#1c1c1c] border border-[#2a2a2a] text-white placeholder-[#737373] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00d4b8] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-[#a3a3a3] font-medium block mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••" required
                  className="w-full bg-[#1c1c1c] border border-[#2a2a2a] text-white placeholder-[#737373] rounded-xl px-4 py-3 pr-11 text-sm outline-none focus:border-[#00d4b8] transition-colors"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-white">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <a href="#" className="text-xs text-[#737373] hover:text-[#00d4b8] transition-colors">Forgot password?</a>
              </div>
            </div>
            {error && <div className="text-xs text-red-400 bg-red-400/10 border border-red-400/20 rounded-xl px-4 py-3">{error}</div>}
            <button type="submit" disabled={loading}
              className="w-full bg-[#00d4b8] text-black font-semibold py-3 rounded-xl hover:bg-[#00b89f] transition-colors flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed">
              {loading ? <><Loader2 size={16} className="animate-spin" />Signing in...</> : "Sign in"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#2a2a2a] text-center text-xs text-[#737373]">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#00d4b8] font-medium hover:underline">Sign up</Link>
          </div>
        </div>

        <p className="text-center text-xs text-[#404040] mt-6">
          © 2026 Tasti.io · AI Growth Platform for Restaurants
        </p>
      </div>
    </div>
  );
}
