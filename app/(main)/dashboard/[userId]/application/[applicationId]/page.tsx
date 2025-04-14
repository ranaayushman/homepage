"use client";

import React from "react";
import Form from "../components/Form";
import { useParams } from "next/navigation";

const Page = () => {
  const { userId, applicationId } = useParams() as {
    userId: string;
    applicationId: string;
  };

  return (
    <div className="md:p-5">
      <Form userId={userId} applicationId={applicationId} />
    </div>
  );
};

export default Page;
