import React from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";

export default function LiveTrackingListView() {
const services = [
  {
    serviceName: "17 Waverly Lodge",
    rows: [
      {
        clients: "Mr. Davies",
        assignedStaff: (
          <div className="flex items-center justify-center gap-1">
            <ImageComponent src="/images/user.svg" width={30} height={30} alt="client-1" />
            <h1 className="text-base font-semibold text-[#2F3E53]">Andrew Thomas</h1>
          </div>
        ),
        scheduledStart: "8:00 AM",
        actualStart: "8:00 AM",
        status: "1.3 miles away (off-site)",
      },
      {
        clients: "Mr. Davies",
        assignedStaff: (
          <div className="flex items-center justify-center gap-1">
            <ImageComponent src="/images/user.svg" width={30} height={30} alt="client-1" />
            <h1 className="text-base font-semibold text-[#2F3E53]">Andrew Thomas</h1>
          </div>
        ),
        scheduledStart: "7:55 AM",
        actualStart: "7:55 AM",
        status: "On-site",
      },
      {
        clients: "Mr. Davies",
        assignedStaff: (
          <div className="flex items-center justify-center gap-1">
            <ImageComponent src="/images/user.svg" width={30} height={30} alt="client-1" />
            <h1 className="text-base font-semibold text-[#2F3E53]">John Doe</h1>
          </div>
        ),
        scheduledStart: "8:15 AM",
        actualStart: "8:15 AM",
        status: "1.3 miles away (off-site)",
      },
    ],
  },
  {
    serviceName: "Crescent House",
    rows: [
      {
        clients: "Mr. Davies",
        assignedStaff: (
          <div className="flex items-center justify-center gap-1">
            <ImageComponent src="/images/user.svg" width={30} height={30} alt="client-1" />
            <h1 className="text-base font-semibold text-[#2F3E53]">Andrew Thomas</h1>
          </div>
        ),
        scheduledStart: "8:00 AM",
        actualStart: "8:00 AM",
        status: "1.3 miles away (off-site)",
      },
      {
        clients: "Mr. Davies",
        assignedStaff: (
          <div className="flex items-center justify-center gap-1">
            <ImageComponent src="/images/user.svg" width={30} height={30} alt="client-1" />
            <h1 className="text-base font-semibold text-[#2F3E53]">Andrew Thomas</h1>
          </div>
        ),
        scheduledStart: "7:55 AM",
        actualStart: "7:55 AM",
        status: "On-site",
      },
      {
        clients: "Mr. Davies",
        assignedStaff: (
          <div className="flex items-center justify-center gap-1">
            <ImageComponent src="/images/user.svg" width={30} height={30} alt="client-1" />
            <h1 className="text-base font-semibold text-[#2F3E53]">John Doe</h1>
          </div>
        ),
        scheduledStart: "8:15 AM",
        actualStart: "8:15 AM",
        status: "1.3 miles away (off-site)",
      },
    ],
  },
];


  return (
<section>
  {services.map((service, i) => (
    <div key={i} className="mb-8">
      <div>
        <h1 className="text-xl font-medium text-[#787878]">{service.serviceName}</h1>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[768px] w-full border-separate border-spacing-y-2">
          <thead>
            <tr className="bg-[#F1F4FD]">
              <th className="text-base font-semibold text-[#2F3E53] text-center rounded-l-xl px-4 py-3 min-w-[120px]">
                Clients
              </th>
              <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[120px]">Assigned Staff</th>
              <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[120px]">Scheduled Start</th>
              <th className="text-base font-semibold text-[#2F3E53] text-center px-4 py-3 min-w-[80px]">Actual Start</th>
              <th className="text-base font-semibold text-[#2F3E53] text-center rounded-r-xl px-4 py-3 min-w-[100px]">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {service.rows.map((item, index) => (
              <tr key={index} className="bg-white border border-[#A8A8A8] rounded-2xl overflow-hidden">
                <td className="text-center text-base font-semibold text-[#2F3E53] px-4 py-4">
                  {item.clients}
                </td>
                <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">
                  {item.assignedStaff}
                </td>
                <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">
                  {item.scheduledStart}
                </td>
                <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">
                  {item.actualStart}
                </td>
                <td className="text-center text-base font-medium text-[#2F3E53] px-4 py-4">
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</section>

  );
}
