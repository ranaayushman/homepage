import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Facebook, Youtube, Instagram } from "lucide-react";

const Location: React.FC = () => {
  return (
    <div className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Apply Section */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-light mb-2">
            How to <span className="font-semibold text-[#101010]">apply</span>
          </h2>
          <p className="text-gray-700 mb-6">
            We build trust and guide prospective families at Kalyani Central
            Model School for both day scholars and boarders.
          </p>
          <Button className="border border-[#292B5F] bg-white text-[#292B5F] hover:bg-[#292B5F] hover:text-white py-2 px-6 w-full max-w-md uppercase tracking-wider">
            APPLY
          </Button>
        </div>

        {/* Location Section */}
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <h2 className="text-3xl font-light mb-6 text-[#292B5F]">
              How to{" "}
              <span className="font-semibold text-[#292B5F]">Locate</span> us?
            </h2>

            <div className="mb-4">
              <Image
                height={400}
                width={400}
                src="/img/school-building.png"
                alt="School Campus"
                className="w-full rounded-lg"
              />
            </div>

            <p className="text-[#292B5F] mb-4">
              486, B-4-B4, Block B, Kalyani, West Bengal 741235
            </p>

            <div>
              <p className="font-medium mb-2 text-[#292B5F]">
                FIND US ON SOCIAL MEDIA
              </p>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full"
                >
                  <Facebook size={16} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-red-600 text-white rounded-full"
                >
                  <Youtube size={16} />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full"
                >
                  <Instagram size={16} />
                </a>
              </div>
            </div>
          </div>

          <div className="md:w-2/3 relative h-96 md:h-auto">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672!2d88.42999445767143!3d22.969603349895074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU4JzEwLjYiTiA4OMKwMjUnNDcuOSJF!5e0!3m2!1sen!2sin!4v1708538330404!5m2!1sen!2sin&markers=color:red%7Clabel:S%7C22.969603349895074,88.42999445767143`}
              className="absolute inset-0 w-full h-full border-0 rounded-lg"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
