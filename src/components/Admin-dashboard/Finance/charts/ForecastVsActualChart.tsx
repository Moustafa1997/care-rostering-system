"use client";
import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const serviceData = [
  {
    date: "1/1/2025",
    forecast: 9100,
    actual: 9100,
    payroll: "£1650",
    hours: 200,
    overtime: 20,
  },
  {
    date: "2/1/2025",
    forecast: 24500,
    actual: 0,
    payroll: "£1650",
    hours: 200,
    overtime: 20,
  },
  {
    date: "3/1/2025",
    forecast: 24500,
    actual: 24500,
    payroll: "£1650",
    hours: 200,
    overtime: 20,
  },
];

const staffData = [
  {
    date: "1/1/2025",
    forecast: 8500,
    actual: 8200,
    payroll: "£1350",
    hours: 180,
    overtime: 15,
  },
  {
    date: "2/1/2025",
    forecast: 20000,
    actual: 18000,
    payroll: "£1420",
    hours: 190,
    overtime: 18,
  },
  {
    date: "3/1/2025",
    forecast: 21500,
    actual: 20000,
    payroll: "£1480",
    hours: 195,
    overtime: 19,
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const { date, payroll, hours, overtime } = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border text-sm text-black w-64">
        <h4 className="font-semibold text-lg text-[#010101]">{date}</h4>
        <p className="font-semibold text-xs text-[#010101]">Forecasted Payroll: {payroll}</p>
        <p className="font-semibold text-xs text-[#010101]">Forecasted Hours: {hours}</p>
        <p className="font-semibold text-xs text-[#010101]">Estimated Overtime: {overtime}</p>
      </div>
    );
  }
  return null;
};

export default function ForecastVsActualChart() {
  const [type, setType] = useState("service");

  const chartData = type === "service" ? serviceData : staffData;

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" className="p-[0.3rem]" height={500}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="date" />
          <YAxis tickFormatter={(v) => `£${v.toLocaleString()}`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="forecast" fill="#00CFFF" radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="forecast"
              position="top"
              formatter={(label: React.ReactNode) => {
                if (typeof label === "number") {
                  return `£${label.toLocaleString()}`;
                }
                return label;
              }}
              style={{ fill: "#000", fontWeight: 600 }}
            />
          </Bar>
          <Bar dataKey="actual" fill="#2D3FE4" radius={[4, 4, 0, 0]}>
            <LabelList
              dataKey="actual"
              position="top"
              formatter={(label: React.ReactNode) => {
                if (typeof label === "number") {
                  return `£${label.toLocaleString()}`;
                }
                return label;
              }}
              style={{ fill: "#000", fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="flex gap-6 mt-2 px-2">
        <div className="flex items-center gap-2">
          <div className="w-16 h-4 bg-[#00CFFF]" />
          <p className="text-sm font-medium text-[#616161]">Forecast</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-16 h-4 bg-[#2D3FE4]" />
          <p className="text-sm font-medium text-[#616161]">Actual</p>
        </div>
      </div>

      <div className="text-lg font-normal text-black mt-4">
        <p>Shift pattern shows rising overtime on weekends.</p>
        <p>Staffing seems low for upcoming bank holiday period.</p>
      </div>
    </div>
  );
}
