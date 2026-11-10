"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function SettingsPage() {
  const [orgName, setOrgName] = useState("Meridian Wellness Group");
  const [timezone, setTimezone] = useState("America/New_York");
  const [saved, setSaved] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-midnight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Organization preferences.</p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Organization</CardTitle>
          <CardDescription>Used for billing and team invites</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
              setTimeout(() => setSaved(false), 2000);
            }}
          >
            <div className="space-y-2">
              <Label htmlFor="org">Organization name</Label>
              <Input id="org" value={orgName} onChange={(e) => setOrgName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tz">Timezone</Label>
              <Input id="tz" value={timezone} onChange={(e) => setTimezone(e.target.value)} />
            </div>
            <Button type="submit">{saved ? "Saved" : "Save settings"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
