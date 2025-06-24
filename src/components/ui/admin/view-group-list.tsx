import React from "react";
import { Button } from "@/components/ui/button";
import ImageComponent from "@/components/ImageComponent/ImageComponent";

type ViewGroupListProps = {
  onBack: () => void;
};

export default function ViewGroupList({ onBack }: ViewGroupListProps) {
  return (
    <section>
      <div className="mb-6">
        <p className="text-sm font-semibold text-gray-500 mb-4">
          Team /Group-List/<span className="text-[#959595]">Group detail</span>
        </p>
        <h1 className="text-2xl text-gray-500 font-semibold mb-4">
          Group Detail
        </h1>
      </div>
      <div className="p-6 space-y-8 bg-white rounded-2xl">
        {/* Group detail */}
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
           <div className="w-full col-span-12">
                <p className="text-sm font-medium text-[#41526A]">Group name</p>
                <h3 className="text-xl font-semibold text-[#41526A]">physiotherapy Service</h3>
            </div>
            <div className="w-full col-span-12">
                <p className="text-sm font-medium text-[#41526A] mb-4">Staff</p>
                <div className="flex gap-2 mb-4">
                    <ImageComponent
                     src="/images/user.svg"
                     width={20}
                     height={20}
                     alt="user"
                    />
                    <span className="text-base font-normal text-[#41526A]">John Deo</span>
                </div>
                <div className="flex gap-2 mb-8">
                                        <ImageComponent
                     src="/images/user.svg"
                     width={20}
                     height={20}
                     alt="user"
                    />
                    <span className="text-base font-normal text-[#41526A]">George Michael</span>
                </div>
                <Button variant="default" className="w-44">Edit detail</Button>
            </div>
        </div>
      </div>
    </section>
  );
}
