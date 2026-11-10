import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section } from "@/components/marketing/section";
import { faqCategories, faqItems } from "@/content/faq";
import { pageMetadata } from "@/lib/page-metadata";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata(
  "FAQ",
  "Frequently asked questions about Synapto Tech platform capabilities, onboarding, billing, and compliance-oriented controls.",
  { path: "/faq" }
);

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Questions teams ask before they launch"
        lead="Clear answers about our platform and process. For legal interpretation of your obligations, consult qualified advisors."
        align="center"
      />

      <Section className="pt-0 md:pt-4">
        <div className="mx-auto max-w-3xl space-y-12">
          {faqCategories.map((category) => {
            const items = faqItems.filter((item) => item.category === category);
            return (
              <FadeIn key={category}>
                <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  {category}
                </h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <details
                      key={item.id}
                      className="group rounded-2xl border border-border/80 bg-white open:shadow-sm"
                    >
                      <summary
                        className={cn(
                          "cursor-pointer list-none px-5 py-4 text-sm font-medium text-midnight",
                          "flex items-center justify-between gap-4",
                          "[&::-webkit-details-marker]:hidden"
                        )}
                      >
                        {item.question}
                        <span className="text-muted-foreground transition group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <div className="border-t border-border/60 px-5 pb-4 pt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </FadeIn>
            );
          })}
        </div>
        <FadeIn className="mx-auto mt-14 max-w-3xl text-center">
          <p className="text-sm text-muted-foreground">
            Still have questions?{" "}
            <Link href="/contact" className="font-medium text-primary hover:underline">
              Contact us
            </Link>{" "}
            or{" "}
            <Link href="/book-a-demo" className="font-medium text-primary hover:underline">
              book a demo
            </Link>
            .
          </p>
        </FadeIn>
      </Section>
    </>
  );
}
