import React from "react";
import { Button } from "@/components/ui/button";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { format } from "date-fns";

export default function ViewSkillDetails() {
  const { formData, switchToEditMode } = useStaffFormStore();
  const { skills } = formData;

  const handleEditClick = () => {
    // Switch to edit mode using the store method
    switchToEditMode();
  };

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500">Skill detail</h2>
          <Button
            variant="outline"
            className="w-32 h-9"
            onClick={handleEditClick}
          >
            Edit
          </Button>
        </div>

        <div className="space-y-4">
          {skills?.map((skill, index) => (
            <div
              key={index}
              className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow"
            >
              <div className="col-span-12">
                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Skill name
                  </label>
                  <p className="text-base text-gray-900">{skill.skillName}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Date of expiry
                  </label>
                  <p className="text-base text-gray-900">
                    {skill.dateOfExpiry
                      ? format(new Date(skill.dateOfExpiry), "dd/MM/yyyy")
                      : "N/A"}
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                    Certificate
                  </label>
                  {skill.certificateUrl ? (
                    <a
                      href={skill.certificateUrl}
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
