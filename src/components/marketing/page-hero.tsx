import { FadeIn } from "@/components/marketing/fade-in";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  className,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  children?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}) {
  const centered = align === "center";

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60 pb-10 pt-8 sm:pb-12 sm:pt-10 md:pb-16 md:pt-14",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 gradient-mesh" aria-hidden />
      <div className="container-page relative">
        <FadeIn
          className={cn(
            "max-w-3xl",
            centered && "mx-auto text-center",
            !centered && "max-w-2xl"
          )}
        >
          {eyebrow ? (
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.16em] text-primary sm:mb-4">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className={cn(
              "text-balance text-[1.85rem] font-semibold leading-[1.15] tracking-tight text-midnight sm:text-3xl md:text-5xl md:leading-[1.08]",
              centered && "mx-auto max-w-3xl"
            )}
          >
            {title}
          </h1>
          {lead ? (
            <p
              className={cn(
                "mt-4 text-[0.95rem] leading-relaxed text-muted-foreground sm:mt-5 sm:text-base md:text-lg",
                centered && "mx-auto max-w-2xl"
              )}
            >
              {lead}
            </p>
          ) : null}
          {children ? (
            <div
              className={cn(
                "mt-6 sm:mt-8",
                centered && "flex flex-col items-stretch justify-center sm:flex-row sm:items-center"
              )}
            >
              {children}
            </div>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
