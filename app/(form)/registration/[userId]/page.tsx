"use client";

import React from "react";
import Form from "../Form";

interface RegistrationPageProps {
  params: Promise<{ userId: string }>;
}

const Page = ({ params }: RegistrationPageProps) => {
  const { userId } = React.use(params);

  return (
    <div className="md:p-5">
      <Form userId={userId} />
    </div>
  );
};

export default Page;
