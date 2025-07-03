import Tabel from "@/components/ui/table";
import CircularProgress from "@/components/ui/CircularProgress";
import ActionDropdown from "../ActionDropdown";
import { Staff, StaffListView } from "@/types/staff";
import TooltipWrapper from "./tooltip-wrapper";

interface TeamsTableProps {
  data: StaffListView[];
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete?: (data: StaffListView) => void;
}

export default function TeamsTable({
  data,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onDelete
}: TeamsTableProps) {
  const columns = [
    {
      header: "First Name",
      accessor: "firstName",
      render: (row: any) => <span className="capitalize">{row.firstName}</span>
    },
    {
      header: "Last Name",
      accessor: "lastName",
      render: (row: any) => <span className="capitalize">{row.lastName}</span>
    },
    { header: "Phone ", accessor: "phone" },
    { header: "Role", accessor: "role" },
    {
      header: "Status",
      accessor: "status",
      render: (row: any) => (
        <span className="bg-cyan text-white px-2 py-1 rounded-full text-sm w-20 block text-center">
          {row.status ? "Active" : "Inactive"}
        </span>
      )
    },
    {
      header: "Availability Status",
      accessor: "availabilityStatus",
      render: (row: any) => (
        <span
          className={`px-2 py-1 rounded-full text-sm w-20 block text-center ${
            row.availabilityStatus === "Done"
              ? "bg-green text-green-800"
              : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {row.availabilityStatus}
        </span>
      )
    },

    {
      header: "Progress",
      accessor: "progress",
      render: (row: any) => <CircularProgress value={parseInt(row.progress)} />
    },
    {
      header: "Groups",
      accessor: "groups",
      render: (row: any) => (
        <div className="text-[#FF8912] underline font-medium text-sm">
          {row.groups ? row.groups : "No Groups"}
        </div>
      )
    },
    {
      header: "By",
      accessor: "onboardedByManager",
      render: (row: any) => (
        <TooltipWrapper
          side="left"
          children={
            <div className=" font-medium text-sm">
              {row.onboardedByManager ? "Manager" : "Staff"}
            </div>
          }
          content={
            row.onboardedByManager
              ? "This staff was onboarded by the manager"
              : "This staff was onboarded by themselves"
          }
        ></TooltipWrapper>
      )
    },
    {
      header: "Action",
      accessor: "action",
      render: (row: StaffListView) => (
        <ActionDropdown data={row} onDelete={onDelete} />
      )
    }
  ];

  return (
    <div className="w-full">
      <div className="space-y-4">
        <div className="overflow-x-auto bg-white p-4 rounded-xl shadow">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : (
            <Tabel
              columns={columns}
              data={data}
              pagination={{
                currentPage,
                totalPages,
                onPageChange
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
