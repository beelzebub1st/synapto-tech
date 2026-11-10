import { Suspense } from "react";
import Link from "next/link";
import { connection } from "next/server";
import { Logo } from "@/components/brand/logo";
import { hasAuthConfigured } from "@/lib/env";
import { LoginForm } from "./login-form";
import { Lock } from "lucide-react";

export const instant = false;

async function LoginContent() {
  await connection();
  const authConfigured = hasAuthConfigured();

  return (
    <>
      <div className="mb-6 hidden items-center gap-2 text-white/50 lg:flex">
        <Lock className="h-4 w-4" />
        <span className="text-xs uppercase tracking-wide">Secure access</span>
      </div>
      <LoginForm authConfigured={authConfigured} />
      <p className="mt-10 text-center text-xs text-white/40">
        <Link href="/" className="hover:text-white/70">
          ← Back to marketing site
        </Link>
      </p>
    </>
  );
}

export default function LoginPage() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="dark-mesh relative hidden flex-col justify-between p-10 lg:flex">
        <Logo variant="dark" href="/" />
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary/90">
            Synapto Tech
          </p>
          <h2 className="mt-4 max-w-md text-balance text-3xl font-semibold tracking-tight text-white">
            Your clinic-grade commerce command center
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/60">
            Launch storefronts, manage catalog and orders, and edit your public site —
            all from one midnight-clean dashboard.
          </p>
        </div>
        <p className="text-xs text-white/40">© Synapto Tech</p>
      </div>
      <div className="flex flex-col justify-center bg-midnight px-6 py-12 lg:px-16">
        <div className="mx-auto w-full max-w-md">
          <Suspense fallback={<div className="text-white/50">Loading…</div>}>
            <LoginContent />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
