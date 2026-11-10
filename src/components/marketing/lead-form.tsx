"use client";

import Link from "next/link";
import { useActionState } from "react";
import {
  submitLead,
  type LeadFormState,
} from "@/app/(marketing)/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { businessTypes, productCountOptions } from "@/content/brand";
import {
  projectInterests,
  projectTimelines,
  websiteStatuses,
} from "@/content/clinic-website";
import { cn } from "@/lib/utils";

const selectClassName =
  "flex h-11 w-full rounded-xl border border-input bg-white/80 px-3 py-2 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const initialState: LeadFormState = { ok: false, message: "" };

type LeadFormProps = {
  intent?: "contact" | "demo";
  className?: string;
  defaultInterest?: string;
};

export function LeadForm({
  intent = "contact",
  className,
  defaultInterest,
}: LeadFormProps) {
  const [state, formAction, pending] = useActionState(submitLead, initialState);
  const isDemo = intent === "demo";

  if (state.ok) {
    return (
      <div
        className={cn(
          "rounded-2xl border border-sage/40 bg-sage/10 p-8 text-center",
          className
        )}
        role="status"
      >
        <p className="text-lg font-semibold text-midnight">Request received</p>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <form action={formAction} className={cn("space-y-5", className)}>
      <input type="hidden" name="intent" value={intent} />

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            required
            autoComplete="name"
            placeholder="Dr. Jordan Lee"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Work email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@clinic.com"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="organization">Clinic / practice name</Label>
          <Input
            id="organization"
            name="organization"
            required
            autoComplete="organization"
            placeholder="Northside Clinical Group"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Current website</Label>
          <Input
            id="website"
            name="website"
            type="url"
            autoComplete="url"
            placeholder="https://"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="businessType">Type of healthcare business</Label>
          <select
            id="businessType"
            name="businessType"
            required
            className={selectClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Select type
            </option>
            {businessTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="interest">What do you need help with?</Label>
          <select
            id="interest"
            name="interest"
            required
            className={selectClassName}
            defaultValue={defaultInterest ?? ""}
          >
            <option value="" disabled>
              Select focus
            </option>
            {projectInterests.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="websiteStatus">Current website status</Label>
          <select
            id="websiteStatus"
            name="websiteStatus"
            className={selectClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Select status
            </option>
            {websiteStatuses.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeline">Ideal timeline</Label>
          <select
            id="timeline"
            name="timeline"
            className={selectClassName}
            defaultValue=""
          >
            <option value="" disabled>
              Select timeline
            </option>
            {projectTimelines.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="productCount">
          Estimated products / services online (optional)
        </Label>
        <select
          id="productCount"
          name="productCount"
          className={selectClassName}
          defaultValue=""
        >
          <option value="" disabled>
            Select range
          </option>
          {productCountOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          {isDemo
            ? "Tell us about your clinic goals"
            : "How can we help?"}
        </Label>
        <Textarea
          id="message"
          name="message"
          rows={4}
          placeholder={
            isDemo
              ? "Example: We need a new brand and website that feels more clinical and converts more consultations."
              : "Share your goals, timeline, or current challenges."
          }
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-muted-foreground">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <span>
          I agree to be contacted about this project and have read the{" "}
          <Link
            href="/privacy"
            className="text-primary underline-offset-2 hover:underline"
          >
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      {state.message ? (
        <p
          role="status"
          className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
        >
          {state.message}
        </p>
      ) : null}

      <Button
        type="submit"
        size="lg"
        disabled={pending}
        className="w-full touch-manipulation"
      >
        {pending
          ? "Sending…"
          : isDemo
            ? "Request my clinic project plan"
            : "Send message"}
      </Button>
    </form>
  );
}
