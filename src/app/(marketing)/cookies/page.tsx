import { LegalDocument, LegalSection } from "@/components/marketing/legal-document";
import { brand } from "@/content/brand";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Cookie Policy",
  `How ${brand.name} uses cookies and similar technologies on ${brand.domain}.`,
  { path: "/cookies" }
);

export default function CookiesPage() {
  return (
    <LegalDocument title="Cookie Policy" lastUpdated="November 4, 2026">
      <LegalSection heading="What are cookies?">
        <p>
          Cookies are small text files stored on your device when you visit a website. Similar
          technologies include local storage, pixels, and session identifiers. They help sites
          function, remember preferences, and understand usage.
        </p>
      </LegalSection>

      <LegalSection heading="How we use cookies">
        <p>On {brand.domain}, we may use:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-midnight">Strictly necessary cookies</strong>—required for
            security, load balancing, and basic site functionality.
          </li>
          <li>
            <strong className="text-midnight">Preference cookies</strong>—remember choices such as
            dismissed banners where implemented.
          </li>
          <li>
            <strong className="text-midnight">Analytics cookies</strong>—help us understand aggregate
            traffic and improve content (often via third-party analytics providers).
          </li>
        </ul>
      </LegalSection>

      <LegalSection heading="Third parties">
        <p>
          Analytics or embedded content providers may set their own cookies subject to their
          policies. We select providers with reasonable security and data practices but do not
          control third-party cookies directly.
        </p>
      </LegalSection>

      <LegalSection heading="Your choices">
        <p>
          Most browsers let you block or delete cookies. Blocking strictly necessary cookies may
          impair site functionality. Where required by law, we will present a consent mechanism for
          non-essential cookies.
        </p>
      </LegalSection>

      <LegalSection heading="Do Not Track">
        <p>
          There is no uniform industry standard for responding to Do Not Track signals. We currently
          do not respond to DNT signals beyond applicable legal requirements.
        </p>
      </LegalSection>

      <LegalSection heading="Updates">
        <p>
          We may update this Cookie Policy when our practices change. Continued use after updates
          constitutes acceptance of the revised policy.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions:{" "}
          <a href={`mailto:${brand.email}`} className="text-primary hover:underline">
            {brand.email}
          </a>
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
