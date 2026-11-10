import { CallConsole } from "@/components/dashboard/call-console";

export default function CallsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-midnight">
          Call Agent
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Live coaching when a customer calls — what to say, turn by turn.
        </p>
      </div>
      <CallConsole />
    </div>
  );
}
