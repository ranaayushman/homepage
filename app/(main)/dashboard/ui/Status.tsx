import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const Status = () => {
  const getStatusColor = (status: string) => {
    if (status === "Submitted") {
      return "text-[#789336] ";
    } else if (status === "Pending") {
      return "text-orange-500 ";
    } else {
      return "bg-gray-300";
    }
  };

  return (
    <div className="bg-[#FFFFFF] px-10 rounded-md mx-10">
      <div>
        <h2 className="text-xl py-5">Kalyani Public School, Barasat</h2>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="font-medium">Form Submitted On</th>
              <th className="font-medium">Applicant Name</th>
              <th className="font-medium">Form No.</th>
              <th className="font-medium">Application Fee</th>
              <th className="font-medium">Form Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td>Kabir Kumar</td>
              <td>1234</td>
              <td>$500</td>
              <td
                className={`px-3 py-1 rounded-md ${getStatusColor("Pending")}`}
              >
                Pending
              </td>
              <td className="flex justify-start">
                <Button className="px-3 py-1 rounded-md bg-transparent border-none shadow-none hover:bg-transparent text-[#789336]">
                  Continue Application
                  <Image
                    src={"/svg/rightarrow.svg"}
                    height={20}
                    width={20}
                    alt={"arrow"}
                  />
                </Button>
              </td>
            </tr>
            <tr>
              <td>19/12/2024</td>
              <td>Anuj Kumar</td>
              <td>5678</td>
              <td>$500</td>
              <td
                className={`px-3 py-1 rounded-md ${getStatusColor(
                  "Submitted"
                )}`}
              >
                Submitted
              </td>
              <td className="flex justify-start items-center">
                <Button className="px-3 py-1 rounded-md bg-transparent border-none shadow-none hover:bg-transparent text-[#789336]">
                  View Application
                  <Image
                    src={"/svg/rightarrow.svg"}
                    height={20}
                    width={20}
                    alt={"arrow"}
                  />
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Status;
