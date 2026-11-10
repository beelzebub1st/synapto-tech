import { brand } from "@/content/brand";

export function LegalDocument({
  title,
  lastUpdated,
  children,
}: {
  title: string;
  lastUpdated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="container-page max-w-3xl py-14 md:py-20">
      <header className="border-b border-border pb-8">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
          Legal
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-midnight md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          {brand.name} · Last updated {lastUpdated}
        </p>
      </header>
      <div className="prose-legal mt-10 space-y-6 text-sm leading-relaxed text-muted-foreground md:text-base">
        {children}
      </div>
    </article>
  );
}

export function LegalSection({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold text-midnight">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
