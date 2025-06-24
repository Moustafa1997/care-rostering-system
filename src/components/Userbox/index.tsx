import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/auth/useLogout";

const UserBox = () => {
  const { logout } = useLogout();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full flex flex-row align-middle gap-5 justify-end relative">
      <div
        className="flex justify-center items-center cursor-pointer hover:opacity-80"
        onClick={handleClick}
      >
        <Image src="/images/user.svg" alt="image" width="45" height="45" />
        <ChevronDown
          className={`text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          size={20}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
          <button
            onClick={logout}
            className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-2"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default UserBox;
