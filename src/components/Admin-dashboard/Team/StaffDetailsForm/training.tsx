import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DatePickerForm } from "@/components/ui/date-picker";
import { FileUpload } from "@/components/ui/file-upload";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem
} from "@/components/ui/select";
import ViewTraining from "@/components/ui/admin/view-training";

const VALID_TRAINING_NAMES = [
  "Manual Handling",
  "Infection Prevention and Control",
  "Basic Life Support",
  "Safeguarding Adults and Children",
  "Health and Safety",
  "Fire Safety Awareness",
  "Food Hygiene",
  "Equality and Diversity",
  "Dementia Awareness",
  "Data Protection (GDPR)",
  "Learning Disability",
  "Medication Administration",
  "Other"
];

export default function Training() {
  const {
    formData,
    setArrayField,
    errors,
    validateStep,
    validateTraining,
    formMode,
    steps
  } = useStaffFormStore();
  const { training } = formData;

  const resetTraining = () => {
    setArrayField("training", []);
  };

  const handleFieldChange = (index: number, field: string, value: any) => {
    const updatedTraining = [...(training || [])];
    if (!updatedTraining[index]) {
      updatedTraining[index] = {
        trainingName: "",
        status: "",
        completedDate: "",
        expiryDate: "",
        certificateUrl: "",
        isExpired: false
      };
    }
    updatedTraining[index] = {
      ...updatedTraining[index],
      [field]: value
    };
    setArrayField("training", updatedTraining);

    // Validate the training after field change
    //validateTraining(updatedTraining[index], index);
  };

  const handleFileUpload = (index: number, files: { url: string }[]) => {
    const updatedTraining = [...(training || [])];
    if (!updatedTraining[index]) {
      updatedTraining[index] = {
        trainingName: "",
        status: "",
        completedDate: "",
        expiryDate: "",
        certificateUrl: "",
        isExpired: false
      };
    }
    updatedTraining[index] = {
      ...updatedTraining[index],
      certificateUrl: files[0]?.url || ""
    };
    setArrayField("training", updatedTraining);

    // Validate the training after file upload
    //validateTraining(updatedTraining[index], index);
  };

  const addNewTraining = () => {
    const newTraining = {
      trainingName: "",
      status: "",
      completedDate: "",
      expiryDate: "",
      certificateUrl: "",
      isExpired: false
    };
    const updatedTraining = [...(training || []), newTraining];
    setArrayField("training", updatedTraining);

    // Validate the new training
    //validateTraining(newTraining, updatedTraining.length - 1);
  };

  const removeTraining = (index: number) => {
    const updatedTraining = (training || []).filter((_, i) => i !== index);
    setArrayField("training", updatedTraining);
  };

  const getFieldError = (fieldName: string) => {
    return errors[fieldName];
  };

  // Find the training step
  const trainingStep = steps.find((step) => step.id === "training");

  // If in view mode and the step is completed, render the view component
  if (formMode === "view" && trainingStep?.isCompleted) {
    return <ViewTraining />;
  }

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500">
            Mandatory Training
          </h2>
          <Button
            type="button"
            variant="destructive"
            onClick={resetTraining}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Training
          </Button>
        </div>

        {errors["training"] && (
          <p className="text-sm text-red">{errors["training"]}</p>
        )}

        {(training || []).map((trainingItem, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow relative"
          >
            {index > 0 && (
              <button
                onClick={() => removeTraining(index)}
                className="absolute top-4 right-4 text-red hover:text-red-700"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            )}

            <div className="col-span-12">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Training Name
              </label>
              <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select
                  value={trainingItem.trainingName}
                  onValueChange={(value) =>
                    handleFieldChange(index, "trainingName", value)
                  }
                >
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    {VALID_TRAINING_NAMES.map((name) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {getFieldError(`training.${index}.trainingName`) && (
                <p className="text-sm text-red mt-1">
                  {getFieldError(`training.${index}.trainingName`)}
                </p>
              )}
            </div>

            <div className="col-span-12">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Status
              </label>
              <div className="flex justify-center items-center border border-blue-soft bg-white gap-4 rounded-md">
                <Select
                  value={trainingItem.status}
                  onValueChange={(value) =>
                    handleFieldChange(index, "status", value)
                  }
                >
                  <SelectTrigger className="border-none focus:ring-0">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Completed">Completed</SelectItem>
                    <SelectItem value="Not Completed">Not Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {getFieldError(`training.${index}.status`) && (
                <p className="text-sm text-red mt-1">
                  {getFieldError(`training.${index}.status`)}
                </p>
              )}
            </div>

            <div className="col-span-12">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Completion Date
              </label>
              <DatePickerForm
                value={trainingItem.completedDate || ""}
                onChange={(date) =>
                  handleFieldChange(index, "completedDate", date)
                }
              />
              {getFieldError(`training.${index}.completedDate`) && (
                <p className="text-sm text-red mt-1">
                  {getFieldError(`training.${index}.completedDate`)}
                </p>
              )}
            </div>

            <div className="col-span-12">
              <label className="block text-sm font-normal text-[#2F3E53] mb-1">
                Expiry Date
              </label>
              <DatePickerForm
                value={trainingItem.expiryDate || ""}
                onChange={(date) =>
                  handleFieldChange(index, "expiryDate", date)
                }
              />
              {getFieldError(`training.${index}.expiryDate`) && (
                <p className="text-sm text-red mt-1">
                  {getFieldError(`training.${index}.expiryDate`)}
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
                  trainingItem.certificateUrl
                    ? [{ url: trainingItem.certificateUrl }]
                    : []
                }
                accept=".pdf,.doc,.docx"
                maxSize={10}
                id={`training-certificate-${index}`}
              />
              {getFieldError(`training.${index}.certificateUrl`) && (
                <p className="text-sm text-red mt-1">
                  {getFieldError(`training.${index}.certificateUrl`)}
                </p>
              )}
            </div>
          </div>
        ))}

        <div className="flex justify-center">
          <Button
            type="button"
            variant="outline"
            onClick={addNewTraining}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Training
          </Button>
        </div>
      </div>
    </section>
  );
}
