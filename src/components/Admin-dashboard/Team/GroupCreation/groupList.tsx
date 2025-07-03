import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { useGroups, useDeleteGroup } from "@/hooks/groups";
import { GroupFilters } from "@/types/group";
import GroupNavigation from "./GroupNavigation";

export default function GroupList() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [filters, setFilters] = useState<GroupFilters>({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);

  const { groups, total, pages, isLoading, error } = useGroups(
    page,
    limit,
    search,
    filters
  );
  const { deleteGroup, isLoading: deleteLoading } = useDeleteGroup();

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1); // Reset to first page when searching
  };

  const handleViewClick = (groupId: string) => {
    router.push(
      `/dashboard/admin/team/group-creation/group-list/${groupId}/view`
    );
  };

  const handleEditClick = (groupId: string) => {
    router.push(
      `/dashboard/admin/team/group-creation/group-list/${groupId}/edit`
    );
  };

  const handleDeleteClick = (groupId: string) => {
    setGroupToDelete(groupId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setGroupToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (groupToDelete) {
      try {
        await deleteGroup(groupToDelete);
        setIsDeleteModalOpen(false);
        setGroupToDelete(null);
      } catch (error) {
        console.error("Failed to delete group:", error);
      }
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">Error loading groups</div>
      </div>
    );
  }

  return (
    <>
      <section>
        <GroupNavigation
          title="Group List"
          showCreateButton={true}
          showBackButton={false}
        />

        {/* Search Bar */}
        <div className="mb-6">
          <div className="w-1/3 flex justify-center items-center border border-blue-soft bg-white gap-2 rounded-md px-2">
            <Search size={20} className="text-primaryColors-default2" />
            <Input
              type="search"
              variant="search"
              placeholder="Search groups..."
              className="!h-8 !px-2"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="p-6 space-y-8 bg-white rounded-2xl">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-lg">Loading groups...</div>
            </div>
          ) : groups.length === 0 ? (
            <div className="flex items-center justify-center h-32">
              <div className="text-lg text-gray-500">No groups found</div>
            </div>
          ) : (
            <>
              {/* Groups List */}
              {groups.map((group) => (
                <div
                  key={group._id}
                  className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow"
                >
                  <div className="col-span-8 flex justify-start gap-32">
                    <div>
                      <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                        Group name
                      </label>
                      <span>{group.name}</span>
                    </div>
                    <div>
                      <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                        Number of staff
                      </label>
                      <span>{group.staffCount}</span>
                    </div>
                  </div>
                  <div className="col-span-4 flex gap-2">
                    <Button
                      variant="outline"
                      className="w-40"
                      onClick={() => handleViewClick(group._id)}
                    >
                      View
                    </Button>
                    <Button
                      variant="outline"
                      className="w-40"
                      onClick={() => handleEditClick(group._id)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      className="w-40"
                      onClick={() => handleDeleteClick(group._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {pages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                  >
                    Previous
                  </Button>
                  <span className="px-4 py-2">
                    Page {page} of {pages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === pages}
                  >
                    Next
                  </Button>
                </div>
              )}

              {/* Total Count */}
              <div className="text-center text-sm text-gray-500">
                Total: {total} groups
              </div>
            </>
          )}
        </div>
      </section>

      {/* Delete Modal */}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Are you sure you want to delete this group?"
        description="If you delete this group, all data will be permanently removed."
        confirmText={deleteLoading ? "Deleting..." : "Delete"}
        cancelText="Cancel"
      />
    </>
  );
}
