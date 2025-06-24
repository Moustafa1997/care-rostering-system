"use client";
import React from "react";

interface CircularProgressProps {
  value: number;
  label?: string;
  size?: number;
  strokeWidth?: number; 
  color?: string; 
  textColor?: string; 
  showLabel?: boolean;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  value,
  label = "Progress",
  size = 48,
  strokeWidth = 4,
  color = "#1E40AF",
  textColor = "#000000",
  showLabel = true,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col justify-start items-start">
      <svg
        width={size}
        height={size}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          stroke="#E5E5E5"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <g transform={`rotate(90, ${size / 2}, ${size / 2})`}>
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            style={{ fill: textColor }}
            fontSize="10"
            fontWeight="600"
          >
            {Math.round(value)}%
          </text>
        </g>
      </svg>
    {showLabel && label && (
    <p className="text-xs mt-2 text-center" style={{ color: textColor }}>
        {label}
    </p>
    )}
    </div>
  );
};

export default CircularProgress;
