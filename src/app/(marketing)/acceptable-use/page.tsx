import { LegalDocument, LegalSection } from "@/components/marketing/legal-document";
import { brand } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Acceptable Use Policy",
  `Rules for using ${brand.name} services responsibly and lawfully.`,
  { path: "/acceptable-use" }
);

export default function AcceptableUsePage() {
  return (
    <LegalDocument title="Acceptable Use Policy" lastUpdated="November 4, 2026">
      <LegalSection heading="Purpose">
        <p>
          This Acceptable Use Policy (&quot;AUP&quot;) describes prohibited and restricted uses of{" "}
          {brand.name} services, websites, and APIs. It supplements our Terms of Service. Violations
          may result in suspension or termination.
        </p>
      </LegalSection>

      <LegalSection heading="Lawful use">
        <p>
          You must use the Services only for lawful business purposes and in compliance with
          applicable regulations governing your products, marketing, privacy, and professional
          licensing.
        </p>
      </LegalSection>

      <LegalSection heading="Prohibited content and conduct">
        <p>You may not use the Services to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Sell or promote illegal products or services</li>
          <li>Publish false, deceptive, or unsubstantiated health or medical claims</li>
          <li>Infringe intellectual property or publicity rights</li>
          <li>Harass, threaten, or discriminate against individuals or groups</li>
          <li>Distribute malware, conduct phishing, or attempt unauthorized access</li>
          <li>Circumvent catalog restrictions, checkout controls, or rate limits</li>
          <li>Process payments for categories prohibited by your processor agreement</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Restricted categories">
        <p>
          We may decline or suspend businesses selling items that pose elevated legal, safety, or
          reputational risk—including certain prescription-only products, unapproved devices, or
          categories flagged during onboarding review. Final eligibility is determined case by case.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          You must safeguard account credentials, promptly report suspected breaches, and cooperate
          with reasonable security investigations. Automated scraping of the marketing site or
          unauthorized penetration testing without written approval is prohibited.
        </p>
      </LegalSection>

      <LegalSection heading="Email and communications">
        <p>
          You are responsible for consent and content when sending marketing messages connected to
          your storefront. Do not use the Services to send spam or messages that violate CAN-SPAM,
          CASL, GDPR, or similar laws.
        </p>
      </LegalSection>

      <LegalSection heading="Reporting abuse">
        <p>
          Report suspected violations to{" "}
          <a href={`mailto:${brand.email}`} className="text-primary hover:underline">
            {brand.email}
          </a>{" "}
          with relevant URLs, order IDs, and description. We may remove content or suspend accounts
          while investigating.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>We may update this AUP as risks and regulations evolve. Material changes will be posted with an updated date.</p>
      </LegalSection>
    </LegalDocument>
  );
}
