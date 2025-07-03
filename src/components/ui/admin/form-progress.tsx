import React, { useEffect, useRef } from "react";
import { useStaffFormStore } from "@/stores/staffFormStore";
import { Check } from "lucide-react";

export default function FormProgress() {
  console.time("FormProgress component render");

  // Track rerenders
  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    console.log(`🔄 FormProgress rerendered ${renderCount.current} times`);
  });

  const { steps, currentStep } = useStaffFormStore();

  console.timeEnd("FormProgress component render");

  return (
    <div className="w-full py-4">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-cyan text-white"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {step.isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{index + 1}</span>
                )}
              </div>
              <span
                className={`text-sm mt-2 ${
                  index <= currentStep ? "text-cyan" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 ${
                  index < currentStep ? "bg-cyan" : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
