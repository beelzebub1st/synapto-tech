export interface PaymentProvider {
  readonly name: string;
  isConfigured(): boolean;
  getConnectUrl(organizationId: string): Promise<string | null>;
  getAccountStatus(organizationId: string): Promise<"disconnected" | "pending" | "connected" | "error">;
}
