import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useStaffFormStore } from "@/stores/staffFormStore";
import ViewAvailabilityDetails from "@/components/ui/admin/view-availablity-details";

type ShiftType = "Morning" | "Night";

export default function Availability() {
  const {
    formData,
    setArrayField,
    setRootField,
    errors,
    formMode,
    steps,
    managerCanEditAvailability
  } = useStaffFormStore();
  const [selectedDays, setSelectedDays] = useState<{
    [key: string]: Set<ShiftType>;
  }>({});

  // Initialize selectedDays from formData only once on mount
  useEffect(() => {
    const initialSelectedDays: { [key: string]: Set<ShiftType> } = {};
    formData?.availability?.forEach((item) => {
      if (!initialSelectedDays[item.weekday]) {
        initialSelectedDays[item.weekday] = new Set<ShiftType>();
      }
      if (item.shiftType === "Morning" || item.shiftType === "Night") {
        initialSelectedDays[item.weekday].add(item.shiftType as ShiftType);
      }
    });
    setSelectedDays(initialSelectedDays);
  }, []); // Empty dependency array means this only runs once on mount

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Check if editing is disabled
  const isEditingDisabled = managerCanEditAvailability === false;

  const handleDayClick = (day: string) => {
    if (isEditingDisabled) return;

    setSelectedDays((prev) => {
      const newSelectedDays = { ...prev };
      if (newSelectedDays[day]) {
        delete newSelectedDays[day];
      } else {
        newSelectedDays[day] = new Set<ShiftType>(["Morning"]);
      }
      updateStore(newSelectedDays);
      return newSelectedDays;
    });
  };

  const handleShiftChange = (day: string, shiftType: ShiftType) => {
    if (isEditingDisabled) return;

    setSelectedDays((prev) => {
      const newSelectedDays = { ...prev };
      const shifts = newSelectedDays[day] || new Set<ShiftType>();
      const newShifts = new Set(shifts);

      if (newShifts.has(shiftType)) {
        newShifts.delete(shiftType);
        if (newShifts.size === 0) {
          delete newSelectedDays[day];
        } else {
          newSelectedDays[day] = newShifts;
        }
      } else {
        newShifts.add(shiftType);
        newSelectedDays[day] = newShifts;
      }

      updateStore(newSelectedDays);
      return newSelectedDays;
    });
  };

  const updateStore = (selectedDays: { [key: string]: Set<ShiftType> }) => {
    const availabilityArray = Object.entries(selectedDays).flatMap(
      ([weekday, shifts]) => {
        return Array.from(shifts).map((shiftType) => ({
          weekday,
          shiftType
        }));
      }
    );
    setArrayField("availability", availabilityArray);
  };

  const handleSkipAvailability = () => {
    if (isEditingDisabled) return;

    if (formData.isAvailbilitySkipedByManager) {
      // If currently skipped, unskip it
      setRootField("isAvailbilitySkipedByManager", false);
    } else {
      // If not skipped, skip it
      setSelectedDays({});
      setArrayField("availability", []);
      setRootField("isAvailbilitySkipedByManager", true);
    }
  };

  // Find the availability step
  const availabilityStep = steps.find((step) => step.id === "availability");

  // If in view mode and the step is completed, render the view component
  if (formMode === "view" && availabilityStep?.isCompleted) {
    return <ViewAvailabilityDetails />;
  }

  return (
    <section>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-500 mb-0">
            Staff&apos;s Availability detail
          </h2>
          {formData.isAvailbilitySkipedByManager && (
            <span className="text-sm text-gray-500 italic">
              Availability has been skipped
            </span>
          )}
        </div>

        {isEditingDisabled && (
          <div className="text-red text-sm font-medium text-center py-2">
            You cannot edit the availability
          </div>
        )}

        <div
          className={`grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow ${isEditingDisabled ? "opacity-60" : ""}`}
        >
          <div className="2xl:col-span-8 lg:col-span-12 w-full">
            <label className="block text-sm font-semibold text-[#293444] mb-3">
              Days availability
            </label>
            <div className="flex 2xl:flex-nowrap lg:flex-wrap gap-2">
              {days.map((day) => (
                <Button
                  key={day}
                  variant={selectedDays[day] ? "default" : "icons"}
                  className={`h-[34px] ${
                    selectedDays[day] ? "bg-blue-900 text-white" : ""
                  } ${isEditingDisabled ? "cursor-not-allowed" : ""}`}
                  onClick={() => handleDayClick(day)}
                  disabled={isEditingDisabled}
                >
                  {day}
                </Button>
              ))}
            </div>
          </div>

          <div className="2xl:col-span-4 lg:col-span-12">
            <label className="block text-sm font-semibold text-[#293444] mb-3">
              Time availability
            </label>
            {Object.entries(selectedDays).map(([day, shifts]) => (
              <div key={day} className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium min-w-[40px]">{day}:</span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`${day}-morning`}
                      checked={shifts.has("Morning")}
                      onChange={() => handleShiftChange(day, "Morning")}
                      className="w-4 h-4 text-blue-900 rounded"
                      disabled={isEditingDisabled}
                    />
                    <label htmlFor={`${day}-morning`} className="text-sm">
                      Morning
                    </label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id={`${day}-night`}
                      checked={shifts.has("Night")}
                      onChange={() => handleShiftChange(day, "Night")}
                      className="w-4 h-4 text-blue-900 rounded"
                      disabled={isEditingDisabled}
                    />
                    <label htmlFor={`${day}-night`} className="text-sm">
                      Night
                    </label>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center">
          <Button
            variant="outline"
            className="w-40"
            onClick={handleSkipAvailability}
            disabled={isEditingDisabled}
          >
            {formData.isAvailbilitySkipedByManager
              ? "Add Availability"
              : "Skip Availability"}
          </Button>
        </div>
      </div>
    </section>
  );
}
