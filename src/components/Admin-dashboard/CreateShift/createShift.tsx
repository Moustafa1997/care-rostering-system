"use client";
import React,{useState} from "react";
import { Plus } from "lucide-react";
import ImageComponent from "@/components/ImageComponent/ImageComponent";
import CreateShiftTable from "@/components/ui/admin/create-shift-tabel";
import { Button } from "@/components/ui/button";
import CreateShiftModal from "./createShiftModal/createShiftModal";

const CreateShift = () => {
    const [showModal, setShowModal] = useState(false);
  return (
    <div className="w-full p-4 bg-slate-50">
      <h1 className="text-2xl font-semibold text-[#010101]">Created Shift</h1>
      <div className="w-full flex flex-col justify-between items-center my-4 gap-4">
        <div className="flex justify-between items-center w-full gap-4">
          <div className="w-8/12 h-[208px] bg-white rounded-xl flex items-center justify-between px-2 pt-4">
            <div className="w-[80%]">
              <ImageComponent
                src="/images/doc.svg"
                width={550}
                height={300}
                alt="img"
              />
            </div>
            <div className="pr-4">
              <p className="text-[#1E38A5] font-semibold text-base">
                Total Shift Created
              </p>
              <h3 className="text-[#253BAA] font-semibold text-5xl">10</h3>
            </div>
          </div>
          <div className="w-1/3 h-[208px] bg-white rounded-xl flex items-center justify-center p-6">
            <Button
              variant={"noborder"}
              onClick={() => setShowModal(true)}
              className="flex items-center justify-start gap-4 text-white w-[273px] h-[130px] px-6 py-3 rounded-xl bg-[#152e9d] bg-[url('/images/bg-btn.svg')] bg-no-repeat bg-left-top"
            >
            <ImageComponent
              className="text-white"
              width={30}
              height={30}
              src="/images/plus.svg"
              alt="plus"/>
              <div className="text-lg font-medium">
                Create
                <br />
                New Shift
              </div>
            </Button>
          </div>
        </div>
      </div>
      <CreateShiftTable/>

       {showModal && <CreateShiftModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default CreateShift;
