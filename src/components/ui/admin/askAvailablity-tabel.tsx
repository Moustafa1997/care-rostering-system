import React, { useState } from "react";
import AvailabilityModal from "../../Admin-dashboard/AskAvailability/ViewAvailablityDetailsModal/viewAvailablityDetailsModal";
import Tabel from "@/components/ui/table";
import { Eye, Send } from "lucide-react";
import {Button} from "@/components/ui/button";
// import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";

export default function AskAvailabilityTable() {
    const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const users = [
  {
    name: (
      <div className="flex items-center gap-2">
        <span>Robin Doe</span>
      </div>
    ),
    requestSentDate: "23/05/2025",
    deadline: "28/05/2025",
    availability: "100%",
    action: (
      <div className="flex flex-col gap-3">
        <Button variant="default" className="w-[160px] h-[32px] text-sm">
          <Send size={13} /> Send Reminder
        </Button>
        <Link href="/dashboard/admin/team/staff-detail/availability">
         <Button variant="default" className="w-[160px] h-[32px] text-sm">
          <Eye size={13} /> View Availability
        </Button>
        </Link>
      </div>
    )
  },
  {
    name: (
      // <div className="flex items-center gap-2">
      //   <span>Team Alpha</span>
      //   <Tooltip>
      //     <TooltipTrigger>
      //       <div className="text-xs rounded-full bg-primaryColors-default text-white w-5 h-5 flex items-center justify-center font-semibold">G</div>
      //     </TooltipTrigger>
      //     <TooltipContent>
      //       This is a group
      //     </TooltipContent>
      //   </Tooltip>
      // </div>
      <div className="flex items-center gap-2">
        <span>John Doe</span>
      </div>
    ),
    requestSentDate: "23/05/2025",
    deadline: "28/05/2025",
    availability: "100%",
    action: (
      <div className="flex flex-col gap-3">
        <Button variant="default" className="w-[160px] h-[32px] text-sm">
          <Send size={13} /> Send Reminder
        </Button>
        <Link href="/dashboard/admin/team/staff-detail/availability">
         <Button variant="default" className="w-[160px] h-[32px] text-sm">
          <Eye size={13} /> View Availability
        </Button>
        </Link>
      </div>
    )
  },
  {
    name: (
      <div className="flex items-center gap-2">
        <span>Jane Smith</span>
      </div>
    ),
    requestSentDate: "23/05/2025",
    deadline: "28/05/2025",
    availability: "100%",
    action: (
      <div className="flex flex-col gap-3">
        <Button variant="default" className="w-[160px] h-[32px] text-sm">
          <Send size={13} /> Send Reminder
        </Button>
        <Link href="/dashboard/admin/team/staff-detail/availability">
         <Button variant="default" className="w-[160px] h-[32px] text-sm">
          <Eye size={13} /> View Availability
        </Button>
        </Link>
      </div>
    )
  }
];


  const columns = [
    {
      header: "Name",
      accessor: "name"
    },
    { header: "Request Sent Date", accessor: "requestSentDate" },
    { header: "Deadline", accessor: "deadline" },
    { header: "Availability Received %", accessor: "availability" },
    { header: "Action", accessor: "action" }
  ];

  return (
    <>
      <div className="mt-8">
        <Tabel
          columns={columns}
          data={users}
        />
      </div>
      {/* <AvailabilityModal open={modalOpen} onClose={handleCloseModal} /> */}
    </>
  );
}
