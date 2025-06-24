"use client";

import DashboardCard from "@/components/ui/dashboardCards";
import AlertsTable from "@/components/ui/admin/alerts-tabel";
import EventsTable from "@/components/ui/admin/events-tabel";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { MoveRight } from "lucide-react";
import Link from "next/link";
import { useDashboardSummary } from "@/hooks/admin/useDashboardSummary";

export default function AdminDashboard() {
  const { summary } = useDashboardSummary();

  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col justify-between gap-4 2xl:col-span-9 lg:col-span-12">
          <div className="flex gap-4">
            <DashboardCard
              variant="admin"
              icon="/images/card-1.svg"
              title="Total Shifts Completed"
              value={summary?.total || "23/25"}
              color="bg-[#5473E8]"
              width="w-[435px] 2xl:h-[127px] lg:h-auto"
              dropdown="Weekly"
              Badge="+5% from last week"
            />
            <DashboardCard
              variant="admin"
              icon="/images/card-2.svg"
              title="Total Clients"
              value={summary?.active || 50}
              color="bg-[#5473E8]"
              width="w-[435px] 2xl:h-[127px] lg:h-auto"
              dropdown="All Services"
              tag="Active"
            />
          </div>
          <div className="flex gap-4">
            <DashboardCard
              variant="admin"
              icon="/images/total-services.svg"
              title="Late Start"
              value={summary?.inactive || "4"}
              Day="Today"
              color="bg-[#5473E8]"
              width="w-[435px] 2xl:h-[127px] lg:h-auto"
              Badge="+2% higher then yesterday"
            />
            <DashboardCard
              variant="admin"
              icon="/images/staff.svg"
              title="Total Staffs"
              value={summary?.availabilityPending || 30}
              color="bg-[#5473E8]"
              width="w-[435px] 2xl:h-[127px] lg:h-auto"
              tag="Active"
              staffBadge="+2% higher then yesterday"
            />
          </div>
          <div className="flex gap-4">
            <DashboardCard
              variant="admin"
              icon="/images/total-services.svg"
              title="Total service"
              value={summary?.availabilityDone || "40"}
              color="bg-[#5473E8]"
              width="w-[435px] 2xl:h-[100px] lg:h-auto"
            />
           <Link href="/dashboard/admin/ask-availability">
              <DashboardCard
              variant="admin"
              icon="/images/total-services.svg"
              title="Availability request"
              value={summary?.availabilityPending || ""}
              color="bg-[#5473E8]"
              width="w-[435px] 2xl:h-[100px] lg:h-auto"
            />
           </Link>
          </div>
        </div>

        <div className="flex 2xl:flex-col lg:flex-row gap-4 2xl:col-span-3 lg:col-span-12">
          <div className="bg-cyan text-white rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity w-[290px] 2xl:h-[170px] lg:h-auto">
            <div className="flex justify-between h-full">
              <div className="flex flex-col justify-around">
                <ImageComponent
                  src="/images/payroll.svg"
                  alt="card"
                  width={50}
                  height={50}
                  className="bg-[#2CE6F3] p-3 rounded-full !h-[45px] !w-[45px]"
                />
                <span className="text-sm font-medium">Payments Paid</span>
              </div>
              <div className="flex flex-col justify-around">
                <div>
                  <span className="text-sm font-medium">Payroll</span>
                  <h3 className="text-4xl font-semibold text-white">$2564</h3>
                </div>
                <div className="flex gap-12">
                  <span className="text-lg font-semibold">$2000</span>
                  <MoveRight />
                </div>
              </div>
            </div>
          </div>
          <div className="bg-cyan text-white rounded-lg p-4 cursor-pointer hover:opacity-90 transition-opacity w-[290px] 2xl:h-[205px] lg:h-auto">
            <div className="flex gap-8">
              <ImageComponent
                src="/images/new-req.svg"
                alt="card"
                width={50}
                height={50}
                className="bg-[#2CE6F3] p-3 rounded-full !h-[45px] !w-[45px]"
              />
              <div>
                <span className="text-sm font-medium">New Request</span>
                <h3 className="text-4xl font-semibold text-white">2</h3>
              </div>
            </div>
            <div className="flex justify-between bg-[#EBFEFF] rounded-lg p-2 items-center">
              <div className="text-sm font-normal">
                <p>Request from:</p>
                <p className="font-semibold"> John Deo</p>
              </div>
              <div className="text-black">
                {" "}
                <MoveRight />
              </div>
            </div>
            <div className="mt-2">
              <Link href={""} className="text-sm font-semibold">
                View All
              </Link>
            </div>
          </div>
        </div>
      </div>

      <AlertsTable value={""} onChange={() => {}} />
      <EventsTable />
    </div>
  );
}
