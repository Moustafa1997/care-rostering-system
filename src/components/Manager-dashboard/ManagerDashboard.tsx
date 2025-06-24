"use client";

import DashboardCard from "@/components/ui/dashboardCards";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { Plus, MoveRight } from "lucide-react";
import Link from "next/link";
import { useDashboardData } from "@/hooks/contractors/useDashboardData";
import ContractorTable from "../ui/manager-contractor/contractor-table";

export default function ManagerDashboard() {
  const { summary, recentContracts, isLoading, error } = useDashboardData();

  console.log("ManagerDashboard:", {
    summary,
    recentContracts,
    isLoading,
    error
  });

  if (isLoading || !summary) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Error loading dashboard: {error.error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-4xl text-gray-500 font-semibold">Rostering system</h1>

      <div className="grid 2xl:grid-cols-5 lg:grid-cols-3 gap-4">
        <DashboardCard
          icon="/images/card-1.svg"
          title="Total contractor"
          value={summary.total}
          color="bg-purple"
        />
        <DashboardCard
          icon="/images/card-2.svg"
          title="Active contracts"
          value={summary.Active}
          color="bg-green"
        />
        <DashboardCard
          icon="/images/card-3.svg"
          title="Pending contractor"
          value={summary.Pending}
          color="bg-cream"
        />
        <DashboardCard
          icon="/images/card-4.svg"
          title="Inactive contractor"
          value={summary.Inactive}
          color="bg-gray-600"
        />

        <Link
          href="/dashboard/manager/register"
          className="bg-primaryColors-blue text-white rounded-lg flex items-center justify-center cursor-pointer p-6"
        >
          <div className="gap-4 flex flex-col">
            <div className="flex items-start mb-2">
              <ImageComponent
                src="/images/card-5.svg"
                alt="card"
                width={60}
                height={60}
              />
              <Plus />
            </div>
            <p className="font-semibold text-3xl text-white">
              Add new contractor
            </p>
            <div className="flex justify-end">
              <MoveRight />
            </div>
          </div>
        </Link>
      </div>

      <ContractorTable contractors={recentContracts ?? []} />
    </div>
  );
}
