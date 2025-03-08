import { Facebook, Youtube, Instagram } from "lucide-react";
import React from "react";

const Location: React.FC = () => {
  return (
    <div
      className="relative w-full py-12 bg-cover bg-center before:absolute before:inset-0 before:bg-[#292B5F] before:opacity-80 before:rounded-tl-[150px] before:rounded-tr-[150px] rounded-tl-[150px] rounded-tr-[150px]"
      style={{ backgroundImage: "url('/img/footer.jpg')" }}
    >
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 rounded-tl-[50px] rounded-tr-[50px] p-10 justify-between">
          {/* Left Section - Address & Social Media */}
          <div className="md:w-1/3">
            <h2 className="text-3xl font-light mb-6 text-white">
              How to <span className="font-semibold">Locate</span> us?
            </h2>
            <p className="text-white mb-4">
              486, B-4, Block B, Kalyani, West Bengal 741235
            </p>
            <p className="font-medium mb-2 text-white">
              FIND US ON SOCIAL MEDIA
            </p>
            <div className="flex gap-3 mb-6">
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

          {/* Middle Section - Contact Info */}
          <div className="md:w-1/3 text-white">
            <h2 className="text-3xl font-light mb-6">Contact us</h2>
            <ul className="space-y-2">
              <li>+91-7980396853</li>
              <li>033 2582 8316</li>
              <li>033 2580 8619</li>
              <li>kcms.1971@yahoo.com</li>
            </ul>
            <a href="#" className="mt-4 inline-block text-white underline">
              Privacy policy
            </a>
          </div>

          {/* Right Section - Google Map */}
          <div className="md:w-1/3 h-60 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672!2d88.42999445767143!3d22.969603349895074!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDU4JzEwLjYiTiA4OMKwMjUnNDcuOSJF!5e0!3m2!1sen!2sin!4v1708538330404!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full border-0 rounded-lg"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
        <p className="text-center text-white mt-6">
          © 2024 techsupport@Kiwi Ed-Tech All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Location;
