import React from "react";

export default function ClientContinuity() {
  const data = [
    {
      name: "John",
      phone: "07380462053",
      role: "Support Worker",
      status: "Active",
      shift: 24,
      continuity: "27%",
    },
    {
      name: "John",
      phone: "07380462053",
      role: "Support Worker",
      status: "Active",
      shift: 24,
      continuity: "27%",
    },
    {
      name: "John",
      phone: "07380462053",
      role: "Support Worker",
      status: "Active",
      shift: 24,
      continuity: "27%",
    },
  ];

  return (
    <section>
      <div className="p-6 space-y-6 bg-white rounded-2xl">
        <h2 className="text-xl font-semibold text-gray-500">Continuity</h2>

        <div className="overflow-x-auto">
          <table className="min-w-[768px] w-full border-separate border-spacing-y-4">
            <thead>
              <tr className="bg-[#F1F4FD]">
                <th className="text-base font-semibold text-[#2F3E53] text-center rounded-l-2xl px-4 py-3 min-w-[120px]">
                  Staff Name
                </th>
                <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[120px]">Role</th>
                <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[120px]">Status</th>
                <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[80px]">Shift</th>
                <th className="text-base font-semibold text-[#2F3E53] text-center rounded-r-2xl px-4 py-3 min-w-[100px]">
                  Continuity
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
                    {item.role}
                  </td>
                  <td className="text-center px-4 py-4">
                    <span className="bg-cyan text-white text-sm font-semibold px-4 py-1 rounded-full inline-block">
                      {item.status}
                    </span>
                  </td>
                  <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">
                    {item.shift}
                  </td>
                  <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">{item.continuity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
