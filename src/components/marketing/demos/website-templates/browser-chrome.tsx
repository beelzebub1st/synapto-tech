import { ShieldCheck } from "lucide-react";

export function BrowserChrome({
  domain,
  accent = "bg-[#e8eeec]",
}: {
  domain: string;
  accent?: string;
}) {
  return (
    <div className={`flex items-center gap-3 border-b border-black/5 px-3 py-2.5 sm:px-4 ${accent}`}>
      <div className="flex gap-1.5">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex min-w-0 flex-1 items-center rounded-lg bg-white px-3 py-1.5 text-xs text-[#5a6b72] shadow-sm">
        <ShieldCheck className="mr-2 h-3.5 w-3.5 shrink-0 text-primary" />
        <span className="truncate">{domain}</span>
      </div>
    </div>
  );
}
