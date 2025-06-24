import React from "react";
import AdminMenu from "./Menu/adminMenu";
import ImageComponent from "../ImageComponent/ImageComponent";

const AdminSideBar = () => {
  return (
    <div className="bg-blue-dark1 w-full h-full min-h-screen-minus-210 lg:border-r border-r-lightgray">
      <div className="py-8 lg:p-5 xl:p-5 bg-blue-dark2 sticky top-0 z-50 shadow-md">
        <div className="w-full flex flex-row align-middle gap-5">
          <div className="logo w-full lg:w-auto">
            <ImageComponent
              src="/images/logo.svg"
              width={50}
              height={50}
              alt="image"
            />
          </div>
        </div>
      </div>
      <div className="lg:sticky lg:top-[110px] lg:z-10  ">
        <AdminMenu />
      </div>
    </div>
  );
};

export default AdminSideBar;
