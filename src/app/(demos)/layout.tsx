export default function DemosLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-[100dvh] bg-ink text-white">{children}</div>;
}
