"use client";
import { useState } from "react";
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingBag,
  Users, Target, ArrowUpRight, ArrowDownRight,
  Sparkles, AlertCircle, CheckCircle2, Clock, ChefHat
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from "recharts";
import { cn, formatCurrency, formatPercent } from "@/lib/utils";

// --- Mock Data ---
const revenueData = [
  { day: "Mon", revenue: 3200, orders: 87 },
  { day: "Tue", revenue: 2800, orders: 72 },
  { day: "Wed", revenue: 4100, orders: 105 },
  { day: "Thu", revenue: 3600, orders: 94 },
  { day: "Fri", revenue: 5200, orders: 138 },
  { day: "Sat", revenue: 6800, orders: 175 },
  { day: "Sun", revenue: 5900, orders: 152 },
];

const topItems = [
  { name: "Chicken Bowl", revenue: 4280, orders: 214, margin: 68, trend: "up" },
  { name: "Margherita Pizza", revenue: 3640, orders: 182, margin: 72, trend: "up" },
  { name: "Caesar Salad", revenue: 2100, orders: 140, margin: 81, trend: "down" },
  { name: "Pasta Carbonara", revenue: 1980, orders: 99, margin: 64, trend: "up" },
  { name: "Beef Burger", revenue: 1760, orders: 88, margin: 59, trend: "down" },
];

const aiRecs = [
  { type: "price", priority: "high", title: "Raise Chicken Bowl price by 8%", desc: "Demand is stable at 214 orders/week. Margin is 68% — room to grow.", impact: 340 },
  { type: "menu", priority: "medium", title: "Add Weekend Brunch Menu", desc: "Saturday traffic is 2.1x weekdays. Brunch items average 78% margin.", impact: 1200 },
  { type: "marketing", priority: "high", title: "Launch Friday Happy Hour campaign", desc: "Slow period 4–6pm. A targeted ad could add 15-20 covers.", impact: 580 },
];

const stats = [
  { label: "Revenue (Week)", value: formatCurrency(31600), change: 12.4, icon: DollarSign, color: "teal" },
  { label: "Total Orders", value: "823", change: 8.1, icon: ShoppingBag, color: "blue" },
  { label: "Avg Order Value", value: formatCurrency(38.40), change: 3.9, icon: Target, color: "purple" },
  { label: "Marketing ROI", value: "4.2x", change: -0.8, icon: TrendingUp, color: "orange" },
];

