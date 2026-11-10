"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronRight,
  Home,
  MessageCircle,
  Send,
  ShoppingBag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type UseCaseId = "client" | "commerce" | "sales" | "staff";
type Tab = "home" | "hub" | "messages" | "profile";

const useCases: Record<
  UseCaseId,
  {
    label: string;
    brand: string;
    homeTitle: string;
    cardLabel: string;
    cardTitle: string;
    cardSub: string;
    cta: string;
    tiles: { title: string; text: string }[];
    hubTitle: string;
    hubItems: string[];
    firstMessage: string;
  }
> = {
  client: {
    label: "Client hub",
    brand: "Northline",
    homeTitle: "Your projects, in your pocket.",
    cardLabel: "Next milestone",
    cardTitle: "Strategy review",
    cardSub: "Thu · 10:30 · Elena Voss",
    cta: "Confirm attendance",
    tiles: [
      { title: "Project hub", text: "2 active" },
      { title: "Messages", text: "1 unread" },
    ],
    hubTitle: "Active work",
    hubItems: ["Brand system refresh", "Launch sprint — Q2", "Retainer roadmap"],
    firstMessage: "Hi Alex — deck for Thursday is ready. Want a preview?",
  },
  commerce: {
    label: "Commerce",
    brand: "Harbor",
    homeTitle: "Shop, track, reorder.",
    cardLabel: "Latest order",
    cardTitle: "#4821 shipped",
    cardSub: "Arrives Wed · Essentials kit",
    cta: "Track package",
    tiles: [
      { title: "Reorder", text: "3 favorites" },
      { title: "Messages", text: "Support" },
    ],
    hubTitle: "Your picks",
    hubItems: ["Essentials kit", "Refill pack", "Limited drop tee"],
    firstMessage: "Your order #4821 is out for delivery. Need to change address?",
  },
  sales: {
    label: "Sales app",
    brand: "Atlas Sell",
    homeTitle: "Pipeline where you are.",
    cardLabel: "Hot lead",
    cardTitle: "Meridian Corp",
    cardSub: "RFQ incomplete · chase due",
    cta: "Open lead",
    tiles: [
      { title: "Today", text: "5 follow-ups" },
      { title: "Messages", text: "2 drafts" },
    ],
    hubTitle: "Today’s pipeline",
    hubItems: ["Meridian Corp — RFQ", "Helix Ltd — demo", "Nova Co — renew"],
    firstMessage: "Draft ready: polite chase for Meridian’s missing drawings.",
  },
  staff: {
    label: "Staff app",
    brand: "Ops Shift",
    homeTitle: "Your shift, clear and current.",
    cardLabel: "Next task",
    cardTitle: "Approve 3 drafts",
    cardSub: "Agent queue · high priority",
    cta: "Open queue",
    tiles: [
      { title: "Tasks", text: "8 open" },
      { title: "Messages", text: "Team" },
    ],
    hubTitle: "Shift checklist",
    hubItems: ["Approve follow-ups", "Assign tickets", "Update inventory note"],
    firstMessage: "Three follow-up drafts waiting for your approval.",
  },
};

