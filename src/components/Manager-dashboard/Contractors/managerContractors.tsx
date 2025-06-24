"use client";

import UserTable from "@/components/ui/manager-contractor/user-contractor-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useContractors } from "@/hooks/contractors/useContractors";

export default function Contractors() {
  const [search, setSearch] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10; // Number of items per page

  const { contractors, isLoading, pages } = useContractors(
    currentPage,
    limit,
    search,
    statusFilters
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1); // Reset to first page on new search
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-4xl text-gray-500 font-semibold">Contractors</h1>
        <div className="flex">
          <Button variant="filled">
            <Link href="/dashboard/manager/register"> Add new Contractor</Link>
          </Button>
        </div>
      </div>
      <UserTable
        value={search}
        onChange={handleSearch}
        data={contractors}
        loading={isLoading}
        currentPage={currentPage}
        totalPages={pages}
        onPageChange={setCurrentPage}
        onStatusFilterChange={setStatusFilters}
      />
    </div>
  );
}
