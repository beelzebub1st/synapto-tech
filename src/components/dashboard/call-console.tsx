"use client";

import { useState } from "react";
import { Loader2, Phone, PhoneOff, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type TranscriptItem = {
  role: "agent" | "customer" | "system";
  text: string;
  at: string;
};

type CallSession = {
  id: string;
  callerName: string | null;
  callerPhone: string | null;
  status: string;
  transcript: TranscriptItem[];
  summary: string | null;
};

export function CallConsole() {
  const [callerName, setCallerName] = useState("Alex Rivera");
  const [callerPhone, setCallerPhone] = useState("+1 555 0199");
  const [customerLine, setCustomerLine] = useState("");
  const [session, setSession] = useState<CallSession | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCall() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/calls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ callerName, callerPhone }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Could not start call");
      setSession(data.session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start call");
    } finally {
      setLoading(false);
    }
  }

  async function sendCustomerLine() {
    if (!session) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/calls/${session.id}/respond`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: customerLine }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Reply failed");
      setSession(data.session);
      setCustomerLine("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reply failed");
    } finally {
      setLoading(false);
    }
  }

  async function endCall() {
    if (!session) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/calls/${session.id}/end`, {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Could not end call");
      setSession(data.session);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not end call");
    } finally {
      setLoading(false);
    }
  }

  const latestAgent = [...(session?.transcript ?? [])]
    .reverse()
    .find((item) => item.role === "agent");

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/80 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-midnight">
              Live call concierge
            </h2>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              When a call comes in, start a session. Type what the customer says
              — the agent tells staff exactly what to say next. No medical
              advice; operational and scheduling help only.
            </p>
          </div>
          <Badge variant={session?.status === "active" ? "success" : "outline"}>
            {session?.status ?? "idle"}
          </Badge>
        </div>

        {!session || session.status !== "active" ? (
          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
            <Input
              value={callerName}
              onChange={(e) => setCallerName(e.target.value)}
              placeholder="Caller name"
            />
            <Input
              value={callerPhone}
              onChange={(e) => setCallerPhone(e.target.value)}
              placeholder="Caller phone"
            />
            <Button disabled={loading} onClick={() => void startCall()}>
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Phone className="h-4 w-4" />
              )}
              Answer call
            </Button>
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={loading}
              onClick={() => void endCall()}
            >
              <PhoneOff className="h-4 w-4" />
              End call
            </Button>
          </div>
        )}

        {error ? (
          <p className="mt-4 text-sm text-destructive">{error}</p>
        ) : null}
      </div>

      {session ? (
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-border/80 bg-off-white/70 p-4 sm:p-5">
            <p className="text-sm font-semibold text-midnight">Say this next</p>
            <p className="mt-3 text-base leading-relaxed text-midnight">
              {latestAgent?.text ?? "Waiting for the first line…"}
            </p>
            {session.summary ? (
              <p className="mt-4 text-xs text-muted-foreground">
                {session.summary}
              </p>
            ) : null}

            {session.status === "active" ? (
              <div className="mt-5 space-y-3">
                <Textarea
                  rows={4}
                  value={customerLine}
                  onChange={(e) => setCustomerLine(e.target.value)}
                  placeholder="Type what the caller just said…"
                />
                <Button
                  disabled={loading || customerLine.trim().length < 2}
                  onClick={() => void sendCustomerLine()}
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                  Get next reply
                </Button>
              </div>
            ) : null}
          </div>

          <div className="rounded-2xl border border-border/80 bg-white p-4 sm:p-5">
            <p className="text-sm font-semibold text-midnight">Transcript</p>
            <div className="mt-3 space-y-3">
              {session.transcript.map((item, index) => (
                <div key={`${item.at}-${index}`} className="text-sm">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {item.role}
                  </p>
                  <p className="mt-1 text-midnight/90">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
