import Tabel from "@/components/ui/table";
import { Files } from "lucide-react";
import { Button } from "../button";
import Link from "next/link";

const defaultUsers = [
  {
    eventTitle: "Staff Meeting",
    date: "03/12/2024",
    time: "02:00 PM",
    location: "24 Avenue",
    eventAgenda: <Files className="text-[#3860F8]" />,
    esvp: "Confirmed"
  },
  {
    eventTitle: "Staff Meeting",
    date: "03/12/2024",
    time: "02:00 PM",
    location: "24 Avenue",
    eventAgenda: <Files className="text-[#3860F8]" />,
    esvp: "Confirmed"
  }
];

interface EventsTableProps {
  showViewAll?: boolean;
  data?: typeof defaultUsers;
}

export default function EventsTable({ showViewAll = true, data = defaultUsers }: EventsTableProps) {
  const columns = [
    {
      header: "Event Title and Description",
      accessor: "eventTitle",
      render: (row: any) => (
        <div>
          <div>{row.eventTitle}</div>
          <p className="text-[#787878] w-60 whitespace-break-spaces">
            Lorem Ipsum is simply dummy text of the printing and typesetting.
          </p>
        </div>
      )
    },
    { header: "Date", accessor: "date" },
    { header: "Time", accessor: "time" },
    { header: "Location", accessor: "location" },
    {
      header: "Event Agenda",
      accessor: "eventAgenda"
    },
    {
      header: "RSVP & Attendance Status",
      accessor: "esvp",
      render: (row: any) => (
        <div className="block bg-[#0AD6E4] text-center w-28 text-white rounded-full">
          {row.esvp}
        </div>
      )
    }
  ];

  return (
    <div className="mt-4">
      <Tabel columns={columns} data={data} />
      {showViewAll && (
        <Link href="/dashboard/admin/events">
          <Button variant="outline" className="mt-4 w-36 h-8">
            View all
          </Button>
        </Link>
      )}
    </div>
  );
}
