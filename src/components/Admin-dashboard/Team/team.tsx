"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Search, AlignJustify, LayoutGrid, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import TeamsTable from "@/components/ui/admin/teams-tabel";
import TeamsCardView from "@/components/ui/admin/teams-card-view-tabel";
import AddStaffModal from "@/components/ui/admin/add-staff-modal";
import Link from "next/link";
import { useStaff } from "@/hooks/staff/useStaff";
import { useRouter } from "next/navigation";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { useDeleteStaff } from "@/hooks/staff/useDeleteStaff";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import { Staff } from "@/types/staff";

const Team = () => {
  const router = useRouter();
  const { handleEdit, handleView } = useStaffFormStore();
  const [viewType, setViewType] = useState<"table" | "card">("table");
  const [isAddStaffModalOpen, setIsAddStaffModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    role: "",
    service: "",
    status: "",
    availabilityStatus: "",
    onboardingStatus: ""
  });
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Number of items per page

  const { staff, isLoading, pages } = useStaff(
    currentPage,
    limit,
    search,
    filters
  );

  const { deleteStaff, isPending: isDeleting } = useDeleteStaff();

  const handleAddStaff = () => {
    setIsAddStaffModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddStaffModalOpen(false);
  };

  const handleConfirmAddStaff = () => {
    setIsAddStaffModalOpen(false);
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value === "all" ? "" : value
    }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  const handleDeleteClick = (staff: Staff) => {
    setSelectedStaffId(staff._id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedStaffId) return;
    try {
      await deleteStaff(selectedStaffId);
      setIsDeleteModalOpen(false);
      setSelectedStaffId(null);
    } catch (error) {
      console.error("Failed to delete staff:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedStaffId(null);
  };

  return (
    <div className="w-full p-4 bg-slate-50">
      <div className="w-full flex flex-row justify-between items-center">
        <h1>Team</h1>
        <div className="flex flex-row gap-4 items-center justify-between">
          <div className="flex gap-3 p-3 bg-[#F1F4FD] rounded-md">
            <Button variant="outline">View all group</Button>
            <Link href="/dashboard/admin/team/group-creation">
              <Button variant="default">
                Create new group <Plus />
              </Button>
            </Link>
          </div>
          <Button variant="default" onClick={handleAddStaff}>
            Add New staff <Plus />
          </Button>
        </div>
      </div>

      <div className="w-full flex flex-col justify-between items-center my-4 gap-4">
        <div className="flex justify-between items-center w-full">
          <div className="w-3/12 h-9 flex justify-center items-center border border-blue-soft bg-white gap-2 rounded-md px-2">
            <Search size={20} className="text-primaryColors-default2" />
            <Input
              type="search"
              variant="search"
              placeholder="Search"
              className="!h-8 !px-2"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex justify-end items-center w-full gap-4">
            <Button
              variant={viewType === "table" ? "filled" : "bordered"}
              onClick={() => setViewType("table")}
            >
              <AlignJustify size={20} />
            </Button>
            <Button
              variant={viewType === "card" ? "filled" : "bordered"}
              onClick={() => setViewType("card")}
            >
              <LayoutGrid size={20} />
            </Button>
          </div>
        </div>
        <div className="flex justify-start items-center w-full gap-4 flex-wrap">
          <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
            <Select
              onValueChange={(value) => handleFilterChange("role", value)}
            >
              <SelectTrigger className="w-48 border-none focus:ring-0">
                <SelectValue placeholder="Select by Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Support Worker">Support Worker</SelectItem>
                <SelectItem value="Senior Support Worker">
                  Senior Support Worker
                </SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Team Leader">Team Leader</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
            <Select
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger className="w-48 border-none focus:ring-0">
                <SelectValue placeholder="Select by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
            <Select
              onValueChange={(value) =>
                handleFilterChange("onboardingStatus", value)
              }
            >
              <SelectTrigger className="w-48 border-none focus:ring-0">
                <SelectValue placeholder="Select by onboarding status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Onboarding Status</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="incomplete">Incomplete</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
            <Select
              onValueChange={(value) =>
                handleFilterChange("availabilityStatus", value)
              }
            >
              <SelectTrigger className="w-48 border-none focus:ring-0">
                <SelectValue placeholder="Filter by availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Availability</SelectItem>
                <SelectItem value="Done">Available</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {viewType === "table" ? (
        <TeamsTable
          data={staff}
          loading={isLoading}
          currentPage={currentPage}
          totalPages={pages}
          onPageChange={setCurrentPage}
          onDelete={handleDeleteClick}
        />
      ) : (
        <TeamsCardView
          data={staff}
          loading={isLoading}
          currentPage={currentPage}
          totalPages={pages}
          onPageChange={setCurrentPage}
          onDelete={handleDeleteClick}
        />
      )}

      <AddStaffModal
        isOpen={isAddStaffModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmAddStaff}
      />

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Delete Staff"
        description="Are you sure you want to delete this staff member? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Team;
