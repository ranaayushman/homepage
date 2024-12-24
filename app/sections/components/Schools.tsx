import Image from "next/image";
import React from "react";

interface SchoolCardProps {
  imgSrc: string;
  altText?: string;
  imageHeight?: number;
  imageWidth?: number;
  // className?: string;
}

const SchoolCard: React.FC<SchoolCardProps> = ({
  imgSrc,
  altText = "school",
  imageHeight = 160,
  imageWidth = 160,
  // className = "",
}) => {
  return (
    <div className="m-10">
      <div className=" flex items-center justify-center h-52 w-52 bg-[#F7F7F7] shadow-lg">
        <Image
          height={imageHeight}
          width={imageWidth}
          alt={altText}
          src={imgSrc}
        />
      </div>
    </div>
  );
};

export default SchoolCard;
