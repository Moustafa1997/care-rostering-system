"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { MoveLeft, Building, Users, Calendar } from "lucide-react";
import Link from "next/link";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { ConfirmationModal } from "@/components/ConfirmationModal/ConfirmationModal";
import { useState } from "react";
import { Contractor } from "@/types/contractor";

interface ContractorProfileProps {
  contractor: Contractor;
}

export default function ContractorProfile({
  contractor
}: ContractorProfileProps) {
  const [isActivateModalOpen, setIsActivateModalOpen] = useState(false);

  const handleActivateClick = () => {
    setIsActivateModalOpen(true);
  };

  const handleConfirmActivate = () => {
    console.log("Account activated");
    setIsActivateModalOpen(false);
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
      <div className="flex flex-col justify-between w-full">
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
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      contractor.contract.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : contractor.contract.status === "Pending"
                          ? "bg-yellow-100 text-[#854d0e]"
                          : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {contractor.contract.status}
                  </span>
                </div>
              </div>
              <div className="col-span-4 border border-[#E1E1E1] rounded-md p-4 shadow">
                <div className="">
                  <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                  <div className="flex flex-col gap-2">
                    <Button variant="filled">
                      <Link
                        href={`/dashboard/manager/register/${contractor._id}`}
                      >
                        Edit Details
                      </Link>
                    </Button>

                    {contractor.contract.status !== "Active" && (
                      <Button
                        className="rounded-md bg-[#16a34a] hover:bg-[#15803d] text-white border border-[#16a34a] hover:border-[#16a34a] text-base w-full"
                        onClick={handleActivateClick}
                      >
                        Activate Account
                      </Button>
                    )}
                  </div>
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
                <h3>Documents</h3>
                <div className="p-4 w-full text-center text-gray-300">
                  {contractor.documents.length > 0 ? (
                    <div className="grid grid-cols-3 gap-4">
                      {contractor.documents.map((doc, index) => (
                        <div key={index} className="border p-2 rounded">
                          {doc.name}
                        </div>
                      ))}
                    </div>
                  ) : (
                    "No document uploading yet."
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isActivateModalOpen}
        onClose={() => setIsActivateModalOpen(false)}
        onConfirm={handleConfirmActivate}
        title="Activate Contractor"
        description="Are you sure you want to activate this contractor? This will restore their access to the system."
        confirmText="Activate"
        cancelText="Cancel"
      />
    </div>
  );
}
