"use client";

import React from "react";
import { useParams } from "next/navigation";
import Payment from "../payment";

export default function Page() {
  const params = useParams();

  const userId = params.userId as string;

  return (
    <div>
      <Payment userId={userId} />
    </div>
  );
}
