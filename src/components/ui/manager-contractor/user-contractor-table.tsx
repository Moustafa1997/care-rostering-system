"use client";

import { Input } from "@/components/ui/input";
import { Search, Eye, SquarePen, Trash2 } from "lucide-react";
import { ConfirmationModal } from "../../ConfirmationModal/ConfirmationModal";
import { Button } from "../button";
import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import Tabel from "@/components/ui/table";
import Link from "next/link";
import { Contractor } from "@/types/contractor";
import { useDeleteContractor } from "@/hooks/contractors/useDeleteContractor";

interface UserTableProps {
  value: string;
  onChange: (value: string) => void;
  data: Contractor[];
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onStatusFilterChange?: (status: string[]) => void;
  onDeleteSuccess?: () => void;
}

export default function UserTable({
  value,
  onChange,
  data,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onStatusFilterChange,
  onDeleteSuccess
}: UserTableProps) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedContractorId, setSelectedContractorId] = useState<
    string | null
  >(null);
  const { deleteContractor, isPending: isDeleting } = useDeleteContractor();

  const handleDeleteClick = (itemId: string) => {
    setSelectedContractorId(itemId);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedContractorId) return;

    try {
      await deleteContractor(selectedContractorId);
      setIsDeleteModalOpen(false);
      setSelectedContractorId(null);
      onDeleteSuccess?.();
    } catch (error) {
      console.error("Failed to delete contractor:", error);
    }
  };

  const handleCloseModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedContractorId(null);
  };

  const handleStatusFilterChange = (value: string) => {
    setStatusFilter(value);
    // Convert the status filter to an array format expected by the hook
    const statusArray = value === "all" ? [] : [value];
    onStatusFilterChange?.(statusArray);
  };

  const columns = [
    {
      header: "Company",
      accessor: "companyName",
      render: (row: Contractor) => (
        <div className="flex gap-2 items-center">
          <div className="flex flex-col">
            <span className="font-semibold">{row.companyName}</span>
            <span className="text-sm text-gray-500">{row.tradingName}</span>
          </div>
        </div>
      )
    },
    {
      header: "Contact Person",
      accessor: "contactPerson.name",
      render: (row: Contractor) => (
        <div className="flex flex-col">
          <span>{row.contactPerson.name}</span>
        </div>
      )
    },
    {
      header: "Email",
      accessor: "contactPerson.email",
      render: (row: Contractor) => (
        <div className="flex flex-col">
          <span>{row.contactPerson.email}</span>
        </div>
      )
    },
    {
      header: "Phone",
      accessor: "contactPerson.phone",
      render: (row: Contractor) => (
        <div className="flex flex-col">
          <span>{row.contactPerson.phone}</span>
        </div>
      )
    },
    {
      header: "Status",
      accessor: "contract.status",
      render: (row: Contractor) => (
        <span
          className={`px-2 py-1 rounded-md text-sm ${
            row.contract.status === "Active"
              ? "bg-green-100 text-green-800"
              : row.contract.status === "Pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {row.contract.status}
        </span>
      )
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (row: Contractor) => (
        <div className="flex gap-2">
          <Link href={`/dashboard/manager/contractors/${row._id}/profile`}>
            <Button variant="secondary">
              <Eye size={20} />
              View
            </Button>
          </Link>
          <Link href={`/dashboard/manager/contractors/${row._id}/edit`}>
            <Button variant="secondary">
              <SquarePen size={20} />
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => handleDeleteClick(row._id)}
            variant="destructive"
            disabled={isDeleting && selectedContractorId === row._id}
          >
            <Trash2 size={20} /> Delete
          </Button>
        </div>
      )
    }
  ];

  return (
    <div>
      {/* Filter & Search Controls */}
      <div className="bg-gray-100 flex w-full justify-between p-3 rounded-md mb-4">
        <div className="w-5/12 flex justify-center items-center border border-blue-soft bg-white gap-2 rounded-md px-2">
          <Search size={20} className="text-primaryColors-default2" />
          <Input
            type="search"
            variant="search"
            placeholder="Search by company, contact name, email or phone..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>

        <div className="w-2/12 px-3 flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
          <Select value={statusFilter} onValueChange={handleStatusFilterChange}>
            <SelectTrigger className="w-48 border-none focus:ring-0">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table Component */}
      <Tabel
        columns={columns}
        data={data}
        loading={loading}
        pagination={{
          currentPage,
          totalPages,
          onPageChange
        }}
      />
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Contractor"
        description="Are you sure you want to delete this contractor? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
