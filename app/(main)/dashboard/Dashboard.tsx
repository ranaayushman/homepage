import React from "react";
import NewForm from "./ui/NewForm";
import Status from "./ui/Status";
import Footer from "@/app/sections/Footer";

const Dashboard = () => {
  return (
    <section >
      <div >
        <NewForm />
        <Status />
      </div>
      <Footer />
    </section>
  );
};

export default Dashboard;
