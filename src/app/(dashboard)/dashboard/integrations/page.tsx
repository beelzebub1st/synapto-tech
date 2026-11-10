import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getPaymentProvider } from "@/lib/payments";
import { hasStripe } from "@/lib/env";

export default function IntegrationsPage() {
  const stripe = getPaymentProvider();
  const configured = hasStripe();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-midnight">Integrations</h1>
        <p className="mt-1 text-sm text-muted-foreground">Connect payments and external services.</p>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-2">
            <CardTitle>Stripe Connect</CardTitle>
            <Badge variant="outline">Disconnected</Badge>
          </div>
          <CardDescription>
            Accept cards and route payouts to your clinic account.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Provider: {stripe.name} ·{" "}
            {configured ? "API keys detected" : "Add STRIPE_SECRET_KEY to enable live connect"}
          </p>
          <Button disabled={!configured}>
            {configured ? "Connect Stripe account" : "Configure Stripe env vars"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
