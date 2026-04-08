"use client";
import { useState } from "react";
import { AlertTriangle, TrendingUp, TrendingDown, Minus, Package, DollarSign, Sparkles, RefreshCw, Plus, Search } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

const suppliers = ["All Suppliers", "Sysco", "US Foods", "Local Farm", "Direct"];

const inventory = [
  { id: 1, name: "Chicken Breast", category: "Meat", unit: "lb", stock: 45, minStock: 30, cost: 4.20, supplier: "Sysco", trend: "up", trendPct: 8.5, status: "ok", aiAlert: null },
  { id: 2, name: "Roma Tomatoes", category: "Produce", unit: "case", stock: 8, minStock: 10, cost: 18.50, supplier: "Local Farm", trend: "stable", trendPct: 0, status: "low", aiAlert: "⚠️ Below minimum. Reorder now — delivery takes 2 days." },
  { id: 3, name: "Mozzarella Cheese", category: "Dairy", unit: "lb", stock: 22, minStock: 15, cost: 6.80, supplier: "US Foods", trend: "up", trendPct: 12.3, status: "ok", aiAlert: "📈 Price up 12% this month. Consider menu price adjustment." },
  { id: 4, name: "Pasta (Dry)", category: "Dry Goods", unit: "case", stock: 18, minStock: 8, cost: 24.00, supplier: "Sysco", trend: "down", trendPct: -3.2, status: "ok", aiAlert: null },
  { id: 5, name: "Caesar Dressing", category: "Sauces", unit: "gallon", stock: 3, minStock: 5, cost: 12.40, supplier: "Sysco", trend: "stable", trendPct: 0, status: "critical", aiAlert: "🚨 Critical! Only 3 gallons left. Caesar Salad at risk." },
  { id: 6, name: "Ground Beef (80/20)", category: "Meat", unit: "lb", stock: 38, minStock: 20, cost: 5.90, supplier: "US Foods", trend: "up", trendPct: 15.1, status: "ok", aiAlert: "📈 Beef prices +15% — Beef Burger margin now only 44%. Consider price increase." },
  { id: 7, name: "Olive Oil (EVOO)", category: "Oils", unit: "liter", stock: 12, minStock: 6, cost: 8.20, supplier: "Direct", trend: "down", trendPct: -5.0, status: "ok", aiAlert: null },
  { id: 8, name: "Heavy Cream", category: "Dairy", unit: "quart", stock: 6, minStock: 8, cost: 3.40, supplier: "Local Farm", trend: "stable", trendPct: 0, status: "low", aiAlert: "⚠️ Running low. Used in Pasta Carbonara — reorder before weekend." },
];

const statusConfig = {
  ok: { label: "OK", color: "text-green-400 bg-green-400/10" },
  low: { label: "Low", color: "text-yellow-400 bg-yellow-400/10" },
  critical: { label: "Critical", color: "text-red-400 bg-red-400/10" },
};

const trendIcon = (trend: string, pct: number) => {
  if (trend === "up") return <span className="flex items-center gap-1 text-red-400 text-xs"><TrendingUp size={12} />+{pct}%</span>;
  if (trend === "down") return <span className="flex items-center gap-1 text-green-400 text-xs"><TrendingDown size={12} />{pct}%</span>;
  return <span className="flex items-center gap-1 text-[#737373] text-xs"><Minus size={12} />Stable</span>;
};

