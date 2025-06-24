import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "./pagination";

interface TableProps {
  columns: {
    header: string;
    accessor: string;
    render?: (data: any) => React.ReactNode;
  }[];
  data: any[];
  loading?: boolean;
  pagination?: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
  };
  renderRowFooter?: (row: any, rowIndex: number) => React.ReactNode;
}

export default function Table({
  columns,
  data,
  loading,
  pagination,
  renderRowFooter
}: TableProps) {
  return (
    <div className="space-y-4 overflow-auto">
      <table className="w-full table-auto text-left border rounded-md">
        <thead>
          <tr className="bg-blue-light rounded-md">
            {columns.map((col, index) => (
              <th
                key={index}
                className="py-2 px-4 text-sm font-semibold text-darkBlueGray whitespace-break-spaces"
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center">
                Loading...
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-4 text-center">
                No data found
              </td>
            </tr>
          ) : (
            data.map((row, idx) => (
              <tr key={idx} className="border-t">
                {columns.map((col, cidx) => (
                  <td
                    key={cidx}
                    className="py-2 px-4 text-sm whitespace-break-spaces"
                  >
                    {col.render ? col.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {pagination && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage - 1)
                }
                className={
                  pagination.currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    onClick={() => pagination.onPageChange(page)}
                    isActive={page === pagination.currentPage}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  pagination.onPageChange(pagination.currentPage + 1)
                }
                className={
                  pagination.currentPage === pagination.totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
