import React from "react";
import KalyaniForm from "./KalyaniForm";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="grid grid-cols-2">
      <div>
        <KalyaniForm />
      </div>
      <div className="relative overflow-hidden">
        <Image
          src={"/img/students.png"}
          width={1000}
          height={1000}
          alt={"kalyani"}
          className="rounded-bl-[200px]"
        />
      </div>
    </div>
  );
};

export default HomePage;
