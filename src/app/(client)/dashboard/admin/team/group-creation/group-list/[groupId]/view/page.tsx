"use client";

import { useParams, useRouter } from "next/navigation";
import { useGroup } from "@/hooks/groups";
import { Button } from "@/components/ui/button";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import GroupNavigation from "@/components/Admin-dashboard/Team/GroupCreation/GroupNavigation";

export default function ViewGroupPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;

  const { group, isLoading, error } = useGroup(groupId);

  const handleEdit = () => {
    router.push(
      `/dashboard/admin/team/group-creation/group-list/${groupId}/edit`
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">Error loading group details</div>
      </div>
    );
  }

  return (
    <section>
      <GroupNavigation
        title="Group Detail"
        showCreateButton={false}
        showBackButton={true}
      />

      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="w-full col-span-12">
            <p className="text-sm font-medium text-[#41526A]">Group name</p>
            <h3 className="text-xl font-semibold text-[#41526A]">
              {group?.groupName || "Loading..."}
            </h3>
          </div>
          <div className="w-full col-span-12">
            <p className="text-sm font-medium text-[#41526A] mb-4">Staff</p>
            {group?.staff && group.staff.length > 0 ? (
              group.staff.map((staffMember, index) => (
                <div key={index} className="flex gap-2 mb-4">
                  <ImageComponent
                    src={staffMember.photo || "/images/user.svg"}
                    width={20}
                    height={20}
                    alt="user"
                  />
                  <span className="text-base font-normal text-[#41526A]">
                    {staffMember.fullName}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No staff members assigned</p>
            )}
            <div className="mt-8">
              <Button variant="default" onClick={handleEdit}>
                Edit detail
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
