import React from "react";
import { Button } from "@/components/ui/button";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { format } from "date-fns";

export default function ViewTraining() {
  const { formData, switchToEditMode } = useStaffFormStore();
  const { training } = formData;

  const handleEditClick = () => {
    // Switch to edit mode using the store method
    switchToEditMode();
  };

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500">
            Training detail
          </h2>
          <Button
            variant="outline"
            className="w-32 h-9"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </div>

        <div className="space-y-4">
          {training?.map((trainingItem, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow"
            >
              <div className="col-span-12">
                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Training name
                  </label>
                  <p className="text-base text-gray-900">
                    {trainingItem.trainingName}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Status
                  </label>
                  <p className="text-base text-gray-900">
                    {trainingItem.status}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Completed date
                  </label>
                  <p className="text-base text-gray-900">
                    {trainingItem.completedDate
                      ? format(
                          new Date(trainingItem.completedDate),
                          "dd/MM/yyyy"
                        )
                      : "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Expiry date
                  </label>
                  <p className="text-base text-gray-900">
                    {trainingItem.expiryDate
                      ? format(new Date(trainingItem.expiryDate), "dd/MM/yyyy")
                      : "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Certificate
                  </label>
                  {trainingItem.certificateUrl ? (
                    <a
                      href={trainingItem.certificateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      View Certificate
                    </a>
                  ) : (
                    <p className="text-base text-gray-900">
                      No certificate uploaded
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
