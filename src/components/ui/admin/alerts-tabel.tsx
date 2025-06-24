import Tabel from "@/components/ui/table";
import { Plus ,ChevronRight  } from "lucide-react";
import { Button } from "../button";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";

const users = [
  {
    alertType: "Shift Alerts",
    staff: "John Doe",
    date: "03/12/2024",
    time: "02:00 PM",
    priority: "Medium",
    status: "Acknowledged",
    service: "24 Avenue...UK..."
  },
    {
    alertType: "General Alert",
    staff: "John Doe",
    date: "03/12/2024",
    time: "02:00 PM",
    priority: "High",
    status: "Acknowledged",
    service: "24 Avenue...UK..."
  }
];

interface AlertsTableProps {
  value: string;
  onChange: (value: string) => void;
}

export default function AlertsTable({ value, onChange }: AlertsTableProps) {

  const columns = [
    {
      header: "Alert Type",
      accessor: "alertType",
    },
    { header: "Staff", accessor: "staff" },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" },
    { header: "Priority", accessor: "priority",
      render: (row: any) => (
        <span className="border border-black bg-[#f2e786] text-black px-2 py-1 rounded-full text-sm w-20 block text-center">
            {row.priority}
        </span>
      ) },
    {
      header: "Status",
      accessor: "status",
    },
    {
      header: "Service",
      accessor: "service",
      render: (row: any) => (
        <div className="flex justify-between">
            <div>
                {row.service} 
            </div>
            <div>
                <ChevronRight />
            </div>
        </div>
      )
    }
  ];

  return (
    <div>
      <div className="flex w-full justify-between items-center p-4 rounded-tl-xl rounded-tr-xl bg-[#F1F4FD] shadow mb-4">
       <h1 className="text-xl text-gray-500 font-medium">Alerts</h1>
       <div className="flex gap-4">
        <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-48 border-none focus:ring-0">
              <SelectValue placeholder="Show - Priority Wise" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-48 border-none focus:ring-0">
              <SelectValue placeholder="Show - by staff" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button variant="default">Create New <Plus /></Button>
       </div>
      </div>
      <Tabel columns={columns} data={users} />
      <Button variant="outline" className="mt-4 w-36 h-8">
        View all
      </Button>
    </div>
  );
}
