"use client";

import AdminSideBar from "@/components/SIdebar/adminSideBar";
import AdminHeader from "@/components/Header/adminHeader";

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="lg:w-[25%] 2xl:w-[20%] flex flex-col">
        <AdminSideBar />
      </aside>
      <main className="w-full flex flex-col justify-start bg-slate-50 overflow-hidden">
        <AdminHeader />
        <div className="p-4">{children}</div>
      </main>
    </div>
  );
}
