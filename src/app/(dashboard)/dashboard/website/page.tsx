"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function WebsiteEditorPage() {
  const [heroHeadline, setHeroHeadline] = useState("Clinical wellness, delivered beautifully");
  const [heroSubheadline, setHeroSubheadline] = useState(
    "Premium supplements and care kits for modern practices."
  );
  const [bannerText, setBannerText] = useState("Free shipping on orders over $150");
  const [aboutText, setAboutText] = useState(
    "Meridian Wellness partners with clinicians to offer trusted products with transparent sourcing."
  );
  const [contactEmail, setContactEmail] = useState("hello@meridian-wellness.com");
  const [contactPhone, setContactPhone] = useState("+1 (555) 012-3456");
  const [seoTitle, setSeoTitle] = useState("Meridian Wellness | Synapto Storefront");
  const [seoDescription, setSeoDescription] = useState(
    "Shop clinician-trusted wellness products with fast fulfillment."
  );
  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-midnight">Website Editor</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Edit public storefront content (preview-only in demo).
        </p>
      </div>
      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Hero</CardTitle>
            <CardDescription>Above-the-fold messaging</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="headline">Headline</Label>
              <Input id="headline" value={heroHeadline} onChange={(e) => setHeroHeadline(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="subheadline">Subheadline</Label>
              <Textarea id="subheadline" rows={2} value={heroSubheadline} onChange={(e) => setHeroSubheadline(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="banner">Promo banner</Label>
              <Input id="banner" value={bannerText} onChange={(e) => setBannerText(e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>About & contact</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="about">About</Label>
              <Textarea id="about" rows={4} value={aboutText} onChange={(e) => setAboutText(e.target.value)} />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Contact email</Label>
                <Input id="email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact phone</Label>
                <Input id="phone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>SEO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="seo-title">Meta title</Label>
              <Input id="seo-title" value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="seo-desc">Meta description</Label>
              <Textarea id="seo-desc" rows={3} value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} />
            </div>
          </CardContent>
        </Card>
        <Button type="submit">{saved ? "Published preview" : "Save draft"}</Button>
      </form>
    </div>
  );
}
