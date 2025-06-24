import CardView from "./card-view-tabel";
import { Staff } from "@/types/staff";

interface TeamsCardViewProps {
  data: Staff[];
  loading?: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onDelete?: (data: Staff) => void;
}

export default function TeamsCardView({
  data,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onDelete
}: TeamsCardViewProps) {
  return (
    <div className="mt-8">
      <CardView data={data} loading={loading} onDelete={onDelete} />
    </div>
  );
}
