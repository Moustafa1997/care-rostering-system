import Tabel from "@/components/ui/table";

const users = [
  {
    serviceName: "Waverly Lodge",
    shiftType: "Night",
    startDate: "12.2.2025",
    endDate: "13.2.2025",
    assignedBy:"Manager",
    status: (<span className="bg-[#6483F5] text-white px-2 py-1 rounded-xl text-sm w-32 block text-center">Draft</span>),
  },
    {
    serviceName: "Waverly Lodge",
    shiftType: "Morning",
    startDate: "12.2.2025",
    endDate: "13.2.2025",
    assignedBy:"Manager",
    status: (<span className="bg-[#5DC388] text-white px-2 py-1 rounded-xl text-sm w-32 block text-center">Published</span>),
  },
    {
    serviceName: "Waverly Lodge",
    shiftType: "Morning",
    startDate: "12.2.2025",
    endDate: "13.2.2025",
    assignedBy:"Manager",
    status: (<span className="bg-[#5DC388] text-white px-2 py-1 rounded-xl text-sm w-32 block text-center">Published</span>),
  },
    {
    serviceName: "Waverly Lodge",
    shiftType: "Night",
    startDate: "12.2.2025",
    endDate: "13.2.2025",
    assignedBy:"Manager",
    status: (<span className="bg-[#6483F5] text-white px-2 py-1 rounded-xl text-sm w-32 block text-center">Draft</span>),
  }
];


export default function CreateShiftTable() {

  const columns = [
    {header: "Service Name",accessor: "serviceName"},
    { header: "Shift Type", accessor: "shiftType"},
    { header: "Start Date", accessor: "startDate"},
    { header: "End Date", accessor: "endDate"},
    { header: "Assigned By", accessor: "assignedBy"},
    { header: "Status", accessor: "status"},
  ];

  return (
    <div className="mt-8">
      <Tabel columns={columns} data={users} />
    </div>
  );
}
