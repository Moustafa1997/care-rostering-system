"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MoveLeft, Building, Users, Calendar } from "lucide-react";
import Link from "next/link";
import ImageComponent from "../ImageComponent/ImageComponent";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { Contractor } from "@/types/contractor";
import { useUpdateContractorStatus } from "@/hooks/contractors/useUpdateContractorStatus";
import { useToast } from "@/hooks/use-toast";

interface ContractorProfileProps {
  contractor: Contractor;
  onStatusUpdate?: (newStatus: "Active" | "Inactive") => void;
}

export default function ContractorProfile({
  contractor,
  onStatusUpdate
}: ContractorProfileProps) {
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);
  const { updateContractorStatus, isUpdating, error } =
    useUpdateContractorStatus();
  const { error: showError } = useToast();
  const [currentStatus, setCurrentStatus] = useState(
    contractor.contract.status
  );

  const handleActivateClick = () => {
    setIsActivateModalOpen(true);
  };

  const handleConfirmActivate = async () => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      await updateContractorStatus(contractor._id, newStatus);
      setCurrentStatus(newStatus);
      setIsActivateModalOpen(false);
      onStatusUpdate?.(newStatus);
    } catch (error) {
      console.error("Failed to update contractor status:", error);
      showError("Failed to update contractor status");
      setIsActivateModalOpen(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green text-white";
      case "Pending":
        return "bg-yellow-100 text-[#854d0e]";
      case "Inactive":
        return "bg-red text-white";
      default:
        return "bg-gray text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-start gap-4">
        <Link href="/dashboard/manager/contractors">
          <Button variant="secondary">
            <MoveLeft />
            Back to Contractors
          </Button>
        </Link>
        <h1 className="text-4xl text-gray-500 font-semibold mb-4">
          {contractor.companyName}
        </h1>
      </div>

      <div className="p-6 space-y-8 bg-white rounded-md">
        <section>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 border border-[#E1E1E1] rounded-md p-4 shadow flex justify-between">
              <div className="flex gap-8">
                <div className="rounded-md overflow-hidden w-[100px] h-[110px] flex justify-center items-center">
                  <ImageComponent
                    src="/images/contractor-profile.jpeg"
                    alt="Contractor-profile"
                    width={100}
                    height={100}
                  />
                </div>
                <div>
                  <h3>{contractor.companyName}</h3>
                  <p className="flex justify-start items-center gap-2 mb-3">
                    <Building size={20} />
                    Registration: <span>{contractor.registrationNumber}</span>
                  </p>
                  <p className="flex justify-start items-center gap-2 mb-3">
                    <Users size={20} />
                    {contractor.branchCount}{" "}
                    <span>
                      Location{contractor.branchCount !== 1 ? "s" : ""}
                    </span>
                  </p>
                  <p className="flex justify-start items-center gap-2 mb-3">
                    <Calendar size={20} />
                    Joined on{" "}
                    <span>
                      {new Date(contractor.createdAt).toLocaleDateString()}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(currentStatus)}`}
                >
                  {currentStatus}
                </span>
              </div>
            </div>

            <div className="col-span-4">
              <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
              <div className="flex flex-col gap-2">
                <Button variant="filled">
                  <Link
                    href={`/dashboard/manager/contractors/${contractor._id}/edit`}
                  >
                    Edit Details
                  </Link>
                </Button>

                <Button
                  className={`rounded-md ${
                    currentStatus === "Active"
                      ? "bg-rose-800 hover:bg-rose-700 text-white border border-red-600 hover:border-red-700"
                      : "bg-[#16a34a] hover:bg-[#15803d] text-white border border-[#16a34a] hover:border-[#16a34a]"
                  } text-base w-full`}
                  onClick={handleActivateClick}
                  disabled={isUpdating}
                >
                  {isUpdating ? (
                    <span className="flex items-center gap-2">
                      <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                          fill="none"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Updating...
                    </span>
                  ) : currentStatus === "Active" ? (
                    "Deactivate Account"
                  ) : (
                    "Activate Account"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className="border border-[#E1E1E1] rounded-md p-4 shadow">
          <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <h3>{contractor.contactPerson.name}</h3>
              <p>{contractor.contactPerson.designation}</p>
              <p>{contractor.contactPerson.email}</p>
              <p>{contractor.contactPerson.phone}</p>
            </div>
            <div className="col-span-6">
              <h3>Billing Contact</h3>
              <p>{contractor.pricing.billing.contactName}</p>
              <p>{contractor.pricing.billing.email}</p>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-8 border border-[#E1E1E1] rounded-md p-4 shadow">
              <div>
                <h3>Contract Details</h3>
              </div>
              <div className="flex justify-between">
                <div>
                  <h3>Contract Period</h3>
                  <p>
                    Start Date:{" "}
                    <span>
                      {new Date(
                        contractor.contract.startDate
                      ).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    End Date:{" "}
                    <span>
                      {new Date(
                        contractor.contract.endDate
                      ).toLocaleDateString()}
                    </span>
                  </p>
                  <p>
                    Notice Period:{" "}
                    <span>{contractor.contract.noticePeriod}</span>
                  </p>
                </div>
                {contractor.contract.trial.enabled && (
                  <div>
                    <h3>Trial Period</h3>
                    <p>
                      Start:{" "}
                      <span>
                        {new Date(
                          contractor.contract.trial.startDate
                        ).toLocaleDateString()}
                      </span>
                    </p>
                    <p>
                      End:{" "}
                      <span>
                        {new Date(
                          contractor.contract.trial.endDate
                        ).toLocaleDateString()}
                      </span>
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-4 border border-[#E1E1E1] rounded-md p-4 shadow">
              <div>
                <h3>Subscription</h3>
              </div>
              <div>
                <h3>Plan Details</h3>
                <p>
                  Plan: <span>{contractor.pricing.plan}</span>
                </p>
                <p>
                  Users: <span>{contractor.pricing.userLicenses}</span>
                </p>
                <p>
                  Payment: <span>{contractor.contract.paymentFrequency}</span>
                </p>
              </div>
              <div className="mt-4">
                <h3>Billing</h3>
                <p>
                  Method: <span>{contractor.pricing.paymentMethod}</span>
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-md p-4 shadow">
            <div className="col-span-12 flex flex-col items-start justify-center">
              <h3 className="text-lg font-semibold mb-4">Documents</h3>
              <div className="p-4 w-full">
                {contractor.documents.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {contractor.documents.map((doc, index) => (
                      <div
                        key={index}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-gray-100 p-2 rounded">
                            <svg
                              className="w-6 h-6 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                              />
                            </svg>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {doc.name}
                            </p>
                            {doc.type && (
                              <p className="text-sm text-gray-500">
                                {doc.type}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p className="mt-2 text-sm">No documents uploaded yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      <ConfirmationModal
        isOpen={isActivateModalOpen}
        onClose={() => setIsActivateModalOpen(false)}
        onConfirm={handleConfirmActivate}
        title={
          currentStatus === "Active"
            ? "Deactivate Contractor"
            : "Activate Contractor"
        }
        description={
          currentStatus === "Active"
            ? "Are you sure you want to deactivate this contractor? This will revoke their access to the system."
            : "Are you sure you want to activate this contractor? This will restore their access to the system."
        }
        confirmText={currentStatus === "Active" ? "Deactivate" : "Activate"}
        cancelText="Cancel"
      />
    </div>
  );
}
