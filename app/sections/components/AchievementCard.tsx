import Image from "next/image";
import React from "react";

interface AchievementProps {
  imgSrc: string;
  altText?: string;
  imgHeight: number;
  imgWidth: number;
}
const AchievementCard: React.FC<AchievementProps> = ({
  imgSrc,
  altText = "Image",
  imgHeight=400,
  imgWidth=400,
}) => {
  return (
    <div>
      <Image alt={altText} height={imgHeight} width={imgWidth} src={imgSrc} className="rounded-md"/>
    </div>
  );
};

export default AchievementCard;
