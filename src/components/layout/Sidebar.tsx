"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, TrendingUp, Megaphone, UtensilsCrossed,
  Package, Bot, Calendar, Settings, ChevronRight, Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Growth Dashboard", badge: null },
  { href: "/dashboard/marketing", icon: Megaphone, label: "Marketing", badge: "3" },
  { href: "/dashboard/ai", icon: Bot, label: "AI Assistant", badge: null },
  { href: "/dashboard/menu", icon: UtensilsCrossed, label: "Smart Menu", badge: null },
  { href: "/dashboard/inventory", icon: Package, label: "Inventory", badge: "!" },
  { href: "/dashboard/analytics", icon: TrendingUp, label: "Analytics", badge: null },
  { href: "/dashboard/content", icon: Calendar, label: "Content Calendar", badge: null },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-[#111111] border-r border-[#2a2a2a] flex flex-col shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#2a2a2a]">
        <div className="w-8 h-8 rounded-full border-2 border-[#00d4b8] flex items-center justify-center relative">
          <div className="w-2 h-2 rounded-full bg-[#00d4b8] absolute -top-0.5 -right-0.5" />
        </div>
        <span className="font-bold text-lg tracking-tight">Tasti</span>
        <span className="ml-auto text-[10px] bg-[#00d4b8]/10 text-[#00d4b8] border border-[#00d4b8]/20 px-1.5 py-0.5 rounded-full font-medium">BETA</span>
      </div>

      {/* Restaurant Selector */}
      <div className="px-4 py-3 border-b border-[#2a2a2a]">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 bg-[#1c1c1c] rounded-xl hover:bg-[#222] transition-colors group">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#00d4b8] to-[#0a0a0a] flex items-center justify-center text-xs font-bold">T</div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-sm font-medium truncate">My Restaurant</div>
            <div className="text-xs text-[#737373] truncate">New York, NY</div>
          </div>
          <ChevronRight size={14} className="text-[#737373] group-hover:text-white transition-colors" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, icon: Icon, label, badge }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all group relative",
                active
                  ? "bg-[#00d4b8]/10 text-[#00d4b8] font-medium"
                  : "text-[#737373] hover:text-white hover:bg-[#1c1c1c]"
              )}
            >
              {active && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#00d4b8] rounded-full" />}
              <Icon size={18} className={active ? "text-[#00d4b8]" : ""} />
              <span className="flex-1">{label}</span>
              {badge && (
                <span className={cn(
                  "text-[10px] px-1.5 py-0.5 rounded-full font-bold",
                  badge === "!" ? "bg-[#ef4444]/20 text-[#ef4444]" : "bg-[#1c1c1c] text-[#737373]"
                )}>{badge}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* AI Insight Promo */}
      <div className="px-4 py-3 border-t border-[#2a2a2a]">
        <div className="bg-[#00d4b8]/5 border border-[#00d4b8]/20 rounded-xl p-3">
          <div className="flex items-center gap-2 mb-1.5">
            <Sparkles size={14} className="text-[#00d4b8]" />
            <span className="text-xs font-semibold text-[#00d4b8]">AI Insight</span>
          </div>
          <p className="text-xs text-[#a3a3a3] leading-relaxed">
            Raise Chicken Bowl price by 8% — demand is stable, margin is low.
          </p>
          <button className="mt-2 text-xs text-[#00d4b8] font-medium hover:underline">Apply →</button>
        </div>
      </div>

      {/* Settings */}
      <div className="px-3 pb-4">
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#737373] hover:text-white hover:bg-[#1c1c1c] transition-all">
          <Settings size={18} />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  );
}
