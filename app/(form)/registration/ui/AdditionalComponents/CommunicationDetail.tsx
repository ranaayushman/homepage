import CheckboxField from "@/app/sections/form/ui/CheckBoxField";
import InputField from "@/app/sections/form/ui/InputField";
// import { Check } from "lucide-react";
import React from "react";

const CommunicationDetail = () => {
  return (
    <div className="grid gap-y-4">
      <h2 className="text-md font-medium mb-[10px]">Communication Details</h2>
      <div>
        <h3 className="text-sm font-medium mb-4">Phone No:</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <InputField
            name="communicationDetails.phoneNumber1"
            placeholder="Phone Number"
            //   label="Phone Number:"
          />
          <InputField
            name="communicationDetails.phoneNumber2"
            placeholder="Phone Number"
            //   label="Phone Number:"
          />
          <InputField
            name="communicationDetails.phoneNumber3"
            placeholder="Phone Number"
            //   label="Phone Number:"
          />
        </div>
      </div>
      <div className="w-1/2 grid grid-cols-1 gap-4 ">
        <InputField name="communicationDetails.email" placeholder="Email" label="Email:" />
        <InputField
          name="communicationDetails.permanentAddress"
          placeholder="Permanent Address"
          label="Permanent Address:"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
        <InputField
          name="communicationDetails.localAddress"
          placeholder="Local Address"
          label="Local Address:"
        />
        <CheckboxField name="sameAddress" label="Same as Permanent Address" />
      </div>
      <hr className="my-5 border-black" />
    </div>
  );
};

export default CommunicationDetail;
