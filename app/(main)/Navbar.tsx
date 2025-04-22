// import Image from "next/image";
import React from "react";
import Cookies from "js-cookie";
const Navbar = () => {
  const name = Cookies.get("userName");
  return (
    <section className="bg-[#FFFFFF] ">
      <div className="flex justify-between items-center py-4 px-10 w-full">
        <div className="w-1/2">
          <p className="text-sm">Welcome</p>
          <h2 className="text-md">{name}</h2>
        </div>
        <div className="w-1/2 flex justify-end">
          {/* <Image alt="query" height={30} width={30} src={"/svg/query.svg"} /> */}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
