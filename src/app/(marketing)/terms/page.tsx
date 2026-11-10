import { LegalDocument, LegalSection } from "@/components/marketing/legal-document";
import { brand } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Terms of Service",
  `Terms governing access to ${brand.name} marketing properties and use of our commerce platform services.`,
  { path: "/terms" }
);

export default function TermsPage() {
  return (
    <LegalDocument title="Terms of Service" lastUpdated="November 4, 2026">
      <LegalSection heading="Agreement">
        <p>
          These Terms of Service (&quot;Terms&quot;) govern your access to {brand.domain} and related
          marketing properties, and your use of {brand.name} platform services under a separate order
          or agreement (&quot;Services&quot;). By using our site or Services, you agree to these Terms
          and our Acceptable Use Policy.
        </p>
      </LegalSection>

      <LegalSection heading="Eligibility">
        <p>
          You represent that you have authority to bind your organization and that you are a business
          user—not a consumer shopping for personal household goods through this B2B platform.
        </p>
      </LegalSection>

      <LegalSection heading="Services scope">
        <p>
          Synapto provides commerce infrastructure—including storefront tooling, catalog management,
          checkout configuration, and operational dashboards. Specific features, integrations, and
          service levels are defined in your order or statement of work. We may update the Services
          with reasonable notice when changes materially affect functionality.
        </p>
      </LegalSection>

      <LegalSection heading="Your responsibilities">
        <p>You are responsible for:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Accuracy of catalog, pricing, and content you publish</li>
          <li>Compliance with laws applicable to your products, marketing, and data practices</li>
          <li>Maintaining credentials and restricting access within your team</li>
          <li>Payment processor relationships and chargeback handling</li>
        </ul>
        <p>
          Synapto does not provide medical, legal, or regulatory advice. Platform controls assist
          implementation—they do not certify compliance.
        </p>
      </LegalSection>

      <LegalSection heading="Fees">
        <p>
          Fees are set forth in your commercial agreement. Unless stated otherwise, fees are non-refundable
          for periods already rendered. We may suspend Services for overdue amounts after notice.
        </p>
      </LegalSection>

      <LegalSection heading="Intellectual property">
        <p>
          We retain ownership of the Services, software, and brand assets. You retain ownership of
          your content and data. You grant us a limited license to host and process your content to
          provide the Services.
        </p>
      </LegalSection>

      <LegalSection heading="Confidentiality">
        <p>
          Each party may receive confidential information from the other. The receiving party will
          use reasonable care and limit disclosure as described in your agreement or standard
          confidentiality terms incorporated by reference.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimer of warranties">
        <p>
          EXCEPT AS EXPRESSLY STATED IN YOUR AGREEMENT, THE SERVICES ARE PROVIDED &quot;AS IS.&quot; WE
          DISCLAIM IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND
          NON-INFRINGEMENT TO THE MAXIMUM EXTENT PERMITTED BY LAW.
        </p>
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          TO THE MAXIMUM EXTENT PERMITTED BY LAW, NEITHER PARTY WILL BE LIABLE FOR INDIRECT,
          INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES. AGGREGATE LIABILITY ARISING FROM
          THESE TERMS OR THE SERVICES IS LIMITED TO FEES PAID IN THE TWELVE MONTHS PRECEDING THE
          CLAIM, UNLESS YOUR AGREEMENT STATES OTHERWISE.
        </p>
      </LegalSection>

      <LegalSection heading="Termination">
        <p>
          Either party may terminate according to the commercial agreement. We may suspend or
          terminate access for material breach, legal requirement, or violations of the Acceptable Use
          Policy.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These Terms are governed by the laws specified in your commercial agreement, or if none,
          the laws of the State of Delaware, excluding conflict-of-law rules. Courts in that
          jurisdiction will have exclusive venue unless your agreement states otherwise.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Legal notices:{" "}
          <a href={`mailto:${brand.email}`} className="text-primary hover:underline">
            {brand.email}
          </a>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
