import Image from "next/image";
import React from "react";

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
      <Image src={imgSrc} width={300} height={300} alt={altText} />
      <h2 className="text-xl text-white">{text}</h2>
    </div>
  );
};

export default AcademicCard;
