import React from "react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";

export default function Performance() {
  return (
    <section>
      <div className="p-6 space-y-4 bg-white rounded-2xl">
        {/* Continuity */}
        <h2 className="text-xl font-semibold text-gray-500">Performance</h2>
        <p className="text-xl font-medium text-[#293444]">
          Overall Employee Performance Score
        </p>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-6 bg-[#5473E8] rounded-md p-4 flex gap-4 items-start">
            <div className="bg-[#6280F2] rounded-full p-3">
              <ImageComponent
                src="/images/performance.svg"
                width={40}
                height={40}
                alt="performance-percentage"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Performance percentage score
              </p>
              <h2 className="text-4xl font-semibold text-white mb-3">88%</h2>
              <p className="text-sm font-semibold text-white">In this Month</p>
            </div>
          </div>
          <div className="col-span-6 bg-[#5473E8] rounded-md p-4 flex gap-4 items-start">
            <div className="bg-[#6280F2] rounded-full p-3">
              <ImageComponent
                src="/images/performance.svg"
                width={40}
                height={40}
                alt="performance-percentage"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">
                Letter grade as per performance
              </p>
              <h2 className="text-4xl font-semibold text-white mb-3">A</h2>
              <p className="text-sm font-semibold text-white">In this Month</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-4 mt-4">
          <div className="col-span-4 bg-white shadow-lg rounded-md flex flex-col justify-center items-center p-4 gap-4 2xl:w-[265px] lg:w-[210px] h-[170px]">
            <div className="bg-[#5473E8] rounded-full p-4 2xl:w-[30%] lg:w-[40%] h-auto flex justify-center items-center">
              <span className="text-4xl font-semibold text-white">8</span>
            </div>
            <div>
              <p className="text-base font-semibold text-[#293444] text-center">
                Late Shifts in this month
              </p>
            </div>
          </div>
          <div className="col-span-4 bg-white shadow-lg rounded-md flex flex-col justify-center items-center p-4 gap-4 2xl:w-[265px] lg:w-[210px] h-[170px]">
            <div className="bg-[#253BAA] rounded-full p-4 2xl:w-[30%] lg:w-[40%] h-auto flex justify-center items-center">
              <span className="text-4xl font-semibold text-white">4</span>
            </div>
            <div>
              <p className="text-base font-semibold text-[#293444] text-center">
                Sick Leave Requests
              </p>
            </div>
          </div>
          <div className="col-span-4 bg-white shadow-lg rounded-md flex flex-col justify-center items-center p-4 gap-4 2xl:w-[265px] lg:w-[210px] h-[170px]">
            <div className="bg-[#253BAA] rounded-full p-4 2xl:w-[30%] lg:w-[40%] h-auto flex justify-center items-center">
              <span className="text-4xl font-semibold text-white">18</span>
            </div>
            <div>
              <p className="text-base font-semibold text-[#293444] text-center">
                Shift Completion
              </p>
            </div>
          </div>
          <div className="col-span-4 bg-white shadow-lg rounded-md flex flex-col justify-center items-center p-4 gap-4 2xl:w-[265px] lg:w-[210px] h-[170px]">
            <div className="bg-[#1A2D8A] rounded-full p-4 2xl:w-[30%] lg:w-[40%] h-auto flex justify-center items-center">
              <span className="text-4xl font-semibold text-white">8</span>
            </div>
            <div>
              <p className="text-base font-semibold text-[#293444] text-center">
                Missed Shifts in this month
              </p>
            </div>
          </div>
          <div className="col-span-4 bg-white shadow-lg rounded-md flex flex-col justify-center items-center p-4 gap-4 2xl:w-[265px] lg:w-[210px] h-[170px]">
            <div className="bg-[#1A2D8A] rounded-full p-4 2xl:w-[30%] lg:w-[40%] h-auto flex justify-center items-center">
              <span className="text-4xl font-semibold text-white">2</span>
            </div>
            <div>
              <p className="text-base font-semibold text-[#293444] text-center">
                Weekend Engagement in this month
              </p>
            </div>
          </div>
          <div className="col-span-4 bg-white shadow-lg rounded-md flex flex-col justify-center items-center p-4 gap-4 2xl:w-[265px] lg:w-[210px] h-[170px]">
            <div className="bg-[#5473E8] rounded-full p-4 2xl:w-[30%] lg:w-[40%] h-auto flex justify-center items-center">
              <span className="text-4xl font-semibold text-white">1</span>
            </div>
            <div>
              <p className="text-base font-semibold text-[#293444] text-center">
                Absence in this month
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-4 mt-4 justify-center">
          <div className="bg-white shadow-lg rounded-md flex flex-col justify-center items-center p-4 gap-4 w-[270px]">
            <div className="bg-[#5473E8] rounded-full p-4 2xl:w-[30%] lg:w-[40%] h-auto flex justify-center items-center">
              <span className="text-4xl font-semibold text-white">3</span>
            </div>
            <div>
              <p className="text-base font-semibold text-[#293444] text-center">
                Swap Requests in this month
              </p>
            </div>
          </div>
          <div className="bg-white shadow-lg rounded-md flex flex-col justify-center items-center p-4 gap-4 w-[270px]">
            <div className="bg-[#5473E8] rounded-full p-4 2xl:w-[30%] lg:w-[40%] h-auto flex justify-center items-center">
              <span className="text-4xl font-semibold text-white">5</span>
            </div>
            <div>
              <p className="text-base font-semibold text-[#293444] text-center">
                Total One-on-One Sessions in this month
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
