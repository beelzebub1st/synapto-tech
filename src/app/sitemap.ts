import type { MetadataRoute } from "next";
import { industries } from "@/content/brand";
import { blogPosts } from "@/content/blog/posts";
import { caseStudies } from "@/content/case-studies";
import { demos } from "@/content/demos";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const staticRoutes = [
    "",
    "/platform",
    "/features",
    "/solutions",
    "/pricing",
    "/ai-agents",
    "/clinic-website",
    "/about",
    "/contact",
    "/book-a-demo",
    "/start",
    "/reserve",
    "/demos",
    "/work",
    "/blog",
    "/faq",
    "/privacy",
    "/terms",
    "/cookies",
    "/acceptable-use",
    "/healthcare-commerce-disclaimer",
    "/login",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-03-01"),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.7,
  }));

  const industryRoutes = industries.map((industry) => ({
    url: `${base}/solutions/${industry.slug}`,
    lastModified: new Date("2026-03-01"),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const demoRoutes = demos.map((demo) => ({
    url: `${base}/demos/${demo.id}`,
    lastModified: new Date("2026-11-10"),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const workRoutes = caseStudies.map((study) => ({
    url: `${base}/work/${study.slug}`,
    lastModified: new Date("2026-03-01"),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...industryRoutes,
    ...blogRoutes,
    ...demoRoutes,
    ...workRoutes,
  ];
}
