import { SalesInbox } from "@/components/dashboard/sales-inbox";

export default function SalesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-midnight">
          Sales pipeline
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Strategy bookings, quiz recommendations, deposits, and proposal
          requests from the marketing conversion system.
        </p>
      </div>
      <SalesInbox />
    </div>
  );
}
