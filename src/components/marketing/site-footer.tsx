import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { brand, footerLinks } from "@/content/brand";

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-white/50">
        {title}
      </p>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-white/70 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-charcoal text-white">
      <div className="container-page py-12 sm:py-14 md:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.2fr_repeat(4,1fr)] lg:gap-12">
          <div className="max-w-sm sm:col-span-2 lg:col-span-1">
            <Logo variant="dark" />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {brand.tagline}
            </p>
            <p className="mt-5 text-sm text-white/50">{brand.email}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["LinkedIn", "X", "YouTube"].map((network) => (
                <a
                  key={network}
                  href="#"
                  className="rounded-full border border-white/10 px-3 py-2 text-xs text-white/60 transition hover:border-white/25 hover:text-white"
                  aria-label={network}
                >
                  {network}
                </a>
              ))}
            </div>
          </div>
          <FooterColumn title="Platform" links={footerLinks.platform} />
          <FooterColumn title="Solutions" links={footerLinks.solutions} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 sm:mt-12 sm:pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <p className="text-xs text-white/40">
              © 2026 {brand.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-white/40 transition hover:text-white/70"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
