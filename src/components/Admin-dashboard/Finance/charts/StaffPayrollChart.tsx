"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList
} from "recharts";

const data = [
  {
    name: "Staff name",
    pay: 9100,
    total: "£1650",
    overtime: "£1650",
    change: "+8%",
  },
  {
    name: "Staff name",
    pay: 24500,
    total: "£1650",
    overtime: "£1650",
    change: "+8%",
  },
  {
    name: "Staff name",
    pay: 24500,
    total: "£1650",
    overtime: "£1650",
    change: "+8%",
  },
  {
    name: "Staff name",
    pay: 24500,
    total: "£1650",
    overtime: "£1650",
    change: "+8%",
  },
  {
    name: "Staff name",
    pay: 24500,
    total: "£1650",
    overtime: "£1650",
    change: "+8%",
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload?.length) {
    const { name, total, overtime, change } = payload[0].payload;
    return (
      <div className="bg-white p-4 rounded-lg shadow-md border text-sm text-black w-64">
        <h4 className="text-sm font-semibold text-[#010101]">{name}</h4>
        <p className="text-xs font-semibold text-[#010101]">Total Pay: {total}</p>
        <p className="text-xs font-semibold text-[#010101]">Overtime pay: {overtime}</p>
        <div className="mt-2 px-2 py-1 bg-[#192B7F] text-[#19F0FF] font-semibold rounded-md text-xs w-fit">
          Change from previous period: {change}
        </div>
      </div>
    );
  }
  return null;
};

export default function StaffPayChart() {
  return (
    <ResponsiveContainer width="100%" className="p-[0.3rem]" height={500}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis tickFormatter={(v) => `£${v.toLocaleString()}`} />
        <Tooltip content={<CustomTooltip />} />
        <Bar dataKey="pay" width="10%" fill="#0AD6E4" radius={[4, 4, 0, 0]}>
          <LabelList
            dataKey="pay"
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
  );
}
