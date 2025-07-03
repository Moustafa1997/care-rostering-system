"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Dot
} from "recharts";

const data = [
  { date: "1/1/2025", payroll: 1000 },
  { date: "2/1/2025", payroll: 5000 },
  { date: "3/1/2025", payroll: 3000 },
  {
    date: "4/1/2025",
    payroll: 15000,
    name: "Service Name",
    hours: 200,
    change: "+8%",
    total: "£1650"
  },
  { date: "5/1/2025", payroll: 6000 }
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const { name, total, hours, change } = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border text-sm text-black w-64">
        <h4 className="text-sm font-semibold text-[#010101]">
          {name || "Service Name"}
        </h4>
        <p className="text-xs font-semibold text-[#010101]">
          Total Payroll: {total || "£1650"}
        </p>
        <p className="text-xs font-semibold text-[#010101]">
          Total Hours: {hours || "200 hrs"}
        </p>
        <div className="mt-2 px-2 py-1 bg-[#192B7F] text-[#19F0FF] font-semibold rounded-md text-xs w-fit">
          Change from previous period: {change || "+8%"}
        </div>
      </div>
    );
  }
  return null;
};

export default function PayrollTrendChart() {
  return (
    <ResponsiveContainer width="100%" className="p-[0.3rem]" height={500}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(v: number) => `£${v.toLocaleString()}`} />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="payroll"
          stroke="#000"
          dot={{
            stroke: "#FFA500",
            strokeWidth: 2,
            r: 6,
            fill: "#FFA500"
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
