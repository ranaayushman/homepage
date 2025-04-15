import React from "react";
import Status from "./ui/Status";
import Footer from "@/app/sections/Footer";

interface PaymentProps {
  userId: string;
}
const payment = ({ userId }: PaymentProps) => {
  return (
    <section>
      <div className="my-10">
        <Status />
      </div>
      {/* <Footer /> */}
    </section>
  );
};

export default payment;
