import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="relative px-10 py-2 bg-[#FFFFFF] text-[#212121] ">
      <div
        className="w-1/4 h-52 bg-[#f5f3f3] z-10 shadow-xl drop-shadow-xl absolute top-[-32px] left-10 flex items-center justify-center"
        style={{
          clipPath: "polygon(50% 100%, 83% 62%, 82% 0%, 18% 0%, 17% 62%)",
        }}
      >
        <div className="flex flex-col items-center justify-center">
          <Image src={"/svg/AES.svg"} height={60} width={60} alt="AES logo" />
          <p className="text-sm p-2">Angel Education Society</p>
        </div>
      </div>

      {/* Navbar content */}
      <div className="flex justify-between items-center gap-x-2 relative z-20">
        <div className="flex items-center gap-x-2"></div>
        <div className="flex justify-end items-center gap-x-2">
          <Image src={"/svg/kiwi.svg"} height={40} width={40} alt="logo" />
          <p>In association with KIWI Schools</p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
