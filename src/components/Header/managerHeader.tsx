"use client";
import React from "react";
import UserBox from "../Userbox";

const Adminheader = () => {
  return (
    <>
      <header className="w-full bg-white py-8 lg:p-5 xl:p-5 sticky top-0 z-50 shadow-md">
        <div className="w-full flex flex-row items-center justify-between">
          <UserBox />
        </div>
      </header>
    </>
  );
};

export default Adminheader;
