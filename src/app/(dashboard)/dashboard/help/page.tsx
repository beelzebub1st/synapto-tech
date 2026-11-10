import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, BookOpen, LifeBuoy, MessageCircle } from "lucide-react";

const links = [
  {
    title: "Getting started",
    description: "Launch your storefront in under an hour.",
    href: "https://docs.synapto.tech/getting-started",
    icon: BookOpen,
  },
  {
    title: "Contact support",
    description: "Email our team for onboarding help.",
    href: "mailto:support@synapto.tech",
    icon: LifeBuoy,
  },
  {
    title: "Community",
    description: "Join operators building on Synapto.",
    href: "https://community.synapto.tech",
    icon: MessageCircle,
  },
];

export default function HelpCenterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-midnight">Help Center</h1>
        <p className="mt-1 text-sm text-muted-foreground">Guides and support resources.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {links.map(({ title, description, href, icon: Icon }) => (
          <Card key={title} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <Icon className="h-5 w-5 text-primary" aria-hidden />
              <CardTitle className="text-base">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={href}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                Open
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
