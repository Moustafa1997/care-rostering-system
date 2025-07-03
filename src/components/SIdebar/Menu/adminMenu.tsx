import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import {
  LayoutDashboard,
  UsersRound,
  MapPinned,
  Calendar,
  Banknote,
  CalendarCheck2,
  Settings,
  Users,
} from "lucide-react";
import { usePathname } from "next/navigation";

const AdminMenu = () => {
  const pathname = usePathname();

  const isActivePath = (basePath: string, exact = false) =>
    exact ? pathname === basePath : pathname.startsWith(basePath);

  const getLinkClass = (basePath: string, exact = false) =>
    `w-full flex flex-row justify-start items-center gap-0 ${
      isActivePath(basePath, exact)
        ? "text-white bg-blue-dark3 border-r-4 border-r-cyan"
        : "group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"
    }`;

  const getIconWrapperClass = (basePath: string, exact = false) => `p-5 ${
    isActivePath(basePath, exact)
    ?"bg-cyan" : "bg-transparent"}`;

  const links = [
    {
      href: "/dashboard/admin",
      label: "Dashboard",
      icon: <LayoutDashboard className="text-[15px]" />,
      exact: true,
    },
    {
      href: "/dashboard/admin/team",
      label: "Team",
      icon: <UsersRound className="text-[15px]" />,
    },
    {
      href: "/dashboard/admin/clients",
      label: "Clients",
      icon: <Users className="text-[15px]" />,
    },
    {
      href: "/dashboard/admin/services",
      label: "Services",
      icon: <Settings className="text-[15px]" />,
    },
    {
      href: "/dashboard/admin/schedule",
      label: "Schedule",
      icon: <CalendarCheck2 className="text-[15px]" />,
    },
    {
      href: "/dashboard/admin/finance",
      label: "Finance",
      icon: <Banknote className="text-[15px]" />,
    },
    {
      href: "/dashboard/admin/absence",
      label: "Absence",
      icon: <Calendar className="text-[15px]" />,
    },
    {
      href: "/dashboard/admin/live-tracking",
      label: "Live tracking",
      icon: <MapPinned className="text-[15px]" />,
    },
  ];

  return (
    <div className="w-full flex h-screen">
      <NavigationMenu className="w-full max-w-full">
        <NavigationMenuList className="w-full flex flex-col justify-start items-start text-sm text-white">
          {links.map(({ href, label, icon, exact = false }) => (
            <NavigationMenuItem key={href} className="w-full group !ml-0">
              <Link href={href} className={getLinkClass(href, exact)}>
                <div className={getIconWrapperClass(href, exact)}>{icon}</div>
                <span className="px-2 py-5">{label}</span>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default AdminMenu;
