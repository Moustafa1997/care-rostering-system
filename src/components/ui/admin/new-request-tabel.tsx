import Tabel from "@/components/ui/table";
import { Button } from "../button";
import Link from "next/link";

const users = [
  {
    staffName: "Robin Doe",
    service: "Service name",
    requestforDate: "12/2/2025",
    shiftTime: "11:00 AM",
    requestReceived: "11/2/2025 - 01 PM",
    action: "View"
  },
    {
    staffName: "Robin Doe",
    service: "Service name",
    requestforDate: "12/2/2025",
    shiftTime: "11:00 AM",
    requestReceived: "11/2/2025 - 01 PM",
    action: "View"
  },
    {
    staffName: "Robin Doe",
    service: "Service name",
    requestforDate: "12/2/2025",
    shiftTime: "11:00 AM",
    requestReceived: "11/2/2025 - 01 PM",
    action: "View"
  },
    {
    staffName: "Robin Doe",
    service: "Service name",
    requestforDate: "12/2/2025",
    shiftTime: "11:00 AM",
    requestReceived: "11/2/2025 - 01 PM",
    action: "View"
  },
];

export default function NewRequestTabel() {
  const columns = [
    {
      header: "Staff Name",
      accessor: "staffName"},
    {
      header: "Service",
      accessor: "service"},
    { header: "Request for", accessor: "requestforDate" },
    { header: "Shift Time", accessor: "shiftTime"},
    { header: "Request Received", accessor: "requestReceived" },
    {
      header: "Action",
      accessor: "action",
      render: (row: any) => (
        <Link href={"/dashboard/admin/new-request/details"}>
          <Button variant={"outline"} className="w-24 h-9">{row.action}</Button>
        </Link>
      )
    }
  ];

  return (
    <div className="mt-8">
      <Tabel columns={columns} data={users} />
    </div>
  );
}
