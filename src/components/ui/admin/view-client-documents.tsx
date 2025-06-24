import React from "react";
import {Button} from "@/components/ui/button";
import { Eye, Download } from 'lucide-react';

export default function ViewClientDocuments() {
  return (
    <div className="p-6 space-y-8 rounded-2xl">
        {/* Document Uploaded */}
        <h2 className="text-xl font-semibold text-gray-500">Document Uploaded</h2>
        <div className="grid grid-cols-12 gap-4 bg-[#F1F4FD] rounded-t-2xl p-4">
            <div className="col-span-4">
              <span className="text-lg font-medium text-[#41526A]">Proof of ID</span>
            </div>
            <div className="col-span-4 text-center">
                <span className="text-lg font-medium text-[#41526A]">Consent Form for Care</span>
            </div>
            <div className="col-span-4 text-center">
                <span className="text-lg font-medium text-[#41526A]">Risk Assessment</span>
            </div>
        </div>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] items-center rounded-2xl p-4 shadow">
            <div className="col-span-4 border-r border-[#C6C6C6]">
              <span className="text-base font-semibold text-[#2F3E53]">Document title</span>
            </div>
            <div className="col-span-4 border-r border-[#C6C6C6] text-center">
                <span className="text-base font-semibold text-[#2F3E53]">File name</span>
            </div>
            <div className="col-span-4 text-center flex justify-center">
                <span className="text-base font-semibold text-[#2F3E53] flex gap-5"><Eye size={20} /> <Download size={20}/></span>
            </div>
        </div>
      </div>
  );
}
