import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

// Define the type for lab items
interface LabItem {
  src: string;
  alt: string;
  title: string;
  height: number;
}

const Skills: React.FC = () => {
  const labItems: LabItem[] = [
    {
      src: "/img/physics_lab.png",
      alt: "Physics Lab",
      title: "Physics Lab",
      height: 60,
    },
    {
      src: "/img/biology-lab.png",
      alt: "Biology Lab",
      title: "Biology Lab",
      height: 60,
    },
    {
      src: "/img/computer-lab.png",
      alt: "Computer Lab",
      title: "Computer Lab",
      height: 52,
    },
    {
      src: "/img/chemistry-lab.png",
      alt: "Chemistry Lab",
      title: "Chemistry Lab",
      height: 52,
    },
    { src: "/img/library.png", alt: "Library", title: "Library", height: 52 },
  ];

  // Animation variants for zoom effect
  const cardVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  return (
    <div className="text-center pb-12">
      <h2 className="text-4xl font-semibold text-[#101010] mb-2">Skills</h2>

      <h3 className="uppercase text-sm font-semibold tracking-wider text-center mb-8 text-[#101010]">
        ATTITUDES, AGILITY, ADAPTABILITY AND INGENUITY FOR LIFELONG LEARNING
      </h3>

      {/* First row: 2 items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 px-8">
        {labItems.slice(0, 2).map((item, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden h-60"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <Image
              height={400}
              width={400}
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-semibold">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Second row: 3 items */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
        {labItems.slice(2).map((item, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden h-52"
            variants={cardVariants}
            initial="initial"
            whileHover="hover"
          >
            <Image
              height={400}
              width={400}
              src={item.src}
              alt={item.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-3xl font-semibold">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
