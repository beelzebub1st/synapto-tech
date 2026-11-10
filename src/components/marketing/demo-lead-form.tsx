"use client";

import { useSearchParams } from "next/navigation";
import { LeadForm } from "@/components/marketing/lead-form";

export function DemoLeadForm() {
  const params = useSearchParams();
  const interest =
    params.get("interest") ?? "Website + branding package";

  return <LeadForm intent="demo" defaultInterest={interest} />;
}
