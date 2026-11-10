import { AutomationPanel } from "@/components/dashboard/automation-panel";

export default function AutomationPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-midnight">
          Automation
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Auto-check intakes and message clients the moment a form lands.
        </p>
      </div>
      <AutomationPanel />
    </div>
  );
}
