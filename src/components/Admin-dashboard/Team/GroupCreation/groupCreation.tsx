import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useAvailableStaff, useCreateGroup } from "@/hooks/groups";
import { CreateGroupRequest, AvailableStaff } from "@/types/group";
import GroupNavigation from "./GroupNavigation";

export default function GroupCreation() {
  const router = useRouter();
  const [groupName, setGroupName] = useState("");
  const [selectedStaff, setSelectedStaff] = useState<string[]>([]);
  const [staffSearch, setStaffSearch] = useState("");
  const [showStaffSelector, setShowStaffSelector] = useState(false);

  const { availableStaff, isLoading: staffLoading } = useAvailableStaff({
    search: staffSearch
  });

  const { createGroup, isLoading: createLoading } = useCreateGroup();

  const handleCreateGroup = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }

    if (selectedStaff.length === 0) {
      alert("Please select at least one staff member");
      return;
    }

    try {
      const groupData: CreateGroupRequest = {
        name: groupName,
        staff: selectedStaff
      };

      await createGroup(groupData);
      router.push("/dashboard/admin/team/group-creation/group-list");
    } catch (error) {
      console.error("Failed to create group:", error);
    }
  };

  const handleAddStaff = (staff: AvailableStaff) => {
    if (!selectedStaff.includes(staff._id)) {
      setSelectedStaff([...selectedStaff, staff._id]);
    }
    setShowStaffSelector(false);
    setStaffSearch("");
  };

  const handleRemoveStaff = (staffId: string) => {
    setSelectedStaff(selectedStaff.filter((id) => id !== staffId));
  };

  const getSelectedStaffNames = () => {
    return availableStaff.filter((staff) => selectedStaff.includes(staff._id));
  };

  return (
    <section>
      <GroupNavigation
        title="Create Group"
        showCreateButton={false}
        showBackButton={true}
      />

      <p className="text-[#3553EE] text-sm font-medium mb-6">
        Select staff to create a new group
      </p>

      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Group detail */}
        <h2 className="text-xl font-semibold text-gray-500">Group detail</h2>

        <div className="space-y-6">
          <div className="w-2/4">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Group name
            </label>
            <Input
              variant="bordered"
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label className="block text-sm font-normal text-[#2F3E53] mb-3">
              Add Staff
            </label>

            {/* Selected Staff Display */}
            <div className="mb-4">
              {getSelectedStaffNames().map((staff) => (
                <div
                  key={staff._id}
                  className="flex items-center gap-2 mb-2 p-2 bg-gray-50 rounded-md"
                >
                  <span className="text-sm text-[#41526A]">
                    {staff.fullName}
                  </span>
                  <button
                    onClick={() => handleRemoveStaff(staff._id)}
                    className="text-red hover:text-darkRed"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Staff Button */}
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowStaffSelector(!showStaffSelector)}
              className="w-44"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>

            {/* Staff Selector */}
            {showStaffSelector && (
              <div className="mt-4 p-4 border border-gray-200 rounded-md">
                <Input
                  variant="bordered"
                  type="text"
                  placeholder="Search staff..."
                  value={staffSearch}
                  onChange={(e) => setStaffSearch(e.target.value)}
                  className="mb-4"
                />

                {staffLoading ? (
                  <div className="text-sm text-gray-500">Loading staff...</div>
                ) : (
                  <div className="max-h-40 overflow-y-auto">
                    {availableStaff.length > 0 ? (
                      availableStaff.map((staff) => (
                        <div
                          key={staff._id}
                          onClick={() => handleAddStaff(staff)}
                          className="p-2 hover:bg-gray-50 cursor-pointer rounded-md"
                        >
                          <div className="text-sm font-medium text-[#41526A]">
                            {staff.fullName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {staff.email} • {staff.role}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500">
                        No available staff found
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          variant="default"
          className="w-40"
          onClick={handleCreateGroup}
          disabled={createLoading}
        >
          {createLoading ? "Creating..." : "Create group"}
        </Button>
      </div>
    </section>
  );
}
