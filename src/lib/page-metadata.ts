import type { Metadata } from "next";
import { brand } from "@/content/brand";

export function pageMetadata(
  title: string,
  description: string,
  options?: { path?: string }
): Metadata {
  const fullTitle = `${title} | ${brand.name}`;
  const url = options?.path
    ? `https://${brand.domain}${options.path}`
    : `https://${brand.domain}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: brand.name,
      type: "website",
    },
  };
}
