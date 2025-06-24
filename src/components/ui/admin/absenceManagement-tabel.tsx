import React from "react";
import Tabel from "@/components/ui/table";
import {
  Paperclip,
  AlertCircle,
  CircleCheckBig,
  CircleX,
  EllipsisVertical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import ActionDropdown from "../ActionDropdown";

export default function AbsenceManagementTable() {
  const users = [
    {
      select: (
        <div className="flex items-center">
          <Input type="checkbox" className="h-4 w-4" />
        </div>
      ),
      requestSentBy: (
        <div className="flex items-center gap-2">
          <span className="font-semibold">John Doe</span>
        </div>
      ),
      role: "Role name",
      purpose: "Vacation Leave",
      startDate: "03/11/2024",
      endDate: "06/11/2024",
      status: <span className="font-bold">Approved</span>,
      conflict: (
        <Tooltip>
          <TooltipTrigger>
            <AlertCircle className="text-red" size={18} />
          </TooltipTrigger>
          <TooltipContent>Shift conflict on 05/11/2024.</TooltipContent>
        </Tooltip>
      ),
      notes: (
        <p className="w-60 whitespace-break-spaces">
          Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting.
        </p>
      ),
      documents: (
        <Tooltip>
          <TooltipTrigger>
            <Paperclip className="text-blue-500 cursor-pointer" size={18} />
          </TooltipTrigger>
          <TooltipContent>Click to preview document</TooltipContent>
        </Tooltip>
      ),
      action: (
        <div className="text-[#006400] font-semibold flex items-center">
          <CircleCheckBig size={15} /> Approved
        </div>
      ),
      actionedBy: "Manager",
      moreOptions: <ActionDropdown data={{}} />
    },
    {
      select: (
        <div className="flex items-center">
          <Input type="checkbox" className="h-4 w-4" />
        </div>
      ),
      requestSentBy: (
        <div className="flex items-center gap-2">
          <span className="font-semibold">John Doe</span>
        </div>
      ),
      role: "Role name",
      purpose: "Vacation Leave",
      startDate: "03/11/2024",
      endDate: "06/11/2024",
      status: <span className="font-bold">Denied</span>,
      conflict: null,
      notes: (
        <p className="w-60 whitespace-break-spaces">
          Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting.
        </p>
      ),
      documents: null,
      action: (
        <div className="text-red font-semibold flex items-center">
          <CircleX size={15} /> Denied
        </div>
      ),
      actionedBy: "Manager",
      moreOptions: <ActionDropdown data={{}} />
    },
    {
      select: (
        <div className="flex items-center">
          <Input type="checkbox" className="h-4 w-4" />
        </div>
      ),
      requestSentBy: (
        <div className="flex items-center gap-2">
          <span className="font-semibold">John Doe</span>
        </div>
      ),
      role: "Role name",
      purpose: "Vacation Leave",
      startDate: "03/11/2024",
      endDate: "06/11/2024",
      status: <span className="text-yellow-600 font-semibold">Pending</span>,
      conflict: null,
      notes: (
        <p className="w-60 whitespace-break-spaces">
          Lorem Ipsum&nbsp;is simply dummy text of the printing and typesetting.
        </p>
      ),
      documents: null,
      action: (
        <div className="flex gap-2">
          <Button variant="default">Approve</Button>
          <Button variant="filled">Deny</Button>
        </div>
      ),
      actionedBy: "",
      moreOptions: <ActionDropdown data={{}} />
    }
  ];

  const columns = [
    { header: "", accessor: "select" },
    { header: "Request sent by", accessor: "requestSentBy" },
    { header: "Role", accessor: "role" },
    { header: "Purpose", accessor: "purpose" },
    { header: "Start Date", accessor: "startDate" },
    { header: "End Date", accessor: "endDate" },
    { header: "Status", accessor: "status" },
    { header: "Conflict", accessor: "conflict" },
    { header: "Notes", accessor: "notes" },
    { header: "Documents", accessor: "documents" },
    { header: "Action", accessor: "action" },
    { header: "Actioned By", accessor: "actionedBy" },
    { header: "", accessor: "moreOptions" }
  ];

  return (
    <div className="mt-8">
      <Tabel columns={columns} data={users} />
    </div>
  );
}
