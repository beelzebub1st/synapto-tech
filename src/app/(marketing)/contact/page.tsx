import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { LeadForm } from "@/components/marketing/lead-form";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section } from "@/components/marketing/section";
import { Card, CardContent } from "@/components/ui/card";
import { brand } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Contact",
  `Contact ${brand.name} about healthcare commerce, integrations, onboarding, and partnership questions.`,
  { path: "/contact" }
);

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk with our team"
        lead="Share your catalog, locations, and timeline—we will follow up with next steps. For demos, you can also book a dedicated session."
      />

      <Section className="pt-0 md:pt-4">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
          <FadeIn>
            <div className="space-y-6">
              <Card className="border-border/80">
                <CardContent className="p-6">
                  <p className="text-sm font-semibold text-midnight">Email</p>
                  <a
                    href={`mailto:${brand.email}`}
                    className="mt-1 block text-sm text-primary hover:underline"
                  >
                    {brand.email}
                  </a>
                </CardContent>
              </Card>
              <Card className="border-border/80">
                <CardContent className="p-6 text-sm leading-relaxed text-muted-foreground">
                  <p className="font-semibold text-midnight">Prefer a walkthrough?</p>
                  <p className="mt-2">
                    Schedule a demo to see storefront, dashboard, and integration workflows aligned
                    to your business type.
                  </p>
                  <Link href="/book-a-demo" className="mt-3 inline-block text-primary hover:underline">
                    Book a demo →
                  </Link>
                </CardContent>
              </Card>
            </div>
          </FadeIn>
          <FadeIn delay={0.08}>
            <Card className="border-border/80">
              <CardContent className="p-6 md:p-8">
                <LeadForm intent="contact" />
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </Section>
    </>
  );
}
