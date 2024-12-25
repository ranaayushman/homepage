import React from "react";
import Instructions from "./components/Instructions";

const Footer = () => {
  return (
    <section className="">
      <div className="p-10 pt-0 grid grid-cols-3">
        <div className="col-span-2">
          <Instructions />
        </div>
        <div></div>
      </div>
      <div className="text-sm bg-[#212121] flex items-center justify-center text-[#FFFFFF99] font-light">
        © 2024
        <span className="font-semibold mx-1">techsupport@Kiwi Ed-Tech</span>
        All rights reserved.
      </div>
    </section>
  );
};

export default Footer;
