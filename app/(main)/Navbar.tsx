import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <section className="bg-[#FFFFFF]">
      <div className="flex justify-between items-center py-4 px-10">
        <div>
          <p className="text-sm">Welcome</p>
          <h2 className="text-md">Mayank</h2>
        </div>
        <div>
          <Image alt="query" height={30} width={30} src={"/svg/query.svg"} />
        </div>
      </div>
    </section>
  );
};

export default Navbar;
