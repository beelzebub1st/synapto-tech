"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { ArrowRight, Sparkles } from "lucide-react";

export function LoginForm({ authConfigured }: { authConfigured: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/dashboard";

  const [email, setEmail] = useState(
    authConfigured ? "clinic@northside.test" : ""
  );
  const [password, setPassword] = useState(authConfigured ? "clinic123" : "");
  const [name, setName] = useState("");
  const [mode, setMode] = useState<"sign-in" | "sign-up">("sign-in");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDemoLogin() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/auth/demo", { method: "POST" });
      if (!res.ok) throw new Error("Could not start demo session");
      router.push(next);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (mode === "sign-up") {
        const { error: signUpError } = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0] || "User",
        });
        if (signUpError) {
          setError(signUpError.message ?? "Sign up failed");
          return;
        }
      } else {
        const { error: signInError } = await authClient.signIn.email({
          email,
          password,
        });
        if (signInError) {
          setError(signInError.message ?? "Sign in failed");
          return;
        }
      }
      router.push(next);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="mb-8 lg:hidden">
        <Logo variant="dark" href="/" />
      </div>
      <h1 className="text-2xl font-semibold tracking-tight text-white">
        Welcome back
      </h1>
      <p className="mt-2 text-sm text-white/65">
        {authConfigured
          ? "Sign in to manage your Synapto storefront. Local seed: clinic@northside.test / clinic123"
          : "Auth is not configured locally — continue with demo access."}
      </p>

      {authConfigured ? (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          {mode === "sign-up" ? (
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white/80">
                Full name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Rivera"
                className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
              />
            </div>
          ) : null}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/80">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/80">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              required
              autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="border-white/15 bg-white/10 text-white placeholder:text-white/40"
            />
          </div>
          {error ? (
            <p className="text-sm text-red-300" role="alert">
              {error}
            </p>
          ) : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Please wait…" : mode === "sign-up" ? "Create account" : "Sign in"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <button
            type="button"
            className="w-full text-center text-sm text-white/60 hover:text-white"
            onClick={() => setMode(mode === "sign-in" ? "sign-up" : "sign-in")}
          >
            {mode === "sign-in"
              ? "Need an account? Create one"
              : "Already have an account? Sign in"}
          </button>
        </form>
      ) : (
        <div className="mt-8 space-y-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/75">
            <p className="flex items-start gap-2">
              <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              Demo mode uses sample KPIs, orders, and products. Add{" "}
              <code className="rounded bg-black/30 px-1">DATABASE_URL</code> and{" "}
              <code className="rounded bg-black/30 px-1">BETTER_AUTH_SECRET</code>{" "}
              to enable real accounts.
            </p>
          </div>
          {error ? (
            <p className="text-sm text-red-300" role="alert">
              {error}
            </p>
          ) : null}
          <Button
            type="button"
            className="w-full"
            disabled={loading}
            onClick={() => void handleDemoLogin()}
          >
            {loading ? "Starting demo…" : "Continue with demo dashboard"}
            <ArrowRight className="h-4 w-4" />
          </Button>
          <p className="text-center text-xs text-white/45">
            Or{" "}
            <Link href="/dashboard" className="text-primary hover:underline">
              skip login
            </Link>{" "}
            when auth is not configured.
          </p>
        </div>
      )}
    </div>
  );
}
