"use client";

import ContractorProfile from "@/components/ui/contractor-profile";
import { useContractor } from "@/hooks/contractors/useContractor";
import { useParams } from "next/navigation";

export default function ContractorProfilePage() {
  const params = useParams();
  const contractorId = params?.id as string;

  const { contractor, isLoading, error } = useContractor(contractorId);

  if (!contractorId) {
    return <div>Invalid contractor ID</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !contractor) {
    return <div>Error loading contractor details</div>;
  }

  return <ContractorProfile contractor={contractor} />;
}
