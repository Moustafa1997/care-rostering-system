import React from "react";
import { Button } from "@/components/ui/button";
import { CircleAlert } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import ViewClientAllergiesIntolerance from "@/components/ui/admin/view-client-allergies-intolerance";

export default function AllergiesIntolerance() {
  const [medicalSupportDetails, setMedicalSupportDetails] = React.useState("");
  const [wordCount, setWordCount] = React.useState(0);

  const handleMedicalSupportChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);

    if (words.length <= 250 || text.length < medicalSupportDetails.length) {
      setMedicalSupportDetails(text);
      setWordCount(words[0] === "" ? 0 : words.length);
    }
  };

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Allergies and Intolerances */}
        <h2 className="text-xl font-semibold text-gray-500">Allergies and Intolerances</h2>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
           <div className="col-span-12">
            <label className="text-sm font-normal text-[#2F3E53] mb-1 flex items-center gap-1">
              Allergies and Intolerances
              <Tooltip>
                <TooltipTrigger asChild>
                  <span className="cursor-pointer"><CircleAlert size={16}/></span>
                </TooltipTrigger>
                <TooltipContent side="right" className="max-w-xs">
                  E.g., Include food, medication, or environmental allergies if applicable
                </TooltipContent>
              </Tooltip>
            </label>
            <div className="relative">
              <textarea
                className="border border-blue-soft rounded-md focus:outline-none bg-white px-3 py-2 w-full"
                placeholder="Enter"
                rows={4}
                value={medicalSupportDetails}
                onChange={handleMedicalSupportChange}
              />
              <div
                className={`text-xs text-right mt-1 ${
                  wordCount >= 250 ? "text-red-500" : "text-gray-500"
                }`}
              >
                {wordCount}/250 words
              </div>
            </div>
          </div>
        </div>

        {/* View client Allergies Intolerance  */}
        {/* <ViewClientAllergiesIntolerance /> */}
      </div>
      <div className="mt-12 flex justify-center gap-5">
        <Button variant="outline" className="w-40">
          Save as draft
        </Button>
        <Button variant="default" className="w-40">
          Next
        </Button>
      </div>
    </section>
  );
}
