import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerForm } from "@/components/ui/date-picker";
import { FileUpload } from "@/components/ui/file-upload";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { Plus, Trash2 } from "lucide-react";
import ViewSkillDetails from "@/components/ui/admin/view-skill-details";

export default function SkillDetails() {
  const {
    formData,
    setArrayField,
    errors,
    validateStep,
    validateSkill,
    formMode,
    steps
  } = useStaffFormStore();
  const { skills } = formData;

  const resetSkills = () => {
    setArrayField("skills", []);
  };

  const handleFieldChange = (index: number, field: string, value: any) => {
    const updatedSkills = [...(skills || [])];
    if (!updatedSkills[index]) {
      updatedSkills[index] = {
        skillName: "",
        dateOfExpiry: "",
        certificateUrl: "",
        isExpired: false
      };
    }
    updatedSkills[index] = {
      ...updatedSkills[index],
      [field]: value
    };
    setArrayField("skills", updatedSkills);

    // Validate the skill after field change
    // validateSkill(updatedSkills[index], index);
  };

  const handleFileUpload = (index: number, files: { url: string }[]) => {
    const updatedSkills = [...(skills || [])];
    if (!updatedSkills[index]) {
      updatedSkills[index] = {
        skillName: "",
        dateOfExpiry: "",
        certificateUrl: "",
        isExpired: false
      };
    }
    updatedSkills[index] = {
      ...updatedSkills[index],
      certificateUrl: files[0]?.url || ""
    };
    setArrayField("skills", updatedSkills);

    // Validate the skill after file upload
    //validateSkill(updatedSkills[index], index);
  };

  const addNewSkill = () => {
    const newSkill = {
      skillName: "",
      dateOfExpiry: "",
      certificateUrl: "",
      isExpired: false
    };
    const updatedSkills = [...(skills || []), newSkill];
    setArrayField("skills", updatedSkills);

    // Validate the new skill
    //validateSkill(newSkill, updatedSkills.length - 1);
  };

  const removeSkill = (index: number) => {
    const updatedSkills = (skills || []).filter((_, i) => i !== index);
    setArrayField("skills", updatedSkills);
  };

  const getFieldError = (fieldName: string) => {
    return errors[fieldName];
  };

  // Find the skills step
  const skillsStep = steps.find((step) => step.id === "skills");

  // If in view mode and the step is completed, render the view component
  if (formMode === "view" && skillsStep?.isCompleted) {
    return <ViewSkillDetails />;
  }

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500">Skill detail</h2>
          <Button
            type="button"
            variant="destructive"
            onClick={resetSkills}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Skills
          </Button>
        </div>

        {errors["skills"] && (
          <p className="text-sm text-red">{errors["skills"]}</p>
        )}

        {skills?.map((skill, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow relative"
          >
            {index > 0 && (
              <button
                onClick={() => removeSkill(index)}
                className="absolute top-4 right-4 text-red hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}

            <div className="col-span-12">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Skill name
              </label>
              <Input
                variant="bordered"
                type="text"
                placeholder="Enter"
                value={skill.skillName || ""}
                onChange={(e) =>
                  handleFieldChange(index, "skillName", e.target.value)
                }
              />
              {getFieldError(`skills.${index}.skillName`) && (
                <p className="text-sm text-red mt-1">
                  {getFieldError(`skills.${index}.skillName`)}
                </p>
              )}
            </div>

            <div className="col-span-12">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Date of expire of the skill
              </label>
              <DatePickerForm
                value={skill.dateOfExpiry || ""}
                onChange={(date) =>
                  handleFieldChange(index, "dateOfExpiry", date)
                }
              />
              {getFieldError(`skills.${index}.dateOfExpiry`) && (
                <p className="text-sm text-red mt-1">
                  {getFieldError(`skills.${index}.dateOfExpiry`)}
                </p>
              )}
            </div>

            <div className="col-span-12">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Upload Certificate
              </label>
              <FileUpload
                onFilesChange={(files) => handleFileUpload(index, files)}
                initialFiles={
                  skill.certificateUrl ? [{ url: skill.certificateUrl }] : []
                }
                accept=".pdf,.doc,.docx"
                maxSize={10}
                id={`skill-certificate-${index}`}
              />
              {getFieldError(`skills.${index}.certificateUrl`) && (
                <p className="text-sm text-red mt-1">
                  {getFieldError(`skills.${index}.certificateUrl`)}
                </p>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={addNewSkill}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Skill
          </Button>
        </div>
      </div>
    </section>
  );
}
