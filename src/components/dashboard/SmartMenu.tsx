"use client";
import { useState } from "react";
import { Search, Plus, TrendingUp, TrendingDown, Edit3, ToggleLeft, ToggleRight, Sparkles, AlertTriangle, Star, Filter } from "lucide-react";
import { cn, formatCurrency } from "@/lib/utils";

const categories = ["All", "Mains", "Starters", "Salads", "Desserts", "Drinks"];

const menuItems = [
  { id: 1, name: "Chicken Bowl", category: "Mains", price: 16.99, cost: 5.44, orders: 214, trend: "up", margin: 68, active: true, featured: true, ai: "🔥 Best seller. Consider +8% price." },
  { id: 2, name: "Margherita Pizza", category: "Mains", price: 18.99, cost: 5.32, orders: 182, trend: "up", margin: 72, active: true, featured: false, ai: null },
  { id: 3, name: "Caesar Salad", category: "Salads", price: 13.99, cost: 2.52, orders: 140, trend: "down", margin: 81, active: true, featured: false, ai: "📉 Declining. Check freshness & presentation." },
  { id: 4, name: "Pasta Carbonara", category: "Mains", price: 17.99, cost: 6.12, orders: 99, trend: "up", margin: 64, active: true, featured: false, ai: null },
  { id: 5, name: "Beef Burger", category: "Mains", price: 15.99, cost: 6.56, orders: 88, trend: "down", margin: 59, active: true, featured: false, ai: "⚠️ Low margin + declining. Raise price or remove." },
  { id: 6, name: "Tiramisu", category: "Desserts", price: 8.99, cost: 1.62, orders: 76, trend: "up", margin: 82, active: true, featured: false, ai: "⭐ High margin. Promote more!" },
  { id: 7, name: "Bruschetta", category: "Starters", price: 9.99, cost: 2.20, orders: 65, trend: "up", margin: 78, active: true, featured: false, ai: null },
  { id: 8, name: "Fish & Chips", category: "Mains", price: 19.99, cost: 8.80, orders: 42, trend: "down", margin: 56, active: false, featured: false, ai: "🔴 Inactive. Low orders. Consider removing." },
];

export default function SmartMenuPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [items, setItems] = useState(menuItems);

  const filtered = items.filter(i =>
    (category === "All" || i.category === category) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleActive = (id: number) => setItems(prev => prev.map(i => i.id === id ? { ...i, active: !i.active } : i));

  const marginColor = (m: number) => m >= 75 ? "text-green-400" : m >= 65 ? "text-yellow-400" : "text-red-400";
  const marginBg = (m: number) => m >= 75 ? "bg-green-400/10" : m >= 65 ? "bg-yellow-400/10" : "bg-red-400/10";

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Smart Menu</h1>
          <p className="text-sm text-[#737373] mt-0.5">AI-powered menu management & pricing</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 text-sm text-[#00d4b8] bg-[#00d4b8]/10 border border-[#00d4b8]/20 px-4 py-2.5 rounded-xl hover:bg-[#00d4b8]/15 transition-colors font-medium">
            <Sparkles size={15} />AI Optimize All
          </button>
          <button className="flex items-center gap-2 bg-[#00d4b8] text-black text-sm font-semibold px-4 py-2.5 rounded-xl hover:bg-[#00b89f] transition-colors">
            <Plus size={16} />Add Item
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Total Items", value: items.length.toString(), sub: `${items.filter(i => i.active).length} active` },
          { label: "Avg Margin", value: `${Math.round(items.reduce((s,i)=>s+i.margin,0)/items.length)}%`, sub: "Healthy target: 70%+" },
          { label: "Top Performer", value: "Tiramisu", sub: "82% margin" },
          { label: "Needs Attention", value: items.filter(i => i.margin < 65).length.toString(), sub: "items below target" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl p-5">
            <div className="text-xl font-bold mb-1">{value}</div>
            <div className="text-xs text-[#737373]">{label}</div>
            <div className="text-[11px] text-[#00d4b8] mt-1">{sub}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search menu items..."
            className="w-full bg-[#1c1c1c] border border-[#2a2a2a] text-sm text-white placeholder-[#737373] pl-9 pr-4 py-2.5 rounded-xl outline-none focus:border-[#00d4b8] transition-colors" />
        </div>
        <div className="flex gap-1 bg-[#1c1c1c] border border-[#2a2a2a] rounded-xl p-1">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)}
              className={cn("px-3 py-1.5 rounded-lg text-xs font-medium transition-all", category === c ? "bg-[#00d4b8] text-black" : "text-[#737373] hover:text-white")}>{c}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#1c1c1c] border border-[#2a2a2a] rounded-2xl overflow-hidden">
        <div className="grid grid-cols-9 text-[11px] text-[#737373] font-medium uppercase tracking-wide px-5 py-3 border-b border-[#2a2a2a]">
          <span className="col-span-2">Item</span>
          <span>Category</span>
          <span className="text-right">Price</span>
          <span className="text-right">Cost</span>
          <span className="text-right">Margin</span>
          <span className="text-right">Orders/wk</span>
          <span className="text-center">Status</span>
          <span className="text-right">Actions</span>
        </div>
        {filtered.map((item) => (
          <div key={item.id}>
            <div className="grid grid-cols-9 items-center px-5 py-3.5 border-b border-[#1a1a1a] last:border-0 hover:bg-[#222] transition-colors group">
              <div className="col-span-2 flex items-center gap-2.5">
                {item.featured && <Star size={13} className="text-yellow-400 shrink-0" />}
                <span className={cn("text-sm font-medium", !item.active && "text-[#737373]")}>{item.name}</span>
              </div>
              <span className="text-xs text-[#737373]">{item.category}</span>
              <span className="text-right text-sm font-semibold">{formatCurrency(item.price)}</span>
              <span className="text-right text-xs text-[#737373]">{formatCurrency(item.cost)}</span>
              <div className="flex justify-end">
                <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-lg", marginColor(item.margin), marginBg(item.margin))}>{item.margin}%</span>
              </div>
              <div className="text-right flex items-center justify-end gap-1.5">
                <span className="text-sm">{item.orders}</span>
                {item.trend === "up" ? <TrendingUp size={13} className="text-green-400" /> : <TrendingDown size={13} className="text-red-400" />}
              </div>
              <div className="flex justify-center">
                <button onClick={() => toggleActive(item.id)}>
                  {item.active ? <ToggleRight size={22} className="text-[#00d4b8]" /> : <ToggleLeft size={22} className="text-[#737373]" />}
                </button>
              </div>
              <div className="flex justify-end gap-2">
                <button className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-[#2a2a2a] hover:bg-[#333] transition-all"><Edit3 size={13} className="text-[#a3a3a3]" /></button>
              </div>
            </div>
            {item.ai && (
              <div className="px-5 py-2 bg-[#00d4b8]/3 border-b border-[#1a1a1a] flex items-center gap-2">
                <Sparkles size={12} className="text-[#00d4b8] shrink-0" />
                <span className="text-xs text-[#a3a3a3]">{item.ai}</span>
                <button className="ml-auto text-xs text-[#00d4b8] font-medium hover:underline shrink-0">Take action →</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
