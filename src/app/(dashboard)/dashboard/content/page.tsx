"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

type Section = { id: string; title: string; body: string; visible: boolean };

const initialSections: Section[] = [
  {
    id: "1",
    title: "Featured collections",
    body: "Highlight seasonal bundles and best sellers.",
    visible: true,
  },
  {
    id: "2",
    title: "Clinician testimonials",
    body: "Social proof from partner practices.",
    visible: true,
  },
  {
    id: "3",
    title: "FAQ",
    body: "Shipping, returns, and wholesale inquiries.",
    visible: false,
  },
];

export default function ContentPage() {
  const [sections, setSections] = useState(initialSections);

  function toggle(id: string) {
    setSections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-midnight">Content</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage homepage sections and visibility.</p>
      </div>
      <div className="space-y-4">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
              <div>
                <CardTitle className="text-base">{section.title}</CardTitle>
                <CardDescription>{section.body}</CardDescription>
              </div>
              <Badge variant={section.visible ? "success" : "outline"}>
                {section.visible ? "Visible" : "Hidden"}
              </Badge>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-3">
              <Input defaultValue={section.title} className="max-w-xs" aria-label="Section title" />
              <Button variant="outline" size="sm" onClick={() => toggle(section.id)}>
                {section.visible ? "Hide" : "Show"}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
