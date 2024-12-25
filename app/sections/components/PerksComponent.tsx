import Image from "next/image";
import React from "react";

interface PerksProps {
  imageSrc: string;
  title: string;
  highlightedText: string;
  description: string;
  className?: string;
}

const PerksComponent = ({
  imageSrc,
  title,
  highlightedText,
  description,
  className = "",
}: PerksProps) => {
  return (
    <div
      className={`bg-[#FEFFFC] rounded-lg shadow-md p-4 m-4 
        transition-transform duration-300 ease-in-out 
        border border-gray-200 hover:shadow-lg hover:scale-105  hover:border-[#789336]
        ${className}`}
    >
      <div className="flex items-center justify-start mb-4">
        <Image alt="Perks" height={70} width={70} src={imageSrc} />
      </div>
      <div>
        <h2 className="text-gray-900 text-lg font-bold mb-2">
          {title} <span className="text-[#789336] ">{highlightedText}</span>
        </h2>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default PerksComponent;
