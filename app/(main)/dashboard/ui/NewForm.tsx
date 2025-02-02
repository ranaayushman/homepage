import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const NewForm = () => {
  return (
    <div className="my-5 mx-10 ">
      <Link href={"/registration"}>
        <Button className="bg-transparent text-[#3A471A] border border-[#3A471A] hover:bg-transparent w-40">
          <Image height={20} width={20} src={"/svg/user.svg"} alt="user" />
          New Form
        </Button>
      </Link>
    </div>
  );
};

export default NewForm;
