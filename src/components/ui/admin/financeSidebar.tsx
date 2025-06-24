import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Dot } from "lucide-react";
import { usePathname } from "next/navigation";

const FinanceSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white w-full h-auto p-4 rounded-2xl shadow">
      <NavigationMenu className="w-full max-w-full">
        <NavigationMenuList className="w-full flex flex-col justify-start items-start text-sm text-[#41526A]">
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/finance"
              className={`w-full flex flex-row justify-start items-center gap-0
                ${pathname === "/dashboard/admin/finance" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Overview</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/finance/staff-payroll"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/finance/staff-payroll" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Staff payroll</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/finance/service-payroll"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/finance/service-payroll" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Service payroll</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/finance/forecasting"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/finance/forecasting" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Forecasting</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/finance"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/finance" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Overtime</span>
            </Link>
          </NavigationMenuItem>
            <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/finance"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/finance" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Comparison</span>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default FinanceSidebar;
