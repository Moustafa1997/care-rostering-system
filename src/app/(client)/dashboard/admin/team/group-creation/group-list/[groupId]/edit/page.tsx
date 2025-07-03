"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useGroup, useAvailableStaff, useUpdateGroup } from "@/hooks/groups";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { CreateGroupRequest, AvailableStaff, GroupStaff } from "@/types/group";
import GroupNavigation from "@/components/Admin-dashboard/Team/GroupCreation/GroupNavigation";

export default function EditGroupPage() {
  const params = useParams();
  const router = useRouter();
  const groupId = params.groupId as string;

  const {
    group,
    isLoading: groupLoading,
    error: groupError
  } = useGroup(groupId);
  const { updateGroup, isLoading: updateLoading } = useUpdateGroup();

  const [groupName, setGroupName] = useState("");
  const [currentStaff, setCurrentStaff] = useState<GroupStaff[]>([]); // Store current staff with IDs
  const [newStaffIds, setNewStaffIds] = useState<string[]>([]); // Store newly added staff IDs
  const [staffSearch, setStaffSearch] = useState("");
  const [showStaffSelector, setShowStaffSelector] = useState(false);

  const { availableStaff, isLoading: staffLoading } = useAvailableStaff({
    search: staffSearch,
    groupId
  });

  // Initialize form with existing group data
  useEffect(() => {
    if (group) {
      setGroupName(group.groupName);
      // Store current staff from the API response
      if (group.staff && group.staff.length > 0) {
        setCurrentStaff(group.staff);
      }
    }
  }, [group]);

  const handleSave = async () => {
    if (!groupName.trim()) {
      alert("Please enter a group name");
      return;
    }

    try {
      // Combine current staff IDs (that haven't been removed) with new staff IDs
      const allStaffIds = [
        ...currentStaff.map((staff) => staff._id),
        ...newStaffIds
      ];

      const groupData: CreateGroupRequest = {
        name: groupName,
        staff: allStaffIds
      };

      await updateGroup(groupId, groupData);
      router.push("/dashboard/admin/team/group-creation/group-list");
    } catch (error) {
      console.error("Failed to update group:", error);
    }
  };

  const handleAddStaff = (staff: AvailableStaff) => {
    // Check if staff is not already in current or new staff
    const isAlreadyAdded =
      currentStaff.some((s) => s._id === staff._id) ||
      newStaffIds.includes(staff._id);

    if (!isAlreadyAdded) {
      setNewStaffIds([...newStaffIds, staff._id]);
    }
    setShowStaffSelector(false);
    setStaffSearch("");
  };

  const handleRemoveCurrentStaff = (staffId: string) => {
    setCurrentStaff(currentStaff.filter((staff) => staff._id !== staffId));
  };

  const handleRemoveNewStaff = (staffId: string) => {
    setNewStaffIds(newStaffIds.filter((id) => id !== staffId));
  };

  const getNewStaffNames = () => {
    return availableStaff.filter((staff) => newStaffIds.includes(staff._id));
  };

  // Filter out staff that are already in the group from available staff
  const getFilteredAvailableStaff = () => {
    const currentStaffIds = currentStaff.map((staff) => staff._id);
    const allSelectedIds = [...currentStaffIds, ...newStaffIds];

    return availableStaff.filter(
      (staff) => !allSelectedIds.includes(staff._id)
    );
  };

  if (groupLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (groupError) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red">Error loading group details</div>
      </div>
    );
  }

  return (
    <section>
      <GroupNavigation
        title="Edit Group"
        showCreateButton={false}
        showBackButton={true}
      />

      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="w-full col-span-12">
            <label className="block text-sm font-normal text-[#2F3E53] mb-3">
              Group name
            </label>
            <div className="border border-primaryColors-blue p-2 w-2/4 rounded-md">
              <Input
                variant="bordered"
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                placeholder="Enter group name"
                className="border-none focus:ring-0"
              />
            </div>
          </div>

          <div className="w-full col-span-12">
            <label className="block text-sm font-normal text-[#2F3E53] mb-3">
              Staff Members
            </label>

            {/* Current Staff Display */}
            {currentStaff.length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#2F3E53] mb-3">
                  Current Staff Members
                </h4>
                <div className="space-y-2">
                  {currentStaff.map((staff) => (
                    <div
                      key={staff._id}
                      className="flex items-center gap-2 p-2 bg-blue-50 rounded-md border border-blue-200"
                    >
                      <span className="text-sm text-[#41526A]">
                        {staff.fullName}
                      </span>
                      <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        Current Member
                      </span>
                      <button
                        onClick={() => handleRemoveCurrentStaff(staff._id)}
                        className="text-red hover:text-red-700 ml-auto"
                        title="Remove from group"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Staff Display */}
            {getNewStaffNames().length > 0 && (
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#2F3E53] mb-3">
                  New Staff Members
                </h4>
                <div className="space-y-2">
                  {getNewStaffNames().map((staff) => (
                    <div
                      key={staff._id}
                      className="flex items-center gap-2 p-2 bg-green-50 rounded-md border border-green-200"
                    >
                      <span className="text-sm text-[#41526A]">
                        {staff.fullName}
                      </span>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">
                        New Member
                      </span>
                      <button
                        onClick={() => handleRemoveNewStaff(staff._id)}
                        className="text-red hover:text-red-700 ml-auto"
                        title="Remove from selection"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
                    {getFilteredAvailableStaff().length > 0 ? (
                      getFilteredAvailableStaff().map((staff) => (
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

            {/* Summary */}
            <div className="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-md">
              <p className="text-sm text-gray-700">
                <strong>Summary:</strong> {currentStaff.length} current
                member(s) + {newStaffIds.length} new member(s) ={" "}
                {currentStaff.length + newStaffIds.length} total member(s)
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          variant="default"
          className="w-40"
          onClick={handleSave}
          disabled={updateLoading}
        >
          {updateLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </section>
  );
}
