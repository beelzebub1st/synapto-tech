import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogPostBody } from "@/components/marketing/blog-post-body";
import { FadeIn } from "@/components/marketing/fade-in";
import { Section } from "@/components/marketing/section";
import { Button } from "@/components/ui/button";
import { blogPosts, getPostBySlug } from "@/content/blog/posts";
import { pageMetadata } from "@/lib/page-metadata";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return pageMetadata(post.title, post.excerpt, { path: `/blog/${slug}` });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <Section className="border-b border-border/60 pb-10 pt-12 md:pb-14 md:pt-16">
        <FadeIn className="mx-auto max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
            {post.category}
          </p>
          <h1 className="mt-4 text-balance text-3xl font-semibold tracking-tight text-midnight md:text-5xl md:leading-[1.08]">
            {post.title}
          </h1>
          <p className="mt-4 text-sm text-muted-foreground">
            {formatDate(post.publishedAt)} · {post.readingMinutes} min read
          </p>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
            {post.excerpt}
          </p>
        </FadeIn>
      </Section>

      <Section className="pt-10 md:pt-12">
        <FadeIn className="mx-auto max-w-3xl">
          <BlogPostBody blocks={post.blocks} />
          <div className="mt-12 flex flex-col gap-3 border-t border-border pt-10 sm:flex-row sm:items-center sm:justify-between">
            <Button asChild variant="outline">
              <Link href="/blog">← All articles</Link>
            </Button>
            <Button asChild>
              <Link href="/book-a-demo">Book a demo</Link>
            </Button>
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
