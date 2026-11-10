import { FadeIn } from "@/components/marketing/fade-in";
import {
  Section,
  SectionEyebrow,
  SectionHeading,
  SectionLead,
} from "@/components/marketing/section";
import { websiteTypes } from "@/content/brand";

export function WebsiteTypesSection() {
  return (
    <Section className="bg-off-white !py-12 md:!py-16">
      <div className="mx-auto max-w-3xl text-center">
        <FadeIn>
          <SectionEyebrow>What we ship</SectionEyebrow>
          <SectionHeading className="mx-auto">
            Every website type that needs to win business.
          </SectionHeading>
          <SectionLead className="mx-auto">
            Marketing sites, B2B platforms, commerce storefronts, portals, apps,
            and systems—designed to convert and built to last.
          </SectionLead>
        </FadeIn>
      </div>
      <FadeIn delay={0.06}>
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {websiteTypes.map((item) => (
            <li
              key={item}
              className="border border-border/80 bg-white px-4 py-4 text-center text-sm font-medium text-midnight sm:py-5 sm:text-base"
            >
              {item}
            </li>
          ))}
        </ul>
      </FadeIn>
    </Section>
  );
}
