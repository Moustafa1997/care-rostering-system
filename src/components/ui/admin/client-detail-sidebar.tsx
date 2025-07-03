import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Dot } from "lucide-react";
import { usePathname } from "next/navigation";

const ClientDetailSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white w-full h-auto p-4 rounded-2xl shadow">
      <NavigationMenu className="w-full max-w-full">
        <NavigationMenuList className="w-full flex flex-col justify-start items-start text-sm text-[#41526A]">
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/clients/client-detail"
              className={`w-full flex flex-row justify-start items-center gap-0
                ${pathname === "/dashboard/admin/clients/client-detail" ? " bg-cyan text-white" : " group-hover:text-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div
                className={`transition-colors p-5 duration-200 ${
                  pathname ===
                  "/dashboard/admin/clients/client-detail"
                    ? "text-white"
                    : "group-hover:text-cyan text-gray-500"
                }`}
              >
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Personal Detail</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/clients/client-detail/health-detail"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/clients/client-detail/health-detail" ? " bg-cyan text-white" : " group-hover:text-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div
                className={`transition-colors p-5 duration-200 ${
                  pathname ===
                  "/dashboard/admin/clients/client-detail/health-detail"
                    ? "text-white"
                    : "group-hover:text-cyan text-gray-500"
                }`}
              >
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Health Detail</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/clients/client-detail/doctor-gp"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/clients/client-detail/doctor-gp" ? " bg-cyan text-white" : " group-hover:text-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div
                className={`transition-colors p-5 duration-200 ${
                  pathname ===
                  "/dashboard/admin/clients/client-detail/doctor-gp"
                    ? "text-white"
                    : "group-hover:text-cyan text-gray-500"
                }`}
              >
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Doctor / GP</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/clients/client-detail/documents"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/clients/client-detail/documents" ? " bg-cyan text-white" : " group-hover:text-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div
                className={`transition-colors p-5 duration-200 ${
                  pathname ===
                  "/dashboard/admin/clients/client-detail/documents"
                    ? "text-white"
                    : "group-hover:text-cyan text-gray-500"
                }`}
              >
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Documents</span>
            </Link>
          </NavigationMenuItem>
          <div className="border border-[#AEB9C9] w-[98%] flex justify-center items-center mt-4 mb-4"></div>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/clients/client-detail/continuity"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/clients/client-detail/continuity" ? " bg-cyan text-white" : " group-hover:text-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div
                className={`transition-colors p-5 duration-200 ${
                  pathname ===
                  "/dashboard/admin/clients/client-detail/continuity"
                    ? "text-white"
                    : "group-hover:text-cyan text-gray-500"
                }`}
              >
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Continuity</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/clients/client-detail/shift-calender"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/clients/client-detail/shift-calender" ? " bg-cyan text-white" : " group-hover:text-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div
                className={`transition-colors p-5 duration-200 ${
                  pathname ===
                  "/dashboard/admin/clients/client-detail/shift-calender"
                    ? "text-white"
                    : "group-hover:text-cyan text-gray-500"
                }`}
              >
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Shift Calendar</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/clients/client-detail/appointments"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/clients/client-detail/appointments" ? " bg-cyan text-white" : " group-hover:text-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div
                className={`transition-colors p-5 duration-200 ${
                  pathname ===
                  "/dashboard/admin/clients/client-detail/appointments"
                    ? "text-white"
                    : "group-hover:text-cyan text-gray-500"
                }`}
              >
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Appointments</span>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default ClientDetailSidebar;
