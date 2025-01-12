import { FileUploadField } from "@/app/sections/form/ui/FileUploadField";
import React from "react";

const DocumentsPart = () => {
  return (
    <div>
      <h2>Document Upload</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
        <FileUploadField
          name="birthCertificate"
          placeholder="Upload Birth certificate"
          label="Birth Certificate"
        />
        <FileUploadField
          name="transferCertificate"
          placeholder="Upload Transfer Certificate"
          label="Transfer Certificate:"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
        <FileUploadField
          name="migrationCertificate"
          placeholder="Upload Migration Certificate"
          label="Migration Certificate:"
        />
        <FileUploadField
          name="markSheet"
          placeholder="Upload Marksheet"
          label="Marksheet:"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-x-4">
        <FileUploadField
          name="aadhaarCard"
          placeholder="Upload Aadhar Card"
          label="Aadhar Card:"
        />
        <FileUploadField
          name="residentialProof"
          placeholder="Upload Aadhar/Passport or Driving License"
          label="Parent/Guardian’s Residential Proof:"
        />
      </div>
    </div>
  );
};

export default DocumentsPart;
