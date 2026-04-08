"use client";
import { useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { TrendingUp, DollarSign, Eye, MousePointer, Plus, Play, Pause, Edit3, Instagram, Facebook, Target, Zap, Calendar, Image } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

const campaigns = [
  { name: "Friday Dinner Push", platform: "meta", status: "active", budget: 500, spent: 312, impressions: 28400, clicks: 847, conversions: 43, revenue: 2150, roi: 589 },
  { name: "Chicken Bowl Special", platform: "instagram", status: "active", budget: 200, spent: 178, impressions: 15200, clicks: 634, conversions: 28, revenue: 980, roi: 451 },
  { name: "Lunch Hour Campaign", platform: "google", status: "paused", budget: 300, spent: 145, impressions: 8900, clicks: 312, conversions: 18, revenue: 620, roi: 327 },
  { name: "Weekend Brunch Promo", platform: "meta", status: "draft", budget: 400, spent: 0, impressions: 0, clicks: 0, conversions: 0, revenue: 0, roi: 0 },
];

const performanceData = [
  { day: "Mon", spend: 45, revenue: 280 },
  { day: "Tue", spend: 38, revenue: 190 },
  { day: "Wed", spend: 62, revenue: 410 },
  { day: "Thu", spend: 55, revenue: 360 },
  { day: "Fri", spend: 95, revenue: 780 },
  { day: "Sat", spend: 120, revenue: 950 },
  { day: "Sun", spend: 80, revenue: 610 },
];

const posts = [
  { caption: "Your Friday just got better 🍗✨ Our Chicken Bowl is calling your name.", platform: "instagram", status: "scheduled", scheduledAt: "Today, 11:30am", likes: 0, reach: 0, aiGenerated: true },
  { caption: "Weekend brunch is HERE 🥑🍳 New menu dropping Saturday. Come hungry.", platform: "instagram", status: "published", scheduledAt: "Yesterday, 12:00pm", likes: 234, reach: 4200, aiGenerated: true },
  { caption: "Happy hour Mon-Fri 4-6pm. Half-price appetizers. You're welcome 🍹", platform: "facebook", status: "published", scheduledAt: "2 days ago", likes: 87, reach: 2100, aiGenerated: false },
];

const platformIcon: Record<string, React.ReactNode> = {
  meta: <Facebook size={13} />,
  instagram: <Instagram size={13} />,
  google: <Target size={13} />,
};
const platformColor: Record<string, string> = {
  meta: "text-blue-400 bg-blue-400/10",
  instagram: "text-pink-400 bg-pink-400/10",
  google: "text-yellow-400 bg-yellow-400/10",
};
const statusColor: Record<string, string> = {
  active: "text-green-400 bg-green-400/10",
  paused: "text-yellow-400 bg-yellow-400/10",
  draft: "text-[#737373] bg-[#2a2a2a]",
};

export default function MarketingDashboard() {
  const [tab, setTab] = useState<"campaigns" | "content">("campaigns");

  const totalSpend = campaigns.reduce((s, c) => s + c.spent, 0);
  const totalRevenue = campaigns.reduce((s, c) => s + c.revenue, 0);
  const totalImpressions = campaigns.reduce((s, c) => s + c.impressions, 0);
  const avgROI = totalSpend > 0 ? ((totalRevenue / totalSpend)).toFixed(1) : "0";

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Marketing</h1>
          <p className="text-sm text-[#737373] mt-0.5">Campaigns, content & performance</p>
        </div>
        <button className="flex items-center gap-2 bg-[#00d4b8] text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#00b89f] transition-colors">
          <Plus size={16} />New Campaign
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Ad Spend", value: formatCurrency(totalSpend), icon: DollarSign, color: "text-orange-400 bg-orange-400/10" },
          { label: "Attributed Revenue", value: formatCurrency(totalRevenue), icon: TrendingUp, color: "text-green-400 bg-green-400/10" },
          { label: "Total Impressions", value: totalImpressions.toLocaleString(), icon: Eye, color: "text-blue-400 bg-blue-400/10" },
          { label: "Overall ROAS", value: `${avgROI}x`, icon: Zap, color: "text-[#00d4b8] bg-[#00d4b8]/10" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3 border", color, "border-current/20")}><Icon size={17} /></div>
            <div className="text-xl font-bold">{value}</div>
            <div className="text-xs text-[#737373] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div><div className="font-semibold">Ad Spend vs Revenue</div><div className="text-xs text-[#737373] mt-0.5">This week</div></div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#00d4b8]" /><span className="text-[#737373]">Revenue</span></div>
            <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-purple-500" /><span className="text-[#737373]">Spend</span></div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <AreaChart data={performanceData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#00d4b8" stopOpacity={0.3} /><stop offset="100%" stopColor="#00d4b8" stopOpacity={0} /></linearGradient>
              <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.3} /><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
            <XAxis dataKey="day" tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={v => `$${v}`} />
            <Tooltip contentStyle={{ background: "#1c1c1c", border: "1px solid #2a2a2a", borderRadius: "12px", color: "#fff" }} />
            <Area type="monotone" dataKey="revenue" stroke="#00d4b8" strokeWidth={2} fill="url(#revGrad)" dot={false} />
            <Area type="monotone" dataKey="spend" stroke="#8b5cf6" strokeWidth={2} fill="url(#spendGrad)" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-1 w-fit">
        {(["campaigns", "content"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)} className={cn("px-5 py-2 rounded-lg text-sm font-medium capitalize transition-all", tab === t ? "bg-[#00d4b8] text-black" : "text-[#737373] hover:text-white")}>{t}</button>
        ))}
      </div>

      {tab === "campaigns" ? (
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-8 text-[11px] text-[#737373] font-medium uppercase tracking-wide px-5 py-3 border-b border-[#2a2a2a]">
            <span className="col-span-2">Campaign</span>
            <span>Platform</span>
            <span>Status</span>
            <span className="text-right">Spent</span>
            <span className="text-right">Revenue</span>
            <span className="text-right">ROAS</span>
            <span className="text-right">Actions</span>
          </div>
          {campaigns.map((c, i) => (
            <div key={i} className="grid grid-cols-8 items-center px-5 py-4 border-b border-[#1a1a1a] last:border-0 hover:bg-[#222] transition-colors">
              <div className="col-span-2">
                <div className="text-sm font-medium text-white">{c.name}</div>
                <div className="text-xs text-[#737373] mt-0.5">{c.impressions.toLocaleString()} impressions · {c.clicks} clicks</div>
              </div>
              <div><span className={cn("inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-lg font-medium", platformColor[c.platform])}>{platformIcon[c.platform]}{c.platform}</span></div>
              <div><span className={cn("text-xs px-2 py-1 rounded-lg font-medium capitalize", statusColor[c.status])}>{c.status}</span></div>
              <div className="text-right text-sm font-medium">{formatCurrency(c.spent)}</div>
              <div className="text-right text-sm font-medium text-green-400">{c.revenue > 0 ? formatCurrency(c.revenue) : "—"}</div>
              <div className="text-right text-sm font-bold">{c.roi > 0 ? `${(c.revenue / c.spent).toFixed(1)}x` : "—"}</div>
              <div className="flex justify-end gap-2">
                {c.status === "active" ? <button className="p-1.5 rounded-lg bg-[#2a2a2a] hover:bg-[#333] transition-colors"><Pause size={13} className="text-[#a3a3a3]" /></button>
                  : c.status === "paused" ? <button className="p-1.5 rounded-lg bg-[#2a2a2a] hover:bg-[#333] transition-colors"><Play size={13} className="text-[#a3a3a3]" /></button> : null}
                <button className="p-1.5 rounded-lg bg-[#2a2a2a] hover:bg-[#333] transition-colors"><Edit3 size={13} className="text-[#a3a3a3]" /></button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex justify-end">
            <button className="flex items-center gap-2 text-sm text-[#00d4b8] bg-[#00d4b8]/10 border border-[#00d4b8]/20 px-4 py-2 rounded-xl hover:bg-[#00d4b8]/15 transition-colors font-medium">
              <Zap size={14} />Generate with AI
            </button>
          </div>
          {posts.map((p, i) => (
            <div key={i} className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5 flex items-start gap-4 hover:border-[#404040] transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-2xl shrink-0">
                {p.platform === "instagram" ? "📸" : "📘"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium capitalize", p.platform === "instagram" ? "text-pink-400 bg-pink-400/10" : "text-blue-400 bg-blue-400/10")}>{p.platform}</span>
                  <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", p.status === "published" ? "text-green-400 bg-green-400/10" : "text-yellow-400 bg-yellow-400/10")}>{p.status}</span>
                  {p.aiGenerated && <span className="text-xs text-[#00d4b8] bg-[#00d4b8]/10 px-2 py-0.5 rounded-full">✦ AI Generated</span>}
                </div>
                <p className="text-sm text-[#d4d4d4] mb-2">{p.caption}</p>
                <div className="flex items-center gap-4 text-xs text-[#737373]">
                  <span className="flex items-center gap-1"><Calendar size={11} />{p.scheduledAt}</span>
                  {p.likes > 0 && <><span>❤️ {p.likes}</span><span><Eye size={11} className="inline" /> {p.reach.toLocaleString()}</span></>}
                </div>
              </div>
              <button className="text-xs text-[#737373] hover:text-white bg-[#2a2a2a] px-3 py-1.5 rounded-lg transition-colors shrink-0">Edit</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
