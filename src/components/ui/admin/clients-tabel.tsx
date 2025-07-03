import Tabel from "@/components/ui/table";
import CircularProgress from "@/components/ui/CircularProgress";
import { Eye, Pencil } from "lucide-react";
import { render } from "@fullcalendar/core/preact.js";

const users = [
  {
    clientName: "Robin Doe",
    address: "Location address ssdsad Location address",
    joiningDate: "12/2/2025",
    session: "12",
    service: "Service name",
    status: "Active",
    profileCompletion: "70%"
  },
  {
    clientName: "Robin Doe",
    address: "Location address ssdsad Location address",
    joiningDate: "12/2/2025",
    session: "12",
    service: "Service name",
    status: "Active",
    profileCompletion: "70%"
  },
  {
    clientName: "Robin Doe",
    address: "Location address ssdsad Location address",
    joiningDate: "12/2/2025",
    session: "12",
    service: "Service name",
    status: "Active",
    profileCompletion: "70%"
  }
];

export default function ClientsTable() {
  const columns = [
    {
      header: "Client Name",
      accessor: "clientName"
    },
    {
      header: "Address",
      accessor: "address",
      render: (row: any) => (
        <p className="truncate max-w-[150px]">
          {row.address.split(" ").slice(0, 3).join(" ") +
            (row.address.split(" ").length > 3 ? "..." : "")}
        </p>
      )
    },
    { header: "Joining date ", accessor: "joiningDate" },
    { header: "Key working Session", accessor: "session"},
    { header: "Service", accessor: "service" },
    {
      header: "Status",
      accessor: "status",
      render: (row: any) => (
        <span className="bg-cyan text-white px-2 py-1 rounded-full text-sm w-20 block text-center">
          {row.status}
        </span>
      )
    },
    {
      header: "Profile Completion",
      accessor: "profileCompletion",
      render: (row: any) => (
        <CircularProgress value={parseInt(row.profileCompletion)} />
      )
    }
  ];

  return (
    <div className="mt-8">
      <Tabel columns={columns} data={users} />
    </div>
  );
}
