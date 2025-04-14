"use client";

import React from "react";
import Form from "../components/Form";
import { useParams } from "next/navigation";

interface ApplicationPageProps {
  params: {
    userId: string;
    applicationId: string;
  };
}

const Page = ({ params }: ApplicationPageProps) => {
  const { userId, applicationId } = params;

  return (
    <div className="md:p-5">
      <Form userId={userId} applicationId={applicationId} />
    </div>
  );
};

export default Page;
