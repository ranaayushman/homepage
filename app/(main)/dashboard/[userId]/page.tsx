"use client";

import React from "react";
import { useParams } from "next/navigation";
import Dashboard from "../Dashboard";

export default function Page() {
  const params = useParams();

  const userId = params.userId as string;

  return (
    <div>
      <Dashboard userId={userId} />
    </div>
  );
}
