import { cn } from "@/lib/utils";

export function Section({
  id,
  className,
  children,
  dark = false,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-12 sm:py-14 md:py-16 lg:py-20",
        dark ? "bg-midnight text-white" : "bg-transparent",
        className
      )}
    >
      <div className="container-page">{children}</div>
    </section>
  );
}

export function SectionEyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-3 text-xs font-medium uppercase tracking-[0.16em] text-primary",
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "max-w-3xl text-balance font-display text-3xl font-semibold tracking-tight text-midnight md:text-4xl md:leading-[1.15]",
        className
      )}
    >
      {children}
    </h2>
  );
}

export function SectionLead({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-[1.05rem]",
        className
      )}
    >
      {children}
    </p>
  );
}
