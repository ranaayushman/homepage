import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 md:px-10 pt-4 bg-[#FFFFFF] text-[#212121]">
      {/* Left side - AES Logo and Text */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-x-4">
        <Image
          src={"/svg/AES.svg"}
          height={40}
          width={40}
          alt="AES logo"
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <p className="text-[10px] md:text-sm text-center mt-1">
          Angel Education Society
        </p>
      </div>

      {/* Right side - KIWI Logo and Text */}
      <div className="flex flex-col sm:flex-row justify-between gap-x-4 items-center">
        <Image
          src={"/svg/kiwi.svg"}
          height={40}
          width={40}
          alt="logo"
          className="w-8 h-8 md:w-10 md:h-10"
        />
        <p className="text-[10px] md:text-sm text-center mt-1">
          In association with
          <br className="md:hidden" /> KIWI Schools
        </p>
      </div>
    </nav>
  );
};

export default Navbar;
