import { hasStripe } from "@/lib/env";
import type { PaymentProvider } from "./types";

export class StripePaymentProvider implements PaymentProvider {
  readonly name = "stripe";

  isConfigured(): boolean {
    return hasStripe();
  }

  async getConnectUrl(_organizationId: string): Promise<string | null> {
    if (!this.isConfigured()) {
      return null;
    }
    return null;
  }

  async getAccountStatus(
    _organizationId: string
  ): Promise<"disconnected" | "pending" | "connected" | "error"> {
    if (!this.isConfigured()) {
      return "disconnected";
    }
    return "disconnected";
  }
}
