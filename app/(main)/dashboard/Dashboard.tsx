import React from "react";
import NewForm from "./ui/NewForm";
import Status from "./ui/Status";
import Footer from "@/app/sections/Footer";
import Instructions from "@/app/sections/components/Instructions";

interface DashboardProps {
  userId: string;
}
const Dashboard = ({ userId }: DashboardProps) => {
  console.log(userId);
  return (
    <section className="">
      <div className="my-10">
        <NewForm />
        <Status />
      </div>
      <div className="grid grid-cols-2 mx-10 gap-2">
        <Instructions />
        <Instructions />
      </div>
      <Footer />
    </section>
  );
};

export default Dashboard;
