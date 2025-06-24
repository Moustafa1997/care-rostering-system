import React from "react";
import { Input } from "@/components/ui/input";
import { Upload} from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewClientDocuments from "@/components/ui/admin/view-client-documents";

export default function Documents() {
  return (
    <section>
      <div className="p-6 space-y-4 bg-white rounded-2xl">
        {/* Document */}
        <h2 className="text-xl font-semibold text-gray-500">
          Document
        </h2>
        <div className="grid grid-cols-12 gap-4 border border-[#E1E1E1] rounded-2xl p-8 shadow">
          <div className="col-span-12">
            <div className="mb-4">
              <div>
                <label className="text-sm font-medium text-[#41526A]">
                  Proof of ID
                </label>
              </div>
              <div className="flex items-center gap-2 border border-blue-soft rounded-md pr-4">
                <Input
                  type="file"
                  className="w-full border-none"
                  placeholder="Upload document"
                />
                <Upload className="h-5 w-5 text-[#253BAA]" />
              </div>
            </div>
            <div className="mb-4">
              <div>
                <label className="text-sm font-medium text-[#41526A]">
                  Consent Form for Care
                </label>
              </div>
              <div className="flex items-center gap-2 border border-blue-soft rounded-md pr-4">
                <Input
                  type="file"
                  className="w-full border-none"
                  placeholder="Upload document"
                />
                <Upload className="h-5 w-5 text-[#253BAA]" />
              </div>
            </div>
              <div className="mb-4">
              <div>
                <label className="text-sm font-medium text-[#41526A]">
                  Basic Risk Assessment 
                </label>
              </div>
              <div className="flex items-center gap-2 border border-blue-soft rounded-md pr-4">
                <Input
                  type="file"
                  className="w-full border-none"
                  placeholder="Upload document"
                />
                <Upload className="h-5 w-5 text-[#253BAA]" />
              </div>
            </div>
          </div>
        </div>

        {/* view client Documents */}
        {/* <ViewClientDocuments/> */}
      </div>
      <div className="mt-12 flex justify-center gap-5">
        <Button variant="outline" className="w-40">
          Cancel
        </Button>
        <Button variant="default" className="w-40">
          Save
        </Button>
      </div>
    </section>
  );
}
