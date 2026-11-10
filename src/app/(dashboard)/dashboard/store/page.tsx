"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function StoreSettingsPage() {
  const [name, setName] = useState("Meridian Wellness");
  const [slug, setSlug] = useState("meridian-wellness");
  const [primary, setPrimary] = useState("#526BFF");
  const [secondary, setSecondary] = useState("#101820");
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-midnight">My Store</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Brand identity and storefront defaults (saved locally in this demo).
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Store profile</CardTitle>
          <CardDescription>Name, URL slug, and logo</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="store-name">Store name</Label>
              <Input id="store-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logo">Logo URL</Label>
              <Input id="logo" placeholder="https://…" disabled className="opacity-60" />
              <p className="text-xs text-muted-foreground">Uploads available after storage is connected.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="primary">Primary color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="primary"
                    value={primary}
                    onChange={(e) => setPrimary(e.target.value)}
                    className="h-11 w-14 cursor-pointer rounded-xl border border-input"
                  />
                  <Input value={primary} onChange={(e) => setPrimary(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary">Secondary color</Label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    id="secondary"
                    value={secondary}
                    onChange={(e) => setSecondary(e.target.value)}
                    className="h-11 w-14 cursor-pointer rounded-xl border border-input"
                  />
                  <Input value={secondary} onChange={(e) => setSecondary(e.target.value)} />
                </div>
              </div>
            </div>
            <Button type="submit">{saved ? "Saved" : "Save changes"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
