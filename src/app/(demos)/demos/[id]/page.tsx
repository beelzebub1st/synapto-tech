import { notFound } from "next/navigation";
import { DemoShell } from "@/components/marketing/demos/demo-shell";
import { WebsiteDemo } from "@/components/marketing/demos/website-demo";
import { PwaDemo } from "@/components/marketing/demos/pwa-demo";
import { MobileDemo } from "@/components/marketing/demos/mobile-demo";
import { ClinicOsDemo } from "@/components/marketing/demos/clinic-os-demo";
import { AutomationsDemo } from "@/components/marketing/demos/automations-demo";
import { AiDemo } from "@/components/marketing/demos/ai-demo";
import { demos, getDemo, type DemoId } from "@/content/demos";
import { pageMetadata } from "@/lib/page-metadata";

export function generateStaticParams() {
  return demos.map((demo) => ({ id: demo.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const demo = getDemo(id);
  if (!demo) return {};
  return pageMetadata(`${demo.name} demo`, demo.description, {
    path: `/demos/${demo.id}`,
  });
}

function DemoBody({ id }: { id: DemoId }) {
  switch (id) {
    case "website":
      return <WebsiteDemo />;
    case "pwa":
      return <PwaDemo />;
    case "mobile":
      return <MobileDemo />;
    case "clinic-os":
      return <ClinicOsDemo />;
    case "automations":
      return <AutomationsDemo />;
    case "ai":
      return <AiDemo />;
    default:
      return null;
  }
}

export default async function DemoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const demo = getDemo(id);
  if (!demo) notFound();

  return (
    <DemoShell demoId={demo.id}>
      <DemoBody id={demo.id} />
    </DemoShell>
  );
}
