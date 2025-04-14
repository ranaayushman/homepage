// import Image from "next/image";
import React from "react";

const Navbar = () => {
  return (
    <section className="bg-[#FFFFFF]">
      <div className="flex justify-between items-center py-4 px-10">
        <div>
          <h2>Welcome</h2>
          <p>Mayank</p>
        </div>
        <div>
          {/* <Image alt="query" height={30} width={30} src={"/svg/Query.svg"} /> */}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
