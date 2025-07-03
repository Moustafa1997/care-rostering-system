import React, { useEffect, useRef } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Dot, Calendar, TrendingUp, BarChart3 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useStaffFormStore } from "@/stores/staffFormStore";

const StaffDetailSideBar = () => {
  console.time("StaffDetailSideBar component render");

  // Track rerenders
  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    console.log(
      `🔄 StaffDetailSideBar rerendered ${renderCount.current} times`
    );
  });

  const pathname = usePathname();
  const router = useRouter();

  const { steps, currentStep, setCurrentStep, formMode } = useStaffFormStore();

  const handleStepClick = (stepIndex: number, step: any) => {
    if (step.isEnabled) {
      console.time("Total step click time");

      console.time("setCurrentStep");
      setCurrentStep(stepIndex);
      console.timeEnd("setCurrentStep");

      console.time("router.push");
      router.push(steps[stepIndex].path);
      console.timeEnd("router.push");

      console.timeEnd("Total step click time");
    }
  };

  // Additional components that only show in view mode
  const viewModeComponents = [
    {
      id: "calendar",
      path: "/dashboard/admin/team/staff-detail/calendar",
      label: "Calendar",
      icon: Calendar
    },
    {
      id: "continuity",
      path: "/dashboard/admin/team/staff-detail/continuity",
      label: "Continuity",
      icon: TrendingUp
    },
    {
      id: "performance",
      path: "/dashboard/admin/team/staff-detail/performance",
      label: "Performance",
      icon: BarChart3
    }
  ];

  console.timeEnd("StaffDetailSideBar component render");

  return (
    <div className="bg-white w-full h-auto p-4 rounded-2xl shadow">
      <NavigationMenu className="w-full max-w-full">
        <NavigationMenuList className="w-full flex flex-col justify-start items-start text-sm text-[#41526A]">
          {/* Regular form steps */}
          {steps.map((step, index) => (
            <NavigationMenuItem key={step.id} className="w-full group !ml-0">
              <Link
                href={step.path}
                className={`w-full flex flex-row justify-start items-center gap-0
                  ${
                    pathname === step.path
                      ? "bg-cyan text-white"
                      : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"
                  }
                  ${!step.isEnabled ? "opacity-50 cursor-not-allowed" : ""}
                `}
                onClick={(e) => {
                  console.time("Link click handler");
                  if (!step.isEnabled) {
                    e.preventDefault();
                    console.timeEnd("Link click handler");
                  } else {
                    console.time("handleStepClick call");
                    handleStepClick(index, step);
                    console.timeEnd("handleStepClick call");
                    console.timeEnd("Link click handler");
                  }
                }}
              >
                <div className="p-5 bg-transparent group-hover:bg-cyan">
                  <Dot size={32} />
                </div>
                <span className="px-2 py-5 font-medium">{step.label}</span>
              </Link>
            </NavigationMenuItem>
          ))}

          {/* View mode only components */}
          {formMode === "view" && (
            <>
              <div className="w-full border-t border-gray-200 my-2"></div>
              {viewModeComponents.map((component) => {
                const IconComponent = component.icon;
                return (
                  <NavigationMenuItem
                    key={component.id}
                    className="w-full group !ml-0"
                  >
                    <Link
                      href={component.path}
                      className={`w-full flex flex-row justify-start items-center gap-0
                        ${
                          pathname === component.path
                            ? "bg-cyan text-white"
                            : "group-hover:text-white group-hover:bg-cyan group-hover:font-bold group-hover:text-sm"
                        }
                      `}
                    >
                      <div className="p-5 bg-transparent group-hover:bg-cyan">
                        <Dot size={32} />
                      </div>
                      <span className="px-2 py-5 font-medium">
                        {component.label}
                      </span>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </>
          )}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default StaffDetailSideBar;
