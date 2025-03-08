import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

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
  return (
    <div className="flex flex-col items-center py-8">
      <div className="relative overflow-hidden rounded-md group">
        <Image
          src={imgSrc}
          width={300}
          height={300}
          alt={altText}
          className="transition-transform duration-300 group-hover:scale-105"
        />

        {/* Fixed Overlay Effect */}
        <motion.div className="absolute bottom-0 left-0 w-full h-0 bg-black bg-opacity-60 flex justify-center items-center transition-all duration-300 group-hover:h-full opacity-0 group-hover:opacity-100">
          <h3 className="text-white text-xl font-medium px-2 text-center">
            {text}
          </h3>
        </motion.div>
      </div>

      {/* The text below the image remains */}
      <h2 className="text-xl text-white mt-3">{text}</h2>
    </div>
  );
};

export default AcademicCard;
