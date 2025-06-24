import Tabel from "@/components/ui/table";
import CircularProgress from "@/components/ui/CircularProgress";
import { Eye, Pencil } from 'lucide-react';

const users = [
  {
    clientName: "Robin Doe",
    address: "Location address ssdsad Location address",
    joiningDate: "12.2.2025",
    session: "12",
    service:"Service name",
    status: "Active",
    profileCompletion: "70%",
    action: (
      <div className="flex items-center gap-5">
        <Eye size={20} className="cursor-pointer" />
        <Pencil size={20} className="cursor-pointer" />
      </div>
    ),
  },
  {
    clientName: "Robin Doe",
    address: "Location address ssdsad Location address",
    joiningDate: "12.2.2025",
    session: "12",
    service:"Service name",
    status: "Active",
    profileCompletion: "70%",
    action: (
      <div className="flex items-center gap-5">
        <Eye size={20} className="cursor-pointer" />
        <Pencil size={20} className="cursor-pointer" />
      </div>
    ),
  }, 
  {
    clientName: "Robin Doe",
    address: "Location address ssdsad Location address",
    joiningDate: "12.2.2025",
    session: "12",
    service:"Service name",
    status: "Active",
    profileCompletion: "70%",
    action: (
      <div className="flex items-center gap-5">
        <Eye size={20} className="cursor-pointer" />
        <Pencil size={20} className="cursor-pointer" />
      </div>
    ),
  }
];


export default function ClientsTable() {

  const columns = [
    {
      header: "Client Name",
      accessor: "clientName",
    },
    { header: "Address", accessor: "address",
           render: (row: any) => (
        <p className="whitespace-break-spaces">
            {row.address}
        </p>
      ) },
    { header: "Joining date ", accessor: "joiningDate" },
    { header: "Session", accessor: "session" },
    { header: "Service", accessor: "service" },
    { header: "Status", accessor: "status",
      render: (row: any) => (
        <span className="bg-cyan text-white px-2 py-1 rounded-full text-sm w-20 block text-center">
            {row.status}
        </span>
      ) },
    {
      header: "Profile Completion",
      accessor: "profileCompletion",
            render: (row: any) => (
        <CircularProgress value={parseInt(row.profileCompletion)} />
      ) 
    },
    {
      header: "Action",
      accessor: "action",
    }
  ];

  return (
    <div className="mt-8">
      <Tabel columns={columns} data={users} />
    </div>
  );
}
