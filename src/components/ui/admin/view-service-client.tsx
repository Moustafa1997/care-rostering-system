import React from "react";
import { Button } from "@/components/ui/button";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";
export default function ViewServiceClient() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-500">Client</h2>
        <Button variant="outline" className="w-32 h-9">
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="col-span-12">
          <div className="flex gap-4">
            <div className="col-span-6 w-full">
              <div className="bg-white flex justify-between p-4 rounded-2xl shadow">
                <div>
                  <ImageComponent
                    src="/images/user.svg"
                    width={100}
                    height={100}
                    alt="img"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#293444] mb-0">
                    John Smith
                  </h2>
                  <div className="text-sm font-semibold">
                    <span className="text-[#787878] text-sm font-normal">
                      Address
                    </span>
                    <p>Location address Location address</p>
                  </div>
                  <div className="mt-4 text-sm font-normal text-[#253BAA]"><Link href="">View Detail</Link></div>
                </div>
                <div className="text-sm font-semibold">
                  <span className="text-[#787878] text-sm font-normal">
                    Joining date
                  </span>
                  <p>12.2.2025</p>
                </div>
                <div className="text-sm font-semibold">
                  <span className="text-[#787878] text-sm font-normal">
                    One to one session
                  </span>
                  <p>12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <div className="flex gap-4">
            <div className="col-span-6 w-full">
              <div className="bg-white flex justify-between p-4 rounded-2xl shadow">
                <div>
                  <ImageComponent
                    src="/images/user.svg"
                    width={100}
                    height={100}
                    alt="img"
                  />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-[#293444] mb-0">
                    John Smith
                  </h2>
                  <div className="text-sm font-semibold">
                    <span className="text-[#787878] text-sm font-normal">
                      Address
                    </span>
                    <p>Location address Location address</p>
                  </div>
                  <div className="mt-4 text-sm font-normal text-[#253BAA]"><Link href="">View Detail</Link></div>
                </div>
                <div className="text-sm font-semibold">
                  <span className="text-[#787878] text-sm font-normal">
                    Joining date
                  </span>
                  <p>12.2.2025</p>
                </div>
                <div className="text-sm font-semibold">
                  <span className="text-[#787878] text-sm font-normal">
                    One to one session
                  </span>
                  <p>12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-12">
          <Link
            href=""
            className="flex items-center gap-2 text-sm font-normal text-[#253BAA] mt-4"
          >
            <Plus size={15} />
            Add more team member
          </Link>
        </div>
      </div>
    </>
  );
}
