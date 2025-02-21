import Image from "next/image";
import React from "react";

const Skills: React.FC = () => {
  return (
    <div className="text-center py-12">
      <h3 className="uppercase text-sm font-medium tracking-wider text-center mb-2 text-[#292B5F]">
        ATTITUDES, AGILITY, ADAPTABILITY AND INGENUITY FOR LIFELONG LEARNING
      </h3>
      <h2 className="text-4xl font-semibold text-[#292B5F] mb-8">Skills</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 px-8">
        <div className="relative overflow-hidden h-60">
          <Image
            height={400}
            width={400}
            src="/img/physics_lab.png"
            alt="Physics Lab"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-3xl font-semibold">Physics Lab</h3>
          </div>
        </div>

        <div className="relative overflow-hidden h-60">
          <Image
            height={400}
            width={400}
            src="/img/biology-lab.png"
            alt="Biology Lab"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-3xl font-semibold">Biology Lab</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
        <div className="relative overflow-hidden h-52">
          <Image
            height={400}
            width={400}
            src="/img/computer-lab.png"
            alt="Computer Lab"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-3xl font-semibold">Computer Lab</h3>
          </div>
        </div>

        <div className="relative overflow-hidden h-52">
          <Image
            height={400}
            width={400}
            src="/img/chemistry-lab.png"
            alt="Chemistry Lab"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-3xl font-semibold">Chemistry Lab</h3>
          </div>
        </div>

        <div className="relative overflow-hidden h-52">
          <Image
            height={400}
            width={400}
            src="/img/library.png"
            alt="Library"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h3 className="text-white text-3xl font-semibold">Library</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
