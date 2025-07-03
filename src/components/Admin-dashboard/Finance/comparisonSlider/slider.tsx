'use client';

import React from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

type Staff = {
  name: string;
  workedHours: number;
  totalShift: number;
  regularPay: string;
  overtimePay: string;
  totalPay: string;
  image: string;
};

const staffData: Staff[] = [
  {
    name: "John Doe",
    workedHours: 250,
    totalShift: 30,
    regularPay: "£4,500",
    overtimePay: "£1,000",
    totalPay: "£5,500",
    image: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "Jane Smith",
    workedHours: 200,
    totalShift: 25,
    regularPay: "£4,000",
    overtimePay: "£800",
    totalPay: "£4,800",
    image: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Alice Johnson",
    workedHours: 270,
    totalShift: 32,
    regularPay: "£4,700",
    overtimePay: "£1,200",
    totalPay: "£5,900",
    image: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Robert Brown",
    workedHours: 240,
    totalShift: 28,
    regularPay: "£4,300",
    overtimePay: "£950",
    totalPay: "£5,250",
    image: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Emily Davis",
    workedHours: 260,
    totalShift: 29,
    regularPay: "£4,600",
    overtimePay: "£1,100",
    totalPay: "£5,700",
    image: "https://i.pravatar.cc/100?img=5",
  },
];

export default function ComparisonCardSlider() {
const [sliderRef] = useKeenSlider<HTMLDivElement>({
  loop: false,
  mode: "snap",
  slides: {
    perView: 3,
    spacing: 16,
  },
  breakpoints: {
    "(max-width: 1024px)": {
      slides: { perView: 2, spacing: 12 },
    },
    "(max-width: 640px)": {
      slides: { perView: 1.2, spacing: 10 },
    },
  },
});


  return (
    <div className="w-full overflow-hidden" ref={sliderRef}>
    <div className="keen-slider">
      {staffData.map((staff, index) => (
        <div
          key={index}
          className="keen-slider__slide bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center text-center shadow-md min-h-[320px] relative"
        >
          <button className="absolute top-2 right-3 text-gray-400 text-sm font-medium">
            ×
          </button>
          <img
            src={staff.image}
            alt={staff.name}
            className="w-14 h-14 rounded-full object-cover mb-2"
          />
          <p className="text-sm text-gray-400">Staff Name</p>
          <h3 className="text-base font-semibold text-black mb-2">
            {staff.name}
          </h3>
          <div className="w-full text-left space-y-1 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>Worked hours</span>
              <span>{staff.workedHours}</span>
            </div>
            <div className="flex justify-between">
              <span>Total shift</span>
              <span>{staff.totalShift}</span>
            </div>
            <div className="flex justify-between">
              <span>Regular pay</span>
              <span>{staff.regularPay}</span>
            </div>
            <div className="flex justify-between">
              <span>Overtime pay</span>
              <span>{staff.overtimePay}</span>
            </div>
            <div className="flex justify-between font-semibold text-blue-700 pt-2 border-t border-gray-200 mt-2">
              <span>Total Pay</span>
              <span>{staff.totalPay}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}
