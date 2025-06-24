"use client";

import ManagerSideBar from "@/components/SIdebar/managerSideBar";
import ManagerHeader from "@/components/Header/managerHeader";

export default function ManagerLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="flex flex-col">
        <ManagerSideBar />
      </aside>
      <main className="w-full flex flex-col justify-start bg-slate-50 overflow-hidden">
        <ManagerHeader />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
