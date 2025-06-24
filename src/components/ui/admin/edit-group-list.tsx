import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";

interface EditGroupListProps {
  onBack: () => void;
}

const EditGroupList: React.FC<EditGroupListProps> = ({ onBack }) => {
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
            <label className="block text-sm font-normal text-[#2F3E53] mb-3">
              Group name
            </label>
            <div className="border border-primaryColors-blue p-2 w-2/4 rounded-md">
            <span className="text-sm font-medium text-[#41526A] mb-4">physiotherapy Service</span>
            </div>
            </div>
            <div className="w-full col-span-12 mt-4">
                <p className="text-sm font-medium text-[#41526A] mb-4">Staff</p>
                <div className="flex justify-between items-center w-2/4 mb-4">
                  <div className="flex gap-2">     <ImageComponent
                     src="/images/user.svg"
                     width={20}
                     height={20}
                     alt="user"
                    />
                    <span className="text-base font-normal text-[#41526A]">John Deo</span></div>
                    <div><Button variant="outline">Delete Staff</Button></div>
                </div>
                <div className="flex justify-between items-center w-2/4 mb-8">
                          <div className="flex gap-2">              <ImageComponent
                     src="/images/user.svg"
                     width={20}
                     height={20}
                     alt="user"
                    />
                    <span className="text-base font-normal text-[#41526A]">George Michael</span></div>
                    <div><Button variant="outline">Delete Staff</Button></div>
                </div>
                <div className="mb-8">
            <label className="block text-sm font-normal text-[#2F3E53] mb-3">
              Add Staff
            </label>
            <div className="border border-primaryColors-blue p-2 w-2/4 rounded-md">
            <span className="text-sm font-medium text-[#41526A] mb-4">physiotherapy Service</span>
            </div>
                </div>
                <div className="flex items-center gap-2 mb-8 text-base font-semibold text-[#253BAA]"><Plus size={18}/><span>Add more staff</span></div>
                <Button variant="default" className="w-44">Save</Button>
            </div>
        </div>
      </div>
    </section>
  );
};

export default EditGroupList;