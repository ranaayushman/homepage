"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Dashboard from "./Dashboard";

const Page = () => {
  // Get the userId from URL parameters
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  return (
    <div>
      {/* Pass the userId as a prop to your Dashboard component */}
      <Dashboard userId={userId || ""} />
    </div>
  );
};

export default Page;