export default function InventoryPage() {
  const [search, setSearch] = useState("");
  const [supplier, setSupplier] = useState("All Suppliers");

  const alerts = inventory.filter(i => i.aiAlert);
  const filtered = inventory.filter(i =>
    (supplier === "All Suppliers" || i.supplier === supplier) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Inventory</h1>
          <p className="text-sm text-[#737373] mt-0.5">Stock levels, costs & supplier intel</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-sm text-[#737373] bg-[#1c1c1c] border border-[#2a2a2a] px-4 py-2.5 rounded-xl hover:border-[#404040] transition-colors">
            <RefreshCw size={14} />Sync Sysco
          </button>
          <button className="flex items-center gap-2 bg-[#00d4b8] text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bv-[#00b89f] transition-colors">
            <Plus size={16} />Add Item
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total SKUs", value: inventory.length.toString(), icon: Package, color: "text-[#00d4b8] bg-[#00d4b8]/10" },
          { label: "Critical Items", value: inventory.filter(i => i.status === "critical").length.toString(), icon: AlertTriangle, color: "text-red-400 bg-red-400/10" },
          { label: "Low Stock", value: inventory.filter(i => i.status === "low").length.toString(), icon: AlertTriangle, color: "text-yellow-400 bg-yellow-400/10" },
          { label: "Weekly Food Cost", value: "$2,840", icon: DollarSign, color: "text-purple-400 bg-purple-400/10" },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5">
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-3 border border-current/20", color)}><Icon size={17} /></div>
            <div className="text-xl font-bold">{value}</div>
            <div className="text-xs text-[#737373] mt-1">{label}</div>
          </div>
        ))}
      </div>

      {/* AI Alerts */}
      {alerts.length > 0 && (
        <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={15} className="text-[#00d4b8]" />
            <span className="font-semibold text-sm">AI Alerts ({alerts.length})</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {alerts.map(item => (
              <div key={item.id} className={cn("rounded-xl p-3 border text-xs",
                item.status === "critical" ? "bg-red-400/5 border-red-400/20" :
                item.status === "low" ? "bg-yellow-400/5 border-yellow-400/20" :
                "bg-[#00d4b8]/5 border-[#00d4b8]/20")}>
                <div className="font-semibold text-white mb-1">{item.name}</div>
                <div className="text-[#a3a3a3] leading-relaxed">{item.aiAlert}</div>
                <button className="mt-2 text-[#00d4b8] font-medium hover:underline">Take action →</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search inventory..."
            className="w-full bg-[#1c1c1c] border border-[#2a2a2a] text-sm text-white placeholder-[#737373] pl-9 pr-4 py-2.5 rounded-xl outline-none focus:border-[#00d4b8] transition-colors" />
        </div>
        <div className="flex gap-1 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-1">
          {suppliers.map(s => (
            <button key={s} onClick={() => setSupplier(s)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap", supplier === s ? "bg-[#00d4b8] text-black" : "text-[#737373] hover:text-white")}>{s}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-8 text-[11px] text-[#737373] font-medium uppercase tracking-wide px-5 py-3 border-b border-[#2a2a2a]">
          <span className="col-span-2">Item</span>
          <span>Category</span>
          <span className="text-right">Stock</span>
          <span className="text-right">Min</span>
          <span className="text-right">Unit Cost</span>
          <span className="text-right">Price Trend</span>
          <span className="text-center">Status</span>
        </div>
        {filtered.map(item => (
          <div key={item.id}>
            <div className="grid grid-cols-8 items-center px-5 py-3.5 border-b border-[#1a1a1a] last:border-0 hover:bg-[#222] transition-colors">
              <div className="col-span-2 flex items-center gap-2.5">
                <div className={cn("w-2 h-2 rounded-full shrink-0", item.status === "critical" ? "bg-red-400 animate-pulse" : item.status === "low" ? "bg-yellow-400" : "bg-green-400")} />
                <span className="text-sm font-medium">{item.name}</span>
              </div>
              <span className="text-xs text-[#737373]">{item.category}</span>
              <span className="text-right text-sm font-semibold">{item.stock} <span className="text-xs text-[#737373] font-normal">{item.unit}</span></span>
              <span className="text-right text-xs text-[#737373]">{item.minStock}</span>
              <span className="text-right text-sm">{formatCurrency(item.cost)}</span>
              <div className="flex justify-end">{trendIcon(item.trend, item.trendPct)}</div>
              <div className="flex justify-center">
                <span className={cn("text-xs px-2 py-0.5 rounded-full font-medium", statusConfig[item.status as keyof typeof statusConfig].color)}>
                  {statusConfig[item.status as keyof typeof statusConfig].label}
                </span>
              </div>
            </div>
            {item.aiAlert && (
              <div className="px-5 py-2 bg-[#161616] border-b border-[#1a1a1a] flex items-center gap-2">
                <Sparkles size={11} className="text-[#00d4b8] shrink-0" />
                <span className="text-xs text-[#a3a3a3]">{item.aiAlert}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
