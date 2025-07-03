import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Dot } from "lucide-react";
import { usePathname } from "next/navigation";

const AddServicesSidebar = () => {
  const pathname = usePathname();

  return (
    <div className="bg-white w-full h-auto p-4 rounded-2xl shadow">
      <NavigationMenu className="w-full max-w-full">
        <NavigationMenuList className="w-full flex flex-col justify-start items-start text-sm text-[#41526A]">
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/services/add-new-services"
              className={`w-full flex flex-row justify-start items-center gap-0
                ${pathname === "/dashboard/admin/services/add-new-services" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Basic detail</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/services/add-new-services/location"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/services/add-new-services/location" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Location & Contact</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/services/add-new-services/team"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/services/add-new-services/team" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Team</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/services/add-new-services/client"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/services/add-new-services/client" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Client</span>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem className="w-full group !ml-0">
            <Link
              href="/dashboard/admin/services/add-new-services/shift-calendar"
              className={`w-full flex flex-row justify-start items-center gap-0 
                ${pathname === "/dashboard/admin/services/add-new-services/shift-calendar" ? " bg-cyan text-white" : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"}`}
            >
              <div className="p-5 bg-transparent group-hover:bg-cyan">
                <Dot size={25} />
              </div>
              <span className="px-2 py-5 font-medium">Shift Calendar </span>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default AddServicesSidebar;
