import { brand } from "@/content/brand";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: process.env.NEXT_PUBLIC_APP_URL ?? "https://synaptotech.com",
    email: brand.email,
    description: brand.tagline,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
