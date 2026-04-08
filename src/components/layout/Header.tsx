"use client";
import { Bell, Search, Plus, ChevronDown } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 border-b border-[#2a2a2a] bg-[#111111]/80 backdrop-blur-sm flex items-center px-6 gap-4 shrink-0">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#737373]" />
          <input
            type="text"
            placeholder="Search or ask AI anything..."
            className="w-full bg-[#1c1c1c] border border-[#2a2a2a] text-sm text-white placeholder-[#737373] pl-9 pr-4 py-2 rounded-xl outline-none focus:border-[#00d4b8] transition-colors"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-[#737373] bg-[#2a2a2a] px-1.5 py-0.5 rounded">⌘K</kbd>
        </div>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Quick Add */}
        <button className="flex items-center gap-2 bg-[#00d4b8] text-black text-sm font-semibold px-4 py-2 rounded-xl hover:bg-[#00b89f] transition-colors">
          <Plus size={16} />
          <span>New</span>
        </button>

        {/* Notifications */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#404040] transition-colors">
          <Bell size={17} className="text-[#a3a3a3]" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00d4b8] rounded-full" />
        </button>

        {/* Profile */}
        <button className="flex items-center gap-2.5 pl-3 pr-2 py-1.5 rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#404040] transition-colors">
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#00d4b8] to-[#005a4e] flex items-center justify-center text-xs font-bold">Y</div>
          <span className="text-sm font-medium">Yuriy</span>
          <ChevronDown size={14} className="text-[#737373]" />
        </button>
      </div>
    </header>
  );
}
