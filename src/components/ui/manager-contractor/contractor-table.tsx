import Tabel from "@/components/ui/table";
import Link from "next/link";
import { RecentContract } from "@/types/features/contractors";

const columns = [
  { header: "Name", accessor: "companyName" },
  {
    header: "Date added",
    accessor: "createdAt",
    render: (row: { createdAt: string }) => {
      const date = row.createdAt.split("T")[0];
      return <span>{date}</span>;
    }
  },
  {
    header: "Status",
    accessor: "contract.status",
    render: (row: {
      contract: { status: "Active" | "Pending" | "Inactive" };
    }) => {
      const status = row.contract.status;
      const statusColor: Record<"Active" | "Pending" | "Inactive", string> = {
        Active: "bg-[#34AC92]",
        Pending: "bg-[#C17C7C]",
        Inactive: "bg-gray-300"
      };
      return (
        <span
          className={`px-3 py-1 rounded-full text-base text-white ${statusColor[status]}`}
        >
          {status}
        </span>
      );
    }
  }
];

interface ContractorTableProps {
  contractors: RecentContract[];
}

export default function ContractorTable({ contractors }: ContractorTableProps) {
  return (
    <div>
      <Tabel columns={columns} data={contractors} />
      <Link
        href="/dashboard/manager/contractors"
        className="w-full flex flex-row justify-start items-center gap-0 group-hover:text-white group-hover:bg-blue-dark3 group-hover:border-r-4 group-hover:border-r-cyan"
      >
        <span className="text-primaryColors-default font-semibold mt-2 text-base cursor-pointer">
          View all contractors
        </span>
      </Link>
    </div>
  );
}
