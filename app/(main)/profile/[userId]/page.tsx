"use client"
import React from "react";
import Profile from "../Profile";
import { useParams } from "next/navigation";

const Page = () => {
  const params = useParams();
  const userId = params.userId as string;

  return (
    <div className="m-5">
      <Profile userId={userId} />
    </div>
  );
};

export default Page;
