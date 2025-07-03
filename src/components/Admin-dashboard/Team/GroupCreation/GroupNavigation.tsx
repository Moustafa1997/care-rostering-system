import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

interface GroupNavigationProps {
  title: string;
  showCreateButton?: boolean;
  showBackButton?: boolean;
  backUrl?: string;
}

export default function GroupNavigation({
  title,
  showCreateButton = false,
  showBackButton = true,
  backUrl = "/dashboard/admin/team/group-creation/group-list"
}: GroupNavigationProps) {
  const router = useRouter();
  const pathname = usePathname();

  const getBreadcrumbItems = () => {
    const items = [
      { label: "Team", url: "/dashboard/admin/team" },
      {
        label: "Group-List",
        url: "/dashboard/admin/team/group-creation/group-list"
      }
    ];

    // Add dynamic breadcrumb based on current path
    if (pathname.includes("/view/")) {
      items.push({ label: "Group Detail", url: "" });
    } else if (pathname.includes("/edit/")) {
      items.push({ label: "Edit Group", url: "" });
    } else if (
      pathname.includes("/group-creation") &&
      !pathname.includes("/group-list")
    ) {
      items.push({ label: "Group Creation", url: "" });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  const handleBack = () => {
    router.push(backUrl);
  };

  const handleCreate = () => {
    router.push("/dashboard/admin/team/group-creation");
  };

  return (
    <div className="mb-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-500 mb-4">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span>/</span>}
            {item.url ? (
              <button
                onClick={() => router.push(item.url)}
                className="hover:text-blue-600 transition-colors"
              >
                {item.label}
              </button>
            ) : (
              <span className="text-[#959595]">{item.label}</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Header with title and actions */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl text-gray-500 font-semibold mb-4">{title}</h1>

        <div className="flex gap-2">
          {showBackButton && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          )}
          {showCreateButton && (
            <Button variant="default" onClick={handleCreate}>
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