// --- Components ---
function StatCard({ label, value, change, icon: Icon, color }: typeof stats[0]) {
  const isUp = change >= 0;
  const colorMap: Record<string, string> = {
    teal: "from-[#00d4b8]/10 to-transparent border-[#00d4b8]/20 text-[#00d4b8]",
    blue: "from-blue-500/10 to-transparent border-blue-500/20 text-blue-400",
    purple: "from-purple-500/10 to-transparent border-purple-500/20 text-purple-400",
    orange: "from-orange-500/10 to-transparent border-orange-500/20 text-orange-400",
  };
  return (
    <div className="tasti-card p-5 bg-gradient-to-br from-[#1c1c1c] to-[#161616]">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("w-10 h-10 rounded-xl bg-gradient-to-br border flex items-center justify-center", colorMap[color])}>
          <Icon size={18} />
        </div>
        <span className={cn("flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg",
          isUp ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400")}>
          {isUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {formatPercent(Math.abs(change), false)}
        </span>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-xs text-[#737373]">{label}</div>
    </div>
  );
}

function AIRecommendation({ rec }: { rec: typeof aiRecs[0] }) {
  const priorityColor = rec.priority === "high" ? "border-[#00d4b8]/30 bg-[#00d4b8]/5" : "border-[#2a2a2a] bg-[#1c1c1c]";
  return (
    <div className={cn("rounded-xl border p-4 transition-all hover:border-[#00d4b8]/40", priorityColor)}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#00d4b8]/10 border border-[#00d4b8]/20 flex items-center justify-center shrink-0 mt-0.5">
          <Sparkles size={14} className="text-[#00d4b8]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-white">{rec.title}</span>
            {rec.priority === "high" && (
              <span className="text-[10px] bg-[#00d4b8]/10 text-[#00d4b8] border border-[#00d4b8]/20 px-1.5 py-0.5 rounded-full font-medium">HIGH</span>
            )}
          </div>
          <p className="text-xs text-[#737373] leading-relaxed mb-3">{rec.desc}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#a3a3a3]">
              Est. impact: <span className="text-green-400 font-semibold">+{formatCurrency(rec.impact)}/mo</span>
            </span>
            <div className="flex gap-2">
              <button className="text-xs text-[#737373] hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-[#2a2a2a]">Dismiss</button>
              <button className="text-xs bg-[#00d4b8] text-black font-semibold px-3 py-1 rounded-lg hover:bg-[#00b89f] transition-colors">Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-3 shadow-xl">
        <p className="text-xs text-[#737373] mb-1">{label}</p>
        <p className="text-sm font-bold text-white">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

// --- Main Dashboard ---
export default function GrowthDashboard() {
  const [period, setPeriod] = useState<"day" | "week" | "month">("week");

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Growth Dashboard</h1>
          <p className="text-sm text-[#737373] mt-0.5">Tuesday, April 7 · My Restaurant · New York</p>
        </div>
        <div className="flex items-center gap-2 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-1">
          {(["day", "week", "month"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn("px-4 py-1.5 rounded-lg text-sm font-medium transition-all capitalize",
                period === p ? "bg-[#00d4b8] text-black" : "text-[#737373] hover:text-white"
              )}
            >{p}</button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {stats.map((s) => <StatCard key={s.label} {...s} />)}
      </div>

      {/* Revenue Chart + AI Recs */}
      <div className="grid grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <div className="col-span-2 tasti-card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="font-semibold text-white">Revenue Overview</h2>
              <p className="text-xs text-[#737373] mt-0.5">This week vs last week</p>
            </div>
            <div className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-3 py-1.5 rounded-lg font-medium">
              <TrendingUp size={13} />
              +12.4% vs last week
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00d4b8" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#00d4b8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
              <XAxis dataKey="day" tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#737373", fontSize: 12 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" stroke="#00d4b8" strokeWidth={2} fill="url(#tealGrad)" dot={false} activeDot={{ r: 4, fill: "#00d4b8", stroke: "#0a0a0a", strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* AI Recommendations */}
        <div className="tasti-card p-5 flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-[#00d4b8]/10 border border-[#00d4b8]/20 flex items-center justify-center">
              <Sparkles size={14} className="text-[#00d4b8]" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-sm">AI Recommendations</h2>
              <p className="text-[11px] text-[#737373]">3 actions ready</p>
            </div>
          </div>
          <div className="space-y-3 flex-1 overflow-y-auto">
            {aiRecs.map((rec, i) => <AIRecommendation key={i} rec={rec} />)}
          </div>
        </div>
      </div>

      {/* Top Menu Items + Orders by Source */}
      <div className="grid grid-cols-3 gap-4">
        {/* Top Items */}
        <div className="col-span-2 tasti-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-white">Top Menu Items</h2>
            <button className="text-xs text-[#00d4b8] hover:underline">View all</button>
          </div>
          <div className="space-y-0">
            <div className="grid grid-cols-5 text-[11px] text-[#737373] pb-2 border-b border-[#2a2a2a] mb-2 font-medium uppercase tracking-wide">
              <span className="col-span-2">Item</span>
              <span className="text-right">Revenue</span>
              <span className="text-right">Margin</span>
              <span className="text-right">Trend</span>
            </div>
            {topItems.map((item, i) => (
              <div key={i} className="grid grid-cols-5 items-center py-2.5 border-b border-[#1a1a1a] last:border-0 hover:bg-[#1a1a1a] rounded-lg px-1 -mx-1 transition-colors group">
                <div className="col-span-2 flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-[#2a2a2a] flex items-center justify-center shrink-0">
                    <ChefHat size={13} className="text-[#737373]" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-white">{item.name}</div>
                    <div className="text-[11px] text-[#737373]">{item.orders} orders</div>
                  </div>
                </div>
                <div className="text-right text-sm font-semibold text-white">{formatCurrency(item.revenue)}</div>
                <div className="text-right">
                  <span className={cn("text-xs font-medium",
                    item.margin >= 70 ? "text-green-400" : item.margin >= 60 ? "text-yellow-400" : "text-red-400"
                  )}>{item.margin}%</span>
                </div>
                <div className="flex justify-end">
                  {item.trend === "up"
                    ? <span className="flex items-center gap-0.5 text-xs text-green-400"><TrendingUp size={13} />Up</span>
                    : <span className="flex items-center gap-0.5 text-xs text-red-400"><TrendingDown size={13} />Down</span>
                  }
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders by Source */}
        <div className="tasti-card p-5">
          <h2 className="font-semibold text-white mb-4">Orders by Source</h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={[
              { source: "Walk-in", count: 312 },
              { source: "Online", count: 218 },
              { source: "Phone", count: 94 },
              { source: "Delivery", count: 199 },
            ]} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
              <XAxis dataKey="source" tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#737373", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: "#1c1c1c", border: "1px solid #2a2a2a", borderRadius: "12px" }} />
              <Bar dataKey="count" fill="#00d4b8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {[
              { label: "Walk-in", pct: 38, color: "#00d4b8" },
              { label: "Delivery", pct: 24, color: "#3b82f6" },
              { label: "Online", pct: 26, color: "#8b5cf6" },
              { label: "Phone", pct: 11, color: "#f59e0b" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: s.color }} />
                <span className="text-[#a3a3a3] flex-1">{s.label}</span>
                <span className="text-white font-medium">{s.pct}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
