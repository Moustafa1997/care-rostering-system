"use client";
import React from "react";
import TooltipWrapper from "./tooltip-wrapper";

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
  disabledReason?: string;
  leftLabel?: string;
  rightLabel?: string;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ToggleSwitch({
  isOn,
  onToggle,
  disabled = false,
  disabledReason,
  leftLabel,
  rightLabel,
  className = "",
  size = "md"
}: ToggleSwitchProps) {
  const sizeClasses = {
    sm: "h-4 w-8",
    md: "h-5 w-11",
    lg: "h-6 w-14"
  };

  const thumbSizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5"
  };

  const thumbTranslateClasses = {
    sm: isOn ? "translate-x-4" : "translate-x-0.5",
    md: isOn ? "translate-x-6" : "translate-x-1",
    lg: isOn ? "translate-x-8" : "translate-x-1"
  };

  const switchComponent = (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`relative inline-flex items-center rounded-full transition-colors duration-300 ${
        isOn ? "bg-blue-900" : "bg-gray-300"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"} ${
        sizeClasses[size]
      } ${className}`}
    >
      <span
        className={`inline-block transform rounded-full bg-white transition-transform duration-300 ${
          thumbSizeClasses[size]
        } ${thumbTranslateClasses[size]}`}
      />
    </button>
  );

  const content = (
    <div className="flex items-end gap-3">
      {leftLabel && (
        <span
          className={`${
            isOn ? "font-semibold text-sm" : "text-gray-500 text-sm"
          }`}
        >
          {leftLabel}
        </span>
      )}

      <TooltipWrapper
        content={disabledReason || ""}
        side="left"
        disabled={!disabled || !disabledReason}
      >
        {switchComponent}
      </TooltipWrapper>

      {rightLabel && (
        <span
          className={`${
            !isOn ? "font-semibold text-sm" : "text-gray-500 text-sm"
          }`}
        >
          {rightLabel}
        </span>
      )}
    </div>
  );

  return content;
}
