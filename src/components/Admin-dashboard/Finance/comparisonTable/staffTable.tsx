import React from "react";

export default function StaffTable() {
  const data = [
    {
      name: "Sarah",
      hoursWorked: "420 hrs",
      payroll: "£4,800",
      overtimeHours: "35 hrs",
      avgHours: "£11.43",
      percentage: "+4%",
    },
    {
      name: "John",
      hoursWorked: "390 hrs",
      payroll: "£4,800",
      overtimeHours: "28 hrs",
      avgHours: "£9.36",
      percentage: "+3%",
    },
    {
      name: "Sarah",
      hoursWorked: "420 hrs",
      payroll: "£4,800",
      overtimeHours: "35 hrs",
      avgHours: "£11.43",
      percentage: "+4%",
    },
  ];

  return (
    <section>
       <div className="overflow-x-auto">
          <table className="min-w-[768px] w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="bg-[#F1F4FD]">
                <th className="text-base font-semibold text-[#2F3E53] text-center rounded-l-2xl px-4 py-3 min-w-[120px]">
                  Staff Name
                </th>
                <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[120px]">Total Hours Worked</th>
                <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[120px]">Total Payroll</th>
                <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[80px]">Overtime Hours</th>
                <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[100px]">
                  Avg. Pay per Hour
                </th>
                <th className="text-base font-semibold text-[#2F3E53] text-center rounded-r-2xl px-4 py-3 min-w-[100px]">
                  % Change (vs. previous)
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="bg-white shadow border border-[#E1E1E1] rounded-2xl overflow-hidden"
                >
                  <td className="text-center text-base font-semibold text-[#2F3E53] px-4 py-4">
                    {item.name}
                  </td>
                  <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">
                    {item.hoursWorked}
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">
                      {item.payroll}
                    </span>
                  </td>
                  <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">
                    {item.overtimeHours}
                  </td>
                  <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">{item.avgHours}</td>
                  <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">{item.percentage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
    </section>
  );
}
