"use client";

import { useEffect, useState } from "react";
import { Loader2, Mail, Play, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Settings = {
  autoProcessIntakes: boolean;
  autoSendClientMessages: boolean;
  callAgentEnabled: boolean;
};

type MessageRow = {
  id: string;
  toAddress: string;
  subject: string;
  body: string;
  status: string;
  sentAt: string | null;
  createdAt: string;
};

export function AutomationPanel() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [messages, setMessages] = useState<MessageRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const [settingsRes, messagesRes] = await Promise.all([
        fetch("/api/settings/automation"),
        fetch("/api/messages"),
      ]);
      const settingsData = await settingsRes.json();
      const messagesData = await messagesRes.json();
      setSettings(settingsData.settings);
      setMessages(messagesData.messages ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void refresh();
  }, []);

  async function patchSettings(next: Partial<Settings>) {
    if (!settings) return;
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/settings/automation", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(next),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Update failed");
      setSettings(data.settings);
      setNotice("Automation settings saved.");
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Update failed");
    } finally {
      setBusy(false);
    }
  }

  async function runAutoProcess() {
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/agents/auto-process", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Auto-process failed");
      setNotice(
        `Processed ${data.count} new intake(s). Messages were queued/sent automatically when enabled.`
      );
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Auto-process failed");
    } finally {
      setBusy(false);
    }
  }

  async function simulateIntake() {
    setBusy(true);
    setNotice(null);
    try {
      const response = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "intake",
          subject: `New web intake — ${new Date().toLocaleTimeString()}`,
          body: `Patient: Alex Rivera
DOB: 21/08/1991
Phone: +1 555 0199
Email: alex.rivera@example.com
Service interest: Longevity consultation
Insurance: not provided
Attachments: ID missing
Notes: Submitted via website form just now.`,
          autoProcess: true,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Could not create intake");
      const status = data.automation?.message?.status ?? "queued";
      setNotice(
        `New intake auto-checked. Client message status: ${status}.`
      );
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Intake failed");
    } finally {
      setBusy(false);
    }
  }

  if (loading || !settings) {
    return (
      <div className="rounded-2xl border border-border/80 bg-white p-8 text-sm text-muted-foreground">
        Loading automation…
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/80 bg-white p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-midnight">
              Intake automation
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              New intakes are checked automatically. If fields are missing, the
              agent drafts a client email and can send it right away
              (operational requests only — never medical advice).
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={busy}
              onClick={() => void refresh()}
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
            <Button type="button" disabled={busy} onClick={() => void runAutoProcess()}>
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Play className="h-4 w-4" />
              )}
              Process new intakes
            </Button>
            <Button
              type="button"
              variant="secondary"
              disabled={busy}
              onClick={() => void simulateIntake()}
            >
              Simulate new intake
            </Button>
          </div>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <ToggleCard
            title="Auto-check intakes"
            description="Run the completeness agent as soon as a form arrives."
            checked={settings.autoProcessIntakes}
            disabled={busy}
            onChange={(value) =>
              void patchSettings({ autoProcessIntakes: value })
            }
          />
          <ToggleCard
            title="Auto-message clients"
            description="Send the draft email immediately after the check."
            checked={settings.autoSendClientMessages}
            disabled={busy}
            onChange={(value) =>
              void patchSettings({ autoSendClientMessages: value })
            }
          />
          <ToggleCard
            title="Call agent"
            description="Enable live call coaching when the phone rings."
            checked={settings.callAgentEnabled}
            disabled={busy}
            onChange={(value) =>
              void patchSettings({ callAgentEnabled: value })
            }
          />
        </div>

        {notice ? (
          <p className="mt-4 rounded-xl border border-border bg-off-white/80 px-3 py-2 text-sm text-midnight">
            {notice}
          </p>
        ) : null}
      </div>

      <div className="rounded-2xl border border-border/80 bg-white p-4 sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <Mail className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold text-midnight">
            Client message outbox
          </h2>
        </div>
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No client messages yet. Simulate an intake or process the queue.
          </p>
        ) : (
          <div className="space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className="rounded-xl border border-border/80 bg-off-white/60 p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-midnight">
                      {message.subject}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      To {message.toAddress}
                    </p>
                  </div>
                  <Badge
                    variant={
                      message.status.startsWith("sent")
                        ? "success"
                        : message.status === "failed"
                          ? "warning"
                          : "sample"
                    }
                  >
                    {message.status}
                  </Badge>
                </div>
                <pre className="mt-3 whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                  {message.body}
                </pre>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ToggleCard({
  title,
  description,
  checked,
  disabled,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`rounded-xl border p-4 text-left transition-colors ${
        checked
          ? "border-primary/40 bg-primary/5"
          : "border-border/80 bg-off-white/50"
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-semibold text-midnight">{title}</p>
        <Badge variant={checked ? "success" : "outline"}>
          {checked ? "On" : "Off"}
        </Badge>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
        {description}
      </p>
    </button>
  );
}
