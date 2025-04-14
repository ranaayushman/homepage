"use client";
import { useParams } from "next/navigation";
import React from "react";
import ViewApplication from "../components/ViewApplication";

const Page = () => {
  const params = useParams();
  const userId = String(params.userId);
  const applicationId = String(params.applicatioId);
  return (
    <div>
      <ViewApplication userId={userId} applicationId={applicationId} />
    </div>
  );
};

export default Page;
