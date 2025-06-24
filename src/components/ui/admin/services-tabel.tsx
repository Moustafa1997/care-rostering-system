import Tabel from "@/components/ui/table";
import CircularProgress from "@/components/ui/CircularProgress";
import { Eye, Pencil } from 'lucide-react';

const users = [
  {
    serviceName: "Service Name",
    description: "Short description of the service",
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
    serviceName: "Service Name",
    description: "Short description of the service",
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
    serviceName: "Service Name",
    description: "Short description of the service",
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


export default function ServicesTable() {

  const columns = [
    {
      header: "Service Name",
      accessor: "serviceName",
    },
    { header: "Description", accessor: "description",
           render: (row: any) => (
        <p className="whitespace-break-spaces">
            {row.description}
        </p>
      ) },
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
