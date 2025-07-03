"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    month: "Jan",
    Service1: 9100,
    Service2: 9100,
    Service3: 9100,
  },
  {
    month: "Feb",
    Service1: 11000,
    Service2: 9100,
    Service3: 7000,
  },
  {
    month: "Mar",
    Service1: 12000,
    Service2: 9500,
    Service3: 8000,
  },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border text-sm text-black w-64">
        <h4 className="font-semibold mb-2">Payroll - {label}</h4>
        {payload.map((entry: any, index: number) => (
          <p key={index}>
            {entry.name}: <strong>£{entry.value.toLocaleString()}</strong>
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function PayrollComparisonChart() {
  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" className="p-[0.3rem]" height={500}>
        <BarChart data={data} barGap={12}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" />
          <YAxis tickFormatter={(v) => `£${v.toLocaleString()}`} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="Service1" fill="#2D3FE4" radius={[4, 4, 0, 0]} name="Service name 1">
            <LabelList
              dataKey="Service1"
              position="top"
              formatter={(label: React.ReactNode) =>
                typeof label === "number" ? `£${label.toLocaleString()}` : label
              }
              style={{ fill: "#000", fontWeight: 600 }}
            />
          </Bar>
          <Bar dataKey="Service2" fill="#2D3FE4" radius={[4, 4, 0, 0]} name="Service name 2">
            <LabelList
              dataKey="Service2"
              position="top"
              formatter={(label: React.ReactNode) =>
                typeof label === "number" ? `£${label.toLocaleString()}` : label
              }
              style={{ fill: "#000", fontWeight: 600 }}
            />
          </Bar>
          <Bar dataKey="Service3" fill="#2D3FE4" radius={[4, 4, 0, 0]} name="Service name 3">
            <LabelList
              dataKey="Service3"
              position="top"
              formatter={(label: React.ReactNode) =>
                typeof label === "number" ? `£${label.toLocaleString()}` : label
              }
              style={{ fill: "#000", fontWeight: 600 }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
