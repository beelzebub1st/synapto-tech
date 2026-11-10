import { LegalDocument, LegalSection } from "@/components/marketing/legal-document";
import { brand } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Privacy Policy",
  `How ${brand.name} collects, uses, and protects information when you visit our site or use our services.`,
  { path: "/privacy" }
);

export default function PrivacyPage() {
  return (
    <LegalDocument title="Privacy Policy" lastUpdated="November 4, 2026">
      <LegalSection heading="Overview">
        <p>
          {brand.name} (&quot;Synapto,&quot; &quot;we,&quot; &quot;us&quot;) respects your privacy. This
          Privacy Policy describes how we handle personal information when you visit{" "}
          {brand.domain}, submit forms, or use our commerce platform and related services
          (collectively, the &quot;Services&quot;).
        </p>
      </LegalSection>

      <LegalSection heading="Information we collect">
        <p>Depending on how you interact with us, we may collect:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-midnight">Contact and account information</strong>—such as
            name, email, organization, business type, and messages you submit through forms or
            support channels.
          </li>
          <li>
            <strong className="text-midnight">Usage and device information</strong>—such as IP
            address, browser type, pages viewed, and approximate location derived from IP.
          </li>
          <li>
            <strong className="text-midnight">Customer platform data</strong>—if you use our
            Services as a business customer, we process data you and your buyers submit to operate
            your storefront (for example, orders and customer records) according to your agreement
            with us.
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="How we use information">
        <p>We use information to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Respond to inquiries, schedule demos, and provide customer support</li>
          <li>Operate, secure, and improve the Services</li>
          <li>Send service-related communications you expect (not unsolicited spam)</li>
          <li>Comply with law and enforce our agreements</li>
        </ul>
      </LegalSection>

      <LegalSection heading="Legal bases (where applicable)">
        <p>
          Where required by law, we rely on appropriate bases such as contract performance,
          legitimate interests (for example, securing our website), consent (where you opt in), and
          legal obligation.
        </p>
      </LegalSection>

      <LegalSection heading="Sharing">
        <p>
          We share information with service providers that help us host infrastructure, send email,
          analyze site performance, or support onboarding—bound by confidentiality and data
          processing terms. We may disclose information if required by law or to protect rights,
          safety, and integrity of the Services.
        </p>
        <p>We do not sell personal information as that term is commonly defined in U.S. state privacy laws.</p>
      </LegalSection>

      <LegalSection heading="Retention">
        <p>
          We retain information as long as needed for the purposes described above, to meet legal
          obligations, resolve disputes, and enforce agreements. Retention for platform customer
          data is governed by your commercial agreement.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          We implement administrative, technical, and organizational measures designed to protect
          information. No method of transmission or storage is completely secure; we cannot guarantee
          absolute security.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          You may request access, correction, or deletion of marketing contact information by
          emailing {brand.email}. Additional rights may apply depending on your jurisdiction.
        </p>
      </LegalSection>

      <LegalSection heading="International visitors">
        <p>
          If you access the Services from outside the United States, you understand information may
          be processed in the U.S. or other locations where we or our providers operate.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          Our marketing site and Services are not directed to children under 16. We do not knowingly
          collect personal information from children.
        </p>
      </LegalSection>

      <LegalSection heading="Changes">
        <p>
          We may update this Privacy Policy from time to time. We will post the revised version with
          an updated &quot;Last updated&quot; date.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about privacy:{" "}
          <a href={`mailto:${brand.email}`} className="text-primary hover:underline">
            {brand.email}
          </a>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
