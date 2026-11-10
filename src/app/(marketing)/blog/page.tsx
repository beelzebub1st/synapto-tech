import Link from "next/link";
import { PageHero } from "@/components/marketing/page-hero";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section } from "@/components/marketing/section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { blogPosts } from "@/content/blog/posts";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Blog",
  "Insights on healthcare commerce, storefront design, and compliance considerations from Synapto Tech.",
  { path: "/blog" }
);

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Resources"
        title="Blog & guides"
        lead="Practical perspectives on selling online as a clinic, wellness brand, or licensed healthcare business—general information, not legal advice."
        align="center"
      />

      <Section className="pt-0 md:pt-4">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, i) => (
            <FadeIn key={post.slug} delay={0.04 * i}>
              <Link href={`/blog/${post.slug}`} className="group block h-full">
                <Card className="h-full border-border/80 transition-all group-hover:border-primary/25 group-hover:shadow-md">
                  <CardContent className="flex h-full flex-col p-6">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{post.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatDate(post.publishedAt)} · {post.readingMinutes} min read
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-midnight group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 text-sm font-medium text-primary">Read article →</span>
                  </CardContent>
                </Card>
              </Link>
            </FadeIn>
          ))}
        </div>
      </Section>
    </>
  );
}
