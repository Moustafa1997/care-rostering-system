import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { UsersRound } from "lucide-react";
import { MapPinned } from "lucide-react";
import { Calendar } from "lucide-react";
import { Banknote } from "lucide-react";
import { CalendarCheck2 } from "lucide-react";
import { Settings } from "lucide-react";
import { Users } from "lucide-react";
import { usePathname } from "next/navigation";

const adminMenu = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex h-screen">
      <NavigationMenu className="w-full max-w-full">
        <NavigationMenuList className="w-full flex flex-col justify-start items-start text-sm text-white">
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <LayoutDashboard className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Dashboard</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/team"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/team" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <UsersRound className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Team</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/clients"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/clients" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Users className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Clients</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/services"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/services" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Settings className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Services</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <CalendarCheck2 className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Schedule</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/finance"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/finance" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Banknote className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Finance</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/absence"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/absence" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Calendar className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Absence</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <MapPinned className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Live tracking</span>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default adminMenu;
