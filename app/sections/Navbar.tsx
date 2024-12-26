import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <nav className="relative px-4 md:px-10 py-2 bg-[#FFFFFF] text-[#212121]">
      {/* Pentagon Logo Container */}
      <div
        className="w-24 md:w-1/4 h-36 md:h-32 bg-[#f5f3f3] z-10 shadow-xl drop-shadow-xl absolute left-16  md:left-10 -translate-x-1/2 md:translate-x-0 md:-top-0 flex items-center justify-center"
        style={{
          clipPath: "polygon(50% 100%, 83% 62%, 82% 0%, 18% 0%, 17% 62%)",
        }}
      >
        <div className="flex flex-col items-center justify-center scale-75 md:scale-100">
          <Image src={"/svg/AES.svg"} height={60} width={60} alt="AES logo" />
          <p className="text-xs md:text-sm p-2 text-center">
            Angel Education Society
          </p>
        </div>
      </div>

      {/* Navbar content */}
      <div className="flex justify-end items-center gap-x-2 relative z-20 pt-16 md:pt-0">
        <div className="flex items-center gap-x-2 text-sm md:text-base">
          <Image
            src={"/svg/kiwi.svg"}
            height={40}
            width={40}
            alt="logo"
            className="w-8 h-8 md:w-10 md:h-10"
          />
          <p className="text-xs md:text-base">
            In association with KIWI Schools
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
