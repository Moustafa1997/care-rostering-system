import React from "react";
import { Button } from "@/components/ui/button";

export default function ViewClientAllergiesIntolerance() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-500">Allergies and Intolerances</h2>
        <Button variant="outline" className="w-32 h-9">
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="col-span-12 flex justify-start">
          <div className="w-full">
            <label className="block text-sm font-normal text-[#2F3E53] mb-1">
              Allergies and Intolerances
            </label>
            <span className="text-[#191A1C] text-sm font-normal">
              o permit a page layout to be designed, independently of thehat
              will subsequently populate it, or to various fonts of
              a typeface without meaningful text that could be distracting.
              Lorem ipsum is typically a corrupted version of De finibus bonorum
              et malorum, a 1st-century BC text by the Roman statesman and
              philosopher Cicero, with words altered, added, and removed to make
              it
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
