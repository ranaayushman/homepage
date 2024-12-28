import React from "react";
import AdmissionClass from "./ui/AdmissionClass";
import StudentDetails from "./ui/StudentDetails";
import PreviousAcademic from "./ui/PreviousAcademic";
import Guardian from "./ui/Guardian";

const Register = () => {
  return (
    <div>
      <AdmissionClass />
      <StudentDetails />
      <PreviousAcademic />
      <Guardian />
    </div>
  );
};

export default Register;
