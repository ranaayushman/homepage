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
    <div className="bg-[#FFFFFF] px-10 rounded-md mx-10 py-5">
      <div>
        <h2 className="text-xl pb-5">Kalyani Public School, Barasat</h2>
        <table className="w-full text-center">
          <thead>
            <tr>
              <th className="font-medium">Payment name</th>
              <th className="font-medium">Form No.</th>
              <th className="font-medium">Paid on</th>
              <th className="font-medium">Amount</th>
              <th className="font-medium">Transaction ID</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-[#8D8D8D] text-sm">
              <td>Application Fee</td>
              <td>1234</td>
              <td>18/12/2024</td>
              <td>₹500</td>
              <td>K7L5M9N3O4P8</td>
              <td
                className={`px-3 py-1 rounded-md ${getStatusColor(
                  "Submitted"
                )}`}
              >
                Successful
              </td>
              <td>
                <Button className="bg-transparent shadow-none rounded-none border-none hover:bg-transparent">
                  <Image
                    alt="download"
                    height={20}
                    width={20}
                    src={"/svg/download.svg"}
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
