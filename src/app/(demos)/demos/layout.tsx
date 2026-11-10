import { pageMetadata } from "@/lib/page-metadata";

export const metadata = pageMetadata(
  "Product demos",
  "Fullscreen interactive demos of Synapto Tech clinic websites, PWAs, mobile apps, Clinic OS, automations, and AI agents.",
  { path: "/demos" }
);

export default function DemosSectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
