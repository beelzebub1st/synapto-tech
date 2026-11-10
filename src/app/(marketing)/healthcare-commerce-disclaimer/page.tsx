import { LegalDocument, LegalSection } from "@/components/marketing/legal-document";
import { brand } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Healthcare Commerce Disclaimer",
  `Important disclaimers about selling healthcare-oriented products online with ${brand.name}.`,
  { path: "/healthcare-commerce-disclaimer" }
);

export default function HealthcareCommerceDisclaimerPage() {
  return (
    <LegalDocument
      title="Healthcare Commerce Disclaimer"
      lastUpdated="November 4, 2026"
    >
      <LegalSection heading="General information only">
        <p>
          Content on {brand.domain}, in our documentation, and in demo sessions is provided for
          general business information. It is not medical advice, legal advice, regulatory advice, or
          a substitute for professional counsel.
        </p>
      </LegalSection>

      <LegalSection heading="No provider-patient relationship">
        <p>
          {brand.name} is a technology provider. Use of our Services does not create a
          provider-patient relationship between Synapto and your customers. You remain solely
          responsible for clinical, professional, and licensing obligations in your jurisdiction.
        </p>
      </LegalSection>

      <LegalSection heading="Regulatory compliance">
        <p>
          Laws governing online sale of healthcare-oriented products vary by country, state, product
          classification, and business model. You are responsible for determining what you may sell,
          how you may market it, what disclosures are required, and how you handle customer data.
        </p>
        <p>
          Synapto Tech does not represent that the Services, as configured by default or by you,
          satisfy HIPAA, HITECH, FDA, FTC, state medical board rules, pharmacy regulations, or other
          frameworks. Features described as &quot;compliance-oriented controls&quot; are configurable
          tools to support workflows you define with qualified advisors—they are not certifications.
        </p>
      </LegalSection>

      <LegalSection heading="Product claims and labeling">
        <p>
          You must ensure product descriptions, images, and marketing copy comply with applicable
          labeling and advertising requirements. Do not imply outcomes, approvals, or endorsements that
          you cannot substantiate.
        </p>
      </LegalSection>

      <LegalSection heading="Payments and fulfillment">
        <p>
          Payment processing is provided by third parties subject to their approval and rules. Synapto
          does not guarantee processor approval for any catalog. Fulfillment, returns, and customer
          disputes are your responsibility unless otherwise stated in your agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Emergency">
        <p>
          Our Services and support channels are not for medical emergencies. In an emergency, contact
          local emergency services immediately.
        </p>
      </LegalSection>

      <LegalSection heading="Questions">
        <p>
          Platform questions:{" "}
          <a href={`mailto:${brand.email}`} className="text-primary hover:underline">
            {brand.email}
          </a>
          . Legal and compliance questions should be directed to your qualified advisors.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
