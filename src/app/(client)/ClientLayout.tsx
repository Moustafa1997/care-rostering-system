"use client";

export default function ClientLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Show the full layout for authenticated users on non-login pages
  return <div className="grid grid-cols-12 gap-0">{children}</div>;
}
