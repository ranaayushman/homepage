import Image from "next/image";
import React from "react";

interface ProfileCardProps {
  imageSrc: string;
  name?: string;
  designation?: string;
  altText?: string;
  imageHeight?: number;
  imageWidth?: number;
  className?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  imageSrc,
  name,
  designation,
  altText = "profile picture",
  imageHeight = 400,
  imageWidth = 400,
  className = "",
}) => {
  return (
    <div className={`flex flex-col items-center text-[#101010] ${className}`}>
      <Image
        src={imageSrc}
        height={imageHeight}
        width={imageWidth}
        alt={altText}
        className="rounded-md shadow-lg drop-shadow-lg"
      />
      <p className="font-medium text-lg">{name}</p>
      <p className="text-sm text-gray-600">{designation}</p>
    </div>
  );
};

export default ProfileCard;
