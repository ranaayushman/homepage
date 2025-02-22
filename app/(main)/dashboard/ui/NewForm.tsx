import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewForm = () => {
  return (
    <div className="my-5 mx-10 ">
      <Link href={"/registration"}>
        <Button className="bg-[#3A471A] text-[#FFFFFF] border border-[#3A471A] w-40">
          <Image
            height={20}
            width={20}
            src={"/svg/user_white_1.svg"}
            alt="user"
          />
          New Form
        </Button>
      </Link>
    </div>
  );
};

export default NewForm;