export function MobileDemo() {
  const reduce = useReducedMotion();
  const [useCase, setUseCase] = useState<UseCaseId>("client");
  const [tab, setTab] = useState<Tab>("home");
  const [done, setDone] = useState(false);
  const [message, setMessage] = useState("");
  const [thread, setThread] = useState<Array<{ from: "them" | "you"; text: string }>>(
    [{ from: "them", text: useCases.client.firstMessage }]
  );
  const data = useCases[useCase];

  function switchUseCase(id: UseCaseId) {
    setUseCase(id);
    setTab("home");
    setDone(false);
    setMessage("");
    setThread([{ from: "them", text: useCases[id].firstMessage }]);
  }

  return (
    <div className="flex min-h-[calc(100dvh-3.5rem)] flex-col items-center bg-[radial-gradient(ellipse_at_bottom,#0c1a1f_0%,#020617_60%)] px-3 py-4 sm:px-6 sm:py-6">
      <div className="mb-3 w-full max-w-[390px]">
        <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.16em] text-white/45">
          Use case
        </p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {(Object.keys(useCases) as UseCaseId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => switchUseCase(id)}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-xs font-medium",
                useCase === id
                  ? "bg-primary text-white"
                  : "bg-white/10 text-white/70"
              )}
            >
              {useCases[id].label}
            </button>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[390px] overflow-hidden rounded-[2.5rem] border border-white/15 bg-black shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
        <div className="relative m-1.5 overflow-hidden rounded-[2.3rem] bg-[#f7faf9]">
          <div className="absolute left-1/2 top-2 z-10 h-5 w-28 -translate-x-1/2 rounded-full bg-black/90" />

          <div className="flex items-center justify-between px-5 pb-2 pt-8 text-[10px] font-medium text-[#5a6b72]">
            <span>9:41</span>
            <span className="rounded-full bg-[#0c1a1f] px-2 py-0.5 text-[9px] uppercase tracking-[0.14em] text-white">
              Native app
            </span>
          </div>

          <div className="min-h-[560px] px-4 pb-24">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${useCase}-${tab}-${String(done)}-${thread.length}`}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                {tab === "home" ? (
                  <div>
                    <p className="text-sm text-[#5a6b72]">{data.brand}</p>
                    <h3 className="mt-1 font-display text-3xl font-semibold text-[#0c1a1f]">
                      {data.homeTitle}
                    </h3>
                    <div className="mt-5 rounded-[1.5rem] bg-[#0c1a1f] p-5 text-white">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#5eead4]">
                        {data.cardLabel}
                      </p>
                      <p className="mt-2 font-display text-2xl font-semibold">
                        {done ? "Confirmed" : data.cardTitle}
                      </p>
                      <p className="mt-1 text-sm text-white/60">{data.cardSub}</p>
                      {!done ? (
                        <Button
                          className="mt-4 w-full touch-manipulation"
                          onClick={() => setDone(true)}
                        >
                          {data.cta}
                        </Button>
                      ) : (
                        <Button
                          className="mt-4 w-full"
                          variant="outline"
                          onClick={() => setTab("messages")}
                        >
                          Open messages
                        </Button>
                      )}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {data.tiles.map((tile, index) => (
                        <button
                          key={tile.title}
                          type="button"
                          onClick={() =>
                            setTab(index === 1 ? "messages" : "hub")
                          }
                          className="rounded-2xl border border-[#d5e0dd] bg-white p-4 text-left"
                        >
                          <p className="text-sm font-semibold text-[#0c1a1f]">
                            {tile.title}
                          </p>
                          <p className="mt-1 text-xs text-[#5a6b72]">{tile.text}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {tab === "hub" ? (
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#0c1a1f]">
                      {data.hubTitle}
                    </h3>
                    <div className="mt-4 space-y-2">
                      {data.hubItems.map((item) => (
                        <button
                          key={item}
                          type="button"
                          className="flex w-full items-center justify-between rounded-2xl border border-[#d5e0dd] bg-white px-4 py-3 text-left"
                        >
                          <span className="text-sm font-medium text-[#0c1a1f]">
                            {item}
                          </span>
                          <ChevronRight className="h-4 w-4 text-[#5a6b72]" />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : null}

                {tab === "messages" ? (
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#0c1a1f]">
                      Messages
                    </h3>
                    <div className="mt-4 space-y-3">
                      {thread.map((item, index) => (
                        <div
                          key={`${item.text}-${index}`}
                          className={cn(
                            "max-w-[85%] rounded-2xl px-3 py-2 text-sm",
                            item.from === "them"
                              ? "bg-white border border-[#d5e0dd] text-[#0c1a1f]"
                              : "ml-auto bg-primary text-white"
                          )}
                        >
                          {item.text}
                        </div>
                      ))}
                    </div>
                    <form
                      className="mt-4 flex gap-2"
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!message.trim()) return;
                        setThread((prev) => [
                          ...prev,
                          { from: "you", text: message.trim() },
                        ]);
                        setMessage("");
                      }}
                    >
                      <input
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Reply…"
                        className="h-11 flex-1 rounded-xl border border-[#d5e0dd] bg-white px-3 text-sm"
                      />
                      <Button type="submit" size="icon" className="h-11 w-11">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                ) : null}

                {tab === "profile" ? (
                  <div>
                    <h3 className="font-display text-2xl font-semibold text-[#0c1a1f]">
                      Account
                    </h3>
                    <div className="mt-4 space-y-2 rounded-2xl border border-[#d5e0dd] bg-white p-4 text-sm text-[#5a6b72]">
                      <p className="font-medium text-[#0c1a1f]">Alex Mercer</p>
                      <p>alex@company.com</p>
                      <p>Notifications on · Biometrics on</p>
                    </div>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute inset-x-0 bottom-0 border-t border-[#d5e0dd] bg-white/95 px-2 py-2 backdrop-blur">
            <div className="grid grid-cols-4 gap-1">
              {(
                [
                  { id: "home" as const, label: "Home", icon: Home },
                  { id: "hub" as const, label: "Hub", icon: ShoppingBag },
                  { id: "messages" as const, label: "Chat", icon: MessageCircle },
                  { id: "profile" as const, label: "You", icon: User },
                ] as const
              ).map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={cn(
                    "flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-medium",
                    tab === item.id ? "text-primary" : "text-[#5a6b72]"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
