import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/logo";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gradient-mesh px-6 text-center">
      <Logo />
      <h1 className="mt-10 text-4xl font-semibold tracking-tight text-midnight">
        Page not found
      </h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        The page you are looking for does not exist or has moved.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild>
          <Link href="/">Back home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/book-a-demo">Book a Demo</Link>
        </Button>
      </div>
    </div>
  );
}
