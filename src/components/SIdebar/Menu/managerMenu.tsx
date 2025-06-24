"use client";

import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { LayoutDashboard } from "lucide-react";
import { UsersRound } from "lucide-react";
import { Settings } from "lucide-react";
import { Users } from "lucide-react";
import { usePathname } from "next/navigation";

const managerMenu = () => {
  const pathname = usePathname();

  return (
    <div className="w-full flex h-screen">
      <NavigationMenu className="w-full max-w-full">
        <NavigationMenuList className="w-full flex flex-col justify-start items-start text-sm text-white overflow-hidden">
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/manager"
              className={`w-full flex flex-row justify-start items-center gap-0 truncate
                ${pathname === "/dashboard/manager" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div
                className={`p-5 bg-transparent ${pathname === "/dashboard/manager" ? "bg-cyan" : "group-hover:bg-cyan"}`}
              >
                <LayoutDashboard className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Dashboard</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/manager/contractors"
              className={`w-full flex flex-row justify-start items-center gap-0 truncate
                ${pathname === "/dashboard/manager/contractors" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div
                className={`p-5 bg-transparent ${pathname === "/dashboard/manager/contractors" ? "bg-cyan" : "group-hover:bg-cyan"}`}
              >
                <UsersRound className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Contractors</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/manager/register"
              className={`w-full flex flex-row justify-start items-center gap-0 truncate
                ${pathname === "/dashboard/manager/register" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div
                className={`p-5 bg-transparent ${pathname === "/dashboard/manager/register" ? "bg-cyan" : "group-hover:bg-cyan"}`}
              >
                <Users className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Register contractors</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/manager/settings"
              className={`w-full flex flex-row justify-start items-center gap-0 truncate
                ${pathname === "/dashboard/manager/settings" ? "text-white bg-blue-dark3 border-r-4 border-r-cyan" : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"}`}
            >
              <div
                className={`p-5 bg-transparent ${pathname === "/dashboard/manager/settings" ? "bg-cyan" : "group-hover:bg-cyan"}`}
              >
                <Settings className="text-[15px]" />
              </div>
              <span className="px-2 py-5">Setting</span>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default managerMenu;
