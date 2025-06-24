import React from "react";
import { Button } from "@/components/ui/button";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import { EllipsisVertical, Plus } from "lucide-react";
import Link from "next/link";
export default function ViewServiceTeam() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-500">Team</h2>
        <Button variant="outline" className="w-32 h-9">
          Edit
        </Button>
      </div>
      <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
        <div className="col-span-12">
          <h2 className="text-lg font-medium text-[#41526A]">Manager</h2>
          <div className="flex gap-4">
            <div className="col-span-6 w-2/4">
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
                  <h2 className="text-lg font-semibold text-[#293444]">
                    John Smith
                  </h2>
                  <div className="bg-cyan rounded-full p-2 text-white text-sm font-semibold">
                    <span>Regional Manager</span>
                  </div>
                </div>
                <div className="relative group">
                  <EllipsisVertical className="cursor-pointer" />
                  <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded-lg shadow-lg z-10">
                    <ul className="text-sm text-gray-700 w-[125px]">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        View Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Remove from Service
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6 w-2/4">
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
                  <h2 className="text-lg font-semibold text-[#293444]">
                    John Smith
                  </h2>
                  <div className="bg-cyan rounded-full p-2 text-white text-sm font-semibold">
                    <span>Regional Manager</span>
                  </div>
                </div>
                <div className="relative group">
                  <EllipsisVertical className="cursor-pointer" />
                  <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded-lg shadow-lg z-10">
                    <ul className="text-sm text-gray-700 w-[125px]">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        View Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Remove from Service
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <h2 className="text-lg font-medium text-[#41526A]">
            Support team member
          </h2>
          <div className="flex gap-4">
            <div className="col-span-6 w-2/4">
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
                  <h2 className="text-lg font-semibold text-[#293444]">
                    John Smith
                  </h2>
                  <div className="bg-cyan rounded-full p-2 text-white text-sm font-semibold">
                    <span>Regional Manager</span>
                  </div>
                </div>
                <div className="relative group">
                  <EllipsisVertical className="cursor-pointer" />
                  <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded-lg shadow-lg z-10">
                    <ul className="text-sm text-gray-700 w-[125px]">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        View Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Remove from Service
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6 w-2/4">
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
                  <h2 className="text-lg font-semibold text-[#293444]">
                    John Smith
                  </h2>
                  <div className="bg-cyan rounded-full p-2 text-white text-sm font-semibold">
                    <span>Regional Manager</span>
                  </div>
                </div>
                <div className="relative group">
                  <EllipsisVertical className="cursor-pointer" />
                  <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded-lg shadow-lg z-10">
                    <ul className="text-sm text-gray-700 w-[125px]">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        View Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Remove from Service
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12">
          <h2 className="text-lg font-medium text-[#41526A]">
            Backup team member
          </h2>
          <div className="flex gap-4">
            <div className="col-span-6 w-2/4">
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
                  <h2 className="text-lg font-semibold text-[#293444]">
                    John Smith
                  </h2>
                  <div className="bg-cyan rounded-full p-2 text-white text-sm font-semibold">
                    <span>Regional Manager</span>
                  </div>
                </div>
                <div className="relative group">
                  <EllipsisVertical className="cursor-pointer" />
                  <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded-lg shadow-lg z-10">
                    <ul className="text-sm text-gray-700 w-[125px]">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        View Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Remove from Service
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-span-6 w-2/4">
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
                  <h2 className="text-lg font-semibold text-[#293444]">
                    John Smith
                  </h2>
                  <div className="bg-cyan rounded-full p-2 text-white text-sm font-semibold">
                    <span>Regional Manager</span>
                  </div>
                </div>
                <div className="relative group">
                  <EllipsisVertical className="cursor-pointer" />
                  <div className="absolute right-0 mt-2 hidden group-hover:block bg-white border rounded-lg shadow-lg z-10">
                    <ul className="text-sm text-gray-700 w-[125px]">
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        View Profile
                      </li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                        Remove from Service
                      </li>
                    </ul>
                  </div>
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
