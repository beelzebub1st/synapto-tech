import { StripePaymentProvider } from "./stripe";
import type { PaymentProvider } from "./types";

let provider: PaymentProvider | null = null;

export function getPaymentProvider(): PaymentProvider {
  if (!provider) {
    provider = new StripePaymentProvider();
  }
  return provider;
}
