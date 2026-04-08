"use client";
import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, TrendingUp, ShoppingBag, Megaphone, ChefHat, Loader2, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "ai"; text: string; timestamp: Date; };

const quickPrompts = [
  { icon: TrendingUp, text: "Why did my sales drop this week?", color: "text-green-400" },
  { icon: ChefHat, text: "What should I add to the menu?", color: "text-[#00d4b8]" },
  { icon: Megaphone, text: "What should I post tomorrow?", color: "text-purple-400" },
  { icon: ShoppingBag, text: "How to increase lunch traffic?", color: "text-orange-400" },
];

const mockResponses: Record<string, string> = {
  default: "Based on your restaurant's data, here's what I can see:\n\n**Revenue this week:** $31,600 (+12.4% vs last week)\n**Top performer:** Chicken Bowl — 214 orders\n**Opportunity:** Friday 4–6pm is your slowest period. A targeted happy hour promotion could add 15–20 covers and ~$580/mo in revenue.\n\nWhat would you like to know more about?",
  sales: "Looking at your sales data for this week vs last week:\n\n📉 **Tuesday** was the weakest day ($2,800) — 14% below your weekly average. This correlates with rainy weather and lower foot traffic.\n\n✅ **Saturday** was your strongest ($6,800) — sat templated",
  menu: "Based on your current menu performance and food cost data:\n\n🟢 **Add:** Weekend Brunch items",
  post: "Here's what I'd recommend posting tomorrow:\n\n**Format:** Instagram Reel",
  lunch: "Here are 3 proven strategies to boost your lunch traffic",
};

function getResponse(text: string): string {
  const t = text.toLowerCase();
  if (t.includes("sales") || t.includes("drop") || t.includes("revenue")) return mockResponses.sales;
  if (t.includes("menu") || t.includes("add") || t.includes("dish")) return mockResponses.menu;
  if (t.includes("post") || t.includes("tomorrow") || t.includes("content")) return mockResponses.post;
  if (t.includes("lunch") || t.includes("traffic")) return mockResponses.lunch;
  return mockResponses.default;
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<{role:"user"|"ai",text:string,timestamp:Date}[]>([{role:"ai",text:"Hey! I'm your Tasti AI assistant! Ask me anything.",timestamp:new Date()}]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({behavior:"smooth"}); }, [messages,typing]);
  const sendMessage = async (text?:string) => {
    const msg = text || input.trim();
    if (!msg) return;
    setInput("");
    setMessages(prev => [...prev,{role:"user",text:msg,timestamp:new Date()}]);
    setTyping(true);
    await new Promise(r => setTimeout(r, 1500));
    setTyping(false);
    setMessages(prev => [...prev,{role:"ai",text:getResponse(msg),timestamp:new Date()}]);
  };
  return (
    <div className="flex flex-col h-full animate-fade-in">
      <h1 className="text-2xl font-bold mb-4">AI Assistant</h1>
      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex flex-col bg-[#111] border border-[#2a2a2a] rounded-2xl overflow-hidden">
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {messages.map((m,i) => (
              <div key={i} className={cn("flex gap-3",m.role==="user"&&"flex-row-reverse")}>
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 bg-[#1c1c1c] border border-[#2a2a2a]">{m.role==="ai"?<Sparkles size={15} className="text-[#00d4b8]"/>:"Y"}</div>
                <div className={cn("max-w-[85%] rounded-2xl px-4 py-3 text-sm",m.role==="ai"?"bg-[#1c1c1c] border border-[#2a2a2a]":"bg-[#00d4b8]/10 border border-[#00d4b8]/20")}>
                  <p className="text-white whitespace-pre-wrap">{m.text}</p>
                </div>
              </div>
            ))}
            {typing&&<div className="flex gap-2 items-center text-xs text-[#00d4b8]"><Loader2 size={14} className="animate-spin"/>Thinking...</div>}
            <div ref={bottomRef}/>
          </div>
          <div className="border-t border-[#2a2a2a] p-4">
            <div className="flex gap-3">
              <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMessage()} placeholder="Ask anything..." className="flex-1 bg-[#1c1c1c] border border-[#2a2a2a] text-white placeholder-[#737373] rounded-xl px-4 py-3 text-sm outline-none focus:border-[#00d4b8]"/>
              <button onClick={()=>sendMessage()} disabled={!input.trim()||typing} className="bg-[#00d4b8] text-black p-3 rounded-xl hover:bg-[#00b89f] disabled:opacity-40"><Send size={18}/></button>
            </div>
          </div>
        </div>
        <div className="w-60 space-y-3">
          <div className="bg-[#111] border border-[#2a2a2a] rounded-2xl p-4">
            <p className="text-xs font-semibold text-[#737373] uppercase mb-3">Quick Questions</p>
            <div className="space-y-2">
              {quickPrompts.map(({icon:Icon,text,color},i)=>(
                <button key={i} onClick={()=>sendMessage(text)} className="w5full text-left flex items-center gap-3 p-3 rounded-xl bg-[#1c1c1c] border border-[#2a2a2a] hover:border-[#404040] text-xs text-[#a3a3a3] hover:text-white">
                  <Icon size={14} className={color}/>{text}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
