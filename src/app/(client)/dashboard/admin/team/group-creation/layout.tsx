"use client";
import React from "react";

export default function GroupCreationLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="mb-6">
        <main className="flex-col justify-start bg-slate-50">
          <div>{children}</div>
        </main>
      </div>
    </>
  );
}
