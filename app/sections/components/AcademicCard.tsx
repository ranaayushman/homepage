import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AcademicCardProps {
  imgSrc: string;
  altText?: string;
  text?: string;
}

const AcademicCard = ({
  imgSrc,
  altText = "default alt text",
  text,
}: AcademicCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center py-8 h-[400px] w-[300px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden rounded-md group w-full">
        <Image
          src={imgSrc}
          width={300}
          height={300}
          alt={altText}
          className="transition-opacity duration-300 w-full"
        />

        {/* Fixed Overlay Effect */}
        <motion.div className="absolute bottom-0 left-0 w-full h-0 bg-black bg-opacity-60 flex justify-center items-center transition-all duration-300 group-hover:h-full opacity-0 group-hover:opacity-100">
          <h3 className="text-white text-xl font-medium px-2 text-center">
            {text}
          </h3>
        </motion.div>
      </div>

      {/* The text below the image appears with fade animation */}
      <div className="h-[50px] w-full flex items-center justify-center">
        <AnimatePresence>
          {isHovered && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="text-white text-center w-full"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AcademicCard;
  