"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

const Navbar = () => {
  const [name, setName] = useState<string | undefined>("");

  useEffect(() => {
    const cookieName = Cookies.get("userName");
    setName(cookieName);
  }, []);

  return (
    <section className="bg-[#FFFFFF]">
      <div className="flex justify-between items-center py-4 px-10">
        <div>
          <h2>Welcome</h2>
          <p>{name}</p>
        </div>
        <div>
          {/* <Image alt="query" height={30} width={30} src={"/svg/Query.svg"} /> */}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
